import React, { useState } from 'react';
import { Briefcase, DollarSign, MapPin, Building, Plus, X } from 'lucide-react';
import type { JobSeekingStatus } from '../../types';

interface JobSeekingProps {
  status: JobSeekingStatus;
  onUpdate: (status: JobSeekingStatus) => void;
}

export function JobSeekingSection({ status, onUpdate }: JobSeekingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPosition, setNewPosition] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleStatusToggle = () => {
    onUpdate({
      ...status,
      isLookingForJob: !status.isLookingForJob,
      lastUpdated: new Date().toISOString()
    });
  };

  const addPosition = () => {
    if (newPosition && status.preferences?.positions) {
      onUpdate({
        ...status,
        preferences: {
          ...status.preferences,
          positions: [...status.preferences.positions, newPosition]
        },
        lastUpdated: new Date().toISOString()
      });
      setNewPosition('');
    }
  };

  const addCompany = () => {
    if (newCompany && status.preferences?.preferredCompanies) {
      onUpdate({
        ...status,
        preferences: {
          ...status.preferences,
          preferredCompanies: [...status.preferences.preferredCompanies, newCompany]
        },
        lastUpdated: new Date().toISOString()
      });
      setNewCompany('');
    }
  };

  const addLocation = () => {
    if (newLocation && status.preferences?.preferredLocations) {
      onUpdate({
        ...status,
        preferences: {
          ...status.preferences,
          preferredLocations: [...status.preferences.preferredLocations, newLocation]
        },
        lastUpdated: new Date().toISOString()
      });
      setNewLocation('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
          Job Seeking Status
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          {isEditing ? 'Save Changes' : 'Edit Preferences'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Currently looking for opportunities</span>
          <div
            onClick={handleStatusToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              status.isLookingForJob ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                status.isLookingForJob ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        {status.isLookingForJob && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Preferred Positions
              </h3>
              <div className="flex flex-wrap gap-2">
                {status.preferences?.positions.map((position) => (
                  <span
                    key={position}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {position}
                    {isEditing && (
                      <button
                        onClick={() => {
                          onUpdate({
                            ...status,
                            preferences: {
                              ...status.preferences,
                              positions: status.preferences.positions.filter(p => p !== position)
                            }
                          });
                        }}
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
                      value={newPosition}
                      onChange={(e) => setNewPosition(e.target.value)}
                      placeholder="Add position"
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    />
                    <button
                      onClick={addPosition}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Expected Salary Range
              </h3>
              {isEditing ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Min:</span>
                    <input
                      type="number"
                      value={status.preferences?.expectedSalary?.min}
                      onChange={(e) => onUpdate({
                        ...status,
                        preferences: {
                          ...status.preferences,
                          expectedSalary: {
                            ...status.preferences.expectedSalary,
                            min: parseInt(e.target.value)
                          }
                        }
                      })}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Max:</span>
                    <input
                      type="number"
                      value={status.preferences?.expectedSalary?.max}
                      onChange={(e) => onUpdate({
                        ...status,
                        preferences: {
                          ...status.preferences,
                          expectedSalary: {
                            ...status.preferences.expectedSalary,
                            max: parseInt(e.target.value)
                          }
                        }
                      })}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  {status.preferences?.expectedSalary?.min.toLocaleString()} -{' '}
                  {status.preferences?.expectedSalary?.max.toLocaleString()}{' '}
                  {status.preferences?.expectedSalary?.currency}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Preferred Companies
              </h3>
              <div className="flex flex-wrap gap-2">
                {status.preferences?.preferredCompanies?.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {company}
                    {isEditing && (
                      <button
                        onClick={() => {
                          onUpdate({
                            ...status,
                            preferences: {
                              ...status.preferences,
                              preferredCompanies: status.preferences.preferredCompanies?.filter(c => c !== company)
                            }
                          });
                        }}
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
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      placeholder="Add company"
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    />
                    <button
                      onClick={addCompany}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Work Location Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Mode
                  </label>
                  <select
                    value={status.preferences?.remotePreference}
                    onChange={(e) => onUpdate({
                      ...status,
                      preferences: {
                        ...status.preferences,
                        remotePreference: e.target.value as JobSeekingStatus['preferences']['remotePreference']
                      }
                    })}
                    disabled={!isEditing}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Locations
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {status.preferences?.preferredLocations?.map((location) => (
                      <span
                        key={location}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {location}
                        {isEditing && (
                          <button
                            onClick={() => {
                              onUpdate({
                                ...status,
                                preferences: {
                                  ...status.preferences,
                                  preferredLocations: status.preferences.preferredLocations?.filter(l => l !== location)
                                }
                              });
                            }}
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
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="Add location"
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                        />
                        <button
                          onClick={addLocation}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}