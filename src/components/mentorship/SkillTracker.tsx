import React, { useState } from 'react';
import { Target, TrendingUp, Plus } from 'lucide-react';
import type { SkillProgress } from '../../types';

interface SkillTrackerProps {
  skills: SkillProgress[];
  onUpdateProgress: (skillId: string, progress: number) => void;
  onAddSkill?: (skill: Omit<SkillProgress, 'id' | 'lastUpdated'>) => void;
}

export function SkillTracker({ skills, onUpdateProgress, onAddSkill }: SkillTrackerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({
    skillName: '',
    currentLevel: 1,
    targetLevel: 5,
    progress: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddSkill) {
      onAddSkill(newSkill);
    }
    setIsAdding(false);
    setNewSkill({
      skillName: '',
      currentLevel: 1,
      targetLevel: 5,
      progress: 0
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Skill Progress
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </button>
      </div>
      
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkill.skillName}
                onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Level (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newSkill.currentLevel}
                  onChange={(e) => setNewSkill({ ...newSkill, currentLevel: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Level (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newSkill.targetLevel}
                  onChange={(e) => setNewSkill({ ...newSkill, targetLevel: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
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
              Add Skill
            </button>
          </div>
        </form>
      )}
      
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {skill.skillName}
                </h3>
                <p className="text-sm text-gray-500">
                  Current Level: {skill.currentLevel} / Target: {skill.targetLevel}
                </p>
              </div>
              <TrendingUp className={`w-5 h-5 ${
                skill.progress >= 80 ? 'text-green-500' :
                skill.progress >= 50 ? 'text-yellow-500' : 'text-red-500'
              }`} />
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {skill.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${skill.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.progress}
                onChange={(e) => onUpdateProgress(skill.id, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}