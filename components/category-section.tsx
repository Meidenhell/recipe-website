'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import RecipeCard from '@/components/recipe-card'
import { Category } from '@/lib/types'

interface CategorySectionProps {
    category: Category
    recipes: any[]
}

export default function CategorySection({ category, recipes }: CategorySectionProps) {
    if (!recipes || recipes.length === 0) {
        return null
    }

    const categoryNames: Record<Category, string> = {
        завтрак: 'Завтраки',
        обед: 'Обеды',
        ужин: 'Ужины',
        перекусы: 'Перекусы',
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Сетка рецептов */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
                layout
            >
                {recipes.map((recipe, idx) => (
                    <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                        className="h-full"
                    >
                        <RecipeCard recipe={recipe} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Ссылка на все рецепты */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
            >
                <Link
                    href={`/${encodeURIComponent(category)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#fbceb1] text-gray-900 font-semibold rounded-lg hover:bg-[#fbceb1] hover:text-gray-800 transition-all hover:shadow-md"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                    Все {categoryNames[category].toLowerCase()}
                    <span>→</span>
                </Link>
            </motion.div>
        </motion.div>
    )
}
