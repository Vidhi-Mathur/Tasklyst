"use client"
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/SideBar';
import { TaskForm } from '@/components/TaskForm'
import "./globals.css";
import { createTask } from '@/lib/api';

export default function RootLayout({ children }) {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [tasks, setTasks] = useState([]); // Assuming you want to keep track of tasks

    const handleAddTask = async (task) => {
        try {
            const newTask = await createTask(task);
            setTasks([...tasks, newTask]); // Update the state with the new task
            setIsAddingTask(false);
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };
  
    return (
      <html lang="en">
        <body className="bg-orange-100 flex flex-col h-screen">
          <Header />
          <div className="flex flex-grow overflow-hidden">
            <Sidebar onAddTask={() => setIsAddingTask(true)} />
            <main className="flex-grow p-4" >
              {isAddingTask ? <TaskForm task={{ title: '', description: '' }} onSave={handleAddTask} onCancel={() => setIsAddingTask(false)} /> : children}
            </main>
          </div>
        </body>
      </html>
    );
}
