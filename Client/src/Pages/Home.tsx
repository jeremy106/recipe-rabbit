import styles from '../styles/Home.module.scss'
import { getRecipes } from '../api/recipes'
import { useQuery } from '@tanstack/react-query'
import { RecipeSummary } from '../models/models'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const { data: recipes, isPending, isError } = useQuery({
    queryKey: ['recipeList'],
    queryFn: () => getRecipes(),
  })
  const navigate = useNavigate();

  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  function handleClick(){
    navigate('recipe/add')
  }

  return (
    <>
      <h1>Recipe Rabbit</h1>
      <p>
        Select a recipe to start cooking
      </p>
        <div className={styles['recipe-list']}>
          {recipes.map((recipe : RecipeSummary) => (
            <Link to={`/recipe/${recipe.id}`}>
              <div key={recipe.id} className={styles['recipe-list-item']}>
                <div className={styles['recipe-name']}>{recipe.name}</div>
                <div className={styles['recipe-info']}>
                  <p>Prep Time: {recipe.prepTime ?? '?'}</p>
                  <p>Cooking Time: {recipe.cookTime ?? '?'}</p>
                  <p>Serves: {recipe.servings ?? '?'}</p>
                </div>

              </div>
            </Link>
          )
        )}
        <button onClick={handleClick}>Add a recipe</button>
        </div>
    </>
  )
}
 