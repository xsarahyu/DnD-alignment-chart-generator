const alignmentDropdowns = document.querySelectorAll('.alignment-dropdown')
const trashButtons = document.querySelectorAll('.fa-trash')
const incrementsList = document.querySelector('.increments')

const incrementToAlignment = new Map() // Map to store the association between increment and alignment

// Initialize the incrementToAlignment map
document.querySelectorAll('.increment').forEach((incrementElement, index) => {
    const increment = incrementElement.querySelector('span').innerText.trim()
    const alignmentDropdown = alignmentDropdowns[index]
    const alignment = alignmentDropdown.value

    incrementToAlignment.set(increment, alignment)
    updateGridItemAlignment(increment, alignment) // Update the grid immediately
})

// Add event listeners for alignment dropdowns
alignmentDropdowns.forEach((alignmentDropdown, index) => {
    alignmentDropdown.addEventListener('change', function () {
        const incrementElement = this.closest('.increment') // Find the closest increment element
        const increment = incrementElement.querySelector('span').innerText.trim()
        const option = this.value

        // Update the backend
        fetch('/increments', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ increment, 'alignment': option })
        })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(data => {
            console.log(data)
            // Update the UI
            incrementToAlignment.set(increment, option)
            updateGridItemAlignment(increment, option)
        })
    })
})

// Add event listeners for trash buttons
trashButtons.forEach((trashButton, index) => {
    trashButton.addEventListener('click', function () {
        const incrementElement = this.closest('.increment') // Find the closest increment element
        const increment = incrementElement.querySelector('span').innerText.trim()

        // Update the backend
        fetch('/increments', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ increment })
        })
        // Update the UI
        .then(function (response) {
            removeGridItem(increment)
            window.location.reload()
        })
    })
})

// Update a grid item's alignment
function updateGridItemAlignment(increment, alignment) {
    const gridItem = document.querySelector(`.grid-item[data-increment="${increment}"]`)
    if (gridItem) {
        // Remove the grid item from the current alignment
        gridItem.parentNode.removeChild(gridItem)
    }
    // Add the grid item to the new alignment
    addGridItem(increment, alignment)
}

// Remove a grid item
function removeGridItem(increment) {
    const gridItem = document.querySelector(`.grid-item[data-increment="${increment}"]`)
    if (gridItem) {
        gridItem.parentNode.removeChild(gridItem)
    }
}

// Append a new grid item
function addGridItem(increment, alignment) {
    const gridItem = document.createElement('div')
    gridItem.classList.add('grid-item')
    gridItem.innerText = increment
    gridItem.setAttribute('data-increment', increment) // Set data attribute

    // Append to the corresponding grid container if it exists
    const alignmentId = alignment.toLowerCase().replace(' ', '-')
    const alignmentContainer = document.getElementById(alignmentId)
    if (alignmentContainer) {
        alignmentContainer.appendChild(gridItem)
    } else {
        console.error(`Alignment container not found for ID: ${alignmentId}`)
    }
}