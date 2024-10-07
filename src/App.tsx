import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DateRangeFilter from './components/DateRangeFilter';
import { Task } from './types';
import useLocalStorage from './useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    filterTasks();
  }, [tasks, dateRange]);

  const addTask = (task: Task) => {
    console.log('Adding new task:', task);
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    console.log('Deleting task with id:', id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
    console.log('Editing task:', updatedTask);
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const filterTasks = () => {
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      setFilteredTasks(tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= startDate && taskDate <= endDate;
      }));
    } else {
      setFilteredTasks(tasks);
    }
    console.log('Filtered tasks:', filteredTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">To-Do List</h1>
          <TaskForm addTask={addTask} />
          <DateRangeFilter setDateRange={setDateRange} />
          <TaskList tasks={filteredTasks} deleteTask={deleteTask} editTask={editTask} />
        </div>
      </div>
    </div>
  );
}

export default App;