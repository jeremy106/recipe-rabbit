namespace RecipeRabbit.Models.DTOs;

public class RecipeDto
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public List<IngredientDto> Ingredients { get; set; } = new();
  public List<StepDto> Steps { get; set; } = new();
}

