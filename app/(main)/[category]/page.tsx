'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { getRecipesByCategory } from '@/app/actions/recipe-actions'
import RecipeCard from '@/components/recipe-card'
import { Category } from '@/lib/types'
import { useEffect, useState } from 'react'

export default function CategoryPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const params = useParams()
    const [recipes, setRecipes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Декодируем параметр категории
    const encodedCategory = params?.category as string
    const category = encodedCategory ? decodeURIComponent(encodedCategory) as Category : 'завтрак'

    const sortBy = searchParams.get('sort') || 'created_at'
    const difficulty = searchParams.get('difficulty')

    useEffect(() => {
        async function loadRecipes() {
            setLoading(true)
            try {
                const filters = difficulty ? { difficulty: [parseInt(difficulty)] } : undefined
                const data = await getRecipesByCategory(category, filters, sortBy)
                setRecipes(data || [])
            } catch (error) {
                console.error('Error loading recipes:', error)
                setRecipes([])
            } finally {
                setLoading(false)
            }
        }
        loadRecipes()
    }, [category, sortBy, difficulty])

    const handleSortChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('sort', value)
        // ✅ Используем encodedCategory или кодируем category
        router.push(`/${encodedCategory}?${newParams.toString()}`)
    }

    const handleDifficultyChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams)
        if (value) {
            newParams.set('difficulty', value)
        } else {
            newParams.delete('difficulty')
        }
        // ✅ Используем encodedCategory или кодируем category
        router.push(`/${encodedCategory}?${newParams.toString()}`)
    }

    const categoryNames = {
        'завтрак': 'Завтраки',
        'обед': 'Обеды',
        'ужин': 'Ужины',
        'перекусы': 'Перекусы'
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-blue-600">
                {categoryNames[category as Category] || category}
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="created_at">По дате</option>
                    <option value="fastest">Самые быстрые</option>
                    <option value="cheapest">Самые дешевые</option>
                    <option value="popular">Популярные</option>
                </select>

                <select
                    value={difficulty || ''}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Все уровни сложности</option>
                    <option value="1">Легко</option>
                    <option value="2">Среднее</option>
                    <option value="3">Сложно</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <p className="text-center text-gray-500">Загрузка рецептов...</p>
                </div>
            ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        Нет рецептов в этой категории с выбранными фильтрами
                    </p>
                </div>
            )}
        </div>
    )
}
