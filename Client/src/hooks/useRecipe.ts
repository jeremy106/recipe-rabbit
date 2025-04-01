import { useQuery } from "@tanstack/react-query";
import { Recipe } from '../models/recipe'
import request from 'superagent'

const recipeUrl = 'http://localhost:5107/api/Recipe/'

export function useRecipe(id: string){

  const recipe = useQuery({
      queryKey: ['recipe', id],
      queryFn: async(): Promise<Recipe> => {
        console.log(recipeUrl+id)
        const response = await request.get(recipeUrl + id)
        return response.body
      }
    })
  
  return {
    recipe
  }

}







// async function getRecipeById(id: string): Promise<Recipe> {
//   const response = await request.get(recipeUrl + id)
//   return response.body
// } 