"use client"
import Link from 'next/link' 
import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ErrorDialog } from './ErrorDialog'
import { LoadingSpinner } from './LoadingSpinner'
import { getTasks } from '@/lib/api'

export const Sidebar = ({ onAddTask, isSidebarOpen }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors]= useState([])

    useEffect(() => {
        async function fetchTasks() {
            try {
                const fetchedTasks = await getTasks()
                setTasks(fetchedTasks || [])
            } 
            catch(err) {
                setErrors([err.message])
            }
            finally {
                setLoading(false)
            }
        }
        fetchTasks()
    }, [])

    const formattedDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const closeDialogHandler = () => {
        setErrors(null)
    }
    
    if(loading) return <LoadingSpinner />

    return (
        <>
        {errors && errors.length > 0 && <ErrorDialog error={errors} onClose={closeDialogHandler}/>}
        <aside 
        className={`w-full sm:w-1/4 flex-shrink-0 h-full overflow-y-auto pt-20 fixed top-0 left-0 sm:relative transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex items-center justify-between p-4 mt-5">
                <button className="flex items-center space-x-2 py-2 px-4 border bg-black text-white rounded-md hover:bg-white hover:text-black hover:border-black transition duration-300" onClick={onAddTask}>
                    <span>Add more</span>
                    <PlusCircle className="w-5 h-5"/>
                </button>
            </div>
            <div className="p-4">
                <ul className="space-y-4">
                    {tasks.length > 0 ? tasks.map((task, index) => (
                        <li key={index} className="rounded-lg bg-gray-50 hover:bg-gray-100 sm:min-w-full">
                            <Link href={`/${task._id}`} className="block p-4"> 
                                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                <div className="text-xs text-gray-600">{task.description}</div>
                                <div className="text-xs text-gray-500 text-right">
                                    {formattedDate(task.date)}
                                </div>
                            </Link>
                        </li>
                    )) : (
                        <div className="rounded-lg bg-gray-50 hover:bg-gray-100 sm:min-w-full p-4">
                            <p className="text-gray-500 text-center">No tasks</p>
                        </div>
                    )}
                </ul>
            </div>
        </aside>
        </>
    )
}
