import { useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton, Box } from "@mui/material";

import Form from "../../Form";
import axios from "../../../api/axios";
import PostList from "../../PostList";
import CategoryButtonGroup from "../../CategoryButtonGroup";

export type Root = Post[];

export interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
}

function HomePage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [categorySelected, setCategorySelected] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);

  const fetchPosts = (category: string) => {
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
          fetchPosts("All");
        }
      })
      .catch((error: AxiosError) => {
        console.error(`${error}`);
      });
  };

  const handleOpenForm = (defaultValues?: Post) => {
    setOpen(true);
    if (defaultValues) setSelectedPost(defaultValues);
  };

  const handleSelectCategory = (category: string) => {
    fetchPosts(category);
    setCategorySelected(category);
  };

  useEffect(() => {
    fetchPosts("All");
  }, []);

  if (!posts) return <>"Loading..."</>;

  return (
    <>
      <Grid item flexGrow={1}>
        <Box display="flex" justifyContent="end" paddingRight={2}>
          <IconButton color="primary" onClick={() => handleOpenForm()}>
            <EditIcon />
          </IconButton>
        </Box>
      </Grid>

      <CategoryButtonGroup
        categorySelected={categorySelected}
        handleSelectCategory={handleSelectCategory}
      />

      <PostList
        posts={posts}
        deletePost={deletePost}
        handleOpenForm={handleOpenForm}
      />

      <Form
        open={open}
        setOpen={setOpen}
        post={selectedPost}
        fetchPosts={fetchPosts}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default HomePage;
