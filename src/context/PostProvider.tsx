import React, { createContext, useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

import axios from "../api/axios";

export type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  author: string;
  content: string;
};

type PostContextProps = {
  posts: Post[] | null;
  getPosts: (category: string) => void;
  deletePost: (postId: string) => void;
};

type PostProviderProps = {
  children: React.JSX.Element;
};

export const PostContext = createContext<PostContextProps>({
  posts: [] || null,
  getPosts: () => {},
  deletePost: () => {},
});

export default function PostProvider({
  children,
}: PostProviderProps): React.JSX.Element {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const getPosts = (category: string) => {
    axios({
      method: "get",
      signal: AbortSignal.timeout(5000),
    })
      .then((response: AxiosResponse) => {
        const selectedCategory = response.data.filter(
          (post: Post) => post.category === category
        );
        const newPosts = category === "All" ? response.data : selectedCategory;
        setPosts(newPosts);
      })
      .catch((error: AxiosError) => {
        console.error(`${error}`);
      });
  };

  const deletePost = (postId: string) => {
    axios({
      method: "delete",
      url: `/${postId}`,
      signal: AbortSignal.timeout(5000),
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
          getPosts("All");
        }
      })
      .catch((error: AxiosError) => {
        console.error(`${error}`);
      });
  };

  useEffect(() => {
    getPosts("All");
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
