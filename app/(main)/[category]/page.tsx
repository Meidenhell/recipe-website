'use client'

import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { getRecipesByCategory } from '@/app/actions/recipe-actions'
import RecipeCard from '@/components/recipe-card'
import RecipeCardVertical from '@/components/recipe-card-vertical'
import { Category } from '@/lib/types'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { List, Grid, Loader2, ChefHat } from 'lucide-react'
import { motion } from 'framer-motion'

const CATEGORY_NAMES: Record<Category, string> = {
    завтрак: 'Завтраки',
    обед: 'Обеды',
    ужин: 'Ужины',
    перекусы: 'Перекусы',
}

const SORT_OPTIONS = [
    { value: 'created_at', label: 'По дате' },
    { value: 'fastest', label: 'Быстрые' },
    { value: 'cheapest', label: 'Бюджетные' },
    { value: 'popular', label: 'Популярные' },
]

const DIFFICULTY_OPTIONS = [
    { value: '', label: 'Все уровни' },
    { value: '1', label: 'Легко' },
    { value: '2', label: 'Среднее' },
    { value: '3', label: 'Сложно' },
]

export default function CategoryPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const params = useParams()

    const [recipes, setRecipes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
    const [mounted, setMounted] = useState(false)

    const encodedCategory = params?.category as string
    const category = encodedCategory
        ? (decodeURIComponent(encodedCategory) as Category)
        : 'завтрак'

    const sortBy = searchParams.get('sort') || 'created_at'
    const difficulty = searchParams.get('difficulty')

    // Монтирование компонента
    useEffect(() => {
        setMounted(true)
    }, [])

    // Загрузка рецептов
    useEffect(() => {
        if (!mounted) return

        const loadRecipes = async () => {
            setLoading(true)
            try {
                const filters = difficulty ? { difficulty: [parseInt(difficulty)] } : undefined
                const data = await getRecipesByCategory(category, filters, sortBy)
                setRecipes(data?.filter((r: any) => r) || [])
            } catch (error) {
                console.error('Error loading recipes:', error)
                setRecipes([])
            } finally {
                setLoading(false)
            }
        }

        loadRecipes()
    }, [category, sortBy, difficulty, mounted])

    const updateQueryParam = useCallback(
        (key: string, value?: string) => {
            const newParams = new URLSearchParams(searchParams)
            if (value) newParams.set(key, value)
            else newParams.delete(key)
            router.push(`/${encodedCategory}?${newParams.toString()}`)
        },
        [encodedCategory, searchParams, router]
    )

    const categoryTitle = useMemo(() => CATEGORY_NAMES[category] || category, [category])

    const DecoLine = () => (
        <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[#fbceb1] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>
    )

    const ViewControls = () => (
        <motion.div
            className="flex items-center gap-1 bg-white p-1.5 rounded-lg border border-[#f5e6d3] shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {[
                { mode: 'grid' as const, icon: Grid },
                { mode: 'list' as const, icon: List },
            ].map(({ mode, icon: Icon }) => (
                <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded transition-all ${
                        viewMode === mode
                            ? 'bg-[#fbceb1] text-gray-800'
                            : 'text-gray-600 hover:bg-[#f5e6d3]'
                    }`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <Icon size={18} />
                </motion.button>
            ))}
        </motion.div>
    )

    const FiltersSection = () => (
        <motion.div
            className="flex flex-col md:flex-row gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="relative flex-1">
                <select
                    value={sortBy}
                    onChange={(e) => updateQueryParam('sort', e.target.value)}
                    className="w-full appearance-none border border-[#f5e6d3] rounded-lg px-4 py-3 font-medium text-gray-700 bg-white hover:bg-[#fef9f3] focus:outline-none focus:ring-2 focus:ring-[#fbceb1] focus:border-transparent transition-all cursor-pointer"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-xs">▼</span>
            </div>

            <div className="relative flex-1">
                <select
                    value={difficulty || ''}
                    onChange={(e) => updateQueryParam('difficulty', e.target.value || undefined)}
                    className="w-full appearance-none border border-[#f5e6d3] rounded-lg px-4 py-3 font-medium text-gray-700 bg-white hover:bg-[#fef9f3] focus:outline-none focus:ring-2 focus:ring-[#fbceb1] focus:border-transparent transition-all cursor-pointer"
                >
                    {DIFFICULTY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-xs">▼</span>
            </div>

            <ViewControls />
        </motion.div>
    )

    const LoadingState = () => (
        <motion.div
            className="flex justify-center items-center py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="flex flex-col items-center gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <ChefHat size={48} className="text-[#fbceb1]" />
                </motion.div>
                <p className="text-gray-700 font-medium">Готовим рецепты...</p>
            </div>
        </motion.div>
    )

    const EmptyState = () => (
        <motion.div
            className="flex flex-col items-center justify-center py-24 px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="text-7xl mb-4 opacity-80">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ничего не найдено</h3>
            <p className="text-gray-600 max-w-md leading-relaxed">
                Попробуйте изменить фильтры или выбрать другую категорию
            </p>
        </motion.div>
    )

    const GridView = () => (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {recipes.map((recipe, idx) => (
                recipe && (
                    <motion.div
                        key={recipe.id}
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                        className="h-full"
                    >
                        <RecipeCard recipe={recipe} />
                    </motion.div>
                )
            ))}
        </motion.div>
    )

    const ListView = () => (
        <motion.div
            className="flex flex-col gap-0"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {recipes.map((recipe, idx) => (
                recipe && (
                    <motion.div
                        key={recipe.id}
                        layout
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                    >
                        <RecipeCardVertical recipe={recipe} index={idx} />
                    </motion.div>
                )
            ))}
        </motion.div>
    )

    const RecipeCounter = () =>
        !loading && recipes.length > 0 ? (
            <motion.div
                className="flex items-center gap-3 pt-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <span className="inline-flex items-center justify-center w-8 h-8 bg-[#fbceb1] text-gray-900 rounded-full text-sm font-bold">
                    {recipes.length}
                </span>
                <span className="text-gray-700 font-medium">
                    {recipes.length === 1 ? 'рецепт' : recipes.length < 5 ? 'рецепта' : 'рецептов'}
                </span>
            </motion.div>
        ) : null

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white">
                <LoadingState />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Фон */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#fbceb1]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#fbceb1]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 py-20 z-10">
                {/* Заголовок */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        {categoryTitle}
                    </h1>
                    <DecoLine />
                </motion.div>

                {/* Фильтры, сложность и переключение вида в одной строке */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <FiltersSection />
                    <RecipeCounter />
                </motion.div>

                {/* Контент */}
                {loading ? (
                    <LoadingState />
                ) : recipes.length === 0 ? (
                    <EmptyState />
                ) : viewMode === 'grid' ? (
                    <GridView />
                ) : (
                    <ListView />
                )}
            </div>
        </div>
    )
}
