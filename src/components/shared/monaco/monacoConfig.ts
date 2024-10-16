import { loader } from '@monaco-editor/react'

loader.init().then(monaco => {
	monaco.languages.register({ id: 'customLanguage' })

	monaco.languages.setMonarchTokensProvider('customLanguage', {
		tokenizer: {
			root: [
				[/\b(keyword1|keyword2)\b/, 'custom-keyword'],
				[/\b\d+\b/, 'custom-number'],
				[/".*?"/, 'custom-string'],
				[/{[^}]*}/, 'custom-bracket'],
			],
		},
	})

	monaco.languages.registerCompletionItemProvider('customLanguage', {
		provideCompletionItems: ({ model, position }: any) => {
			const suggestions = [
				{
					label: 'amount',
					kind: monaco.languages.CompletionItemKind.Text,
					detail: 'Сумма доната',
					insertText: 'amount',
				},
				{
					label: 'walletAddress',
					kind: monaco.languages.CompletionItemKind.Text,
					detail: 'Кошелек донатера',
					insertText: 'walletAddress',
				},
				{
					label: 'tokenName',
					kind: monaco.languages.CompletionItemKind.Text,
					detail: 'Название криптовалюты',
					insertText: 'tokenName',
				},
			]
			return { suggestions: suggestions }
		},
	})

	monaco.editor.defineTheme('myTheme', {
		base: 'vs-dark',
		inherit: true,
		rules: [{ token: 'custom-bracket', foreground: '#858585' }],
		colors: {
			'editor.background': '#323232',
			'editor.foreground': '#D9D9D9',
			'editorCursor.foreground': '#CCCCCC',
			'editorCursor.background': '#000000',
			'editorCursorLight.foreground': '#CCCCCC',
			'editorCursorDark.foreground': '#CCCCCC',
		},
	})

	monaco.languages.setLanguageConfiguration('customLanguage', {
		autoClosingPairs: [{ open: '{', close: '}' }],
		surroundingPairs: [{ open: '{', close: '}' }],
	})
})
