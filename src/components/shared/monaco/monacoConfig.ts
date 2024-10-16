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
		base: 'vs',
		inherit: true,
		rules: [{ token: 'custom-bracket', foreground: '#858585' }],
		colors: {
			'editor.background': '#323232',
			'editor.foreground': '#D9D9D9',
			'editorCursor.foreground': '#CCCCCC',
			'editorCursor.background': '#000000',
			'editorCursorLight.foreground': '#CCCCCC',
			'editorCursorDark.foreground': '#CCCCCC',
			'editor.selectionBackground': '#4D4D4D',
			'editor.selectionHighlightBackground': '#3A3D41',
			'editor.inactiveSelectionBackground': '#3A3A3A',
			'editorSuggestWidget.background': '#252526',
			'editorSuggestWidget.border': '#454545',
			'editorSuggestWidget.foreground': '#D4D4D4',
			'editorSuggestWidget.highlightForeground': '#18A3FF',
			'editorSuggestWidget.selectedBackground': '#094771',
			'list.hoverBackground': '#2A2D2E',
			'list.focusBackground': '#062F4A',
		},
	})

	monaco.languages.setLanguageConfiguration('customLanguage', {
		autoClosingPairs: [{ open: '{', close: '}' }],
		surroundingPairs: [{ open: '{', close: '}' }],
	})
})
