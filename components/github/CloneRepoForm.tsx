import React, { useState } from 'react';

export const CloneRepoForm = ({repoUrls}: any) => {
  const [repoUrl, setRepoUrl] = useState(repoUrls);
  const [localPath, setLocalPath] = useState('');

  const handleClone = async () => {
    try {
      const response = await fetch('/api/cloneRepo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl, specifiedPath: localPath }),
      });
  
      // Check if the response is not empty
      if (!response.ok) {
        const errorText = await response.text(); // Extract raw text response
        alert(`Error cloning repository: ${errorText}`);
        return;
      }
  
      const data = await response.json(); // Parse valid JSON response
      alert(data.message);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Local Path (leave blank for default)"
        value={localPath}
        onChange={(e) => setLocalPath(e.target.value)}
      />
      <button onClick={handleClone}>Clone Repository</button>
    </div>
  );
};

export default CloneRepoForm;
