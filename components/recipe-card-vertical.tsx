'use client'

import Image from 'next/image'
import {motion} from 'framer-motion'
import {Clock, ChefHat, Users, Flame, DollarSign, Star} from 'lucide-react'

const SUPABASE_URL =
    'https://voqpgtfsfwbcjgytxudo.supabase.co/storage/v1/object/public/recipe-images'

interface Ingredient {
    name: string
    amount: string
    unit: string
}

interface Step {
    description: string
    step_number: number
}

interface Recipe {
    title: string
    description?: string
    image_url: string
    ingredients: Ingredient[]
    steps: Step[]
    cooking_time?: number
    prep_time?: number
    difficulty_name?: string
    rating?: number
    servings?: number
    calories?: number
    cost?: number
}

interface RecipeCardVerticalProps {
    recipe: Recipe
    index: number
}

export default function RecipeCardVerticalStyle2({recipe, index}: RecipeCardVerticalProps) {
    const imageSrc = recipe.image_url
        ? recipe.image_url.startsWith('http')
            ? recipe.image_url
            : `${SUPABASE_URL}/${recipe.image_url}`
        : '/placeholder.jpg'

    const isEven = index % 2 === 0
    const shouldPrioritize = index < 3
    const totalTime = (recipe.prep_time || 0) + (recipe.cooking_time || 0)

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '100px'}}
            transition={{duration: 0.5, ease: 'easeOut'}}
            className="w-full"
        >
            <div className="pb-12">
                <div
                    className={`flex flex-col ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } gap-8 md:gap-12`}
                >
                    {/* Изображение */}
                    <motion.div
                        className="w-full md:w-5/12 h-80 md:h-96 relative flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm"
                        whileHover={{scale: 1.02}}
                        transition={{duration: 0.3}}
                    >
                        <Image
                            src={imageSrc}
                            alt={recipe.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 50vw"
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            priority={shouldPrioritize}
                            quality={85}
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3C/svg%3E"
                        />
                    </motion.div>

                    {/* Контент */}
                    <motion.div
                        className="w-full md:w-7/12 flex flex-col justify-between"
                        initial={{opacity: 0, x: isEven ? 20 : -20}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                    >
                        {/* Название и описание */}
                        <div className="mb-6">
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 leading-tight"
                                style={{fontFamily: 'Cormorant Garamond, serif'}}
                                initial={{opacity: 0}}
                                whileInView={{opacity: 1}}
                                transition={{duration: 0.5, delay: 0.2}}
                            >
                                {recipe.title}
                            </motion.h2>

                            {recipe.description && (
                                <p className="text-base text-gray-600 leading-relaxed italic mb-4"
                                   style={{fontFamily: 'Lora, serif'}}>
                                    {recipe.description}
                                </p>
                            )}

                            {/* Все данные в одной строке под описанием */}
                            <motion.div
                                className="flex flex-wrap items-center gap-4 pt-4 pb-4 border-t border-b border-[#f5e6d3]"
                                initial={{opacity: 0}}
                                whileInView={{opacity: 1}}
                                transition={{duration: 0.5, delay: 0.3}}
                            >
                                {totalTime > 0 && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock size={18} className="text-gray-700"/>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
                                            {totalTime} мин
                                        </span>
                                    </div>
                                )}

                                {recipe.prep_time && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <ChefHat size={18} className="text-gray-700"/>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
                                            {recipe.prep_time} подг.
                                        </span>
                                    </div>
                                )}

                                {recipe.cooking_time && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Flame size={18} className="text-gray-700"/>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
                                            {recipe.cooking_time} готовки
                                        </span>
                                    </div>
                                )}

                                {recipe.servings && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users size={18} className="text-gray-700"/>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
                                            {recipe.servings} пор.
                                        </span>
                                    </div>
                                )}

                                {recipe.calories && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Flame size={18} className="text-gray-700"/>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
                                            {recipe.calories} ккал
                                        </span>
                                    </div>
                                )}

                                {recipe.cost && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-700 font-medium text-lg">₽</span>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
            {recipe.cost}
                                        </span>
                                    </div>
                                )}

                                {recipe.difficulty_name && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <ChefHat size={18} className="text-gray-700"/>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
                                            {recipe.difficulty_name}
                                        </span>
                                    </div>
                                )}

                                {recipe.rating && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Star size={18} className="text-gray-700"/>
                                        <span className="text-gray-700 font-medium" style={{fontFamily: 'Lora, serif'}}>
                                            {recipe.rating}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Ингредиенты */}
                        {recipe.ingredients?.length > 0 && (
                            <motion.div
                                className="rounded-lg p-5 border border-[#f5e6d3] bg-white shadow-sm"
                                whileHover={{y: -2}}
                            >
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 mb-4"
                                    style={{fontFamily: 'Montserrat, sans-serif'}}>
                                    Ингредиенты
                                </h3>
                                <ul className="space-y-3 text-sm" style={{fontFamily: 'Lora, serif'}}>
                                    {recipe.ingredients.map((item, idx) => (
                                        <li
                                            key={`${recipe.title}-ing-${idx}`}
                                            className="flex justify-between items-center text-gray-700 group hover:text-gray-900 transition-colors"
                                        >
                                            <span className="font-medium">{item.name}</span>
                                            <span
                                                className="text-gray-500 text-xs font-semibold">{item.amount} {item.unit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Раздел приготовления */}
                <motion.div
                    className="pt-4"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.2}}
                >
                    {recipe.steps?.length > 0 && (
                        <motion.div
                            className="rounded-lg p-6 border border-[#f5e6d3] bg-white shadow-sm mb-8"
                            whileHover={{y: -2}}
                        >
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 mb-5"
                                style={{fontFamily: 'Montserrat, sans-serif'}}>
                                Приготовление
                            </h3>
                            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {recipe.steps.map((step, idx) => (
                                    <li
                                        key={`${recipe.title}-step-${idx}`}
                                        className="flex gap-4 text-sm text-gray-700"
                                        style={{fontFamily: 'Lora, serif'}}
                                    >
                                        <span
                                            className="font-bold text-gray-400 flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs">
                                            {idx + 1}
                                        </span>
                                        <span className="leading-relaxed">{step.description}</span>
                                    </li>
                                ))}
                            </ol>
                        </motion.div>
                    )}
                </motion.div>

                {/* Разделитель с отступами */}
                <div className="py-8">
                    <div className="h-2 bg-[#fbceb1] rounded-full"></div>
                </div>
            </div>
        </motion.div>
    )
}
