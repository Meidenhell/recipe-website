'use client'

import RecipeForm from '@/components/recipe-form'
import { getRecipe } from '@/app/actions/recipe-actions'
import { Recipe } from '@/lib/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function EditRecipePage({ params }: { params: { id: string } }) {
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadRecipe() {
            try {
                const data = await getRecipe(params.id)
                setRecipe(data)
            } finally {
                setLoading(false)
            }
        }
        loadRecipe()
    }, [params.id])

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
                ← Назад
            </Link>
            {loading ? (
                <p className="text-center text-gray-500">Загрузка...</p>
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