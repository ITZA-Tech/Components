'use client'

import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'

type Props = {
	tabOpenIndex: number
	id: string
}

export default function ({ tabOpenIndex = 0, id, ...props }: Props) {
	const focus = useSignal(tabOpenIndex)

	useEffect(() => {
		const root = document.getElementById(id) as HTMLDivElement

		if (root === null) return

		const panels = root.querySelectorAll<HTMLDivElement>('[data-tab-panel]')
		const list = root.querySelector<HTMLUListElement>('[data-tab-list]')
		const tabs = root.querySelectorAll<HTMLButtonElement>('[data-tab]')

		function handleOnChange(i: number) {
			focus.value = i
			update()
		}

		update()
		for (const [i, tab] of tabs.entries()) {
			tab.addEventListener('keydown', handleKeyboard)
			tab.addEventListener('click', () => handleOnChange(i))
		}

		function handleKeyboard(e: KeyboardEvent) {
			const tablist = (e.currentTarget as HTMLLabelElement).closest(
				'[data-tab-list]',
			)
			if (tablist === null) return

			const lastIndex = tabs.length - 1

			switch (e.code) {
				case 'ArrowLeft':
					if (focus.value === 0) focus.value = lastIndex
					else focus.value -= 1

					break
				case 'ArrowRight':
					if (focus.value === lastIndex) focus.value = 0
					else focus.value += 1

					break
				case 'End':
					focus.value = lastIndex

					break
				case 'Home':
					e.preventDefault()
					focus.value = 0

					break
			}

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
				if (i === focus.value) {
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
	}, [])

	return null
}
