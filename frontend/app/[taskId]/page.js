"use client"
import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteTask, getTask, updateTask } from '@/lib/api' 
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorDialog } from '@/components/ErrorDialog'
import { TaskForm } from '@/components/TaskForm'

export default function TaskDetails({ params }) {
    const [task, setTask] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!params.taskId) return
        const fetchedTask = async () => {
            try {
                const todo = await getTask(params.taskId)
                setTask(todo)
            } 
            catch(err) {
                setErrors([err.message])
            }
            finally {
                setLoading(false)
            }
        }
        fetchedTask()
    }, [params.taskId])

    const deleteTaskHandler = async () => {
        try {
            await deleteTask(params.taskId)
            
        } 
        catch(err) {
            setErrors([err.message])
        }
        finally {
            setLoading(false)
        }
    }

    const startEditingHandler = () => {
        setIsEditing(true)
    }

    const cancelEditingHandler = () => {
        setIsEditing(false)
    }

    const updateTaskHandler = async (updatedTask) => {
        try {
            await updateTask(params.taskId, updatedTask)
            setTask(updatedTask)
            setIsEditing(false)
        } 
        catch(err) {
            setErrors([err.message])
        }
        finally {
            setLoading(false)
        }
    }

    const closeDialogHandler = () => {
        setErrors(false)
    }

    if(loading) return <LoadingSpinner />
    
    if(!task && !isEditing) {
        return (
            <div className="mt-24 bg-white shadow-lg rounded-lg h-[500px] p-4 flex items-center justify-center">
                <p className="text-xl text-gray-600">No task found. It may have been deleted or does not exist.</p>
            </div>
        )
    }

    return (
        <>
        {errors && errors.length > 0 && <ErrorDialog error={errors} onClose={closeDialogHandler}/>}
        <div>
            {isEditing ? (
                <TaskForm task={task} onSave={updateTaskHandler} onCancel={cancelEditingHandler} />
            ) : (
            <div className="mt-24 bg-white shadow-lg rounded-lg h-[500px] p-4 relative">
                <button onClick={deleteTaskHandler} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <Trash2 size={24} strokeWidth={3} />
                </button>
                <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <p className="text-gray-700 mb-8">{task.description}</p>
                <button  onClick={startEditingHandler} className="absolute bottom-4 right-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    Update Task
                </button>
            </div>
            )}
        </div>
        </>
    )
}
