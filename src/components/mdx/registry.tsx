import { CodeBlock } from './CodeBlock';
import { CommandBox } from './CommandBox';
import { InfoBox } from './InfoBox';
import { ApiBox } from './ApiBox';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';

export const mdxComponents = {
  // Code and Command blocks
  pre: ({ children }: { children: React.ReactNode }) => (
    <CodeBlock isPreBlock>{children}</CodeBlock>
  ),
  code: ({ children, className }: { children: string; className?: string }) => (
    <CodeBlock className={className}>{children}</CodeBlock>
  ),
  CommandBox,
  InfoBox,
  ApiBox,

  // Links and Images
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt || ''}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          {...(props as Partial<ImageProps>)}
        />
      </div>
    );
  },
}; 