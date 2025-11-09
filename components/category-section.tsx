'use client'

import { Recipe } from '@/lib/types'
import RecipeCard from './recipe-card'
import Link from 'next/link'

export default function CategorySection({
                                            category,
                                            recipes,
                                        }: {
    category: string
    recipes: Recipe[]
}) {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold capitalize">{category}</h2>
                <Link
                    href={`/${category}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                    Все рецепты →
                </Link>
            </div>
            {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-8">
                    В этой категории пока нет рецептов
                </p>
            )}
        </section>
    )
}