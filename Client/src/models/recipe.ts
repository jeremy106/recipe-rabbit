import { Ingredient } from "./ingredient"
import { Step } from "./step"

// Data transfer
export interface RecipeSummaryData {
  name: string
  servings?: string
  author?: string
  source?: string
  prepTime?: string
  cookTime?: string
}

export interface RecipeData extends RecipeSummaryData {
  steps: Step[]
  ingredients: Ingredient[]
}

// Complete models
export interface RecipeSummary extends RecipeSummaryData {
  id: number
  dateAddedUtc: string
}

export interface Recipe extends RecipeSummary {
  steps: Step[]
  ingredients: Ingredient[]
}

