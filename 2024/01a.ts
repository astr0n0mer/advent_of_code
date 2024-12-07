export const getInput = (input: string | undefined = undefined) => {
	const INPUT_FILE: string = input ? input : require('fs').readFileSync('./01.txt', 'utf-8')

	const { list_1, list_2 } = INPUT_FILE.trim().split('\n').reduce(({ list_1, list_2 }, line) => {
		const [n1, n2] = line.trim().split(/\s+/).map(Number)
		return { list_1: [...list_1, n1], list_2: [...list_2, n2] }
	}, { list_1: new Array<number>(), list_2: new Array<number>() })

	return { list_1, list_2 }
}

const main = () => {
	const { list_1, list_2 } = getInput()
	const sorted_list_1 = list_1.sort()
	const sorted_list_2 = list_2.sort()

	const distance = sorted_list_1.reduce((acc, element, i) => {
		const diff = Math.abs(element - sorted_list_2[i])
		return acc + diff
	}, 0)
	return distance
}

console.debug(main())
