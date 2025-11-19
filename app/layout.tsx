import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Lora } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '700'],
    variable: '--font-cormorant',
})

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '600', '700'],
    variable: '--font-montserrat',
})

const lora = Lora({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600'],
    variable: '--font-lora',
})

export const metadata: Metadata = {
    title: 'Рецепты',
    description: 'Откройте для себя удивительные рецепты',
    icons: {
        icon: '🍽️',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="ru"
            className={`${cormorant.variable} ${montserrat.variable} ${lora.variable}`}
            suppressHydrationWarning
        >
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Montserrat:wght@400;600;700&family=Lora:wght@400;500;600&display=swap"
                rel="stylesheet"
            />
            <meta name="theme-color" content="#fbceb1" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
        </head>
        <body className="bg-white text-gray-900" style={{ fontFamily: 'Lora, serif' }}>
        {children}
        </body>
        </html>
    )
}
