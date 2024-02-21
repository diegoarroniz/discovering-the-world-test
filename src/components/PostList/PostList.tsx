import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Box, Typography } from "@mui/material";

import { shorten } from "../../utils/index";
import { Post } from "../../types";
import { PostContext } from "../../context";
import { PostCard } from "./PostList.styles";

interface PostListProps {
  posts: Post[];
  handleOpenForm: (defaultValues?: Post) => void;
}

function PostList({ posts, handleOpenForm }: PostListProps) {
  const navigate = useNavigate();
  const { deletePost } = useContext(PostContext);

  return (
    <Grid container columns={{ md: 12, xs: 12 }}>
      {posts?.map((post) => (
        <PostCard
          item
          xs={12}
          key={post.id}
          image={post.image}
          md={posts.length === 1 ? 12 : 6}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{ backgroundColor: "#4b4b4b3b" }}
          >
            <Box
              display="flex"
              padding={3}
              paddingTop={20}
              flexDirection="column"
            >
              <h1>{post.title}</h1>
              <h3>
                {post.comments.length}
                {post.comments.length > 1 ? " Comments" : " Comment"}
              </h3>
              <h3>{shorten(post.description, 70)}</h3>
              <Typography variant="overline">{post.category}</Typography>
            </Box>
            <Box
              className="card-actions"
              sx={{
                gap: 2,
                padding: 2,
                display: "flex",
                visibility: "hidden",
                justifyContent: "end",
              }}
            >
              <IconButton
                color="inherit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenForm(post);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(post.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </PostCard>
      ))}
    </Grid>
  );
}

export default PostList;
