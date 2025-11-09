'use client'

import { Recipe } from '@/lib/types'
import { Clock, Flame, DollarSign } from 'lucide-react'
import LikeButton from './like-button'
import Image from 'next/image'

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            {recipe.image_url && (
                <div className="relative h-48 w-full">
                    <Image
                        src={recipe.image_url}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.description}
                </p>

                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {recipe.prep_time + recipe.cook_time} мин
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame size={16} />
                        {recipe.calories} ккал
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign size={16} />
                        {recipe.cost}/5
                    </div>
                </div>

                <div className="flex justify-between items-center">
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {recipe.category}
          </span>
                    <LikeButton recipeId={recipe.id} />
                </div>
            </div>
        </div>
    )
}