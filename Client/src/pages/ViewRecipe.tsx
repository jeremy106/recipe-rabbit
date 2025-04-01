import { useNavigate, useParams } from 'react-router-dom'
import { useRecipe } from '../hooks/useRecipe'

import styles from '../styles/ViewRecipe.module.scss'
import React from 'react'

export default function ViewRecipe() {
  const { id: recipeId } = useParams()
  const navigate = useNavigate()
  const { 
    recipe,
    deleteRecipe
   } = useRecipe(String(recipeId))

  if (recipe.isPending) {
    return <p>Loading</p>
  }

  if (recipe.isError) {
    return <p>Error</p>
  }

  function handleEdit() {
    navigate('edit')
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    
    if (deleteRecipe.isPending) {
      return
    }
    await deleteRecipe.mutateAsync()

    navigate('/')
  }

  return (
    <>
      <div className="m-container">
        <h2>{recipe.data.name}</h2>
      </div>
      <div className="m-container">
        <div className={styles['recipe-info']}>

          {recipe.data.servings && 
            <p>
              <span className="emphasis">Serves: </span>{recipe.data.servings}
            </p>
          }
          {recipe.data.prepTime && 
            <p>
              <span className="emphasis">Preparation Time: </span>{recipe.data.prepTime}
            </p>
          }
          {recipe.data.cookTime && 
            <p>
              <span className="emphasis">Cooking Time: </span>{recipe.data.cookTime}
            </p>
          }
        </div>
        <div className={styles['ingredient-list']}>
          <h3>Ingredients:</h3>
          <ul>
          {recipe.data.ingredients.map((ingredient) => (
              <li key={ingredient.name}>
                {ingredient.amount} {ingredient.name}{' '}
                {ingredient.notes && `(${ingredient.notes})`}
              </li>
          ))}
          </ul>
        </div>

        <div className={styles['steps-container']}>
          <h3 className='left-align'>
            Instructions
          </h3>
            {recipe.data.steps.map((step) => (
              <p key={step.stepOrder}>
                <span className="emphasis">{step.stepOrder}. </span>
                {step.description}
              </p>
            ))}
        </div>
        <div className={styles['recipe-info']}>
          <p>
            <span className="emphasis">Author:</span>{' '}
            {recipe.data.author ? recipe.data.author : '-'}
          </p>
          <p>
            <span className="emphasis">Source:</span>{' '}
            {recipe.data.source ? recipe.data.source : '-'}
          </p>
        </div>
        <div className={styles['button-container']}>
          <button className="button-primary" onClick={handleEdit}>Edit this recipe</button>
          <button className="button-primary" onClick={(e) => handleDelete(e)}>Delete this recipe</button>
        </div>
      </div>
    </>
  )
}
