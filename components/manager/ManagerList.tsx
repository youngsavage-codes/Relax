import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from '../ui/input';
import ProjectCard from './ProjectCard';
import { IProject } from '@/types/type';
import { GetOwnedProjects } from '@/api/manager';
import { CreateProjectDrawer } from './CreateProjectDrawer';

interface ManagerListProps {
  onProjectSelect: (project: IProject) => void;
}

const ManagerList: React.FC<ManagerListProps> = ({ onProjectSelect }) => {
  const [selectedTab, setSelectedTab] = useState("MyProjects");
  const [projectData, setProjectData] = useState<IProject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await GetOwnedProjects(); // Fetch the projects from the backend
        setProjectData(projects); // Set the fetched project data
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on the search term
  const filteredProjects = projectData.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hidden lg:block w-[500px] border-r">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex justify-between items-center border-b p-5">
          <h2>Projects</h2>
          <TabsList className="flex text-sm">
            <TabsTrigger value="MyProjects">Owned</TabsTrigger>
            <TabsTrigger value="Invited">Invited</TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full flex justify-between gap-5 p-5">
          <Input
            placeholder="Search Project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          <CreateProjectDrawer />
        </div>

        <TabsContent value="MyProjects" className="space-y-5 h-[800px] overflow-y-scroll pb-5 scrolls">
          {loading ? ( // Show loading indicator while fetching data
            <p>Loading projects...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div key={index} onClick={() => onProjectSelect(project)}>
                <ProjectCard {...project} />
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </TabsContent>

        <TabsContent value="Invited">
          {/* Add invited projects similarly, if any */}
          <p>No invited projects available.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerList;
