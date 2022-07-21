import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          databaseId
          title
          content
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const SIDEBAR_POSTS = gql`
  query getPosts($first: Int!) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          databaseId
          title
          content
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const PostTags = gql`
  query getTags($first: Int!) {
    tags(first: $first) {
      edges {
        node {
          id
          databaseId
          name
          slug
        }
      }
    }
  }
`;

export const PostCats = gql`
  query getCategory($first: Int!) {
    categories(first: $first) {
      edges {
        node {
          name
          id
          databaseId
          slug
          count
        }
      }
    }
  }
`;

export const GET_TOTAL_POSTS_COUNT = gql`
  query GET_TOTAL_POSTS_COUNT {
    postsCount: posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query GET_POST($uri: String) {
    post: postBy(uri: $uri) {
      id
      title
      content
      slug
      uri
    }
  }
`;

export const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
    posts: posts(last: 1) {
      nodes {
        id
        slug
      }
    }
  }
`;
