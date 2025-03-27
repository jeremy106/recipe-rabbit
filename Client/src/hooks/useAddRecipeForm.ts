import { ChangeEvent, useState } from "react";
import { RecipeData } from "../models/recipe";

export default function useAddRecipeForm() {

  const [recipe, setRecipe] = useState({
    name: '',
    author: '',
    source: '',
    servings: '',
    cookTime: '',
    prepTime: '',
    steps: [{ index: 0, description: '' }],
    ingredients: [{ name: '', amount: '', notes: '' }],
  } as RecipeData)

  // Handle recipe information
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setRecipe({...recipe, [name]: value})
  }

  // Handle Ingredients
  function handleIngredientChange(e: ChangeEvent<HTMLInputElement>, index) {
    const { name, value } = e.target
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients[index][name] = value
    setRecipe({...recipe, ingredients: updatedIngredients})
  }

  function addIngredient() {
    setRecipe({
      ...recipe, 
      ingredients: [
        ...recipe.ingredients, 
        {
          name: '',
          amount: '',
          notes: ''
        }
      ]
    })
  }

  function removeIngredient(index) {
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients.splice(index, 1)
    setRecipe({...recipe, ingredients: updatedIngredients})
  }

  //Handle Steps
  function handleStepChange(e: ChangeEvent<HTMLInputElement>, index) {
    const { value } = e.target
    const updatedSteps = [...recipe.steps]
    updatedSteps[index].description
    setRecipe({...recipe, steps: updatedSteps})
  }

  return {
    recipe,
    handleInputChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient
  }

}