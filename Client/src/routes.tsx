import { createRoutesFromElements, Route } from "react-router-dom";

import Home from "./Pages/Home";
import ViewRecipe from "./Pages/ViewRecipe";
import Layout from "./Layout";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="/recipe" element={<ViewRecipe/>}/>
  </Route>
)

export default routes