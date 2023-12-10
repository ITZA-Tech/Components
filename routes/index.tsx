import Tabs from '$store/components/ui/Tabs/Tabs.tsx'

export default function () {
	return (
		<>
			<section class=' relative w-screen h-screen'>
				<Tabs vertical tabOpenIndex={1}  class='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex'>
					<Tabs.TabsList explain='Produtos disponíveis' class='flex flex-col'>
						<Tabs.Tab class='px-4 py-2 font-bold'>
							Button 0
						</Tabs.Tab>
						<Tabs.Tab class='px-4 py-2 font-bold'>
							Button 1
						</Tabs.Tab>
						<Tabs.Tab class='px-4 py-2 font-bold'>
							Button 2
						</Tabs.Tab>
					</Tabs.TabsList>

					<Tabs.TabPanel class='bg-blue-400'>Tab 0</Tabs.TabPanel>
					<Tabs.TabPanel class='bg-yellow-400'>Tab 1</Tabs.TabPanel>
					<Tabs.TabPanel class='bg-orange-400'>Tab 2</Tabs.TabPanel>
				</Tabs>
			</section>
		</>
	)
}
