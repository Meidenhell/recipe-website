'use server'

import { supabase } from '@/lib/supabase'
import { Recipe, RecipeFilters, Category } from '@/lib/types'

// Получить топ рецепты по категориям (для главной)
export async function getFeaturedRecipes() {
    try {
        const { data, error } = await supabase
            .from('recipes')
            .select('*')
            // .eq('is_featured', true)
            .limit(24)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data as Recipe[]
    } catch (error) {
        console.error('Error fetching featured recipes:', error)
        return []
    }
}

// Получить все рецепты по категориям
export async function getRecipesByCategory(
    category: Category,
    filters?: RecipeFilters,
    sortBy: string = 'created_at'
) {
    try {
        let query = supabase
            .from('recipes')
            .select('*')
            .eq('category', category)

        // Применить фильтры если есть
        if (filters?.difficulty && filters.difficulty.length > 0) {
            query = query.in('difficulty', filters.difficulty)
        }

        if (filters?.cost && filters.cost.length > 0) {
            query = query.in('cost', filters.cost)
        }

        if (filters?.search) {
            query = query.ilike('title', `%${filters.search}%`)
        }

        // Сортировка
        if (sortBy === 'popular') {
            query = query.order('created_at', { ascending: false })
        } else if (sortBy === 'fastest') {
            query = query.order('prep_time', { ascending: true })
        } else if (sortBy === 'cheapest') {
            query = query.order('cost', { ascending: true })
        } else {
            query = query.order('created_at', { ascending: false })
        }

        const { data, error } = await query

        if (error) throw error
        return data as Recipe[]
    } catch (error) {
        console.error('Error fetching recipes by category:', error)
        return []
    }
}

// Получить один рецепт
export async function getRecipe(id: string) {
    try {
        const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data as Recipe
    } catch (error) {
        console.error('Error fetching recipe:', error)
        return null
    }
}

// Создать новый рецепт
export async function createRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) {
    try {
        const { data, error } = await supabase
            .from('recipes')
            .insert([recipe])
            .select()

        if (error) throw error
        return data[0] as Recipe
    } catch (error) {
        console.error('Error creating recipe:', error)
        throw error
    }
}

// Обновить рецепт
export async function updateRecipe(id: string, recipe: Partial<Recipe>) {
    try {
        const { data, error } = await supabase
            .from('recipes')
            .update(recipe)
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0] as Recipe
    } catch (error) {
        console.error('Error updating recipe:', error)
        throw error
    }
}

// Удалить рецепт
export async function deleteRecipe(id: string) {
    try {
        const { error } = await supabase
            .from('recipes')
            .delete()
            .eq('id', id)

        if (error) throw error
        return true
    } catch (error) {
        console.error('Error deleting recipe:', error)
        throw error
    }
}