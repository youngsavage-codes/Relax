'use client'
import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from '../ui/input';
import { UserCard } from './UserCard';

const UserList = ({ onUserSelect }: any) => {
  // State to track selected user
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Array of users and their chat data
  const userChats = [
    {
      id: 1,
      name: "Young Savage",
      timeAgo: "12 months ago",
      description: "Meeting Tomorrow",
      message: `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project 
      details and have some ideas I'd like to share. It's crucial that we align on our next steps 
      to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to it.`,
      status: "Read",
    },
    {
      id: 2,
      name: "John Doe",
      timeAgo: "2 days ago",
      description: "Follow up",
      message: `Just checking in to follow up on our previous discussion. Let me know when you're available.`,
      status: "Unread",
    },
    {
      id: 3,
      name: "Julious Berger",
      timeAgo: "1 week ago",
      description: "Job Application",
      message: `Appling for the role of fullstack engineer at your company.. attcahed here is a copy of my resume. thank you`,
      status: "Unread",
    },
    {
      id: 4,
      name: "Micheal Zion",
      timeAgo: "6 days ago",
      description: "Missing You",
      message: `Hi Dear how are you doing hope you are doing great.. just want to let you know that i miss you soo much.. Come home soon baby booo`,
      status: "Unread",
    },
    // Add more user chat objects as needed
  ];

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle user selection
  const handleUserSelect = (user: any) => {
    setSelectedUserId(user.id); // Update the selected user ID
    onUserSelect(user); // Call the parent onUserSelect function
  };

  // Filtered list based on search term
  const filteredChats = userChats.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-lg border shadow-md w-[550px] h-screen space-y-5 overflow-y-hidden pb-5 relative hidden lg:block">
      {/* Tabs component wrapping both tabs header and content */}
      <Tabs defaultValue="mail" className='relative'>
          {/* Header with Inbox and TabsList */}
          <div className='flex items-center justify-between border-b p-5'>
            <h2>Inbox</h2>
            {/* TabsList aligned to the right */}
            <TabsList className="grid grid-cols-2 text-xs ">
              <TabsTrigger value="mail">All mail</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </div>

          {/* Search Input */}
          <div className='px-5'>
            <Input 
              id="username" 
              placeholder='Search' 
              className="my-4" 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
          </div>

        {/* Tabs Content */}
        <div className="tabs-content-container px-5 h-[800px] overflow-y-scroll scrolls">
          {/* All Mail */}
          <TabsContent value="mail" className='space-y-5'>
            {filteredChats.map((user) => (
              <div key={user.id} onClick={() => handleUserSelect(user)}>
                <UserCard 
                  user={user} 
                  className={selectedUserId === user.id ? 'bg-gray-900' : ''} // Apply gray-900 if selected
                />
              </div>
            ))}
          </TabsContent>

          {/* Unread Mail */}
          <TabsContent value="unread" className='space-y-5'>
            {filteredChats
              .filter((user) => user.status === "Unread")
              .map((user) => (
                <div key={user.id} onClick={() => handleUserSelect(user)}>
                  <UserCard
                    user={user} 
                    className={selectedUserId === user.id ? 'bg-gray-900' : ''} // Apply gray-900 if selected
                  />
                </div>
              ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserList;
