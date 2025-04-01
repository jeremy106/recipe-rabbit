import useAddRecipeForm from '../hooks/useAddRecipeForm'
import styles from '../styles/RecipeForms.module.scss'
import RemoveButton from './RemoveButton'

export default function AddRecipeForm() {

  const {
    recipe,
    handleInputChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    handleStepChange,
    addStep,
    removeStep,
    handleSubmit,
    handleKeyDown
  } = useAddRecipeForm()

  return (
    <>
    <div className="m-container">
      <form className={styles['form-body']} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {/* <h3>Recipe Information</h3> */}

        <div className={styles['recipe-info']}>
          <label htmlFor="name">
            Recipe Name:
          </label>
          <input
            name="name"
            id="name"
            value={recipe.name}
            onChange={handleInputChange}
            required
            placeholder="My new recipe" 
            />
        </div>
        
        <h3>Ingredients</h3>
          {
            recipe.ingredients.map((ingredient, index) => (
              <div key={index} className={styles['item-row']}>
                <input type="text" name="name" placeholder="Name" value={ingredient.name} onChange={(e) => handleIngredientChange(e, index)} />
                <input type="text" name="amount" placeholder="Amount (e.g. 100g)" value={ingredient.amount} onChange={(e) => handleIngredientChange(e, index)} />
                <input type="text" name="notes" placeholder="Notes (e.g. finely chopped)" value={ingredient.notes} onChange={(e) => handleIngredientChange(e, index)} />
                <RemoveButton onClick={() => removeIngredient(index)}></RemoveButton>
              </div>
            ))
          }
        <button type="button" onClick={addIngredient}>Add Ingredient</button>

        <h3>Instructions</h3>
          {
            recipe.steps.map((step, index) => (
              <div key={index} className={styles['item-row']}>
                <textarea name="description" placeholder="Add intstructions step by step" value={step.description} onChange={(e) => handleStepChange(e, index)} />
                <RemoveButton onClick={() => removeStep(index)}></RemoveButton>
              </div>
            ))
          }
        <button type="button" onClick={addStep}>Add Step</button>

        <div className={styles['recipe-info-container']}>
          <h3>Recipe Information (show/hide)</h3>
          <div className={styles['recipe-info']}>
            <label htmlFor="author">
              Recipe Author:
            </label>
            <input
              name="author"
              id="author"
              value={recipe.author}
              onChange={handleInputChange}
              placeholder="Who created this recipe?"
              />
          </div>
          <div className={styles['recipe-info']}>
            <label htmlFor="source">
              Source:
            </label>
            <input
              name="source"
              id="source"
              value={recipe.source}
              onChange={handleInputChange}
              placeholder="Where did you find this recipe?"
              />
          </div>
          <div className={styles['recipe-info']}>
            <label htmlFor="prepTime">
              Time to prepare:
            </label>
            <input
              name="prepTime"
              id="prepTime"
              value={recipe.prepTime}
              onChange={handleInputChange}
              placeholder="e.g. 10 min"
              />
          </div>
          <div className={styles['recipe-info']}>
            <label htmlFor="cookTime">
              Time to cook:
            </label>
            <input
              name="cookTime"
              id="cookTime"
              value={recipe.cookTime}
              onChange={handleInputChange}
              placeholder="e.g. 90 min"
              />
          </div>
        </div>

        <div className={styles['submit']}>
          <button type="submit" className='button-primary'>Save recipe</button>
        </div>
      </form>
    </div>
    </>
  )
}

