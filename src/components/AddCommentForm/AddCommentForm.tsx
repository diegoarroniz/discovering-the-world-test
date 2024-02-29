import { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";

import { SnackbarContext } from "../../context";

interface CommentsProps {
  postId: string;
  getPost: () => void;
}

function AddCommentForm({ postId, getPost }: CommentsProps) {
  const [newComment, setNewComment] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const createAlert = useContext(SnackbarContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNewComment(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await axios({
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
          setNewComment("");
          getPost();
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
    setLoading(false);
  };

  return (
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
        value={newComment}
        onChange={handleChange}
        sx={{ paddingBottom: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!newComment || loading}
      >
        Add
      </Button>
    </form>
  );
}

export default AddCommentForm;
