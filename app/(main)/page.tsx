import CategorySection from '@/components/category-section'
import { getFeaturedRecipes } from '@/app/actions/recipe-actions'
import { Category } from '@/lib/types'

export default async function Home() {
    const recipes = await getFeaturedRecipes()

    const categories: Category[] = ['завтрак', 'обед', 'ужин', 'перекусы']
    const recipesByCategory = categories.reduce(
        (acc, cat) => {
            acc[cat] = recipes.filter((r) => r.category === cat).slice(0, 6)
            return acc
        },
        {} as Record<Category, any[]>
    )

    return (
        <>


            <main className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-blue-600">
                        Книга Рецептов
                    </h1>
                    <p className="text-gray-600 text-lg mb-12 italic border border-dashed border-gray-300 p-4">
                        Лучшие рецепты на каждый день
                    </p>

                    {categories.map((category) => (
                        <CategorySection
                            key={category}
                            category={category}
                            recipes={recipesByCategory[category]}
                        />
                    ))}

                </div>
            </main>
        </>
    );

}
