import { defineConfig } from '$fresh/server.ts'
import tailwind from '$fresh/plugins/tailwind.ts'
import useClient from './plugins/useClient.ts'

export default defineConfig({
	plugins: [tailwind(), useClient()],
})
