'use client'

import { Recipe } from '@/lib/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getRecipesByCategory } from '@/app/actions/recipe-actions'
import { Trash2, Edit } from 'lucide-react'

export default function AdminPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadRecipes() {
            try {
                const завтрак = await getRecipesByCategory('завтрак')
                const обед = await getRecipesByCategory('обед')
                const ужин = await getRecipesByCategory('ужин')
                const перекусы = await getRecipesByCategory('перекусы')

                setRecipes([...завтрак, ...обед, ...ужин, ...перекусы])
            } finally {
                setLoading(false)
            }
        }
        loadRecipes()
    }, [])

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Админ-панель</h1>
                <Link
                    href="/admin/recipes/new"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    + Добавить рецепт
                </Link>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Загрузка...</p>
            ) : recipes.length > 0 ? (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Название</th>
                            <th className="px-6 py-3 text-left">Категория</th>
                            <th className="px-6 py-3 text-left">Сложность</th>
                            <th className="px-6 py-3 text-left">Время</th>
                            <th className="px-6 py-3 text-left">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">{recipe.title}</td>
                                <td className="px-6 py-4 capitalize">{recipe.category}</td>
                                <td className="px-6 py-4">{recipe.difficulty}/5</td>
                                <td className="px-6 py-4">{recipe.prep_time + recipe.cook_time} мин</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <Link
                                        href={`/admin/recipes/${recipe.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                        <Edit size={18} /> Редактировать
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">Нет рецептов</p>
            )}
        </div>
    )
}