'use client'

import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import qs from 'qs'
import React from 'react'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import { AlertPreview } from './alert-preview'
import { LinkObs } from './link-obs'
import { TextBlocksForm } from './text-blocks-form'

interface Props {
	className?: string
}

export const SettingsForm = ({ className }: Props) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	const [imageUrl, setImageUrl] = React.useState<string>(
		'https://i.gifer.com/origin/e0/e02ce86bcfd6d1d6c2f775afb3ec8c01_w200.gif'
	)
	const [firstTextBlock, setFirstTextBlock] = React.useState<string>('New donate from {walletAddress}!')
	const [secondTextBlock, setSecondTextBlock] = React.useState<string>('Donated {amount} {tokenName}')
	const [duration, setDuration] = React.useState<number>(5000)
	const [minAmount, setMinAmount] = React.useState<number>(1)

	const [link, setLink] = React.useState<string>('http://localhost:3000/alerts')

	React.useEffect(() => {
		const params = {
			imageUrl,
			firstTextBlock,
			secondTextBlock,
			duration,
			minAmount,
		}

		const query = qs.stringify(params, { arrayFormat: 'comma' })
		setLink(`http://localhost:3000/alerts?${query}`)
	}, [imageUrl, firstTextBlock, secondTextBlock, duration, minAmount])

	const setImageUrlHandler = (imageUrl: string) => {
		if (imageUrl.endsWith('.gif') || imageUrl.endsWith('.png') || imageUrl.endsWith('.jpeg')) {
			setImageUrl(imageUrl)
		}
	}

	const handleFocus = () => {
		inputRef.current?.select()
	}

	return (
		<div className={cn('flex items-center h-screen bg-[#1F1F1F]', className)}>
			<div className='flex-1 flex justify-end'>
				<div className='flex flex-col gap-6 mr-20 items-center text-white'>
					<LinkObs link={link} />

					<div className='w-[500px] h-[76px]'>
						<Label htmlFor='imageUrl' className='text-[#BEBEBE] ml-2'>
							Ссылка на изображение <span className='text-sm text-[#6E6E6E]'>(допустимые форматы: gif, png, jpeg)</span>
						</Label>
						<Input
							ref={inputRef}
							className='max-w-full mt-1 '
							id='imageUrl'
							placeholder='Вставьте ссылку'
							value={imageUrl}
							onFocus={handleFocus}
							onChange={e => setImageUrlHandler(e.target.value)}
						/>
					</div>
					<TextBlocksForm
						firstTextBlock={firstTextBlock}
						secondTextBlock={secondTextBlock}
						setFirstTextBlock={setFirstTextBlock}
						setSecondTextBlock={setSecondTextBlock}
					/>
					<div className='w-[500px] h-[76px]'>
						<Label className='text-[#BEBEBE] ml-2 flex items-center'>Длительность доната</Label>
						<Slider
							className='mt-5'
							defaultValue={[duration / 1000]}
							value={[duration / 1000]}
							max={30}
							step={1}
							onValueChange={(values: number[]) => setDuration(values[0] * 1000)}
							tooltip={true}
							tooltipText='сек'
						/>
					</div>
					<div className='w-[500px] h-[76px]'>
						<Label htmlFor='imageUrl' className='text-[#BEBEBE] ml-2'>
							Минимальная сумма
						</Label>
						<Input
							className='max-w-full mt-1'
							type='number'
							id='imageUrl'
							placeholder='0'
							value={minAmount}
							onChange={e => setMinAmount(Number(e.target.value))}
							startContent={<span className='text-[#6E6E6E] ml-1'>$</span>}
						/>
					</div>
				</div>
			</div>
			<div className='flex-1 flex'>
				<AlertPreview
					className='ml-20'
					imageUrl={imageUrl}
					firstTextBlock={firstTextBlock}
					secondTextBlock={secondTextBlock}
				/>
			</div>
		</div>
	)
}
