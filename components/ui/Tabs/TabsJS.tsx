'use client'

import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'

type Props = {
	id: string
	tabOpenIndex?: number
	vertical?: boolean
}

export default function ({ tabOpenIndex = 0, id, vertical }: Props) {
	const focus = useSignal(tabOpenIndex)

	useEffect(() => {
		const root = document.getElementById(id) as HTMLDivElement

		if (root === null) throw new Error(`Root (${id}) not found`)

		const panels = root.querySelectorAll<HTMLDivElement>('[data-tab-panel]')
		const tabs = root.querySelectorAll<HTMLButtonElement>('[data-tab]')

		update()

		function handleKeyboard(e: KeyboardEvent) {
			function next() {
				focus.value = (focus.value + 1) % tabs.length
			}

			function prev() {
				focus.value = (focus.value - 1 + tabs.length) % tabs.length
			}

			if (vertical) {
				if (e.code === 'ArrowUp') prev()
				if (e.code === 'ArrowDown') next()
			} else {
				if (e.code === 'ArrowLeft') prev()
				if (e.code === 'ArrowRight') next()
			}

			if (e.code === 'Home') focus.value = 0
			if (e.code === 'End') focus.value = tabs.length - 1

			update()
		}

		function update() {
			tabs[focus.value].focus()

			for (const [i, tab] of tabs.entries()) {
				if (i === focus.value) {
					tab.setAttribute('aria-selected', 'true')
					tab.setAttribute('tabIndex', '0')
					tab.dataset.selected = 'true'
				} else {
					tab.removeAttribute('aria-selected')
					tab.setAttribute('tabIndex', '-1')
					tab.dataset.selected = 'false'
				}
			}

			for (const [i, panel] of panels.entries()) {
				const isFocused = i === focus.value

				if (isFocused) {
					panel.setAttribute('aria-hidden', 'false')
					panel.style.display = 'block'
					panel.dataset.selected = 'true'
				} else {
					panel.setAttribute('aria-hidden', 'true')
					panel.style.display = 'none'
					panel.dataset.selected = 'false'
				}
			}
		}

		for (const tab of tabs) {
			tab.querySelector('input[type=radio]')?.setAttribute('name', `tab-${id}`)
		}

		for (const [i, _] of panels.entries()) {
			panels[i].id = `tab-panel-${id}-${i}`
			panels[i].setAttribute('aria-labelledby', `tab-${id}-${i}`)
			tabs[i].setAttribute('aria-controls', `tab-panel-${id}-${i}`)
		}

		function handleOnChange(i: number) {
			focus.value = i
			update()
		}

		for (const [i, tab] of tabs.entries()) {
			tab.addEventListener('keydown', handleKeyboard)
			tab.addEventListener('click', () => handleOnChange(i))
		}

		return () => {
			for (const [i, tab] of tabs.entries()) {
				tab.removeEventListener('keydown', handleKeyboard)
				tab.removeEventListener('click', () => handleOnChange(i))
			}
		}
	}, [])

	return null
}
