import { AnimatedContent } from '@/components/docs/AnimatedContent';
import { getAllDocs } from '@/utils/mdx';
import DocsLayout from '@/components/docs/DocsLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation | AbdullahCXD',
    description: 'Learn how to use and customize the portfolio website with our comprehensive documentation.',
    openGraph: {
        title: 'Documentation | AbdullahCXD',
        description: 'Learn how to use and customize the portfolio website with our comprehensive documentation.',
        type: 'website',
    },
};

export default async function DocsPage() {
    const categories = await getAllDocs();

    return (
        <DocsLayout categories={categories}>
            <AnimatedContent categories={categories} />
        </DocsLayout>
    );
}