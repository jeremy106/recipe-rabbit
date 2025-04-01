import { useQuery } from '@tanstack/react-query'
import { getRecipeById } from '../api/recipes'
import { useNavigate, useParams } from 'react-router-dom'

import styles from '../styles/ViewRecipe.module.scss'

export default function ViewRecipe() {
  const { id: recipeId } = useParams()
  const navigate = useNavigate()

  const {
    data: recipe,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(String(recipeId)),
  })

  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  function handleEdit() {
    navigate('edit')
  }

  function handleDelete() {
    alert('Coming soon')
  }

  return (
    <>
      <div className="m-container">
        <h2>{recipe.name}</h2>
      </div>
      <div className="m-container">
        <div className={styles['recipe-info']}>

          {recipe.servings && 
            <p>
              <span className="emphasis">Serves: </span>{recipe.servings}
            </p>
          }
          {recipe.prepTime && 
            <p>
              <span className="emphasis">Preparation Time: </span>{recipe.prepTime}
            </p>
          }
          {recipe.cookTime && 
            <p>
              <span className="emphasis">Cooking Time: </span>{recipe.cookTime}
            </p>
          }
        </div>
        <div className={styles['ingredient-list']}>
          <h3>Ingredients:</h3>
          {recipe.ingredients.map((ingredient) => (
            <ul key={ingredient.name}>
              <li>
                {ingredient.amount} {ingredient.name}{' '}
                {ingredient.notes && `(${ingredient.notes})`}
              </li>
            </ul>
          ))}
        </div>

        <div className={styles['steps-container']}>
          <h3 className='left-align'>
            Instructions
          </h3>
            {recipe.steps.map((step) => (
              <p key={step.stepOrder}>
                <span className="emphasis">{step.stepOrder}. </span>
                {step.description}
              </p>
            ))}
        </div>
        <div className={styles['recipe-info']}>
          <p>
            <span className="emphasis">Author:</span>{' '}
            {recipe.author ? recipe.author : '-'}
          </p>
          <p>
            <span className="emphasis">Source:</span>{' '}
            {recipe.source ? recipe.source : '-'}
          </p>
        </div>
        <button onClick={handleEdit}>Edit this recipe</button>
        <button onClick={handleDelete}>Delete this recipe</button>
      </div>
    </>
  )
}
