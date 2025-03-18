export interface RecipeSummary {
  id: number
  name: string
  servings?: string
  author?: string
  dateAddedUtc: string
}

export interface Recipe extends RecipeSummary {
  steps: Step[]
  ingredients: Ingredient[]
}

export interface Step {
  index: number
  description: string
}

export interface Ingredient {
  name: string
  amount: string
  notes?: string
}