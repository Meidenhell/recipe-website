import HomeClient from './home-client'
import { getFeaturedRecipes } from '@/app/actions/recipe-actions'
import { Category } from '@/lib/types'

export default async function Home() {
    try {
        const recipes = await getFeaturedRecipes()

        const categories: Category[] = ['завтрак', 'обед', 'ужин', 'перекусы']
        const recipesByCategory = categories.reduce(
            (acc, cat) => {
                acc[cat] = recipes
                    .filter((r) => r?.category === cat)
                    .slice(0, 6)
                    .filter(Boolean)
                return acc
            },
            {} as Record<Category, any[]>
        )

        return <HomeClient categories={categories} recipesByCategory={recipesByCategory} />
    } catch (error) {
        console.error('Error loading recipes:', error)
        return (
            <main className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-4 py-20">
                    <h1 className="text-4xl font-bold text-gray-900">Ошибка загрузки</h1>
                    <p className="text-gray-600 mt-4">Не удалось загрузить рецепты. Попробуйте позже.</p>
                </div>
            </main>
        )
    }
}
