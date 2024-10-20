import React, { useState } from 'react';
import { IMilestone } from '@/types/type';
import { formatDate } from '@/utils/DateFormatter';
import {
  CheckCheck,
  Loader
} from "lucide-react";
import { MilestoneDropdown } from './MilestoneMenu';
import { Input } from '../ui/input';

const ProjectMilestone = ({ project }: any) => {
  const [searchTerm, setSearchTerm] = useState("");  // State to track search input
  const [filteredMilestones, setFilteredMilestones] = useState<IMilestone[]>(project.milestones);

  // Filter milestones whenever searchTerm changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();  // Convert search term to lowercase
    setSearchTerm(searchValue);
    
    const filtered = project.milestones.filter((milestone: IMilestone) =>
      milestone.title.toLowerCase().includes(searchValue)
    );
    setFilteredMilestones(filtered);  // Update filtered milestones
  };

  return (
    <div>
      <div className='p-5'>
        <Input
          placeholder="Search milestone..."
          className='w-full'
          value={searchTerm}  // Bind search input value
          onChange={handleSearch}  // Call handleSearch on input change
        />
      </div>
      {filteredMilestones.map((milestone: IMilestone) => (
        <div key={milestone._id} className='border-b p-5 space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold'>{milestone.title}</h3>
            <div className='flex gap-x-5 items-center'>
              {milestone.completed ? (
                <CheckCheck className='w-4 text-green-400' />
              ) : (
                <Loader className='w-4 text-orange-400' />
              )}
              <MilestoneDropdown milestone={milestone} project={project} />
            </div>
          </div>
          <p className='text-sm text-gray-400'>{milestone.description}</p>
          <div className='flex items-center gap-3'>
            <span className='block text-xs'>Due Date:</span>
            <h6 className='block text-xs text-gray-400'>
              {formatDate(new Date(milestone.dueDate).toLocaleDateString())}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectMilestone
