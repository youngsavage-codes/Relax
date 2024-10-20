// src/types/types.ts

export interface IProject {
    _id?: string | any;
    name: string;
    description?: string; // Optional
    startDate: string;
    endDate?: string; // Optional
    budget?: number; // Optional
    progress: number
    expenses?: number;
    owner: string; // User ID (ObjectId)
    category: string; // Required
    type: string; // Required
    githubRepoLink?: string; // Optional
    cloneLink?: string; // Optional
    status?: string;
    milestones?: [
        {
            title: string,
            description: string
            completed: boolean
            dueDate: Date;
        }
    ]; // Optional, array of Milestone IDs (ObjectId)
    createdAt: string;
    updatedAt: string
}

export interface IMilestone {
    _id?:string
    title: string;
    description: string;
    dueDate: Date | string;
    completed?: boolean;
  }