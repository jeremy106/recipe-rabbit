import '../styles/Home.scss'
import { getRecipes } from '../api/recipes'
import { useQuery } from '@tanstack/react-query'
import { RecipeSummary } from '../models/models'
import { Link } from 'react-router-dom'

export default function Home() {
  const { data: recipes, isPending, isError } = useQuery({
    queryKey: ['recipeList'],
    queryFn: () => getRecipes(),
  })

  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  return (
    <>
      <h1>Recipe Rabbit</h1>
      <p>
        Select a recipe to start cooking
      </p>
      <div className="recipeList">
        {recipes.map((recipe : RecipeSummary) => (
          <Link to={`/recipe/${recipe.id}`}>
            <div key={recipe.id} className="recipeListItem">
              <div className='recipe-name'>{recipe.name}</div>
              <div className='recipe-info'>Serves: {recipe.servings ? recipe.servings : '?'}</div>
            </div>
          </Link>
        )
          )}
      </div>
      <button>Add a recipe</button>
    </>
  )
}
 