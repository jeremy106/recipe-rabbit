namespace RecipeRabbit.Models;

public class Recipe
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public string? Instructions { get; set; }
  public List<RecipeIngredient> RecipeIngredients { get; set; } = new();
}
