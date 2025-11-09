'use client'

import { toggleLike, hasUserLiked, getLikesCount } from '@/app/actions/like-actions'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LikeButton({ recipeId }: { recipeId: string }) {
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadLikeState() {
            try {
                const [isLiked, likesCount] = await Promise.all([
                    hasUserLiked(recipeId),
                    getLikesCount(recipeId),
                ])
                setLiked(isLiked)
                setCount(likesCount)
            } finally {
                setLoading(false)
            }
        }
        loadLikeState()
    }, [recipeId])

    const handleLike = async () => {
        try {
            setLoading(true)
            const result = await toggleLike(recipeId)
            setLiked(result.liked)
            const newCount = await getLikesCount(recipeId)
            setCount(newCount)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            className="flex items-center gap-1 text-red-500 hover:text-red-600"
        >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            <span className="text-sm">{count}</span>
        </button>
    )
}