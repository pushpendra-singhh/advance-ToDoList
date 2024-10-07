import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  editTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask }) => {
  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </ul>
  );
};

export default TaskList;