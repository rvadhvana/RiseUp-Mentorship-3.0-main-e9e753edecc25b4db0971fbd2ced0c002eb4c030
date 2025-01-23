import React, { useState } from 'react';
import { CheckSquare, Clock, AlertCircle, Plus, X } from 'lucide-react';
import type { ProgressUpdate } from '../../types';

interface TaskListProps {
  tasks: ProgressUpdate[];
  onUpdateStatus: (taskId: string, status: ProgressUpdate['status']) => void;
  onAddTask?: (task: Omit<ProgressUpdate, 'id' | 'date'>) => void;
  onDeleteTask?: (taskId: string) => void;
  isEditable?: boolean;
}

export function TaskList({ tasks, onUpdateStatus, onAddTask, onDeleteTask, isEditable = true }: TaskListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'pending' as ProgressUpdate['status']
  });

  const getStatusIcon = (status: ProgressUpdate['status']) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddTask) {
      onAddTask(newTask);
      setNewTask({
        title: '',
        description: '',
        deadline: '',
        status: 'pending'
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Learning Tasks</h2>
        {isEditable && onAddTask && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`border rounded-lg p-4 transition-colors ${
              task.status === 'completed'
                ? 'bg-green-50 border-green-200'
                : task.status === 'in_progress'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="pt-1">
                  {getStatusIcon(task.status)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  {task.deadline && (
                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  value={task.status}
                  onChange={(e) => onUpdateStatus(task.id, e.target.value as ProgressUpdate['status'])}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="pending">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                
                {isEditable && onDeleteTask && (
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            
            {task.mentorFeedback && (
              <div className="mt-4 bg-blue-50 rounded-md p-3">
                <p className="text-sm text-blue-800">
                  <strong>Mentor Feedback:</strong> {task.mentorFeedback}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}