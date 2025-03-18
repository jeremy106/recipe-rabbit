namespace RecipeRabbit.Models.DTOs;

public class RecipeSummaryDto
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public string? Author { get; set; }
  public string? Source { get; set; }
  public string? Servings { get; set; }
  public DateTime DateAddedUtc { get; set; }
}