namespace RecipeRabbit.Models.DTOs;

public class RecipeDto
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public string? Author { get; set; }
  public string? Source { get; set; }
  public string? Servings { get; set; }
  public DateTime DateAddedUtc { get; set; }
  public List<IngredientDto> Ingredients { get; set; } = new();
  public List<StepDto> Steps { get; set; } = new();
}

