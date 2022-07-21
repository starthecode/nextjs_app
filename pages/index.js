import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_POSTS } from '../util/api';

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: 6, after: null },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.edges.length) {
    return <p>No posts have been published.</p>;
  }

  const posts = data.posts.edges.map((edge) => edge.node);
  const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);

  return (
    <>
      <div className="container mx-auto px-5 py-5">
        <div className="grid grid-cols-3 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {posts.map((post) => (
            <div className="max-w-sm cont" key={post.databaseId}>
              <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                <div className="py-5 px-5 rounded-lg bg-white">
                  <h3 className="text-gray-700 font-medium text-1xl mb-2 hover:text-gray-900 hover:cursor-pointer">
                    {post.title.substring(0, 40)}{' '}
                  </h3>
                  <p className="text-gray-700 tracking-wide">
                    {' '}
                    {post.content.substring(0, 80)}{' '}
                    {post.content.length >= 80 && '...'}
                  </p>
                </div>
                <div className="p-1 flex bg-grey-100 w-100 justify-between">
                  <div className="flex w-100 justify-end">
                    <Link href={`/posts/${post.slug}`}>
                      <a className="flex items-center">Check More</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
