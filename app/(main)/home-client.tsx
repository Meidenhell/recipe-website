'use client'

import { motion } from 'framer-motion'
import CategorySection from '@/components/category-section'
import { Category } from '@/lib/types'

const CATEGORY_NAMES: Record<Category, string> = {
    завтрак: 'Завтраки',
    обед: 'Обеды',
    ужин: 'Ужины',
    перекусы: 'Перекусы',
}

interface HomeClientProps {
    categories: Category[]
    recipesByCategory: Record<Category, any[]>
}

export default function HomeClient({ categories, recipesByCategory }: HomeClientProps) {
    return (
        <main className="min-h-screen bg-white">
            {/* Фон */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#fbceb1]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#fbceb1]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 py-20 z-10">
                {/* Заголовок */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        Книга Рецептов
                    </h1>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#fbceb1] to-transparent mb-6"></div>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl" style={{ fontFamily: 'Lora, serif' }}>
                        Лучшие рецепты на каждый день. Откройте мир кулинарного искусства с нашей коллекцией проверенных рецептов.
                    </p>
                </motion.div>

                {/* Секции категорий */}
                <motion.div
                    className="space-y-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '100px' }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                    {CATEGORY_NAMES[category]}
                                </h2>
                                <div className="w-16 h-px bg-[#fbceb1]"></div>
                            </div>

                            <CategorySection
                                category={category}
                                recipes={recipesByCategory[category]}
                            />

                            {idx < categories.length - 1 && (
                                <div className="mt-16 pt-16 border-t border-[#f5e6d3]"></div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    )
}
