'use client'

import RecipeForm from '@/components/recipe-form'
import { getRecipe } from '@/app/actions/recipe-actions'
import { Recipe } from '@/lib/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function EditRecipePage() {
    const params = useParams()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadRecipe() {
            try {
                setLoading(true)
                setError(null)

                const id = params?.id as string
                console.log('Загружаю рецепт с ID:', id)

                if (!id) {
                    setError('ID рецепта не найден')
                    return
                }

                const data = await getRecipe(id)
                console.log('Получен рецепт:', data)

                if (data) {
                    setRecipe(data)
                } else {
                    setError('Рецепт не найден на сервере')
                }
            } catch (err) {
                console.error('Ошибка загрузки:', err)
                setError('Ошибка при загрузке рецепта')
            } finally {
                setLoading(false)
            }
        }

        if (params?.id) {
            loadRecipe()
        }
    }, [params?.id])

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
                ← Назад
            </Link>

            {loading ? (
                <p className="text-center text-gray-500">Загрузка...</p>
            ) : error ? (
                <div className="p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
                    <p>{error}</p>
                    <p className="text-xs mt-2">ID: {params?.id}</p>
                </div>
            ) : recipe ? (
                <>
                    <h1 className="text-3xl font-bold mb-8">Редактировать рецепт</h1>
                    <RecipeForm recipe={recipe} />
                </>
            ) : (
                <p className="text-center text-gray-500">Рецепт не найден</p>
            )}
        </div>
    )
}
