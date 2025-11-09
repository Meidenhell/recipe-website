import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and key are required')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Загрузка изображения в Storage
export async function uploadRecipeImage(file: File, recipeName: string) {
    try {
        const filename = `${Date.now()}-${recipeName}.jpg`
        const { data, error } = await supabase.storage
            .from('recipe-images')
            .upload(filename, file)

        if (error) {
            throw error
        }

        const { data: publicData } = supabase.storage
            .from('recipe-images')
            .getPublicUrl(filename)

        return publicData.publicUrl
    } catch (error) {
        console.error('Error uploading image:', error)
        throw error
    }
}

// Удаление изображения из Storage
export async function deleteRecipeImage(imageUrl: string) {
    try {
        const filename = imageUrl.split('/').pop()
        if (!filename) return

        const { error } = await supabase.storage
            .from('recipe-images')
            .remove([filename])

        if (error) {
            throw error
        }
    } catch (error) {
        console.error('Error deleting image:', error)
    }
}