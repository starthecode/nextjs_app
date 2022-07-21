import { useQuery } from '@apollo/client';
import { GET_POST, GET_POST_SLUGS } from '../../util/api';

export default function Post({ post }) {
  return (
    <>
      <h1>{post.title}</h1>;
    </>
  );
}

const baseUrl = 'https://www.iokart.com';

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts`);
  const posts = await res.json();
  const paths = posts.map(({ slug }) => ({ params: { slug: `${slug}` } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const resPost = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?slug=${context.params.slug}`
  );

  const post = await resPost.json();

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
