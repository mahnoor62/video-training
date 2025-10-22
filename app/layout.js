import { Inter } from 'next/font/google'
import CustomThemeProvider from './components/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Video Training Application',
  description: 'Professional video training with interactive quizzes',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  )
}
