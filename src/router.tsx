import { createBrowserRouter } from "react-router";
import { Home } from "./layouts/Home";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Home />
    }
]);