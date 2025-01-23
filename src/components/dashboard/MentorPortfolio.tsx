import React, { useState } from 'react';
import { 
  Award, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  X,
  Edit2,
  Save, 
  ExternalLink 
} from 'lucide-react';
import { ImageUpload } from '../common/ImageUpload';
import { useImageUpload } from '../../hooks/useImageUpload';

interface NewCertificate {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface NewWorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface Portfolio {
  skills: string[];
  certificates: Certificate[];
  workExperience: WorkExperience[];
  education: Education[];
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  current: boolean;
}

export function MentorPortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    profileImage: '',
    skills: ['React', 'TypeScript', 'Node.js'],
    certificates: [
      {
        id: '1',
        name: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2024-01',
        url: 'https://aws.amazon.com/certification'
      }
    ],
    workExperience: [
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2022-01',
        current: true,
        description: 'Leading the frontend development team'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Tech University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startYear: 2018,
        endYear: 2020,
        current: false
      }
    ]
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
  const [newCertificate, setNewCertificate] = useState<NewCertificate>({
    name: '',
    issuer: '',
    date: '',
    url: ''
  });
  const [newWorkExperience, setNewWorkExperience] = useState<NewWorkExperience>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill && !portfolio.skills.includes(newSkill)) {
      setPortfolio({
        ...portfolio,
        skills: [...portfolio.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter(s => s !== skill)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Professional Portfolio</h2>
        <button
          onClick={() => setIsEditing(prev => !prev)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Edit2 className="w-4 h-4 mr-2" />
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

      {/* Skills Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Skills & Expertise
        </h3>
        <div className="flex flex-wrap gap-2">
          {portfolio.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </span>
          ))}
          {isEditing && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md text-base w-full md:w-96"
                placeholder="Add new skill"
              />
              <button
                onClick={addSkill}
                className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Certificates Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Certifications & Awards
        </h3>
        {isEditing && (
          <form onSubmit={(e) => {
            e.preventDefault();
            if (newCertificate.name && newCertificate.issuer && newCertificate.date) {
              setPortfolio({
                ...portfolio,
                certificates: [...portfolio.certificates, {
                  id: Math.random().toString(36).substr(2, 9),
                  ...newCertificate
                }]
              });
              setNewCertificate({
                name: '',
                issuer: '',
                date: '',
                url: ''
              });
            }
          }} className="mb-4 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Certificate Name</label>
                <input
                  type="text"
                  value={newCertificate.name}
                  onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                  className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                <input
                  type="text"
                  value={newCertificate.issuer}
                  onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                  className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                <input
                  type="month"
                  value={newCertificate.date}
                  onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                  className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Certificate URL</label>
                <input
                  type="url"
                  value={newCertificate.url}
                  onChange={(e) => setNewCertificate({ ...newCertificate, url: e.target.value })}
                  className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                  placeholder="https://"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Certificate
              </button>
            </div>
          </form>
        )}
        <div className="space-y-4">
          {portfolio.certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-start justify-between p-4 border border-gray-200 rounded-lg group"
            >
              <div>
                <h4 className="font-medium text-gray-900">{cert.name}</h4>
                <p className="text-sm text-gray-600">
                  Issued by {cert.issuer} • {cert.date}
                </p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center mt-1"
                  >
                    View Certificate
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => setPortfolio({
                    ...portfolio,
                    certificates: portfolio.certificates.filter(c => c.id !== cert.id)
                  })}
                  className="hidden group-hover:block text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Work Experience
        </h3>
        {isEditing && (
          <form onSubmit={(e) => {
            e.preventDefault();
            if (newWorkExperience.company && newWorkExperience.position && newWorkExperience.startDate) {
              setPortfolio({
                ...portfolio,
                workExperience: [...portfolio.workExperience, {
                  id: Math.random().toString(36).substr(2, 9),
                  ...newWorkExperience
                }]
              });
              setNewWorkExperience({
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
              });
            }
          }} className="mb-4 bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={newWorkExperience.company}
                    onChange={(e) => setNewWorkExperience({ ...newWorkExperience, company: e.target.value })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    value={newWorkExperience.position}
                    onChange={(e) => setNewWorkExperience({ ...newWorkExperience, position: e.target.value })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="month"
                    value={newWorkExperience.startDate}
                    onChange={(e) => setNewWorkExperience({ ...newWorkExperience, startDate: e.target.value })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="month"
                    value={newWorkExperience.endDate}
                    onChange={(e) => setNewWorkExperience({ ...newWorkExperience, endDate: e.target.value })}
                    className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                    disabled={newWorkExperience.current}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newWorkExperience.current}
                  onChange={(e) => setNewWorkExperience({ 
                    ...newWorkExperience, 
                    current: e.target.checked,
                    endDate: e.target.checked ? '' : newWorkExperience.endDate 
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I currently work here
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newWorkExperience.description}
                  onChange={(e) => setNewWorkExperience({ ...newWorkExperience, description: e.target.value })}
                  rows={3}
                  className="mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </button>
            </div>
          </form>
        )}
        <div className="space-y-4">
          {portfolio.workExperience.map((exp) => (
            <div
              key={exp.id}
              className="p-4 border border-gray-200 rounded-lg group"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.position}</h4>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => setPortfolio({
                      ...portfolio,
                      workExperience: portfolio.workExperience.filter(e => e.id !== exp.id)
                    })}
                    className="hidden group-hover:block text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}