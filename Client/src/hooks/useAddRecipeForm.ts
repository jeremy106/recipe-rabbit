import { ChangeEvent, FormEvent, useState } from "react";
import { RecipeData } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Step } from "../models/step";
import request from "superagent"

export default function useAddRecipeForm() {

  const [recipe, setRecipe] = useState({
    name: '',
    author: '',
    source: '',
    servings: '',
    cookTime: '',
    prepTime: '',
    steps: [{ stepOrder: 1, description: '' }] as Step[],
    ingredients: [{ name: '', amount: '', notes: '' }] as Ingredient[],
  } as RecipeData)

  // Handle recipe information
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setRecipe({...recipe, [name]: value})
  }

  // Handle Ingredients
  function handleIngredientChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target
    const updatedIngredients: Ingredient[] = [...recipe.ingredients]
    updatedIngredients[index][name as keyof Ingredient] = value
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

  function removeIngredient(index: number) {
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients.splice(index, 1)
    setRecipe({...recipe, ingredients: updatedIngredients})
  }

  //Handle Steps
  function handleStepChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target
    const updatedSteps: Step[] = [...recipe.steps]

    if (name === 'stepOrder') {
      updatedSteps[index].stepOrder = Number(value);
    } else if (name === 'description') {
      updatedSteps[index].description = value;
    }
    setRecipe({...recipe, steps: updatedSteps})
  }

  function addStep() {
    const nextStepOrder = recipe.steps.length + 1
    setRecipe(
      {...recipe, steps: [...recipe.steps, {description: '', stepOrder: nextStepOrder}]}
    )
  }

  function removeStep(index: number) {
    const updatedSteps = [...recipe.steps]
    updatedSteps.splice(index, 1)
    setRecipe({...recipe, steps: updatedSteps})
  }


  // Form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    try {
      const response = await request
        .post('http://localhost:5107/api/Recipe/')
        .set('Content-Type', 'application/json')
        .send(recipe)
      return response.statusCode
    } catch (err) {
      console.error("Error creating recipe:", err)
      return null
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>){
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }


  return {
    recipe,
    handleInputChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    handleStepChange,
    addStep,
    removeStep,
    handleSubmit,
    handleKeyDown
  }

}