import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import theme from '@styles/theme'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 0 },
    },
})

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
