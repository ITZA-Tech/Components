import Tabs from '$store/components/ui/Tabs/Tabs.tsx'

export default function () {
	return (
		<Tabs>
			<Tabs.TabsList explain='Produtos disponíveis'>
				<Tabs.Tab class='bg-white data-[selected="true"]:bg-red-500'>Button 0</Tabs.Tab>
				<Tabs.Tab class='bg-white data-[selected="true"]:bg-red-500'>Button 1</Tabs.Tab>
				<Tabs.Tab class='bg-white data-[selected="true"]:bg-red-500'>Button 2</Tabs.Tab>
			</Tabs.TabsList>

			<Tabs.TabPanel class='bg-blue-400'>Tab 0</Tabs.TabPanel>
			<Tabs.TabPanel class='bg-yellow-400'>Tab 1</Tabs.TabPanel>
			<Tabs.TabPanel class='bg-orange-400'>Tab 2</Tabs.TabPanel>
		</Tabs>
	)
}
