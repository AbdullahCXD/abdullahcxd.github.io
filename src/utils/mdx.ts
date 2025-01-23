import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface DocMeta {
  title: string;
  description?: string;
  date: string;
  order: number;
  slug: string;
  content: string;
}

export interface Category {
  name: string;
  slug: string;
  order: number;
  items: DocMeta[];
  categories?: Category[];
}

export async function getDocBySlug(category: string, slug: string): Promise<DocMeta> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const docsDirectory = path.join(process.cwd(), 'docs');
  const fullPath = path.join(docsDirectory, category, `${realSlug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    order: data.order || 0,
    slug: realSlug,
    content,
  };
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function readCategoryConfig(categoryPath: string): Promise<{ name: string; order: number }> {
  try {
    const configPath = path.join(categoryPath, '_category.json');
    const configContent = await fs.readFile(configPath, 'utf8');
    return JSON.parse(configContent);
  } catch {
    // If no config file exists, use defaults based on directory name
    const dirName = path.basename(categoryPath);
    return {
      name: dirName.charAt(0).toUpperCase() + dirName.slice(1).replace(/-/g, ' '),
      order: 0,
    };
  }
}

async function processDirectory(dirPath: string): Promise<Category> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const config = await readCategoryConfig(dirPath);
  
  const items: DocMeta[] = [];
  const categories: Category[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      const category = await processDirectory(fullPath);
      categories.push(category);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      items.push({
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        order: data.order || 0,
        slug: entry.name.replace(/\.mdx$/, ''),
        content,
      });
    }
  }

  return {
    name: config.name,
    slug: path.basename(dirPath),
    order: config.order,
    items: items.sort((a, b) => (a.order || 0) - (b.order || 0)),
    ...(categories.length > 0 && {
      categories: categories.sort((a, b) => a.order - b.order),
    }),
  };
}

export async function getAllDocs(): Promise<Category[]> {
  const docsDirectory = path.join(process.cwd(), 'docs');
  const entries = await fs.readdir(docsDirectory, { withFileTypes: true });
  const categories: Category[] = [];

  for (const entry of entries) {
    const fullPath = path.join(docsDirectory, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      const category = await processDirectory(fullPath);
      categories.push(category);
    }
  }

  return categories.sort((a, b) => a.order - b.order);
}

export async function getCategoryIndex(categoryPath: string[]): Promise<DocMeta | null> {
  const categories = await getAllDocs();
  let currentCategories = categories;
  let category: Category | null = null;

  // Find the target category
  for (const slug of categoryPath) {
    const foundCategory = currentCategories.find(c => c.slug === slug);
    if (!foundCategory) return null;
    category = foundCategory;
    if (category.categories) {
      currentCategories = category.categories;
    }
  }

  if (!category) return null;

  try {
    // Try to read the _index.mdx file
    const docsDirectory = path.join(process.cwd(), 'docs');
    const indexPath = path.join(docsDirectory, categoryPath.join(path.sep), '_index.mdx');
    const fileContents = await fs.readFile(indexPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || category.name,
      description: data.description || '',
      date: data.date || '',
      order: data.order || 0,
      slug: '_index',
      content,
    };
  } catch {
    // If no _index.mdx exists, generate a default one
    const title = category.name;
    const description = `Documentation for ${category.name}`;
    const items = category.items.map(item => 
      `- [${item.title}](/docs/${categoryPath.join('/')}/${item.slug}) - ${item.description || ''}`
    ).join('\n');

    const subcategories = category.categories?.map(cat =>
      `### ${cat.name}\n${cat.items.map(item => 
        `- [${item.title}](/docs/${[...categoryPath, cat.slug, item.slug].join('/')}) - ${item.description || ''}`
      ).join('\n')}`
    ).join('\n\n') || '';

    const content = `# ${title}\n\n${description}\n\n## Available Documentation\n\n${items}\n\n${subcategories}`;

    return {
      title,
      description,
      date: new Date().toISOString(),
      order: 0,
      slug: '_index',
      content,
    };
  }
}

export async function getDocByPath(path: string[]): Promise<DocMeta | null> {
  // Check if this is a request for a category index
  if (path[path.length - 1] === '_index') {
    return getCategoryIndex(path.slice(0, -1));
  }

  const categories = await getAllDocs();
  let currentCategories = categories;
  let doc: DocMeta | null = null;

  // For a path like ['category1', 'category2', 'doc-slug']
  // We need to traverse through categories until we reach the last one
  for (let i = 0; i < path.length - 1; i++) {
    const currentSlug = path[i];
    const category = currentCategories.find(c => c.slug === currentSlug);
    
    if (!category) return null;
    
    // If we're at the second-to-last item in the path, look for the document
    if (i === path.length - 2) {
      doc = category.items.find(d => d.slug === path[path.length - 1]) || null;
      break;
    }
    
    // If we're not at the last category yet, move to nested categories
    if (!category.categories) return null;
    currentCategories = category.categories;
  }

  return doc;
}

// Helper function to find a document in a category tree
function findDocInCategory(categories: Category[], path: string[]): DocMeta | null {
  if (path.length < 2) return null;

  const [currentSlug, ...remainingPath] = path;
  const category = categories.find(c => c.slug === currentSlug);
  if (!category) return null;

  // If we're at the last category, look for the document
  if (remainingPath.length === 1) {
    return category.items.find(d => d.slug === remainingPath[0]) || null;
  }

  // Otherwise, continue searching in nested categories
  if (!category.categories) return null;
  return findDocInCategory(category.categories, remainingPath);
}

export async function getAllDocPaths(): Promise<{ category: string; slug: string }[]> {
  const categories = await getAllDocs();
  const paths: { category: string; slug: string }[] = [];

  function traverseCategories(cats: Category[], parentPath: string[] = []) {
    for (const category of cats) {
      const currentPath = [...parentPath, category.slug];
      
      // Add paths for documents in this category
      for (const doc of category.items) {
        paths.push({
          category: currentPath.join('/'),
          slug: doc.slug,
        });
      }

      // Recursively traverse nested categories
      if (category.categories) {
        traverseCategories(category.categories, currentPath);
      }
    }
  }

  traverseCategories(categories);
  return paths;
}

export function flattenCategories(categories: Category[]): Category[] {
  const flattened: Category[] = [];

  function traverse(cats: Category[]) {
    for (const category of cats) {
      flattened.push(category);
      if (category.categories) {
        traverse(category.categories);
      }
    }
  }

  traverse(categories);
  return flattened;
} 