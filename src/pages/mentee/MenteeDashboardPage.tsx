import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Target, 
  Clock, 
  Award,
  Plus,
  Star,
  Trophy
} from 'lucide-react';

interface MilestoneTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  assignedBy: string;
  points: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'streak' | 'completion' | 'excellence';
  unlockedAt?: string;
}

export function MenteeDashboardPage() {
  const { profile } = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<MilestoneTask[]>([]);
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Getting Started',
      description: 'Complete your first milestone',
      icon: 'streak',
    },
    {
      id: '2',
      title: 'On Fire',
      description: 'Complete 5 tasks in a row',
      icon: 'completion',
    },
    {
      id: '3',
      title: 'Rising Star',
      description: 'Earn 100 points',
      icon: 'excellence',
    },
  ]);

  const totalPoints = tasks.reduce((sum, task) => 
    sum + (task.isCompleted ? task.points : 0), 0
  );

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile?.first_name}! 👋
          </h1>
          <p className="mt-1 text-gray-600">
            Track your progress and complete milestones
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Points"
            value={totalPoints.toString()}
            icon={<Star className="h-6 w-6 text-yellow-500" />}
            color="yellow"
          />
          <StatCard
            title="Completed Tasks"
            value={tasks.filter(t => t.isCompleted).length.toString()}
            icon={<CheckCircle className="h-6 w-6 text-green-500" />}
            color="green"
          />
          <StatCard
            title="Active Tasks"
            value={tasks.filter(t => !t.isCompleted).length.toString()}
            icon={<Target className="h-6 w-6 text-blue-500" />}
            color="blue"
          />
          <StatCard
            title="Achievements"
            value={achievements.filter(a => a.unlockedAt).length.toString()}
            icon={<Trophy className="h-6 w-6 text-purple-500" />}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Tasks */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Current Tasks
              </h2>
              <button 
                onClick={() => setShowTaskForm(true)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Progress
              </button>
            </div>
            
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No tasks yet. Start by adding your progress!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center p-4 border border-gray-100 rounded-lg hover:border-blue-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleTaskComplete(task.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {task.points} points
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {task.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Achievements
              </h2>
              <span className="text-sm text-gray-500">
                {achievements.filter(a => a.unlockedAt).length} / {achievements.length}
              </span>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.unlockedAt 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    {achievement.icon === 'streak' && <Star className="h-8 w-8 text-yellow-500" />}
                    {achievement.icon === 'completion' && <CheckCircle className="h-8 w-8 text-green-500" />}
                    {achievement.icon === 'excellence' && <Trophy className="h-8 w-8 text-purple-500" />}
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Progress Modal */}
      {showTaskForm && (
        <AddProgressModal
          onClose={() => setShowTaskForm(false)}
          onSubmit={(newTask) => {
            setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
            setShowTaskForm(false);
          }}
        />
      )}
    </div>
  );
}

interface AddProgressModalProps {
  onClose: () => void;
  onSubmit: (task: Omit<MilestoneTask, 'id'>) => void;
}

function AddProgressModal({ onClose, onSubmit }: AddProgressModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedBy: '',
    points: 10,
    isCompleted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Add Progress</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned By</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.assignedBy}
              onChange={(e) => setFormData({ ...formData, assignedBy: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Add Progress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'purple' | 'blue' | 'green' | 'orange' | 'yellow';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    purple: 'bg-purple-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    yellow: 'bg-yellow-50'
  };

  return (
    <div className={`${colorClasses[color]} rounded-xl p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
} 