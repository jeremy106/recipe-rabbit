import { useQuery } from "@tanstack/react-query"
import { getRecipeById } from "../api/recipes"
import { useParams } from "react-router-dom"

export default function ViewRecipe() {

  const { id: recipeId } = useParams()

  const { data: recipe, isPending, isError } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(String(recipeId)),
  })

  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }


  return (
    <>
    <h1>{recipe.name}</h1>
    <div>
      <p>Author: {recipe.author ?? "unknown"}</p>
      <p>Serves: {recipe.servings ?? "unknown"}</p>
    </div>
    </>
  )
}
