import * as React from "react";
import { useState } from "react";
import { Target } from "lucide-react";

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
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { AddMilestone } from "@/api/manager"; // Import your AddMilestone function
import { IMilestone } from "@/types/type";

export function MilestoneDrawer({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = async () => {
    // Simple validation
    if (!title || !dueDate || !description) {
      setErrorMessage("Please fill out all the fields."); // Set error message
      setSuccessMessage(""); // Clear success message
      return;
    }

    setLoading(true);
    setSuccessMessage(""); // Clear any previous success message
    setErrorMessage(""); // Clear any previous error message

    // Milestone data structure
    const milestoneData: IMilestone = {
      title,
      description,
      dueDate,
    };

    try {
      // Call the AddMilestone function and pass the projectId and milestone data
      await AddMilestone(projectId, milestoneData);

      setSuccessMessage("Milestone added successfully!"); // Set success message

      // Clear form after success
      setTitle("");
      setDueDate("");
      setDescription("");
    } catch (error) {
      setErrorMessage("Failed to add milestone. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Target className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Project Milestone</DrawerTitle>
            <DrawerDescription>Set your project milestone goal.</DrawerDescription>
          </DrawerHeader>

          <div className="space-y-5">
            <Input
              placeholder="Milestone Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2"
            />
            <div className="w-full">
              <label htmlFor="dueDate" className="block text-xs mb-2">
                Due Date
              </label>
              <Input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border rounded p-2"
              />
            </div>
            <Textarea
              placeholder="Milestone Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2"
            />
          </div>

          {/* Success Message Display */}
          {successMessage && (
            <div className="mt-4 p-2 text-sm text-green-600">
              {successMessage}
            </div>
          )}

          {/* Error Message Display */}
          {errorMessage && (
            <div className="mt-4 p-2 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
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
