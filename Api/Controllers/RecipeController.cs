using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeRabbit.Models;
using RecipeRabbit.Models.DTOs;

namespace recipe_rabbit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeContext db;

        public RecipeController(RecipeContext context)
        {
            db = context;
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
                  Id = ri.IngredientId,
                  Name = ri.Ingredient.Name,
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
                  Id = ri.IngredientId,
                  Name = ri.Ingredient.Name,
                  Amount = ri.Amount
                }).ToList()
            };

            return Ok(recipeDto);
        }

        // PUT: api/Recipe/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            db.Entry(recipe).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Recipe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            db.Recipes.Add(recipe);
            await db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
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

        private bool RecipeExists(int id)
        {
            return db.Recipes.Any(e => e.Id == id);
        }
    }
}
