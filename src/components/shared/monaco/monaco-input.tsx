import { cn } from '@/lib/utils'
import Editor, { OnMount } from '@monaco-editor/react'
import { useRef } from 'react'
import './monacoConfig'

interface Props {
	value: string
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	onChange: (value: string | undefined) => void
	language?: string
	className?: string
}

export const MonacoInput = ({ value, onChange, setIsLoading, language = 'customLanguage', className }: Props) => {
	const editorRef = useRef<any>(null)

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		editorRef.current = editor
		editor.onKeyDown((e: KeyboardEvent) => {
			if (e.code === 'Enter') {
				e.preventDefault()
				return false
			}
		})

		setIsLoading(false)
	}

	return (
		<Editor
			className={cn(
				'w-full h-12 rounded-[10px] border-input bg-[#323232] px-4 py-3 text-base text-[rgba(217, 217, 217, 1)] shadow-sm z-10',
				className
			)}
			height='19px'
			language={language}
			value={value}
			onChange={onChange}
			options={{
				fontFamily: 'Nato Sans, sans-serif',
				lineNumbers: 1,
				glyphMargin: false,
				folding: false,
				lineDecorationsWidth: 0,
				lineNumbersMinChars: 0,
				minimap: { enabled: false },
				scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
				overviewRulerBorder: false,
				renderLineHighlight: 'none',
				hideCursorInOverviewRuler: true,
				fontSize: 16,
				cursorBlinking: 'smooth',
				cursorWidth: 1,
				cursorSmoothCaretAnimation: true,
				scrollBeyondLastLine: false,
				wordWrap: 'off',
				overviewRulerLanes: 0,
			}}
			onMount={handleEditorDidMount}
			theme='myTheme'
		/>
	)
}
