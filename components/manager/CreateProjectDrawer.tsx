// Drawer component to create a project
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateProject } from "@/api/manager";
import { IProject } from "@/types/type";
import { FolderPlus } from "lucide-react";

export function CreateProjectDrawer() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [startDate, setStartDate] = React.useState(""); 
  const [endDate, setEndDate] = React.useState(""); 

  const [name, setName] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("");
  const [repoLink, setRepoLink] = React.useState("");
  const [cloneLink, setCloneLink] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const ownerId = user._id;

      // Ensure that project budget is a number
      const budgetValue = Number(budget);
      if (isNaN(budgetValue)) {
        throw new Error("Project budget must be a valid number.");
      }

      // Create payload
      const payload: IProject = {
        name,
        budget: budgetValue, // Budget should be a number
        category,
        type,
        githubRepoLink: repoLink,
        cloneLink,
        description,
        startDate: new Date(startDate).toISOString(), // Ensure ISO 8601 format
        endDate: new Date(endDate).toISOString(), // Ensure ISO 8601 format
        owner: ownerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0
      };

      console.log(payload)

      // Send request to create project
      const response = await CreateProject(payload);

      if (response) {
        setSuccess(true);
        setError(null);
      } else {
        setError("Failed to create project.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="text-xs">
         <FolderPlus className="w-4 h-4"/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>Create New Project</DrawerTitle>
            <DrawerDescription className="text-xs font-[family-name:var(--font-geist-mono)]">
              Fill in the details to create a new project.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="space-y-4 font-[family-name:var(--font-geist-mono)]">
              <Input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                className="w-full border rounded p-2"
                placeholder="Project Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />

              <div className="flex gap-5 items-center">
                <Select onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Project Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Project Categories</SelectLabel>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Project Types</SelectLabel>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Repository Link"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
              />
              <Input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Repository Clone Link"
                value={cloneLink}
                onChange={(e) => setCloneLink(e.target.value)}
              />

              {/* Date Pickers for Start and End Date */}
              <div className="flex gap-5 justify-between">
                <div className="w-full">
                  <label htmlFor="startDate" className="block text-xs mb-2">Start Date</label>
                  <Input
                    type="date"
                    id="startDate"
                    className="w-full border rounded p-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="endDate" className="block text-xs mb-2">End Date</label>
                  <Input
                    type="date"
                    id="endDate"
                    className="w-full border rounded p-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <Textarea
                className="w-full border rounded p-2 h-40"
                placeholder="Repository Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 mt-2 font-[family-name:var(--font-geist-mono)]">{error}</p>}
            {success && <p className="text-green-500 mt-2 text-xs font-[family-name:var(--font-geist-mono)]">Project created successfully!</p>}
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Submit"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}