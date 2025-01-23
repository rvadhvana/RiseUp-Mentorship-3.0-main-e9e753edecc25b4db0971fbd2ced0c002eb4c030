import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Target, BookOpen, Clock } from 'lucide-react';
import { TaskList } from '../mentorship/TaskList';
import { SkillTracker } from '../mentorship/SkillTracker';
import type { User, ProgressUpdate } from '../../types';

interface MenteeDetailsProps {
  mentee: User;
  onAddFeedback: (taskId: string, feedback: string) => void;
}

export function MenteeDetails({ mentee, onAddFeedback }: MenteeDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [activeFeedbackTask, setActiveFeedbackTask] = useState<string | null>(null);

  const handleSubmitFeedback = (taskId: string) => {
    onAddFeedback(taskId, feedback);
    setFeedback('');
    setActiveFeedbackTask(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{mentee.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{mentee.email}</p>
            {mentee.profile?.jobSeekingStatus?.isLookingForJob && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Seeking Job
              </span>
            )}
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-6">
          {/* Career Goals */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Career Goals
            </h4>
            <p className="text-gray-600">{mentee.profile?.careerGoals}</p>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Areas of Interest
            </h4>
            <div className="flex flex-wrap gap-2">
              {mentee.profile?.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Learning Tasks & Progress
            </h4>
            {mentee.profile?.progress ? (
              <div className="relative pl-6 border-l-2 border-blue-500 space-y-8">
                {mentee.profile.progress.map((task) => (
                  <div key={task.id} className="relative">
                    <div className="absolute -left-[1.81rem] top-0 w-4 h-4 rounded-full bg-blue-500" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-900">{task.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {new Date(task.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {task.status.replace('_', ' ').charAt(0).toUpperCase() + 
                         task.status.slice(1).replace('_', ' ')}
                      </span>
                    </div>

                    {task.mentorFeedback ? (
                      <div className="mt-4 bg-blue-50 rounded p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Your Feedback:</strong> {task.mentorFeedback}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        {activeFeedbackTask === task.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              placeholder="Enter your feedback..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => {
                                  setActiveFeedbackTask(null);
                                  setFeedback('');
                                }}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSubmitFeedback(task.id)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                              >
                                Submit Feedback
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setActiveFeedbackTask(task.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Add Feedback
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {/* Add Task Button */}
                <button
                  onClick={() => {/* Add task handler */}}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Task
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No tasks assigned yet.</p>
            )}
          </div>

          {/* Skills Progress */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Skills Progress
            </h4>
            {mentee.profile?.skills && (
              <div className="space-y-4">
                {mentee.profile.skills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.skillName}
                      </span>
                      <span className="text-sm text-gray-500">
                        Level {skill.currentLevel} / {skill.targetLevel}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Job Seeking Status */}
          {mentee.profile?.jobSeekingStatus?.isLookingForJob && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                Currently Looking for Job Opportunities
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-yellow-700">
                  <strong>Preferred Positions:</strong>{' '}
                  {mentee.profile.jobSeekingStatus.preferences?.positions.join(', ')}
                </p>
                <p className="text-sm text-yellow-700">
                  <strong>Expected Salary Range:</strong>{' '}
                  {mentee.profile.jobSeekingStatus.preferences?.expectedSalary?.currency}{' '}
                  {mentee.profile.jobSeekingStatus.preferences?.expectedSalary?.min.toLocaleString()} -{' '}
                  {mentee.profile.jobSeekingStatus.preferences?.expectedSalary?.max.toLocaleString()}
                </p>
                <p className="text-sm text-yellow-700">
                  <strong>Preferred Companies:</strong>{' '}
                  {mentee.profile.jobSeekingStatus.preferences?.preferredCompanies?.join(', ')}
                </p>
                <p className="text-sm text-yellow-700">
                  <strong>Work Mode:</strong>{' '}
                  {mentee.profile.jobSeekingStatus.preferences?.remotePreference}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}