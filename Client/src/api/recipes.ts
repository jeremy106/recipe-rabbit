import request from 'superagent'

const recipeUrl = 'http://localhost:5107/api/Recipe/'

export async function getRecipes() {
  const response = await request.get(`${recipeUrl}`)
  return response
}