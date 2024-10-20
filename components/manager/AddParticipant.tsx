import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserPlus, CheckCircle, PlusCircle } from "lucide-react";
import { fetchUsers } from "@/api/user";
import { AddParticipantsToProject } from "@/api/manager";

export function AddParticipants({ project }: { project: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [successMessage, setSuccessMessage] = useState(""); // New success message state

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      const existingParticipants = project.participants.map((p: any) => p.userName); // Assuming participants have a userName field
      const ownerUserName = project.owner.userName; // Assuming project.owner has a userName field

      // Filter out already added participants and the project owner
      const filteredUsers = fetchedUsers.filter(
        (user: any) => !existingParticipants.includes(user.userName) && user.userName !== ownerUserName
      );

      setUsers(filteredUsers);
    };

    loadUsers();
  }, [project]); // Add project as a dependency to re-fetch if it changes

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      // Remove user if already selected
      setSelectedUsers(selectedUsers.filter((user) => user !== userId));
    } else {
      // Add user ID to selected users
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Function to handle adding participants
  const handleAddParticipants = async () => {
    setIsLoading(true); // Set loading to true
    setSuccessMessage(""); // Reset success message
    try {
      // Call your API to add selected users to the project
      await AddParticipantsToProject(project._id, selectedUsers);
      setSuccessMessage("Participants added successfully!"); // Set success message
      setSelectedUsers([]); // Clear selected users if needed
      // Optionally, refresh the participants in the parent component
    } catch (error) {
      console.error("Error adding participants:", error);
      setSuccessMessage("Failed to add participants. Please try again."); // Set error message
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <UserPlus className="w-4 h-4" /> {/* Trigger button with icon */}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Participants</SheetTitle>
          <SheetDescription>
            Select participants to add to your project.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          {/* Search bar */}
          <Input
            placeholder="Search participants..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Display filtered users */}
          <div className="overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-800 px-2 rounded-md"
                  onClick={() => handleSelectUser(user._id)} // Use user._id here
                >
                  {/* User image */}
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/40"}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full"
                  />

                  {/* User details */}
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">{user.fullName}</h2>
                    <p className="text-xs text-gray-500">
                      {user.email || "No email provided"}
                    </p>
                  </div>

                  {/* Select icon */}
                  <span>
                    {selectedUsers.includes(user._id) ? ( // Use user._id here
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <PlusCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No users found</p>
            )}
          </div>


          {/* Display success or error message */}
          {successMessage && (
            <p className="text-center text-green-500 mt-4 text-xs">{successMessage}</p>
          )}
        </div>

        <SheetFooter>
          <Button type="button" onClick={handleAddParticipants} disabled={isLoading}>
             {isLoading ? 'Add User' : 'Add Selected Users'}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
