import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Box, Typography } from "@mui/material";

import { shorten } from "../../utils/index";
import { Post } from "../Page/HomePage/HomePage";
import { PostContext } from "../../context/PostProvider";

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
        <Grid
          item
          key={post.id}
          flexGrow={1}
          md={posts.length === 1 ? 12 : 6}
          display="flex"
          xs={12}
          sx={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            cursor: "pointer",
          }}
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
              onClick={() => navigate(`/post/${post.id}`)}
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
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: 2,
                padding: 2,
              }}
            >
              <IconButton
                sx={{ color: "white" }}
                onClick={() => handleOpenForm(post)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => deletePost(post.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default PostList;
