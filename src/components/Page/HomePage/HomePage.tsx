import { useState, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton, Box } from "@mui/material";

import Form from "../../Form";
import PostList from "../../PostList";
import CategoryButtonGroup from "../../CategoryButtonGroup";
import { PostContext } from "../../../context";
import { Post } from "../../../types";
import Loading from "../../Loading";

function HomePage() {
  const { posts, getPosts } = useContext(PostContext);
  const [categorySelected, setCategorySelected] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenForm = (defaultValues?: Post) => {
    setOpen(true);
    if (defaultValues) setSelectedPost(defaultValues);
  };

  const handleSelectCategory = (category: string) => {
    getPosts(category);
    setCategorySelected(category);
  };

  if (!posts) return <Loading />;

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
      <PostList posts={posts} handleOpenForm={handleOpenForm} />
      <Form
        open={open}
        setOpen={setOpen}
        post={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default HomePage;
