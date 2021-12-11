import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@test-nx-next/markdown';
import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';

/* eslint-disable-next-line */
export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube: dynamic(async () => {
    return await import('@test-nx-next/shared/mdx-elements/youtube/youtube');
  }),
  a: dynamic(async () => {
    return await import(
      '@test-nx-next/shared/mdx-elements/custom-link/custom-link'
    );
  }),
};

const POSTS_PATH = join(process.cwd(), '_articles');

export function Article({ frontMatter, html }: ArticleProps) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
        <hr />
        <MDXRemote {...html} components={mdxElements} />
      </article>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  const markdownContent = getParsedFileContentBySlug(params.slug, POSTS_PATH);
  const html = await renderMarkdown(markdownContent.content);

  return {
    props: { frontMatter: markdownContent.frontMatter, html },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;
