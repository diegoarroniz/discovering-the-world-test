import { RouterProvider } from "react-router-dom";

import Router from "./components/Router";
import { PostProvider, SnackbarProvider } from "./context";

function App() {
  return (
    <>
      <SnackbarProvider>
        <PostProvider>
          <RouterProvider router={Router} />
        </PostProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
