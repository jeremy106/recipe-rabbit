using System.Data.Common;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RecipeRabbit.Models;
using RecipeRabbit.Models.DTOs;

namespace RecipeRabbit.Services;

public interface IRecipeService
{
  Task<Recipe> CreateRecipe(RecipeInputDto recipeInput);
}

public class RecipeService : IRecipeService
{
  private readonly RecipeContext db;

  public RecipeService(RecipeContext context)
  {
    db = context;
  }

  public async Task<Recipe> CreateRecipe(RecipeInputDto recipeInput)
  {
    using (var transaction = db.Database.BeginTransaction())
    {
      try
      {
        var recipe = new Recipe
        {
          Name = recipeInput.Name,
          DateAddedUtc = DateTime.Now,
          Author = recipeInput.Author,
          Source = recipeInput.Source,
          Servings = recipeInput.Servings
        };

        db.Recipes.Add(recipe);
        await db.SaveChangesAsync();

        // Add Steps
        foreach (var stepInput in recipeInput.Steps)
        {
          var step = new Step
          {
            Index = stepInput.Index,
            Description = stepInput.Description,
            RecipeId = recipe.Id
          };
          
          db.Steps.Add(step);
          await db.SaveChangesAsync();
        } 

        // Add Ingredients
        foreach (var ingredientInput in recipeInput.Ingredients)
        {
          // What if ingredient already exists?
          var ingredient = await db.Ingredients.FirstOrDefaultAsync(i => i.Name == ingredientInput.Name);
          if(ingredient == null) {
            ingredient = new Ingredient
            {
              Name = ingredientInput.Name
            };

            db.Ingredients.Add(ingredient);
            await db.SaveChangesAsync();
          }

          var recipeIngredient = new RecipeIngredient
          {
            RecipeId = recipe.Id,
            IngredientId = ingredient.Id,
            Amount = ingredientInput.Amount,
            Notes = ingredientInput.Notes
          };

          db.RecipeIngredients.Add(recipeIngredient);
          await db.SaveChangesAsync();


        }

        // Commit changes
        await db.SaveChangesAsync();
        transaction.Commit();
        return recipe;
       
      }
      catch
      {
        transaction.Rollback();
        throw; 
      }
    }
  }
}