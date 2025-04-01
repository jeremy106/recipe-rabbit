import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Recipe } from '../models/recipe'
import request from 'superagent'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const recipeUrl = 'http://localhost:5107/api/Recipe/'

export function useRecipe(id: string){

  const navigate = useNavigate()
  const client = useQueryClient()
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false)

  const recipe = useQuery({
      queryKey: ['recipe', id],
      queryFn: async(): Promise<Recipe> => {
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
      setConfirmationIsOpen(false)
      navigate('/')
    },
    onError: (e) => {
      console.error("Error deleting recipe:", e)
    }
  })

  function openConfirmation(){
    setConfirmationIsOpen(true)
  }
  
  function closeConfirmation(){
    setConfirmationIsOpen(false)
  }
  
  return {
    recipe,
    deleteRecipe,
    confirmationIsOpen,
    openConfirmation,
    closeConfirmation
  }

}