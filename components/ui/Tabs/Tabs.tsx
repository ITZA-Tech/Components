import TabsJS from "$store/components/ui/Tabs/TabsJS.tsx"
import { JSX } from 'preact'
import { useId } from '$store/sdk/useId.ts'

export type TabsProps = JSX.HTMLAttributes<HTMLDivElement> & {
    tabOpenIndex?: number
    vertical?: boolean
}
export type TabProps = JSX.HTMLAttributes<HTMLButtonElement>
export type TabPanelProps = JSX.HTMLAttributes<HTMLButtonElement>
export type TabListProps = JSX.HTMLAttributes<HTMLDivElement> & {
    /**
     * Explique em PT_BR o que TODAS as TABS representam
     */
    explain: string
}

export function TabPanel({ ...props }: TabPanelProps) {
    return <button type='button' {...props} data-tab-panel tabIndex={0} style={{ display: 'none' }} />
}

export const TabsList = ({ children, explain, ...props }: TabListProps) => {
    return (
        <div {...props} data-tab-list role='tablist' tabIndex={-1}>
            <span class='sr-only'>{explain}</span>
            {children}
        </div>
    )
}

export function Tab({ id, children, ...props }: TabProps) {
    return (
        <button type='button' {...props} data-tab role='tab'>
            {children}
        </button>
    )
}

export default function Tabs({ tabOpenIndex, id: _id, vertical, ...props }: TabsProps) {
    const id = _id ?? useId()

    return (
        <>
            <div id={id} {...props} />
            <TabsJS tabOpenIndex={tabOpenIndex} id={id as string} vertical={vertical} />
        </>
    )
}

Tabs.Tab = Tab
Tabs.TabPanel = TabPanel
Tabs.TabsList = TabsList
