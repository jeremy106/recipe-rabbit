namespace RecipeRabbit.Models;

public class Step 
{
  public int Id { get; set; }
  public int RecipeId { get; set; }
  public int Index { get; set; }
  public required string Description { get; set; }
}