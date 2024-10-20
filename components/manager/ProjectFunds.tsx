import React from 'react'

const ProjectFunds = ({project}: any) => {
  return (
    <div>
        {project.budget !== undefined && <p className='text-gray-400'><strong className='text-white'>Budget:</strong> ${project.budget.toLocaleString()}</p>}
        {project.expenses !== undefined && <p className='text-gray-400'><strong className='text-white'>Expenses:</strong> ${project.expenses.toLocaleString()}</p>}
    </div>
  )
}

export default ProjectFunds