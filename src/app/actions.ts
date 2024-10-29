'use server'

const fs = require('fs')
const path = require('path')

export const writeAudioFiles = async (formData: FormData) => {
	const audioFile = formData.get('audioFile')

	if (audioFile instanceof Blob) {
		const arrayBuffer = await audioFile.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const extension = path.extname(audioFile.name)
		const filePath = path.join(process.cwd(), 'public', 'audio', `alert${extension}`)

		fs.writeFileSync(filePath, buffer)

		const audioData = {
			audio: `alert${extension}`,
		}

		return audioData
	} else {
		console.error('The uploaded file is not a valid Blob.')
	}
}
