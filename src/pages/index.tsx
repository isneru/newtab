import { Layout, Modal } from '@components'
import { getAllLinks, type Link } from '@lib/localStorage'
import { Plus } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import * as Icons from '@components/selected-icons'
import clsx from 'clsx'

export default function Home() {
	const [isOpen, setIsOpen] = useState(false)
	const [links, setLinks] = useState<Link[]>([])

	useEffect(() => {
		setLinks(getAllLinks())
	}, [])

	const linkSize = useMemo(() => {
		return calculateLinkSize(links.filter(link => !link.isSolo).length)
	}, [links])

	function calculateLinkSize(count: number): string {
		if (count % 4 === 0) {
			return 'solo w-96'
		} else if (count % 4 === 1) {
			return 'col-span-2'
		} else {
			return `col-span-${4 - (count % 4)}`
		}
	}

	return (
		<Layout title='New Tab'>
			<main>
				{links?.map(link => (
					<a
						title={link.label}
						className={link.isSolo ? 'solo' : ''}
						key={link.url}
						href={link.url}>
						{Object.entries(Icons).map(
							([name, IconComponent]) =>
								link.icon === name && <IconComponent key={name} weight='bold' />
						)}
						{link.isSolo && <span>{link.label}</span>}
					</a>
				))}
				<button
					className={clsx('', linkSize)}
					title='Add Link'
					onClick={() => setIsOpen(true)}>
					<Plus weight='bold' />
					{calculateLinkSize(
						links.filter(link => !link.isSolo).length
					).includes('solo') && <span>Add Link</span>}
				</button>
			</main>
			<div className='utils'>
				<p>
					Press <code>Ctrl + T</code> to open a new tab.
				</p>
				<p>
					Press <code>Ctrl + W</code> to close the current tab.
				</p>
				<p>
					Press <code>Ctrl + Shift + T</code> to reopen the last closed tab.
				</p>
			</div>
			<Modal setLinks={setLinks} isOpen={isOpen} setIsOpen={setIsOpen} />
		</Layout>
	)
}
