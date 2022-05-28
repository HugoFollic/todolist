'use strict'

// DOM selection
const list = document.getElementById('list')
const input = document.getElementById('input')
const add = document.getElementById('add')
const clear = document.getElementById('clear')
const url = document.getElementById('url')
const load = document.getElementById('load')

// Retrieve the table of existing tasks
const tasks = ['Salle de sport', 'Tourner des tutos']

/**
 * function that adds tasks to the DOM with a delete button to which we 
 * attach an event
 */ 
function taskToDOM(task) {
    // If we have a non-empty string
    if (typeof task === 'string' &&  task) {
        const li = document.createElement('li')
        const remove = document.createElement('button')

        li.textContent = task
        remove.textContent = 'REMOVE'

        remove.addEventListener('click', () => {
            list.removeChild(remove.parentNode)
        })

        li.appendChild(remove)

        list.insertBefore(li, list.firstChild)
    }
}

// We add each spot to the smart list
tasks.forEach(task => taskToDOM(task))

/**
 * Function that manages the addition of a task with the ADD button and 
 * the 'Enter' key
 */
function newTask () {
    input.focus()
}

add.addEventListener('click', newTask)
input.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        newTask()
    }
})

// We delete the list of the DOM and the browser
clear.addEventListener('click', () => {
    list.innerHTML = ''
})

// Management of the import of tasks
load.addEventListener('click', () => {

})