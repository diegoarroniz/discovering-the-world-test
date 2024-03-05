import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Typography } from "@mui/material";

import { shorten } from "../../utils/index";
import { Post } from "../../types";
import { PostContext } from "../../context";
import {
  CardActions,
  CardContainer,
  CardContent,
  PostCard,
} from "./PostList.styles";

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
          <CardContainer>
            <CardContent>
              <h1>{post.title}</h1>
              <h3>
                {post.comments.length}
                {post.comments.length > 1 ? " Comments" : " Comment"}
              </h3>
              <h3>{shorten(post.description, 70)}</h3>
              <Typography variant="overline">{post.category}</Typography>
            </CardContent>
            <CardActions className="card-actions">
              <IconButton
                name="edit"
                color="inherit"
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenForm(post);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                name="delete"
                color="inherit"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(post.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </CardContainer>
        </PostCard>
      ))}
    </Grid>
  );
}

export default PostList;
