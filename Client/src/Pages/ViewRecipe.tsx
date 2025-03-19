import { useQuery } from "@tanstack/react-query"
import { getRecipeById } from "../api/recipes"
import { useParams } from "react-router-dom"

import styles from '../styles/ViewRecipe.module.scss'

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

  function handleClick(){
    alert("Coming soon...")
  }


  return (
    <>
    <h1>{recipe.name}</h1>
    <div className="m-container">
      <div className={styles['recipe-info']}>
        <p><span className="emphasis">Author:</span> {recipe.author ?? "unknown"}</p>
        <p><span className="emphasis">Source:</span> {recipe.source ?? "unknown"}</p>
        <p><span className="emphasis">Serves:</span> {recipe.servings ?? "unknown"}</p>
      </div>
      <div className={styles["ingredient-list"]}>
        <h3>Ingredients:</h3>
        {
          recipe.ingredients.map((ingredient) => (
            <ul key={ingredient.name}>
              <li>{ingredient.amount} {ingredient.name} {ingredient.notes && `(${ingredient.notes})`}</li>
            </ul>
          ))
        }
      </div>
      <div className={styles['steps-container']}>
        {
          recipe.steps.map((step) => (
            <p key={step.index}>
              <span className="emphasis">Step {step.index+1}: </span>
              {step.description}
            </p>
          ))
        }
      </div>
      <button onClick={handleClick}>Edit this recipe</button>
    </div>
    </>
  )
}
