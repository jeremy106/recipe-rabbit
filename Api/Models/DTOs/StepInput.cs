using System.ComponentModel;

namespace RecipeRabbit.Models.DTOs;

public class StepInputDto
{
  public int StepOrder { get; set; }
  public required string Description { get; set; }
}