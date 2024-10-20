import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatDate } from '@/utils/DateFormatter';
import { IProject } from '@/types/type';


const ProjectCard: React.FC<IProject> = ({ name, description, startDate, endDate, budget, progress }) => {
  return (
    <div>
      <Card className="lg:w-[350px] hover:bg-gray-800 z-30 relative mx-auto transition duration-300 ease-in-out">
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>{name}</CardTitle>
                <div className='w-12 h-12'>
                    <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={{
                        root: { width: '100%', height: '100%' },
                        path: { stroke: '#4caf50' }, // green color for progress
                        text: { fill: '#fff', fontSize: '16px' },
                        trail: { stroke: '#d6d6d6' },
                    }}
                    />
                </div>
            </div>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 text-xs">
          <p><strong>Start Date:</strong> {formatDate(new Date(startDate).toLocaleDateString())}</p>
          {endDate && <p><strong>End Date:</strong>{formatDate(new Date(endDate).toLocaleDateString())}</p>}
          {budget !== undefined && <p><strong>Budget:</strong> $ {budget.toLocaleString()}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-gray-500">Created on {formatDate(new Date().toLocaleDateString())}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
