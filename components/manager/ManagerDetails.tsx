import { IProject } from '@/types/type';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  UserPlus,  // Replace 'UserRoundPlus' with 'UserPlus' from lucide-react
  Trash
} from "lucide-react";
import { MilestoneDrawer } from './AddMilestoneDrawer';
import ProjectDetails from './ProjectDetails';
import ProjectFunds from './ProjectFunds';
import ProjectMilestone from './ProjectMilestone';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectParticipants from './ProjectParticipants';
import { AddParticipants } from './AddParticipant';

interface ManagerDetailsProps {
  project: IProject | null; // Accept project or null if no project is selected
}

const ManagerDetails: React.FC<ManagerDetailsProps> = ({ project }) => {
  const [selectedTab, setSelectedTab] = useState("Milestone");
  // Check if no project is selected
  if (!project) {
    return <div className="w-full p-4">Select a project to see details</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-5 border-b">
        <h2>Welcome</h2>
        <div className="space-x-5">
          <Button variant="outline">
            <Trash className="w-4 h-4" /> {/* Replaced with UserPlus */}
          </Button>
        </div>
      </div>
      <div>
        
      </div>
      <div className="flex h-screen">
        <div className='w-full p-5'>
            <ProjectDetails project={project}/>
            <ProjectFunds project={project} />
            <p className='text-gray-400'><strong className='text-white'>Progress:</strong> {project.progress}%</p>
        </div>

        <div className='hidden lg:block w-[350px] border-l'>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="hidden lg:flex text-sm w-fit mx-auto my-5">
              <TabsTrigger value="Milestone">Milestone</TabsTrigger>
              <TabsTrigger value="Participants">Participants</TabsTrigger>
            </TabsList>

            <TabsContent value="Milestone">
              <div className='flex items-center justify-between mx-5'>
                <h2 className='font-bold'>Milestone</h2>
                <MilestoneDrawer projectId={project._id}/>
              </div>
              <ProjectMilestone project={project}/>
            </TabsContent>

            <TabsContent value="Participants">
              <div className='flex items-center justify-between mx-5'>
                <h2>Participants</h2>
                <AddParticipants project={project}/>
              </div>
              <ProjectParticipants project={project}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>  
    </div>
  );
};

export default ManagerDetails;
