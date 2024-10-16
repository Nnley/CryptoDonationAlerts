'use client'

import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { CircleHelp } from 'lucide-react'
import React from 'react'
import { MonacoInput } from './monaco/monaco-input'
import { TextBlocksTooltip } from './text-blocks-tooltip'

interface Props {
	firstTextBlock: string
	secondTextBlock: string
	setFirstTextBlock: React.Dispatch<React.SetStateAction<string>>
	setSecondTextBlock: React.Dispatch<React.SetStateAction<string>>
	className?: string
}

export const TextBlocksForm = ({
	firstTextBlock,
	secondTextBlock,
	setFirstTextBlock,
	setSecondTextBlock,
	className,
}: Props) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(true)

	return (
		<div className={cn('flex flex-col gap-6 justify-center items-center text-white', className)}>
			<div className='w-[500px] h-[76px]'>
				<Label className='text-[#BEBEBE] ml-2 flex items-center'>
					Первый блок текста
					<TextBlocksTooltip>
						<CircleHelp className='ml-[6px] mt-[2px]' color='#707070' size={18} />
					</TextBlocksTooltip>
				</Label>
				{isLoading && <div className='w-[500px] h-[48px] mt-1 z-10 rounded-[10px] bg-[#323232]' />}
				<div className={isLoading ? 'hidden' : 'flex'}>
					<MonacoInput
						className='mt-1'
						value={firstTextBlock}
						onChange={value => setFirstTextBlock(value || '')}
						setIsLoading={setIsLoading}
					/>
				</div>
			</div>
			<div className='w-[500px] h-[76px]'>
				<Label className='text-[#BEBEBE] ml-2 flex items-center'>
					Второй блок текста{' '}
					<TextBlocksTooltip>
						<CircleHelp className='ml-[6px] mt-[2px]' color='#707070' size={18} />
					</TextBlocksTooltip>
				</Label>
				{isLoading && <div className='w-[500px] h-[48px] mt-1 z-10 rounded-[10px] bg-[#323232]' />}
				<div className={isLoading ? 'hidden' : 'flex'}>
					<MonacoInput
						className='mt-1'
						value={secondTextBlock}
						onChange={value => setSecondTextBlock(value || '')}
						setIsLoading={setIsLoading}
					/>
				</div>
			</div>
		</div>
	)
}
