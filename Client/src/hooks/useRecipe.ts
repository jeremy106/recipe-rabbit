import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Recipe } from '../models/recipe'
import request from 'superagent'
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const recipeUrl = 'http://localhost:5107/api/Recipe/'

export function useRecipe(id: string){

  const navigate = useNavigate()
  const client = useQueryClient()
  // const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const recipe = useQuery({
      queryKey: ['recipe', id],
      queryFn: async(): Promise<Recipe> => {
        console.log(recipeUrl+id)
        const response = await request.get(recipeUrl + id)
        return response.body
      }
    })

  const deleteRecipe = useMutation({
    mutationFn: async() => {
      await request.delete(recipeUrl + id)
    },
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['recipeList']})
      navigate('/')
    }
  })
  
  return {
    recipe,
    deleteRecipe
  }

}