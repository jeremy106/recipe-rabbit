using Microsoft.EntityFrameworkCore;

namespace RecipeRabbit.Models;

public class RecipeContext : DbContext
{
  public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) {}
  public DbSet<Recipe> Recipes { get; set; } = null!;

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder); 

    // Many to many relationship
    modelBuilder.Entity<RecipeIngredient>()
      .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

    modelBuilder.Entity<RecipeIngredient>()
        .HasOne(ri => ri.Recipe)
        .WithMany(r => r.RecipeIngredients)
        .HasForeignKey(ri => ri.RecipeId);

    modelBuilder.Entity<RecipeIngredient>()
        .HasOne(ri => ri.Ingredient)
        .WithMany()
        .HasForeignKey(ri => ri.IngredientId);


    // Seed data
    modelBuilder.Entity<Recipe>().HasData(
      new Recipe { Id = 1, Name = "Mac 'n' Cheese", Instructions = "Cook mac, then add cheese"}
    );

    modelBuilder.Entity<Ingredient>().HasData(
      new Ingredient { Id = 1, Name = "Macaroni"},
      new Ingredient { Id = 2, Name = "Cheese"}
    );

    // modelBuilder.Entity<RecipeIngredient>().HasData(
    //   new RecipeIngredient { RecipeId = 1, IngredientId = 1, Amount = "500", Unit = "g", Recipe = new Recipe { Id = 1 }, Ingredient = new Ingredient { Id = 1 , Name = "Macaroni"}},
    //   new RecipeIngredient { RecipeId = 1, IngredientId = 2, Amount = "1.5", Unit = "cups", Recipe = new Recipe { Id = 1 }, Ingredient = new Ingredient { Id = 2, Name = "Cheese" }}
    // );

    modelBuilder.Entity<RecipeIngredient>().HasData(
      new RecipeIngredient { 
        RecipeId = 1, 
        IngredientId = 1, 
        Amount = "500", 
        Unit = "g"
        },
      new RecipeIngredient { 
        RecipeId = 1, 
        IngredientId = 2, 
        Amount = "1.5", 
        Unit = "cups"
        }
    );
  }
}