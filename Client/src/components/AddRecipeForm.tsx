import { useState } from "react"

export default function AddRecipeForm() {
  
  const [info, setInfo] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  
  

  return (
    <>Add Recipe Coming soon</>
  )
}

/*

## Recipe Info:
* Recipe Name 
Author
Servings
Prep Time
Cooking Time

## Add an Ingredient
* Name
* Amount
Notes

## Add a step
* Description


*/