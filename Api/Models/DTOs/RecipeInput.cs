namespace RecipeRabbit.Models.DTOs;

public class RecipeInputDto
{
  public required string Name { get; set; }
  public required List<StepInputDto> Steps { get; set; }
  public required List<IngredientInputDto> Ingredients { get; set; }

}

// public class RecipeInputDto
// {
//   public required string Name { get; set; }
// }