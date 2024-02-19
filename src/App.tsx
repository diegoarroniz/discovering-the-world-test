import { RouterProvider } from "react-router-dom";

import Router from "./components/Router";
import PostProvider from "./context/PostProvider";

function App() {
  return (
    <>
      <PostProvider>
        <RouterProvider router={Router} />
      </PostProvider>
    </>
  );
}

export default App;
