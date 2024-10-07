import React, { useState } from 'react';
import { Task } from '../types';
import { Pencil, Trash2, Save, Image } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  editTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [showDrawing, setShowDrawing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(editedTask);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const toggleDrawing = () => {
    setShowDrawing(!showDrawing);
  };

  return (
    <li className="bg-white shadow-md rounded-lg p-4">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate.split('T')[0]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
            <Save size={16} />
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          {task.drawing && (
            <button onClick={toggleDrawing} className="text-blue-500 mt-2">
              <Image size={16} /> {showDrawing ? 'Hide Drawing' : 'Show Drawing'}
            </button>
          )}
          {showDrawing && task.drawing && (
            <img src={task.drawing} alt="Task drawing" className="mt-2 max-w-full h-auto" />
          )}
          <div className="mt-2 space-x-2">
            <button onClick={handleEdit} className="text-blue-500">
              <Pencil size={16} />
            </button>
            <button onClick={() => deleteTask(task.id)} className="text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;