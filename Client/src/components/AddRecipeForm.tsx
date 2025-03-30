import useAddRecipeForm from "../hooks/useAddRecipeForm"

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
    handleSubmit
  } = useAddRecipeForm()

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h3>Recipe Information</h3>
      <div>
        <label htmlFor="name">
          Name:
        </label>
        <input
          name="name"
          id="name"
          value={recipe.name}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label htmlFor="author">
          Author:
        </label>
        <input
          name="author"
          id="author"
          value={recipe.author}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label htmlFor="source">
          Source:
        </label>
        <input
          name="source"
          id="source"
          value={recipe.source}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label htmlFor="prepTime">
          Time to prepare:
        </label>
        <input
          name="prepTime"
          id="prepTime"
          value={recipe.prepTime}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label htmlFor="cookTime">
          Time to cook:
        </label>
        <input
          name="cookTime"
          id="cookTime"
          value={recipe.cookTime}
          onChange={handleInputChange}
          />
      </div>
      
      <h3>Ingredients</h3>
        {
          recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input type="text" name="name" placeholder="Name" value={ingredient.name} onChange={(e) => handleIngredientChange(e, index)} />
              <input type="text" name="amount" placeholder="Amount" value={ingredient.amount} onChange={(e) => handleIngredientChange(e, index)} />
              <input type="text" name="notes" placeholder="Notes" value={ingredient.notes} onChange={(e) => handleIngredientChange(e, index)} />
              <button type="button" onClick={() => removeIngredient(index)}>Remove Ingredient</button>
            </div>
          ))
        }
        <button type="button" onClick={addIngredient}>Add Ingredient</button>

      <h3>Steps</h3>
        {
          recipe.steps.map((step, index) => (
            <div key={index}>
              <input type="text" name="description" placeholder="Name" value={step.description} onChange={(e) => handleStepChange(e, index)} />
              <button type="button" onClick={() => removeStep(index)}>Remove Step</button>
            </div>
          ))
        }
        <button type="button" onClick={addStep}>Add Step</button>
      
      <div>
        <button type="submit">Save recipe</button>
      </div>
    </form>
    </>
  )
}

