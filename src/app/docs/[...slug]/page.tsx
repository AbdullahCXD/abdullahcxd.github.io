import { Category, getAllDocPaths, getAllDocs, getDocByPath } from '@/utils/mdx';
import DocsLayout from '@/components/docs/DocsLayout';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { mdxComponents } from '@/components/mdx/registry';

interface Props {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const paths = await getAllDocPaths();
  const docPaths = paths.map(path => ({
    slug: [...path.category.split('/'), path.slug],
  }));

  // Add paths for category pages
  const categories = await getAllDocs();
  const categoryPaths = getCategoryPaths(categories).map(path => ({
    slug: path,
  }));

  return Promise.resolve([...docPaths, ...categoryPaths]);
}

// Helper function to get all category paths
function getCategoryPaths(categories: Category[], parentPath: string[] = []): string[][] {
  const paths: string[][] = [];
  
  for (const category of categories) {
    const currentPath = [...parentPath, category.slug];
    paths.push(currentPath);
    
    if (category.categories) {
      paths.push(...getCategoryPaths(category.categories, currentPath));
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocByPath([...slug, '_index']);

  if (!doc) {
    return {
      title: 'Documentation',
    };
  }

  return {
    title: `${doc.title} | Documentation`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} | Documentation`,
      description: doc.description,
      type: 'article',
      publishedTime: doc.date,
    },
  };
}

// Helper function to find a category in the tree
function findCategory(categories: Category[], path: string[]): Category | null {
  if (path.length === 0) return null;

  const [currentSlug, ...remainingPath] = path;
  const category = categories.find(c => c.slug === currentSlug);
  
  if (!category) return null;
  if (remainingPath.length === 0) return category;
  if (!category.categories) return null;
  
  return findCategory(category.categories, remainingPath);
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getAllDocs();

  // Check if this is a category path
  const category = findCategory(categories, slug);
  if (category) {
    // Get the category index
    const doc = await getDocByPath([...slug, '_index']);
    if (!doc) {
      notFound();
    }

    return (
      <DocsLayout categories={categories}>
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-lg text-muted-foreground">
                {doc.description}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={doc.content} components={mdxComponents} />
          </div>
        </div>
      </DocsLayout>
    );
  }

  // Otherwise, get the document
  const doc = await getDocByPath(slug);
  if (!doc) {
    notFound();
  }

  return (
    <DocsLayout categories={categories}>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              {doc.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {doc.date && (
              <div className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                <time dateTime={doc.date}>
                  {new Date(doc.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            )}
            <div className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              <span>{Math.ceil(doc.content.split(' ').length / 200)} min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={doc.content} components={mdxComponents} />
        </div>
      </div>
    </DocsLayout>
  );
} 