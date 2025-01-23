import React, { useState } from 'react';
import { 
  Award, 
  GraduationCap, 
  Target, 
  Plus, 
  X,
  Save,
} from 'lucide-react';
import { ImageUpload } from '../common/ImageUpload';
import { useImageUpload } from '../../hooks/useImageUpload';

interface Portfolio {
  achievements: Achievement[];
  education: Education[];
  skills: Skill[];
  goals: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'academic' | 'professional' | 'project';
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  current: boolean;
  gpa?: string;
}

interface Skill {
  name: string;
  level: number; // 1-5
}

export function MenteePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    profileImage: '',
    achievements: [
      {
        id: '1',
        title: 'First Place Hackathon',
        description: 'Won first place in University Hackathon for developing an AI-powered study assistant',
        date: '2024-02',
        type: 'project'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Tech University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startYear: 2021,
        current: true,
        gpa: '3.8'
      }
    ],
    skills: [
      { name: 'Python', level: 4 },
      { name: 'React', level: 3 },
      { name: 'Machine Learning', level: 2 }
    ],
    goals: ['Master Full Stack Development', 'Learn Cloud Architecture', 'Contribute to Open Source']
  });

  const [isEditing, setIsEditing] = useState(false);
  const { uploadImage, uploading } = useImageUpload();

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      setPortfolio(prev => ({
        ...prev,
        profileImage: imageUrl
      }));
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };
  const [newGoal, setNewGoal] = useState('');
  const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({
    title: '',
    description: '',
    date: '',
    type: 'project'
  });
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    level: 1
  });

  const addGoal = () => {
    if (newGoal && !portfolio.goals.includes(newGoal)) {
      setPortfolio({
        ...portfolio,
        goals: [...portfolio.goals, newGoal]
      });
      setNewGoal('');
    }
  };

  const removeGoal = (goal: string) => {
    setPortfolio({
      ...portfolio,
      goals: portfolio.goals.filter(g => g !== goal)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Portfolio</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
            isEditing ? 'text-white bg-green-600 hover:bg-green-700' : 'text-white bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {isEditing ? 'Save Changes' : 'Edit Portfolio'}
        </button>
      </div>

      {/* Profile Picture Section */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <ImageUpload
            currentImage={portfolio.profileImage}
            onImageUpload={handleImageUpload}
            className="w-32 h-32"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
            <Award className="w-5 h-5 mr-2" />
            Achievements
          </h3>
          {isEditing && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (newAchievement.title && newAchievement.description && newAchievement.date) {
                setPortfolio({
                  ...portfolio,
                  achievements: [...portfolio.achievements, {
                    id: Math.random().toString(36).substr(2, 9),
                    ...newAchievement as Achievement
                  }]
                });
                setNewAchievement({
                  title: '',
                  description: '',
                  date: '',
                  type: 'project'
                });
              }
            }} className="mb-4 bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="month"
                      value={newAchievement.date}
                      onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                      className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={newAchievement.type}
                      onChange={(e) => setNewAchievement({ ...newAchievement, type: e.target.value as Achievement['type'] })}
                      className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    >
                      <option value="project">Project</option>
                      <option value="academic">Academic</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Achievement
                  </button>
                </div>
              </div>
            </form>
          )}
          <div className="space-y-4">
            {portfolio.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start group">
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {achievement.type}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => setPortfolio({
                          ...portfolio,
                          achievements: portfolio.achievements.filter(a => a.id !== achievement.id)
                        })}
                        className="hidden group-hover:block p-1 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Skills Progress
          </h3>
          {isEditing && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (newSkill.name && newSkill.level) {
                setPortfolio({
                  ...portfolio,
                  skills: [...portfolio.skills, newSkill as Skill]
                });
                setNewSkill({
                  name: '',
                  level: 1
                });
              }
            }} className="mb-4 bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skill Level (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: Math.min(5, Math.max(1, parseInt(e.target.value))) })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </button>
              </div>
            </form>
          )}
          <div className="space-y-4">
            {portfolio.skills.map((skill, index) => (
              <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-gray-700">{skill.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-base text-gray-600">Level {skill.level}/5</span>
                    {isEditing && (
                      <button
                        onClick={() => setPortfolio({
                          ...portfolio,
                          skills: portfolio.skills.filter((_, i) => i !== index)
                        })}
                        className="hidden group-hover:block p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Goals Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Career Goals
          </h3>
          <div className="space-y-2">
            {portfolio.goals.map((goal) => (
              <div
                key={goal}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
              >
                <span className="text-gray-700">{goal}</span>
                {isEditing && (
                  <button
                    onClick={() => removeGoal(goal)}
                    className="hidden group-hover:block text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add new goal"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-base"
                />
                <button
                  onClick={addGoal}
                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}