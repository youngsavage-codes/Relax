import { formatDate } from '@/utils/DateFormatter';
import React from 'react'

const ProjectDetails = ({project}: any) => {
      // Ensure the dates are parsed correctly
  const startDate = new Date(project.startDate);
  const endDate = project.endDate ? new Date(project.endDate) : null;
  return (
    <div>
        <h1 className="text-xl font-bold">{project.name}</h1>
        <p className='text-gray-400'>{project.description}</p>
        <p className='text-gray-400'><strong className='text-white'>Category:</strong> {project.category}</p>
        <p className='text-gray-400'><strong className='text-white'>Type:</strong> {project.type}</p>
        <p className='text-gray-400'><strong className='text-white'>Github Url:</strong> {project.githubRepoLink}</p>
        <p className='text-gray-400'><strong className='text-white'>Guthub Clone Url:</strong> {project.cloneLink}</p>
        <p className='text-gray-400'><strong className='text-white'>Status:</strong> {project.status}</p>
        <p className='text-gray-400'><strong className='text-white'>Start Date:</strong> {formatDate(startDate.toLocaleDateString())}</p>
        {endDate && <p className='text-gray-400'><strong className='text-white'>End Date:</strong> {formatDate(endDate.toLocaleDateString())}</p>}
    </div>
  )
}

export default ProjectDetails