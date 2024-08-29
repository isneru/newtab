import * as Icons from '@components/selected-icons'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { createLink, Link } from '@lib/localStorage'

type Props = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	setLinks: React.Dispatch<React.SetStateAction<Link[]>>
}

export const Modal = ({ isOpen, setIsOpen, setLinks }: Props) => {
	const [selectedIcon, setSelectedIcon] = useState<keyof typeof Icons>()
	const [isSolo, setIsSolo] = useState(false)
	const [label, setLabel] = useState('')
	const [url, setUrl] = useState('')

	function toggleModal() {
		setIsOpen(!isOpen)
		setSelectedIcon(undefined)
		setIsSolo(false)
		setLabel('')
		setUrl('')
	}

	function addLink() {
		if (!url || !selectedIcon) return

		const newLinks = createLink(
			{
				label: !!label ? label : trimIconName(selectedIcon),
				isSolo,
				url,
				icon: selectedIcon
			},
			toggleModal
		)
		setLinks(newLinks)
	}

	function trimIconName(name?: string) {
		if (!name) return ''
		return name
			.replace(/([A-Z])/g, ' $1')
			.trim()
			.replace(' Logo', '')
	}

	return (
		<Dialog.Root open={isOpen} onOpenChange={toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm data-[state=closed]:animate-[overlay-hide_150ms] data-[state=open]:animate-[overlay-show_150ms]' />
			<Dialog.Content
				aria-describedby={undefined}
				className='fixed left-1/2 top-1/2 z-[100] flex aspect-video h-full max-h-[600px] w-[748px] -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-4 rounded-lg bg-neutral-900 p-8 shadow data-[state=closed]:animate-[content-hide_150ms] data-[state=open]:animate-[content-show_150ms]'>
				<Dialog.Title className='sr-only text-xl font-bold text-neutral-200'>
					Add New Link
				</Dialog.Title>
				<Dialog.Close className='absolute right-3 top-3 outline-none'>
					<X />
				</Dialog.Close>
				<div className='flex h-full max-h-[600px] flex-col gap-4'>
					<fieldset className='flex flex-col gap-0.5'>
						<label className='ml-1 select-none' htmlFor='newLinkUrl'>
							New Link URL
						</label>
						<input
							id='newLinkUrl'
							placeholder='https://example.com'
							onChange={e => setUrl(e.target.value)}
							value={url}
							className='rounded-lg border border-neutral-200/10 bg-neutral-950 p-2 text-neutral-200 outline-none placeholder:text-neutral-600'
							type='text'
						/>
					</fieldset>
					<div className='grid grid-cols-2'>
						<fieldset className='flex w-fit flex-col gap-0.5'>
							<label className='ml-1 select-none' htmlFor='solo'>
								Span all columns?
							</label>
							<div className='grid grid-cols-2 gap-2 rounded-lg border border-neutral-200/10 bg-neutral-950 p-[6px]'>
								{[false, true].map(val => (
									<button
										key={val ? 'yes' : 'no'}
										id={isSolo === val ? 'active' : 'solo'}
										onClick={() => setIsSolo(val)}
										className={clsx(
											'relative rounded-md p-2 text-sm outline-none transition',
											isSolo !== val && 'hover:bg-neutral-900'
										)}>
										{isSolo === val && (
											<motion.div
												layoutId='active'
												transition={{ duration: 0.15 }}
												className='absolute inset-0 rounded bg-emerald-700 transition-colors'
											/>
										)}
										<span className='relative z-[110] grid justify-center'>
											{val ? (
												<Icons.Check
													className='size-4 fill-neutral-200'
													weight='bold'
												/>
											) : (
												<Icons.X
													className='size-4 fill-neutral-200'
													weight='bold'
												/>
											)}
										</span>
									</button>
								))}
							</div>
						</fieldset>
						<fieldset className='flex flex-col gap-0.5'>
							<label className='ml-1 select-none' htmlFor='label'>
								New Link Label
							</label>
							<input
								id='label'
								placeholder={trimIconName(selectedIcon)}
								onChange={e => setLabel(e.target.value)}
								value={label}
								className='rounded-lg border border-neutral-200/10 bg-neutral-950 p-2 text-neutral-200 outline-none placeholder:text-neutral-600'
								type='text'
							/>
						</fieldset>
					</div>
					<div className='grid grid-cols-6 items-center justify-center gap-3 overflow-y-scroll rounded-lg border border-neutral-200/10 bg-neutral-950 px-12 py-6 shadow'>
						{Object.entries(Icons).map(([name, IconComponent]) => (
							<button
								key={name}
								title={trimIconName(name)}
								className={clsx(
									'grid max-w-[84px] items-center justify-center rounded-lg p-8 transition-colors focus:outline-none',
									selectedIcon === name &&
										'bg-emerald-900 hover:bg-emerald-800',
									selectedIcon !== name && 'bg-neutral-900 hover:bg-neutral-800'
								)}
								onClick={() => {
									setSelectedIcon(name as keyof typeof Icons)
									console.log({ name, IconComponent, selectedIcon })
								}}>
								<IconComponent
									className='size-5 fill-neutral-200'
									weight='bold'
								/>
							</button>
						))}
					</div>
					<button
						className='rounded-lg border border-emerald-700 bg-emerald-800 p-2 text-sm font-bold uppercase text-neutral-200 transition-colors hover:bg-emerald-700'
						onClick={addLink}>
						Add Link
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
