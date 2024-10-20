'use client'; // This indicates the component is a client-side component in Next.js
import React, { useState } from 'react';
import { CommandDemo } from './Command';

const Sidebar = () => {

  return (
    <div className='hidden lg:block'> {/* Changed background color */}
        <CommandDemo />
    </div>
  );
}

export default Sidebar;
