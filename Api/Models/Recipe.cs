namespace RecipeRabbit.Models;

public class Recipe
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public List<Step> Steps { get; set; } = new();
  public List<RecipeIngredient> RecipeIngredients { get; set; } = new();
}
