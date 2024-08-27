"use client"
import { useState, useEffect } from "react"

export const TaskForm = ({ task: initialTask, onSave, onCancel }) => {
    const [task, setTask] = useState({ title: '', description: '' })

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask)
        }
    }, [initialTask])

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setTask(prevTask => ({
            ...prevTask,
            [id === 'task-title' ? 'title' : 'description']: value
        }))
    }

    const saveTaskHandler = () => {
        onSave(task)
    }

    return (
        <div className="bg-white mt-24 p-4 h-[500px] shadow-sm">
            <input className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" id="task-title" type="text" placeholder="Title" value={task.title} onChange={handleInputChange} />
            <textarea className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" id="task-description" placeholder="Description" value={task.description} onChange={handleInputChange} rows="10"/>
            <div className="flex justify-end mt-4 space-x-4">
                <button  onClick={saveTaskHandler} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Save
                </button>
                <button  onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Cancel
                </button>
            </div>
        </div>
    )
}
