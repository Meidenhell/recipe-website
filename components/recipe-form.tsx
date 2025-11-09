'use client'

import { Recipe, Ingredient, Step } from '@/lib/types'
import { FormEvent, useState } from 'react'
import { createRecipe, updateRecipe } from '@/app/actions/recipe-actions'
import { uploadRecipeImage, deleteRecipeImage } from '@/lib/supabase'

export default function RecipeForm({ recipe }: { recipe?: Recipe }) {
    const [title, setTitle] = useState(recipe?.title || '')
    const [description, setDescription] = useState(recipe?.description || '')
    const [category, setCategory] = useState(recipe?.category || 'завтрак')
    const [difficulty, setDifficulty] = useState(recipe?.difficulty || 1)
    const [prepTime, setPrepTime] = useState(recipe?.prep_time || 10)
    const [cookTime, setCookTime] = useState(recipe?.cook_time || 20)
    const [servings, setServings] = useState(recipe?.servings || 4)
    const [calories, setCalories] = useState(recipe?.calories || 200)
    const [cost, setCost] = useState(recipe?.cost || 2)
    const [imageUrl, setImageUrl] = useState(recipe?.image_url || '')
    const [isFeatured, setIsFeatured] = useState(recipe?.is_featured || false)
    const [ingredients, setIngredients] = useState<Ingredient[]>(
        recipe?.ingredients || [{ name: '', amount: '', unit: '' }]
    )
    const [steps, setSteps] = useState<Step[]>(
        recipe?.steps || [{ step_number: 1, description: '' }]
    )
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleAddIngredient = () => {
        setIngredients([
            ...ingredients,
            { name: '', amount: '', unit: '' },
        ])
    }

    const handleAddStep = () => {
        setSteps([
            ...steps,
            { step_number: steps.length + 1, description: '' },
        ])
    }

    const handleUpdateIngredient = (
        index: number,
        field: keyof Ingredient,
        value: string
    ) => {
        const updated = [...ingredients]
        updated[index] = { ...updated[index], [field]: value }
        setIngredients(updated)
    }

    const handleUpdateStep = (index: number, value: string) => {
        const updated = [...steps]
        updated[index] = { ...updated[index], description: value }
        setSteps(updated)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImageFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let finalImageUrl = imageUrl

            // Загрузить новое изображение если выбрали
            if (imageFile) {
                // Удалить старое если было
                if (recipe?.image_url) {
                    await deleteRecipeImage(recipe.image_url)
                }
                finalImageUrl = await uploadRecipeImage(imageFile, title)
            }

            const recipeData = {
                title,
                description,
                category: category as 'завтрак' | 'обед' | 'ужин' | 'перекусы',
                difficulty: parseInt(difficulty.toString()),
                prep_time: parseInt(prepTime.toString()),
                cook_time: parseInt(cookTime.toString()),
                servings: parseInt(servings.toString()),
                calories: parseInt(calories.toString()),
                cost: parseInt(cost.toString()),
                image_url: finalImageUrl,
                is_featured: isFeatured,
                ingredients: ingredients.filter(i => i.name),
                steps: steps.filter(s => s.description),
            }

            if (recipe) {
                await updateRecipe(recipe.id, recipeData)
                alert('Рецепт обновлен!')
            } else {
                await createRecipe(recipeData as any)
                alert('Рецепт создан!')
                // Очистить форму
                setTitle('')
                setDescription('')
                setImageFile(null)
                setIngredients([{ name: '', amount: '', unit: '' }])
                setSteps([{ step_number: 1, description: '' }])
            }
        } catch (error) {
            alert('Ошибка: ' + (error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Название</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border rounded-lg p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Описание</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-lg p-2"
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Категория</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        <option>завтрак</option>
                        <option>обед</option>
                        <option>ужин</option>
                        <option>перекусы</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Сложность (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={difficulty}
                        onChange={(e) => setDifficulty(parseInt(e.target.value))}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Время подготовки (мин)</label>
                    <input
                        type="number"
                        value={prepTime}
                        onChange={(e) => setPrepTime(parseInt(e.target.value))}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Время готовки (мин)</label>
                    <input
                        type="number"
                        value={cookTime}
                        onChange={(e) => setCookTime(parseInt(e.target.value))}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Порции</label>
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(parseInt(e.target.value))}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Калории</label>
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(parseInt(e.target.value))}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Стоимость (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={cost}
                        onChange={(e) => setCost(parseInt(e.target.value))}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Изображение</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border rounded-lg p-2"
                />
                {imageUrl && <p className="text-sm text-green-600 mt-2">Текущее изображение загружено</p>}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm">Показывать на главной</label>
            </div>

            <div>
                <h3 className="font-bold mb-4">Ингредиенты</h3>
                {ingredients.map((ing, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Название"
                            value={ing.name}
                            onChange={(e) => handleUpdateIngredient(index, 'name', e.target.value)}
                            className="border rounded p-2"
                        />
                        <input
                            type="text"
                            placeholder="Количество"
                            value={ing.amount}
                            onChange={(e) => handleUpdateIngredient(index, 'amount', e.target.value)}
                            className="border rounded p-2"
                        />
                        <input
                            type="text"
                            placeholder="Единица"
                            value={ing.unit}
                            onChange={(e) => handleUpdateIngredient(index, 'unit', e.target.value)}
                            className="border rounded p-2"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                >
                    + Добавить ингредиент
                </button>
            </div>

            <div>
                <h3 className="font-bold mb-4">Шаги приготовления</h3>
                {steps.map((step, index) => (
                    <div key={index} className="mb-2">
            <textarea
                placeholder={`Шаг ${index + 1}`}
                value={step.description}
                onChange={(e) => handleUpdateStep(index, e.target.value)}
                className="w-full border rounded p-2"
                rows={2}
            />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddStep}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                >
                    + Добавить шаг
                </button>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? 'Сохранение...' : recipe ? 'Обновить' : 'Создать'}
            </button>
        </form>
    )
}