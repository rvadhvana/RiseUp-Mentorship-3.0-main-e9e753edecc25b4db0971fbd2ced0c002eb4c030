import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, BookOpen, UserCircle, Users } from 'lucide-react';
import { TaskList } from '../mentorship/TaskList';
import { SkillTracker } from '../mentorship/SkillTracker';
import { MenteePortfolio } from './MenteePortfolio';
import { JobSeekingStatus } from './JobSeekingStatus';
import type { ProgressUpdate, SkillProgress, JobSeekingStatus as JobStatus } from '../../types';

// Mock data - In a real app, this would come from an API
const MOCK_TASKS: ProgressUpdate[] = [
  {
    id: '1',
    date: '2024-03-15',
    title: 'Complete React Tutorial',
    description: 'Work through the official React tutorial and build a tic-tac-toe game',
    status: 'in_progress',
    deadline: '2024-03-30'
  },
  {
    id: '2',
    date: '2024-03-16',
    title: 'JavaScript ES6+ Features',
    description: 'Study and practice modern JavaScript features',
    status: 'pending',
    deadline: '2024-04-05',
    mentorFeedback: 'Focus on async/await and destructuring'
  }
];

const MOCK_SKILLS: SkillProgress[] = [
  {
    id: '1',
    skillName: 'React',
    currentLevel: 2,
    targetLevel: 5,
    progress: 40,
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    skillName: 'TypeScript',
    currentLevel: 1,
    targetLevel: 4,
    progress: 25,
    lastUpdated: '2024-03-15'
  }
];

const MOCK_JOB_STATUS = {
  isLookingForJob: true,
  preferences: {
    positions: ['Frontend Developer', 'Full Stack Developer'],
    expectedSalary: {
      min: 80000,
      max: 120000,
      currency: 'USD'
    },
    preferredCompanies: ['Google', 'Microsoft', 'Meta'],
    preferredLocations: ['San Francisco, CA', 'Seattle, WA'],
    remotePreference: 'hybrid' as const
  },
  lastUpdated: '2024-03-15'
};

export function MenteeDashboard() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [skills, setSkills] = useState(MOCK_SKILLS);
  const [jobStatus, setJobStatus] = useState(MOCK_JOB_STATUS);
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'job-seeking'>('overview');
  const navigate = useNavigate();

  const handleAddTask = (task: Omit<ProgressUpdate, 'id' | 'date'>) => {
    const newTask: ProgressUpdate = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      ...task
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleUpdateTaskStatus = (taskId: string, status: ProgressUpdate['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const handleUpdateSkillProgress = (skillId: string, progress: number) => {
    setSkills(skills.map(skill =>
      skill.id === skillId ? { ...skill, progress } : skill
    ));
  };

  const handleAddSkill = (skillData: Omit<SkillProgress, 'id' | 'lastUpdated'>) => {
    const newSkill: SkillProgress = {
      id: Math.random().toString(36).substr(2, 9),
      skillName: skillData.skillName,
      currentLevel: skillData.currentLevel,
      targetLevel: skillData.targetLevel,
      progress: skillData.progress,
      lastUpdated: new Date().toISOString()
    };
    setSkills([...skills, newSkill]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Learning Journey</h1>
            <p className="mt-1 text-gray-600 text-sm sm:text-base">Track your progress and manage tasks</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => navigate('/mentors')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                <Users className="w-4 h-4 mr-2" />
                Find Mentors
              </button>
              <Link
                to="/mentors"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                <Users className="w-4 h-4 mr-2" />
                Browse Mentors
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center">
              <UserCircle className="w-10 h-10 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Mentee</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`${
                activeTab === 'portfolio'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('job-seeking')}
              className={`${
                activeTab === 'job-seeking'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Job Seeking
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <TaskList
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onUpdateStatus={handleUpdateTaskStatus}
              isEditable={true}
            />
            <SkillTracker
              skills={skills}
              onUpdateProgress={handleUpdateSkillProgress}
              onAddSkill={handleAddSkill}
            />
          </div>
        )}
        
        {activeTab === 'portfolio' && <MenteePortfolio />}
        
        {activeTab === 'job-seeking' && (
          <JobSeekingStatus
            status={jobStatus}
            onUpdate={setJobStatus}
          />
        )}
      </div>
    </div>
  );
}