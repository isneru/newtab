import { Layout, LinkButton, Modal, ShareButtons } from '@components'
import { getAllLinks, type Link } from '@lib/localStorage'
import { useEffect, useState } from 'react'

export default function Home() {
	const [isOpen, setIsOpen] = useState(false)
	const [links, setLinks] = useState<Link[]>([])
	const [shiftHeld, setShiftHeld] = useState(false)

	useEffect(() => {
		setLinks(getAllLinks())
	}, [])

	function downHandler(e: KeyboardEvent) {
		if (isOpen) return

		if (e.key === 'Shift') {
			setShiftHeld(true)
		}

		if (e.ctrlKey && e.key === 'n') {
			e.preventDefault()
			setIsOpen(true)
		}
	}

	function upHandler(e: KeyboardEvent) {
		if (isOpen) return

		if (e.key === 'Shift') {
			setShiftHeld(false)
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', downHandler)
		window.addEventListener('keyup', upHandler)
		window.addEventListener('blur', () => setShiftHeld(false))
		return () => {
			window.removeEventListener('keydown', downHandler)
			window.removeEventListener('keyup', upHandler)
			window.removeEventListener('blur', () => setShiftHeld(false))
		}
	}, [])

	return (
		<Layout title='New Tab'>
			<main>
				{links?.map((link, id) => (
					<LinkButton
						link={link}
						setLinks={setLinks}
						shiftHeld={shiftHeld}
						key={id}
					/>
				))}
			</main>
			<div className='utils'>
				<p>
					Press <code>Ctrl + N</code> to add a new link.
				</p>
			</div>
			<ShareButtons setLinks={setLinks} links={links} />
			<Modal setLinks={setLinks} isOpen={isOpen} setIsOpen={setIsOpen} />
		</Layout>
	)
}
