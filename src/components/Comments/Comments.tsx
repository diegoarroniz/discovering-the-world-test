import { useState, useContext } from "react";
import { Button, Grid, TextField } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";

import { Comment } from "../../types";
import { SnackbarContext } from "../../context";

interface CommentsProps {
  postId: string | undefined;
  comments: Comment[];
}

function Comments({ postId, comments }: CommentsProps) {
  const createAlert = useContext(SnackbarContext);
  const [newComment, setNewComment] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNewComment(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `/${postId}/comments`,
      signal: AbortSignal.timeout(5000),
      data: {
        author: "Juan",
        content: newComment,
      },
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
          createAlert({
            message: "Comment successfully posted.",
            severity: "success",
          });
        }
      })
      .catch((error: AxiosError) => {
        createAlert({
          message: "Something went wrong when trying to upload the comment.",
          severity: "error",
        });
        console.error(`${error}`);
      });
  };

  return (
    <Grid container flexGrow={1} justifyContent={"center"} display={"flex"}>
      <Grid flexGrow={1} item sm={8}>
        <Grid item flexGrow={1}>
          <h4>Comments</h4>
        </Grid>
        <>
          {comments.map((comment) => (
            <Grid
              item
              key={comment.id}
              flexGrow={1}
              padding={2}
              marginBottom={3}
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
            >
              <div> {comment.author}</div>
              <div>{comment.content}</div>
            </Grid>
          ))}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              id="comment-id"
              label="Write a comment"
              type="text"
              variant="standard"
              name="comment"
              margin="dense"
              onChange={handleChange}
              sx={{ paddingBottom: 2 }}
            />
            <Button type="submit" variant="contained" disabled={!newComment}>
              Add
            </Button>
          </form>
        </>
      </Grid>
    </Grid>
  );
}

export default Comments;
