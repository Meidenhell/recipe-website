'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChefHat, Clock, Flame } from 'lucide-react'
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
                    {categories.map((category, idx) => {
                        const allRecipes = recipesByCategory[category] || []
                        // Берём первые 3 (уже отобраны на сервере) - БЕЗ random
                        const displayRecipes = allRecipes.slice(0, 3)

                        return (
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

                                {/* 3 рецепта в сетке */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {displayRecipes.map((recipe) => (
                                        <motion.div
                                            key={recipe.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                                        >
                                            {/* Картинка */}
                                            <div className="bg-gray-100 h-64 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                                {recipe.image_url ? (
                                                    <img
                                                        src={recipe.image_url}
                                                        alt={recipe.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none'
                                                            e.currentTarget.parentElement!.innerHTML = '<svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'
                                                        }}
                                                    />
                                                ) : (
                                                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {recipe.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {recipe.description}
                                            </p>

                                            {/* Информация */}
                                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{(recipe.prep_time || 0) + (recipe.cook_time || 0)} мин</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Flame className="w-4 h-4" />
                                                    <span>{recipe.calories} ккал</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Кнопка на раздел */}
                                <Link href={`/${category}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-[#fbceb1] hover:bg-[#f5a76a] text-gray-900 font-semibold py-3 rounded-lg transition-colors"
                                    >
                                        Смотреть все рецепты
                                    </motion.button>
                                </Link>

                                {idx < categories.length - 1 && (
                                    <div className="mt-16 pt-16 border-t border-[#f5e6d3]"></div>
                                )}
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </main>
    )
}