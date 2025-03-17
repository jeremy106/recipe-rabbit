namespace RecipeRabbit.Models.DTOs;

public class IngredientDto
{
  public required int Id { get; set; }
  public required string Name { get; set; }
  public required string Amount { get; set; }
  public required string Unit { get; set; }
}

