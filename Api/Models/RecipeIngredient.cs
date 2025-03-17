using System.Text.Json.Serialization;

namespace RecipeRabbit.Models;

public class RecipeIngredient {
  public int RecipeId { get; set; }
  [JsonIgnore]
  public Recipe? Recipe { get; set ;}
  public int IngredientId { get; set; }
  public  Ingredient? Ingredient { get; set; }
  public required string Amount { get; set; }
  public required string Unit { get; set; }
  public string? Notes { get; set; }
}