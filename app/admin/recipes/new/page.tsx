import RecipeForm from '@/components/recipe-form'
import Link from 'next/link'

export default function NewRecipePage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
                ← Назад
            </Link>
            <h1 className="text-3xl font-bold mb-8">Добавить новый рецепт</h1>
            <RecipeForm />
        </div>
    )
}