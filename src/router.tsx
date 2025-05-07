import { createBrowserRouter } from "react-router";
import { Home } from "./layouts/Home";
import { Details } from "./layouts/Details";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Home />
    },
    {
        path:'/details/:id',
        element: <Details/>
    }
]);