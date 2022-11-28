import differenceInDays from 'date-fns/differenceInDays/index.js'
import differenceInMonths from 'date-fns/differenceInMonths/index.js'
import differenceInYears from 'date-fns/differenceInYears/index.js'

// localStorage.setItem(
// 	'weightData',
// 	'[{"id":1,"date":"12","displayDate":"12","weight":120},{"id":1,"date":"12","displayDate":"12","weight":120}]'
// )
// localStorage.clear()
let weightData = JSON.parse(localStorage.getItem('weightData')) || []

const table = document.querySelector('.table')
const tableBody = document.querySelector('.table-body')
const lastRow = tableBody.lastElementChild

function init() {
	// If there is any info in the localstorage display it
	if (weightData.length > 0) {
		verificationsForDisplay()
		weightData.forEach(row => {
			insertRow(row)

			createBtnListener(row.id)
		})
	}

	const submitBtn = document.getElementById('submit')

	submitBtn.addEventListener('click', e => {
		// Prevent from submiting the form
		e.preventDefault()

		// Validate all the inputs
		if (!validate()) return

		// Generate te data
		const newRowData = generateNewRowData()

		// Add newRowData to Array
		weightData.push(newRowData)

		verificationsForDisplay()

		// Insert new row
		insertRow(newRowData)

		// Update the values in localStorage
		localStorage.setItem('weightData', JSON.stringify(weightData))

		// Add click listener to the delete btn
		createBtnListener(newRowData.id)
	})
}

function validate() {
	const weight = parseFloat(document.getElementById('weight').value)
	const date = new Date(document.getElementById('date').value)

	if (!weight) {
		setNewErrorAlert('Weight field cannot be empty')
		return false
	}
	if (date == 'Invalid Date') {
		setNewErrorAlert('Date field cannot be empty')
		return false
	}

	if (weight < 0) {
		setNewErrorAlert('Weight cannot be negative')
		return false
	}

	if (weightData.length > 0)
		if (differenceInDays(date, weightData[weightData.length - 1].date) < 0) {
			setNewErrorAlert('Cannot enter past dates')
			return false
		}

	return true
}

function generateNewRowData() {
	// Get the values
	const weight = parseFloat(document.getElementById('weight').value)

	// Date for calculations
	const date = new Date(document.getElementById('date').value)
	// Date for display
	const displayDate = document.getElementById('date').value

	// Generate simple id
	const id = weightData.length + 1

	return {
		id,
		date,
		displayDate,
		weight,
	}
}

function verificationsForDisplay() {
	// Only show the table if there is at least 1 row
	if (weightData.length >= 1) table.classList.remove('d-none')

	// Only show the results if the is 2 or more rows
	if (weightData.length >= 2) {
		lastRow.classList.remove('d-none')

		generateFinalMsgs()
	}
}

function insertRow(newRowData) {
	const newRow = document.createElement('tr')
	newRow.innerHTML = `
		<td class="border">${newRowData.displayDate}</td>
		<td class="border">${newRowData.weight}Kg</td>
		<td class="border">
		<button type="button" class="btn-close delete-btn-${newRowData.id}" aria-label="Close"></button>
	`
	tableBody.insertBefore(newRow, lastRow)
}

function createBtnListener(id) {
	const btn = document.querySelector(`.delete-btn-${id}`)

	btn.addEventListener('click', e => {
		removeRow(id, btn)
	})
}

// Utils
function setNewErrorAlert(msg) {
	const errorsContainer = document.querySelector('.errors-container')

	const newMsgDiv = document.createElement('div')

	newMsgDiv.classList.add(
		'alert',
		'alert-danger',
		'alert-dismissible',
		'fade',
		'show'
	)
	newMsgDiv.setAttribute('role', 'alert')
	newMsgDiv.innerHTML = `
			<div>${msg}</div>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
			></button>
		`

	errorsContainer.appendChild(newMsgDiv)
}

function generateFinalMsgs() {
	const weightResult = document.querySelector('.weight-result')
	const timeTracking = document.querySelector('.time-tracking')

	weightResult.innerHTML = generateWeightMsg()

	timeTracking.innerHTML = generateTimeMsg()
}

function generateWeightMsg() {
	const result = weightData[0].weight - weightData[weightData.length - 1].weight

	if (result < 0) return `You've gained ${Math.abs(result)}Kg 😢`

	if (result > 0) return `You've lost ${result}Kg 😃`

	return `You haven't lost or gained any weight`
}

function generateTimeMsg() {
	let daysTracking = differenceInDays(
		weightData[weightData.length - 1].date,
		weightData[0].date
	)

	let monthsTracking = differenceInMonths(
		weightData[weightData.length - 1].date,
		weightData[0].date
	)

	let yearsTracking = differenceInYears(
		weightData[weightData.length - 1].date,
		weightData[0].date
	)

	if (yearsTracking > 0) {
		monthsTracking -= 12 * yearsTracking

		daysTracking -= 365 * yearsTracking

		if (monthsTracking === 0 && daysTracking === 0) {
			if (yearsTracking) return `${yearsTracking} year tracking`

			return `${yearsTracking} years tracking`
		}

		if (monthsTracking === 0) {
			if (yearsTracking === 1 && daysTracking === 1)
				return `${yearsTracking} year and ${daysTracking} day tracking`

			if (yearsTracking === 1)
				return `${yearsTracking} year and ${daysTracking} days tracking`

			if (daysTracking === 1)
				return `${yearsTracking} years and ${daysTracking} day tracking`

			return `${yearsTracking} years and ${daysTracking} days tracking`
		}

		if (daysTracking === 0) {
			if (yearsTracking === 1 && monthsTracking === 1)
				return `${yearsTracking} year and ${monthsTracking} month tracking`

			if (yearsTracking === 1)
				return `${yearsTracking} year and ${monthsTracking} months tracking`

			if (monthsTracking === 1)
				return `${yearsTracking} years and ${monthsTracking} month tracking`

			return `${yearsTracking} years and ${monthsTracking} months tracking`
		}

		if (monthsTracking > 0) {
			daysTracking -= 30 * monthsTracking

			return `${yearsTracking} years, ${monthsTracking} months and ${daysTracking} days tracking`
		}
	}

	if (monthsTracking > 0) {
		daysTracking -= 30 * monthsTracking

		if (daysTracking === 0) {
			if (monthsTracking === 1) return `${monthsTracking} month tracking`
			return `${monthsTracking} months tracking`
		}

		if (daysTracking === 1)
			return `${monthsTracking} months and ${daysTracking} day tracking`

		return `${monthsTracking} months and ${daysTracking} days tracking`
	}

	if (daysTracking === 1) return `${daysTracking} day tracking`
	return `${daysTracking} days tracking`
}

function removeRow(id, btn) {
	const parentRow = btn.parentElement.parentElement

	// Find the index of the row to delete
	const dataRowIndex = weightData.findIndex(row => row.id === id)

	// Remove from array
	weightData.splice(dataRowIndex, 1)

	// Update tha values in locaStorage
	localStorage.setItem('weightData', JSON.stringify(weightData))

	// Remove element
	tableBody.removeChild(parentRow)

	if (weightData.length === 0) table.classList.add('d-none')

	if (weightData.length <= 1) lastRow.classList.add('d-none')
}

window.addEventListener('load', init)
