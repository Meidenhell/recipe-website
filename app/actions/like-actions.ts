
'use server'

import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

// Получить или создать session ID
async function getSessionId() {
    const cookieStore = cookies()
    let sessionId = cookieStore.get('recipe_session_id')?.value

    if (!sessionId) {
        sessionId = uuidv4()
        cookieStore.set('recipe_session_id', sessionId, {
            maxAge: 60 * 60 * 24 * 365, // 1 год
            httpOnly: true,
        })
    }

    return sessionId
}

// Переключить лайк (добавить или удалить)
export async function toggleLike(recipeId: string) {
    try {
        const sessionId = await getSessionId()

        // Проверить есть ли уже лайк
        const { data: existingLike } = await supabase
            .from('recipe_likes')
            .select('id')
            .eq('recipe_id', recipeId)
            .eq('session_id', sessionId)
            .single()

        if (existingLike) {
            // Если есть - удалить
            await supabase
                .from('recipe_likes')
                .delete()
                .eq('recipe_id', recipeId)
                .eq('session_id', sessionId)
            return { liked: false }
        } else {
            // Если нет - добавить
            await supabase.from('recipe_likes').insert([
                {
                    recipe_id: recipeId,
                    session_id: sessionId,
                },
            ])
            return { liked: true }
        }
    } catch (error) {
        console.error('Error toggling like:', error)
        throw error
    }
}

// Получить количество лайков
export async function getLikesCount(recipeId: string) {
    try {
        const { count } = await supabase
            .from('recipe_likes')
            .select('*', { count: 'exact', head: true })
            .eq('recipe_id', recipeId)

        return count || 0
    } catch (error) {
        console.error('Error getting likes count:', error)
        return 0
    }
}

// Проверить понравился ли рецепт текущему пользователю
export async function hasUserLiked(recipeId: string) {
    try {
        const sessionId = await getSessionId()

        const { data } = await supabase
            .from('recipe_likes')
            .select('id')
            .eq('recipe_id', recipeId)
            .eq('session_id', sessionId)
            .single()

        return !!data
    } catch (error) {
        console.error('Error checking like:', error)
        return false
    }
}