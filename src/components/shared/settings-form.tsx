'use client'

import { writeAudioFiles } from '@/app/actions'
import { IDonation } from '@/constants/alert.types'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import qs from 'qs'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import { AlertPreview } from './alert-preview'
import { LinkObs } from './link-obs'
import { TextBlocksForm } from './text-blocks-form'

interface Props {
	className?: string
}

export interface Params {
	wallet: string | undefined
	imageUrl: string
	firstTextBlock: string
	secondTextBlock: string
	duration: number
	minAmount: number
	audio?: string
}

export const SettingsForm = ({ className }: Props) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	const [imageUrl, setImageUrl] = React.useState<string>(
		'https://i.gifer.com/origin/e0/e02ce86bcfd6d1d6c2f775afb3ec8c01_w200.gif'
	)
	const [wallet, setWallet] = React.useState<string>('')
	const [firstTextBlock, setFirstTextBlock] = React.useState<string>('New donate from {walletAddress}!')
	const [secondTextBlock, setSecondTextBlock] = React.useState<string>('Donated {amount} {tokenName}')
	const [duration, setDuration] = React.useState<number>(5000)
	const [minAmount, setMinAmount] = React.useState<number>(1)

	const [link, setLink] = React.useState<string>('http://localhost:3000/alerts')

	const [donationTemplate] = React.useState<IDonation>({
		transactionId: '0',
		walletAddress: 'UQDD8dqOzaj4zUK6ziJOo_G2lx6qf1TEktTRkFJ7T1c_fKne',
		amount: '5000',
		tokenName: 'HMSTR',
	})

	const [selectedAudioFile, setSelectedAudioFile] = React.useState<File | null>(null)
	const [audioSrc, setAudioSrc] = React.useState<string>('')
	const [audioName, setAudioName] = React.useState<string>('')
	const audioRef = React.useRef<HTMLAudioElement>(null)

	const handleFileChange = async (file: File | null) => {
		setSelectedAudioFile(file)

		if (file) {
			const formData = new FormData()
			formData.append('audioFile', file)

			const audioData = await writeAudioFiles(formData)

			setAudioName(audioData?.audio || '')
			setAudioSrc(URL.createObjectURL(file))
		}
	}

	const controls = {
		play: () => {
			if (audioRef.current) {
				audioRef.current.play()
			}
		},
	}

	React.useEffect(() => {
		const params: Params = {
			wallet,
			imageUrl,
			firstTextBlock,
			secondTextBlock,
			duration,
			minAmount,
		}

		if (audioSrc) {
			params.audio = audioName
		}

		const query = qs.stringify(params, { arrayFormat: 'comma' })
		setLink(`http://localhost:3000/alerts?${query}`)
	}, [wallet, imageUrl, firstTextBlock, secondTextBlock, duration, minAmount, audioSrc])

	const setImageUrlHandler = (imageUrl: string) => {
		if (imageUrl.endsWith('.gif') || imageUrl.endsWith('.png') || imageUrl.endsWith('.jpeg')) {
			setImageUrl(imageUrl)
		}
	}

	const handleFocus = () => {
		inputRef.current?.select()
	}

	return (
		<div className={cn('flex justify-center items-center h-screen bg-[#1F1F1F]', className)}>
			<div>
				<div className='flex flex-col gap-6 mr-20 items-center text-white'>
					<LinkObs link={link} />

					<div className='w-[500px] h-[76px]'>
						<Label htmlFor='wallet' className='text-[#BEBEBE] ml-2'>
							Адрес вашего кошелька <span className='text-sm text-[#6E6E6E]'>(только сеть TON)</span>
						</Label>
						<Input
							className='max-w-full mt-1'
							id='wallet'
							placeholder='Вставьте адрес вашего криптокошелька'
							value={wallet}
							onChange={e => setWallet(e.target.value)}
						/>
					</div>

					<div className='w-[500px] h-[76px]'>
						<Label htmlFor='imageUrl' className='text-[#BEBEBE] ml-2'>
							Ссылка на изображение <span className='text-sm text-[#6E6E6E]'>(допустимые форматы: gif, png, jpeg)</span>
						</Label>
						<Input
							ref={inputRef}
							className='max-w-full mt-1'
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
			<div>
				<AlertPreview
					className='2xl:ml-20 xl:ml-12'
					imageUrl={imageUrl}
					firstTextBlock={firstTextBlock}
					secondTextBlock={secondTextBlock}
					donationTemplate={donationTemplate}
				/>
				<Input
					id='audio'
					type='file'
					className='w-[600px] 2xl:ml-20 xl:ml-12 mt-5 py-3 text-base'
					accept='audio/*'
					onFileChange={handleFileChange}
				/>
				<Button
					className='w-[600px] 2xl:ml-20 xl:ml-12 mt-4 py-6 text-base rounded-lg bg-[#4c5dce] hover:bg-[#4253b7]'
					onClick={controls.play}
					disabled={!selectedAudioFile}
				>
					Воспроизвести звук
				</Button>
				<audio ref={audioRef} controls src={audioSrc} className='hidden' />
			</div>
		</div>
	)
}
