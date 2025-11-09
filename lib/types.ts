export type Category = 'завтрак' | 'обед' | 'ужин' | 'перекусы'

export interface Ingredient {
    name: string
    amount: string
    unit: string
}

export interface Step {
    step_number: number
    description: string
}

export interface Recipe {
    id: string
    title: string
    description: string
    category: Category
    image_url: string | null
    difficulty: number
    prep_time: number
    cook_time: number
    servings: number
    calories: number
    cost: number
    ingredients: Ingredient[]
    steps: Step[]
    is_featured: boolean
    created_at: string
    updated_at: string
}

export interface RecipeFilters {
    difficulty?: number[]
    prep_time?: { min: number; max: number }
    cost?: number[]
    calories?: { min: number; max: number }
    search?: string
}