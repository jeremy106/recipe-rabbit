import { createRoutesFromElements, Route } from "react-router-dom";

import Home from "./pages/Home";
import ViewRecipe from "./pages/ViewRecipe";
import Layout from "./Layout";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="/recipe/:id" element={<ViewRecipe/>}/>
    <Route path="/recipe/add" element={<AddRecipe/>}/>
    <Route path="/recipe/:id/edit" element={<EditRecipe/>}/>
  </Route>
)

export default routes