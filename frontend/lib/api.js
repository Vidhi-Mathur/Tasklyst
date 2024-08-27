
export async function getTasks() {
    try {
        const response = await fetch('http://localhost:3000')
        const result = await response.json()
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch tasks')
        }
        return result.todo
    } 
    catch(err) {
        throw new Error(err.message || 'Failed to fetch tasks')
    }
}

export async function getTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/${taskId}`)
        const result = await response.json()
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch task')
        }
        return result.todo
    } 
    catch(err) {
        throw new Error(err.message || 'Failed to fetch task')
    }
}

export async function createTask(task) {
    try {
        const response = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })
        const result = await response.json()
        if (!response.ok) {
            throw new Error(result.message || 'Failed to create task')
        }
        return result.todo
    } 
    catch (err) {
        throw new Error(err.message || 'Failed to create task')
    }
}

export async function updateTask(taskId, task) {
    try {
        const response = await fetch(`http://localhost:3000/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })
        const result = await response.json()
        if (!response.ok) {
            // setErrors(result.message)
            return
        }
        return result.todo
    } 
    catch (err) {
        console.log(err.message)
        // setErrors(err.message || "Updating task failed, try again later")
    }
}

export async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/${taskId}`, {
            method: "DELETE"
        })
        const result = await response.json()
        if (!response.ok) {
            setErrors(result.message)
            return
        }
        return result.message
    } 
    catch (err) {
        setErrors(err.message || "Deleting task failed, try again later")
    }
}