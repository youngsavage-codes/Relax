import { formatDate } from '@/utils/DateFormatter';
import React from 'react';
import { OwnerHoverCard } from './OwnerHoverCard';

const RepoInfo = ({ repo }: any) => {
  return (
    <div className="shadow-md rounded-lg p-6 mb-4 text-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-lg lg:text-2xl font-semibold mb-3">{repo.name}</h1>
          <p className="text-gray-400"><strong>Description:</strong> {repo.description}</p>
        </div>
        <div className='flex gap-2 lg:gap-5 items-center'>
          <p className="text-gray-400"><strong></strong> {repo.private ? 'Private' : 'Public'}</p>
          <OwnerHoverCard owner={repo.owner} /> {/* Use OwnerInfo component here */}
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400"><strong>Open Issues:</strong> {repo.open_issues_count}</p>
          <p className="text-gray-400">
            <strong>Language:</strong> {repo.language}
          </p>
        </div>
        <div>
          <p className="text-gray-400">
            <strong>Created At:</strong> {formatDate(repo.created_at)}
          </p>
          <p className="text-gray-400">
            <strong>Last Updated:</strong> {formatDate(repo.updated_at)}
          </p>
          <p className="text-gray-400">
            <strong>URL:</strong> {' '}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {repo.html_url}
            </a>
          </p>
          <p className="text-gray-400">
            <strong>Clone URL:</strong> {' '}
            <a href={repo.clone_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {repo.clone_url}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepoInfo;
