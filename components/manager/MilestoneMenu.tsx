import {
    Edit,
    EllipsisVertical,
    Trash,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { RemoveMilestone } from "@/api/manager"; // Assuming this is the path to your function
  import { IMilestone, IProject } from "@/types/type";
  import { useState } from "react";
  
  export function MilestoneDropdown({ milestone, project }: { milestone: IMilestone; project: IProject }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleDelete = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // Call the remove milestone function
        await RemoveMilestone(project._id, milestone._id as any);
  
        // You can add a success message or any additional logic here
        console.log("Milestone deleted successfully");
      } catch (err) {
        setError("Failed to delete milestone");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-fit w-fit">
            <EllipsisVertical className="w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Milestone</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span className="text-xs">Edit Milestone</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={loading}>
            <Trash className="mr-2 h-4 w-4 text-red-500" />
            <span className="text- text-red-500">Delete Milestone</span>
          </DropdownMenuItem>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  