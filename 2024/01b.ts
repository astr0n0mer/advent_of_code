import { getInput } from './01a'

const getElementFrequence = (list: number[]) => {
	return list.reduce((acc, element) => {
		acc[element] = acc[element] ? acc[element] + 1 : 1
		return acc
	}, {} as Record<number, number>)
}

const main = () => {
	const INPUT_FILE = `3   4
		4   3
		2   5
		1   3
		3   9
		3   3`
	//const { list_1, list_2 } = getInput(INPUT_FILE)
	const { list_1, list_2 } = getInput()
	const frequence = getElementFrequence(list_2)
	const distance = list_1.reduce((acc, element) => {
		const similarityScore = (frequence[element] ? frequence[element] : 0) * element
		return acc + similarityScore
	}, 0)

	return distance
}

console.debug(main())
