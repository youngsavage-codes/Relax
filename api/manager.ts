import { IMilestone, IProject } from "@/types/type"; // Assuming the project type is defined here
import axios from "axios";

const url = "http://localhost:5000/api/project";

// Retrieve the user from localStorage and parse it
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Function to create a project
export const CreateProject = async (projectData: IProject) => {
  try {
    const response = await axios.post(`${url}/create`, projectData, {
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.data.message}`);
    }

    console.log("Project created successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to create project:", err);
    throw err;
  }
};

// Function to get all projects
export const GetOwnedProjects = async (): Promise<IProject[]> => {
  try {    
    // Check if user object and userId are available
    if (!user || !user._id) {
      throw new Error("User ID not found in localStorage.");
    }

    // Send GET request to fetch owned projects using the user ID
    const response = await axios.get(`${url}/owned/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.data.message}`);
    }

    console.log("Projects fetched successfully:", response.data);
    return response.data; // Return the list of projects
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    throw err;
  }
};

// Function to add participants to a project
export const AddParticipantsToProject = async (projectId: string, participantIds: string[]) => {
  try {
    const response = await axios.post(`${url}/${projectId}/add/participants`, { userIds: participantIds }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.data.message}`);
    }

    console.log("Participants added successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add participants:", err);
    throw err;
  }
};



// Function to add a milestone to a project
export const AddMilestone = async (projectId: string, milestoneData: IMilestone) => {
  try {
    const response = await axios.post(`${url}/milestone/${projectId}/milestones`, milestoneData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.data.message}`);
    }

    console.log("Milestone added successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add milestone:", err);
    throw err;
  }
};

export const RemoveMilestone = async (projectId: string, milestoneId: IMilestone) => {
  try {
    const response = await axios.delete(`${url}/milestone/${projectId}/milestones/${milestoneId}`,{
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.data.message}`);
    }

    console.log("Milestone added successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to add milestone:", err);
    throw err;
  }
};
