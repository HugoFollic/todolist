'use strict'

// Local storage of tasks

class ArrayStorage {

    constructor(name) {
        this.name = name
        this.list = this.get()
    }

    
    // Method to retrieve a table of values or create one by default
    get() {
        if (!localStorage.getItem(this.name)) {
            localStorage.setItem(this.name, '[]')
        }
        return JSON.parse(localStorage.getItem(this.name))
    }

    // Method to add a value to the table
    set(value) {
        this.list.push(value)
        localStorage.setItem(this.name, JSON.stringify(this.list))
    }

    // Method to remove a value from the table
    remove(value) {
        const index = this.list.indexOf(value)
        this.list.splice(index, 1)
        localStorage.setItem(this.name, JSON.stringify(this.list))
    }

    // Method for clearing the whole array
    clear() {
        localStorage.removeItem(this.name)
    }
}