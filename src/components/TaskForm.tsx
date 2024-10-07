import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Task } from '../types';
import DrawingCanvas from './DrawingCanvas';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [drawing, setDrawing] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && dueDate) {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        dueDate: dueDate.toISOString(),
        drawing,
      };
      addTask(newTask);
      setTitle('');
      setDescription('');
      setDueDate(null);
      setDrawing(null);
      setIsDrawing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full p-2 border rounded"
      />
      <DatePicker
        selected={dueDate}
        onChange={(date: Date) => setDueDate(date)}
        placeholderText="Select due date"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="button"
        onClick={() => setIsDrawing(!isDrawing)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isDrawing ? 'Close Drawing' : 'Open Drawing'}
      </button>
      {isDrawing && (
        <DrawingCanvas
          onSave={(dataUrl) => {
            setDrawing(dataUrl);
            setIsDrawing(false);
          }}
        />
      )}
      <button type="submit" className="bg-green-500 text-white p-2 rounded flex items-center">
        <Plus size={16} className="mr-2" />
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;