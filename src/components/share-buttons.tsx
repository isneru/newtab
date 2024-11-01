import { Export, FileArrowDown } from '@phosphor-icons/react'
import { Link, linkSchema } from '../lib/localStorage'

type Props = {
	setLinks: React.Dispatch<React.SetStateAction<Link[]>>
	links: Link[]
}

export const ShareButtons = ({ setLinks, links }: Props) => {
	function exportLinks() {
		if (!links.length) return
		const linksLS = localStorage.getItem('links')
		if (!linksLS) return
		const url = URL.createObjectURL(
			new Blob([linksLS], { type: 'application/json' })
		)
		const a = document.createElement('a')
		a.href = url
		a.download = `newtab-links-${new Date().toISOString()}.json`
		a.click()
	}

	function importLinks(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				const data = reader.result
				if (typeof data === 'string') {
					console.log({ data })
					const links = JSON.parse(data) as Link[]
					const arraySchema = linkSchema.array()
					const validatedLinks = arraySchema.safeParse(links)
					if (validatedLinks.success) {
						localStorage.setItem('links', data)
						setLinks(links)
					} else {
						alert('Invalid file format')
					}
				}
			}
			reader.readAsText(file)
		}
	}

	return (
		<div className='absolute bottom-8 right-8 flex gap-2'>
			<button
				title='Export links'
				className='flex size-10 items-center justify-center rounded-md bg-neutral-900 transition-colors hover:bg-neutral-800'
				onClick={exportLinks}>
				<Export size={20} />
			</button>
			<label
				title='Import links'
				className='flex size-10 cursor-pointer items-center justify-center rounded-md bg-neutral-900 transition-colors hover:bg-neutral-800'
				htmlFor='import'>
				<FileArrowDown size={20} />
			</label>
			<input
				id='import'
				hidden
				type='file'
				accept='.json'
				onChange={importLinks}
			/>
		</div>
	)
}
