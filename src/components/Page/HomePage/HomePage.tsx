import { useState, useContext, useEffect } from "react";

import Form from "../../Form";
import PostList from "../../PostList";
import CategoryButtonGroup from "../../CategoryButtonGroup";
import { PostContext } from "../../../context";
import { Post } from "../../../types";
import Loading from "../../Loading";
import CreatePostButton from "../../CreatePostButton";

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

  useEffect(() => getPosts("All"), [getPosts]);

  if (!posts) return <Loading />;

  return (
    <>
      <CreatePostButton handleOpenForm={handleOpenForm} />
      <CategoryButtonGroup
        categorySelected={categorySelected}
        handleSelectCategory={handleSelectCategory}
      />
      <PostList posts={posts} handleOpenForm={handleOpenForm} />
      <Form
        open={open}
        post={selectedPost}
        categorySelected={categorySelected}
        setOpen={setOpen}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default HomePage;
