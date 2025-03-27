using System.ComponentModel;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace RecipeRabbit.Models;

public class RecipeContext : DbContext
{
  public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) {}
  public DbSet<Recipe> Recipes { get; set; } = null!;
  public DbSet<Step> Steps { get; set; } = null!;
  public DbSet<Ingredient> Ingredients { get; set; } = null!;
  public DbSet<RecipeIngredient> RecipeIngredients { get; set; } = null!;

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
      new Recipe { 
        Id = 1, 
        Name = "Mac 'n' Cheese", 
        Author = "Jeremy", 
        Source = "Imagination", 
        Servings = "2", 
        PrepTime = "15 min",
        CookTime = "20 min",
        DateAddedUtc = new DateTime(2025, 3, 1)}
    );

    modelBuilder.Entity<Ingredient>().HasData(
      new Ingredient { Id = 1, Name = "Macaroni"},
      new Ingredient { Id = 2, Name = "Cheese"}
    );

    modelBuilder.Entity<RecipeIngredient>().HasData(
      new RecipeIngredient { 
        RecipeId = 1, 
        IngredientId = 1, 
        Amount = "500g", 
        Notes = "Tasty cheese is yummiest"
        },
      new RecipeIngredient { 
        RecipeId = 1, 
        IngredientId = 2, 
        Amount = "1.5 cups", 
        }
    );

    modelBuilder.Entity<Step>().HasData(
      new Step {
        Id = 1,
        RecipeId = 1,
        StepOrder = 0, 
        Description = "Cook macaroni"
      },
      new Step {
        Id = 2,
        RecipeId = 1,
        StepOrder = 1, 
        Description = "Add Cheese"
      }
    );
  }
}