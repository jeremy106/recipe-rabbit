namespace RecipeRabbit.Models.DTOs;

public class RecipeInputDto
{
  public required string Name { get; set; }
  public string? Author { get; set; }
  public string? Source { get; set; }
  public string? Servings { get; set; }
  public required List<StepInputDto> Steps { get; set; }
  public required List<IngredientInputDto> Ingredients { get; set; }

}
