'use client'

import { useSearchParams } from 'next/navigation'
import { getRecipesByCategory } from '@/app/actions/recipe-actions'
import RecipeCard from '@/components/recipe-card'
import { Category } from '@/lib/types'
import { useEffect, useState } from 'react'

export default function CategoryPage({ params }: { params: { category: string } }) {
    const searchParams = useSearchParams()
    const [recipes, setRecipes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const category = (params.category as Category) || 'завтрак'
    const sortBy = searchParams.get('sort') || 'created_at'
    const difficulty = searchParams.get('difficulty')

    useEffect(() => {
        async function loadRecipes() {
            const filters = difficulty ? { difficulty: [parseInt(difficulty)] } : undefined
            const data = await getRecipesByCategory(category, filters, sortBy)
            setRecipes(data)
            setLoading(false)
        }
        loadRecipes()
    }, [category, sortBy, difficulty])

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 capitalize">{category}</h1>

            <div className="flex gap-4 mb-8">
                <select
                    defaultValue={sortBy}
                    onChange={(e) => {
                        const url = new URL(window.location.href)
                        url.searchParams.set('sort', e.target.value)
                        window.history.pushState({}, '', url)
                        window.location.reload()
                    }}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="created_at">По дате</option>
                    <option value="fastest">Самые быстрые</option>
                    <option value="cheapest">Самые дешевые</option>
                    <option value="popular">Популярные</option>
                </select>

                <select
                    defaultValue=""
                    onChange={(e) => {
                        const url = new URL(window.location.href)
                        if (e.target.value) {
                            url.searchParams.set('difficulty', e.target.value)
                        } else {
                            url.searchParams.delete('difficulty')
                        }
                        window.history.pushState({}, '', url)
                        window.location.reload()
                    }}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="">Все уровни сложности</option>
                    <option value="1">Легко</option>
                    <option value="2">Среднее</option>
                    <option value="3">Сложно</option>
                </select>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Загрузка...</p>
            ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Нет рецептов в этой категории</p>
            )}
        </div>
    )
}