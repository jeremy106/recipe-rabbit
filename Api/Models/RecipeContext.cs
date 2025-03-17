using Microsoft.EntityFrameworkCore;

namespace RecipeRabbit.Models;

public class RecipeContext : DbContext
{
  public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) {}
  public DbSet<Recipe> Recipes { get; set; } = null!;

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Recipe>().HasData(
      new Recipe {
        Id = 1,
        Name = "Mac 'n' Cheese",
        Instructions = "Cook mac, then add cheese",
      }
    );
  }
}