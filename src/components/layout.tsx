import Head from 'next/head'

type Props = {
	children: React.ReactNode
	title: string
}

export const Layout = ({ children, title }: Props) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel='icon' href='/favicon.svg' type='image/svg+xml' />
			</Head>
			{children}
		</>
	)
}
