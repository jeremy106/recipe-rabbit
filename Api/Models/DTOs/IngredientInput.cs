namespace RecipeRabbit.Models.DTOs;

public class IngredientInputDto
{
  public required string Name { get; set; }
  public required string Amount { get; set; }
  public string? Notes { get; set; }
}