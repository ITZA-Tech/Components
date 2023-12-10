import { readline } from 'https://deno.land/x/readline@v1.1.0/mod.ts'
import { expandGlob } from 'std/fs/expand_glob.ts'
import { Plugin } from '$fresh/server.ts'
import { toFileUrl } from 'std/path/to_file_url.ts'

const islands = new Set<string>()
const decoder = new TextDecoder()
const exclude = JSON.parse(await Deno.readTextFile('deno.json')).exclude

for await (const file of expandGlob('**/*.tsx', {
    exclude: exclude ?? [],
})) {
    if (!file.isFile) throw new Error(`${file.path} is not a file`)

    const f = await Deno.open(file.path)
    for await (const line of readline(f)) {
        if (decoder.decode(line).match(/['"]use client['"]/)) {
            islands.add(toFileUrl(file.path).href)
        }

        break
    }

    f.close()
}

export default function (): Plugin {
    return {
        name: 'useClient',
        islands: {
            baseLocation: '',
            paths: [...islands],
        },
    }
}
