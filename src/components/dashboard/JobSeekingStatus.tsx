import React from 'react';
import { JobSeekingSection } from './JobSeekingSection';
import type { JobSeekingStatus as JobStatus } from '../../types';

interface JobSeekingStatusProps {
  status: JobStatus;
  onUpdate: (status: JobStatus) => void;
}

export function JobSeekingStatus({ status, onUpdate }: JobSeekingStatusProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <JobSeekingSection status={status} onUpdate={onUpdate} />
    </div>
  );
}