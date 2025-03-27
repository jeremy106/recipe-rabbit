import request from 'superagent'
import { Recipe } from '../models/recipe'

const recipeUrl = 'http://localhost:5107/api/Recipe/'

export async function getRecipes() {
  const response = await request.get(recipeUrl)
  return response.body
}

export async function getRecipeById(id: string): Promise<Recipe> {
  const response = await request.get(recipeUrl + id)
  return response.body
}
