import { Layout, Modal } from '@components'
import { deleteLink, getAllLinks, type Link } from '@lib/localStorage'
import { Plus } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import * as Icons from '@components/selected-icons'
import clsx from 'clsx'

export default function Home() {
	const [isOpen, setIsOpen] = useState(false)
	const [links, setLinks] = useState<Link[]>([])
	const [shiftHeld, setShiftHeld] = useState(false)

	useEffect(() => {
		setLinks(getAllLinks())
	}, [])

	function downHandler({ key }: { key: string }) {
		if (key === 'Shift') {
			setShiftHeld(true)
		}
	}

	function upHandler({ key }: { key: string }) {
		if (key === 'Shift') {
			setShiftHeld(false)
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', downHandler)
		window.addEventListener('keyup', upHandler)
		return () => {
			window.removeEventListener('keydown', downHandler)
			window.removeEventListener('keyup', upHandler)
		}
	}, [])

	function calculateLinkSize(count: number): string {
		if (count % 4 === 0) {
			return 'solo w-96'
		} else {
			return `col-span-${4 - (count % 4)}`
		}
	}

	return (
		<Layout title='New Tab'>
			<main>
				{links?.map(link =>
					shiftHeld ? (
						<button
							title={`delete ${link.label}?`}
							className={clsx(
								'group hover:bg-rose-950/25 hover:text-rose-600',
								link.isSolo && 'solo w-96'
							)}
							key={link.url}
							onClick={() => {
								const newLinks = deleteLink(link.url)
								setLinks(newLinks)
							}}>
							<Icons.TrashSimple
								className='hidden group-hover:block group-hover:fill-rose-600'
								weight='bold'
							/>
							{Object.entries(Icons).map(
								([name, IconComponent]) =>
									link.icon === name && (
										<IconComponent
											className='group-hover:hidden'
											key={name}
											weight='bold'
										/>
									)
							)}
							{link.isSolo && <span>{link.label}</span>}
						</button>
					) : (
						<a
							title={link.label}
							className={link.isSolo ? 'solo' : ''}
							key={link.url}
							href={link.url}>
							{Object.entries(Icons).map(
								([name, IconComponent]) =>
									link.icon === name && (
										<IconComponent key={name} weight='bold' />
									)
							)}
							{link.isSolo && <span>{link.label}</span>}
						</a>
					)
				)}
				<button
					className={calculateLinkSize(
						links.filter(link => !link.isSolo).length
					)}
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
