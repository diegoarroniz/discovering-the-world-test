import { createBrowserRouter } from "react-router-dom";
import Page, { HomePage, PostPage, NotFoundPage } from "../Page";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Page page={<HomePage />} />,
  },
  {
    path: "/post/:postId",
    element: <Page page={<PostPage />} />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Router;
