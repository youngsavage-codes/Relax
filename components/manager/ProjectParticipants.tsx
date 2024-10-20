import React from 'react'
import { UserAvatar } from './Avatar'

const ProjectParticipants = ({project}: any) => {
  return (
    <div>
        {project.participants.map((participant: any) => (
            <div key={participant._id}>
                <div className='flex items-start border-b gap-3 p-5'>
                    <UserAvatar user={participant}/>
                    <div>
                        <h2 className='font-semibold'>
                            {participant.fullName}
                        </h2>
                        <p className='text-xs text-gray-400'>
                            {participant.email}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ProjectParticipants