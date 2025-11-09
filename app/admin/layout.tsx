'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [authenticated, setAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123456'

        if (password === correctPassword) {
            setAuthenticated(true)
            setError('')
        } else {
            setError('Неправильный пароль')
            setPassword('')
        }
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        className="w-full border rounded-lg px-4 py-2 mb-4"
                        autoFocus
                    />
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Войти
                    </button>
                </form>
            </div>
        )
    }

    return children
}