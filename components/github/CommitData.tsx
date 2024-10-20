import React from 'react';

interface Commit {
  sha: string;
  author: {
    login: string;
    avatar_url: string;
  };
  committer: {
    login: string;
    avatar_url: string;
  };
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
  parents: {
    sha: string;
    html_url: string;
  }[];
}

interface CommitDataProps {
  commits: Commit[];
}

const CommitData = ({ commits }: CommitDataProps) => {
  return (
    <div>
      <h2>Commit History</h2>
      <ul className='flex gap-5'>
        {commits.map((commit) => (
          <li key={commit.sha} className='bg-red-500'>
            <div>
              <img
                src={commit.author.avatar_url}
                alt="avatar"
                style={{ width: '50px', borderRadius: '50%' }}
              />
              <strong>Author:</strong> {commit.author.login} <br />
              <strong>Committer:</strong> {commit.committer.login}
            </div>
            <div>
              <strong>Author Name:</strong> {commit.commit.author.name} <br />
              <strong>Author Email:</strong> {commit.commit.author.email}
            </div>
            <div>
              <strong>Committer Name:</strong> {commit.commit.committer.name} <br />
              <strong>Committer Email:</strong> {commit.commit.committer.email}
            </div>
            <div>
              <strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleDateString()} <br />
              <strong>Message:</strong> {commit.commit.message}
            </div>
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
              View Commit
            </a>
            <div>
              <div>
                <strong>Parent Commits:</strong>
              </div>
              <ul>
                {commit.parents.map((parent) => (
                  <li key={parent.sha}>
                    <a href={parent.html_url} target="_blank" rel="noopener noreferrer">
                      {parent.sha.substring(0, 7)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitData;
