import { JetBrains_Mono as JetBrains } from 'next/font/google'
import { type AppType } from 'next/app'
import { api } from '@utils/api'
import '@styles/globals.css'

const jb = JetBrains({
	weight: ['400', '700'],
	subsets: ['latin-ext']
})

const App: AppType = ({ Component, pageProps }) => {
	return (
		<div className={jb.className}>
			<Component {...pageProps} />
		</div>
	)
}

export default api.withTRPC(App)
