'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const SUPABASE_URL =
    'https://voqpgtfsfwbcjgytxudo.supabase.co/storage/v1/object/public/recipe-images'

interface Ingredient {
    name: string
    amount: string
    unit: string
}

interface Recipe {
    id: string
    title: string
    description?: string
    image_url: string
    ingredients: Ingredient[]
    cooking_time?: number
    difficulty_name?: string
    rating?: number
    category: string
}

interface RecipeCardProps {
    recipe: Recipe | null | undefined
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    if (!recipe) {
        return null
    }

    const imageSrc = recipe.image_url
        ? recipe.image_url.startsWith('http')
            ? recipe.image_url
            : `${SUPABASE_URL}/${recipe.image_url}`
        : '/placeholder.jpg'

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="h-full"
        >
            <Link
                href={`/${encodeURIComponent(recipe.category)}`}
                className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-[#f5e6d3] hover:border-[#fbceb1] hover:shadow-lg transition-all duration-300 group"
            >
                {/* Изображение */}
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={recipe.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        quality={80}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3C/svg%3E"
                    />
                </div>

                {/* Контент */}
                <div className="flex flex-col flex-1 p-5">
                    {/* Заголовок */}
                    <h3
                        className="text-xl font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-[#fbceb1] transition-colors"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        {recipe.title}
                    </h3>

                    {/* Описание */}
                    {recipe.description && (
                        <p
                            className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed"
                            style={{ fontFamily: 'Lora, serif' }}
                        >
                            {recipe.description}
                        </p>
                    )}

                    {/* Информация */}
                    <div className="flex-1"></div>
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#f5e6d3]">
                        {recipe.cooking_time && (
                            <div className="flex items-center gap-1.5 text-xs">
                                <span>⏱</span>
                                <span className="text-gray-700 font-medium" style={{ fontFamily: 'Lora, serif' }}>
                                    {recipe.cooking_time} мин
                                </span>
                            </div>
                        )}

                        {recipe.difficulty_name && (
                            <div className="flex items-center gap-1.5 text-xs">
                                <span>🥣</span>
                                <span className="text-gray-700 font-medium" style={{ fontFamily: 'Lora, serif' }}>
                                    {recipe.difficulty_name}
                                </span>
                            </div>
                        )}

                        {recipe.rating && (
                            <div className="flex items-center gap-1.5 text-xs ml-auto">
                                <span className="text-[#fbceb1]">★</span>
                                <span className="text-gray-700 font-medium" style={{ fontFamily: 'Lora, serif' }}>
                                    {recipe.rating}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
