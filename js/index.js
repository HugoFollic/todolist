'use strict'

// DOM selection
const list = document.getElementById('list')
const input = document.getElementById('input')
const add = document.getElementById('add')
const clear = document.getElementById('clear')
const url = document.getElementById('url')
const load = document.getElementById('load')

// New instance for the key 'tasks'
const storage = new ArrayStorage('tasks')

// Retrieve the table of existing tasks or empty array
const tasks = storage.list

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
            const value = remove.parentNode.firstChild.textContent
            storage.remove(value)
            list.removeChild(remove.parentNode)
        })

        li.appendChild(remove)

        list.insertBefore(li, list.firstChild)

        return true
    }
    return false
}

// We add each spot to the smart list
tasks.forEach(task => taskToDOM(task))

/**
 * Function that manages the addition of a task with the ADD button and 
 * the 'Enter' key
 */
function newTask () {
    if (storage.list.indexOf(input.value) === -1 && taskToDOM(input.value)) {
        storage.set(input.value)
        input.value = ''
    }
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
    storage.clear()
    list.innerHTML = ''
})

// Management of the import of tasks
load.addEventListener('click', () => {
    fetch(url.value)
        .then(response => {
            if ( response.ok) {
                return response.json()
            }
            throw new Error(`${response.statusText} (${response.status})`)
        })
        .then(tasks => {
            if (Array.isArray(tasks)) {
                tasks.forEach(task => {
                    if (storage.list.indexOf(task) === -1 && taskToDOM(task)) {
                        storage.set(task)
                        
                    }
                })
                return
            }
            throw new TypeError(`Not a JSON array (type: ${typeof tasks})`)
        })
})