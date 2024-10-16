'use client'

import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
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
	const [imageUrl, setImageUrl] = React.useState<string>(
		'https://i.gifer.com/origin/e0/e02ce86bcfd6d1d6c2f775afb3ec8c01_w200.gif'
	)
	const [firstTextBlock, setFirstTextBlock] = React.useState<string>('New donate from {walletAddress}!')
	const [secondTextBlock, setSecondTextBlock] = React.useState<string>('Donated {amount} {tokenName}')
	const [duration, setDuration] = React.useState<number>(5000)
	const [minAmount, setMinAmount] = React.useState<number>(1)

	const [link, setLink] = React.useState<string>(
		'http://localhost:3000/alerts?asdkjasdlajsdljaskdjaskdajsdkjahsdkjahsdk'
	)

	return (
		<div className={cn('flex justify-center items-center h-screen bg-[#1F1F1F]', className)}>
			<div className='flex-1 flex flex-col gap-6 justify-center items-center text-white'>
				<LinkObs link={link} />

				<div className='w-[500px] h-[76px]'>
					<Label htmlFor='imageUrl' className='text-[#BEBEBE] ml-2'>
						Ссылка на изображение <span className='text-sm text-[#6E6E6E]'>(допустимые форматы: gif, png, jpeg)</span>
					</Label>
					<Input className='max-w-full mt-1' id='imageUrl' placeholder='Вставьте ссылку' />
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
			<div className='flex-1'>
				<AlertPreview imageUrl={imageUrl} firstTextBlock={firstTextBlock} secondTextBlock={secondTextBlock} />
			</div>
		</div>
	)
}
