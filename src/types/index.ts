export type FormInputs = {
  title: { value: string; error: string };
  description: { value: string; error: string };
  category: { value: string; error: string };
  image: { value: string; error: string };
};

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

export interface Alert {
  severity?: "error" | "warning" | "info" | "success";
  message: string;
}

export interface IAlerts extends Alert {
  key: number;
}
