import { ChangeEvent, useState } from "react"
import { RecipeData } from "../models/recipe"
import { Ingredient } from "../models/ingredient"

export default function AddRecipeForm() {

  const emptyRecipe = {
    name: 'default name',
    author: 'defulat author',
    ingredients: [{name: 'ingredient 1', amount: ''}],
    steps: [{index: 0, description: 'step 1' }]

  } as RecipeData
  
  const [ recipeForm, setRecipeForm ] = useState(emptyRecipe)
  
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    setRecipeForm((prev) => ({...prev, [name]:  value}))
    
    // TODO: Remove logging
    console.log(recipeForm)
  }

  return (
    <>
    <form>
      <h3>Recipe Information</h3>
      <div>
        <label htmlFor="name">
          Name:
        </label>
        <input
          name="name"
          id="name"
          value={recipeForm.name}
          onChange={handleChange}
          />
      </div>
      <div>
        <label htmlFor="author">
          Author:
        </label>
        <input
          name="author"
          id="author"
          value={recipeForm.author}
          onChange={handleChange}
          />
      </div>
      
      <h3>Ingredients</h3>

      <h3>Steps</h3>

    </form>
    </>
  )
}

