using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Rpc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeRabbit.Models;
using RecipeRabbit.Models.DTOs;
using RecipeRabbit.Services;

namespace recipe_rabbit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeContext db;
        private readonly IRecipeService _recipeService;

        public RecipeController(RecipeContext context, IRecipeService recipeService)
        {
            db = context;
            _recipeService = recipeService;
        }

        // GET: api/Recipe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            var recipes = await db.Recipes
              .Include(r => r.Steps)
              .Include(r => r.RecipeIngredients)
              .ThenInclude(ri => ri.Ingredient)
              .ToListAsync();
            
            var recipeDtos = recipes.Select(r => new RecipeDto
            {
              Id = r.Id,
              Name = r.Name,
              Steps = r.Steps
                .Select(s => new StepDto
                {
                  Index = s.Index,
                  Description = s.Description
                }).ToList(),
              Ingredients = r.RecipeIngredients
                .Select(ri => new IngredientDto
                {
                  Name = ri.Ingredient?.Name,
                  Amount = ri.Amount,
                }).ToList()
              }).ToList();

            return Ok(recipeDtos);
        }

        // GET: api/Recipe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await db.Recipes
              .Where(r => r.Id == id)
              .Include(r => r.Steps)
              .Include(r => r.RecipeIngredients)
              .ThenInclude(ri => ri.Ingredient)
              .FirstOrDefaultAsync();

            if (recipe == null)
            {
                return NotFound();
            }

            var recipeDto = new RecipeDto 
            {
              Id = recipe.Id,
              Name = recipe.Name,
              Steps = recipe.Steps
                .Select(s => new StepDto
                {
                  Index = s.Index,
                  Description = s.Description
                }).ToList(),
              Ingredients = recipe.RecipeIngredients
                .Select(ri => new IngredientDto
                {
                  Name = ri.Ingredient?.Name,
                  Amount = ri.Amount
                }).ToList()
            };

            return Ok(recipeDto);
        }

        // POST: api/Recipe
        [HttpPost]
        public async Task<IActionResult> CreateRecipe([FromBody] RecipeInputDto recipeInput)
        {
          if (recipeInput == null)
          {
            return BadRequest("Recipe data is invalid");
          }

          try
          {
              var createdRecipe = await _recipeService.CreateRecipe(recipeInput);
              return CreatedAtAction(nameof(GetRecipe), new { id = createdRecipe.Id }, createdRecipe);
          }
          catch
          {
              // Log the exception
              return StatusCode(500, "An error occurred while creating the recipe.");
          }

        }

        // DELETE: api/Recipe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await db.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            db.Recipes.Remove(recipe);
            await db.SaveChangesAsync();

            return NoContent();
        }

        // // PUT: api/Recipe/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        // {
        //     if (id != recipe.Id)
        //     {
        //         return BadRequest();
        //     }

        //     db.Entry(recipe).State = EntityState.Modified;

        //     try
        //     {
        //         await db.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!RecipeExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // POST: api/Recipe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Recipe>> CreateRecipe(Recipe recipe)
        // {
        //     db.Recipes.Add(recipe);
        //     await db.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
        // }



        private bool RecipeExists(int id)
        {
            return db.Recipes.Any(e => e.Id == id);
        }
    }
}
