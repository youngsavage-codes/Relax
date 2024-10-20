'use client';
import React, { useState, useEffect } from 'react';
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  Reply,
  ReplyAll,
  Trash2,
} from 'lucide-react';
import { PopoverDemo } from '../PopOver';
import { UserAvatar } from '../Avarter';
import { TextareaDemo } from '../TextArea';
import { Button } from '../ui/button';
import Message from './Message';

const UserMessage = ({ user }: any) => {
  // Initial messages for the user
  const [messages, setMessages] = useState([
    { id: 1, message: 'Hi, let’s have a meeting tomorrow to discuss the project.', senderName: 'Young Savage' },
    { id: 0, message: 'Sure, I’ll be ready.', senderName: 'Me' },
    { id: 1, message: 'Alright, see you then.', senderName: 'Young Savage' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = { id: 0, message: newMessage, senderName: 'Me' };
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage(''); // Clear input after sending
    }
  };

  useEffect(() => {
    // Reset messages or fetch messages for the new user
    if (user) {
      setMessages([
        { id: 1, message: user.message, senderName: user.name },
        // ... other user-specific messages
      ]);
    }
  }, [user]);

  return (
    <div className="rounded-lg border shadow-md w-full h-screen text-white">
      <div className="flex items-center justify-between border-b p-5">
        <div className="flex items-center gap-5">
          <Archive className="mr-2 h-4 w-4 text-white" />
          <ArchiveX className="mr-2 h-4 w-4 text-white hidden lg:block" />
          <Trash2 className="mr-2 h-4 w-4 text-white" />
          <Clock className="lg:ml-5 h-4 w-4 text-white" />
        </div>
        <div className="flex items-center gap-5">
          <Reply className="mr-2 h-4 w-4 text-white" />
          <ReplyAll className="mr-2 h-4 w-4 text- hidden lg:block" />
          <Forward className="mr-2 h-4 w-4 text-white" />
          <PopoverDemo />
        </div>
      </div>
      <div className="px-10 flex gap-x-5 w-full border-b py-7">
        <UserAvatar />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">{user?.name}</h3>
            <span className="text-xs text-gray-400">{user.timeAgo}</span>
          </div>
          <h3 className="text-xs text-gray-400">{user.description}</h3>
        </div>
      </div>

      {/* Chat Messages Section */}
      <Message messages={messages}/>

      <div className="p-5">
        <TextareaDemo value={newMessage} onChange={(e: any) => setNewMessage(e.target.value)} />
        <Button className="mt-5 float-right" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default UserMessage;
