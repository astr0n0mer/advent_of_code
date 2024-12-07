export const getInput = (input: string | undefined = undefined) => {
	const INPUT_FILE: string = input ? input : require('fs').readFileSync('./02.txt', 'utf-8')
	const reports = INPUT_FILE.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number))
	return reports
}

const isSafeReport = (report: number[]) => {
	if (report.length < 2 || report[0] === report[1]) return false;

	const isIncreasing = report[0] < report[1] ? true : false
	const MIN_LEVEL_DIFF = 1
	const MAX_LEVEL_DIFF = 3

	for (let i = 0; i < report.length - 1; i++) {
		const diff = report[i] - report[i + 1]
		if (Math.abs(diff) < MIN_LEVEL_DIFF || Math.abs(diff) > MAX_LEVEL_DIFF || (isIncreasing && diff >= 0) || (!isIncreasing && diff <= 0)) {
			return false
		}
	}
	return true
}

const main = () => {
	const reports = getInput()
	const safeReports = reports.filter(isSafeReport)
	return safeReports.length
}

console.debug(main())
