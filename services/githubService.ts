// Utility function to get the token from local storage
const getGithubToken = () => localStorage.getItem('githubToken');

const GITHUB_TOKEN = getGithubToken();

// Fetch Repositories
export const fetchRepos = async (page = 1, reposPerPage = 8) => {
  const response = await fetch(
    `https://api.github.com/user/repos?per_page=${reposPerPage}&page=${page}&sort=created&direction=desc`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  const data = await response.json();
  const linkHeader = response.headers.get('Link');
  return { data, totalRepos: parseLinkHeader(linkHeader, reposPerPage) };
};

// Fetch Repository by ID
export const fetchRepoById = async (owner: string, repoName: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch repository');
  }

  return response.json();
};

// Fetch Repo Languages
export const fetchRepoLanguages = async (languagesUrl: string) => {
  const response = await fetch(languagesUrl, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch languages');
  }

  return response.json();
};

// Fetch Organizations
export const fetchOrganizations = async () => {
  const response = await fetch('https://api.github.com/user/orgs', {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch organizations');
  }

  return response.json();
};

// Fetch Commits
export const fetchCommits = async (owner: string, repoName: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/commits`,
    {
      method: 'GET',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.json();
    if (response.status === 409) {
      console.warn('Repository is empty:', errorMessage.message);
      return []; // Return empty array for an empty repo
    } else {
      console.error('Failed to fetch commits:', errorMessage);
      throw new Error('Failed to fetch commits');
    }
  }

  return await response.json(); // If successful, return the commit data
};

// Fetch Commit Activity
export const fetchCommitActivity = async (owner: string, repoName: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/stats/commit_activity`,
    {
      method: 'GET',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.json();
    console.error('Failed to fetch commit activity:', errorMessage);
    throw new Error('Failed to fetch commit activity');
  }

  const data = await response.json();

  // Check if the response data is empty or not found, return null in that case
  if (!data || data.length === 0) {
    return [];
  }

  return data; // Returns array of weekly commit counts
};

// Create Repository
export const createRepo = async (repoData: any) => {
  // Step 1: Create the repository
  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoData.name,
      description: repoData.description,
      private: repoData.private, // Will be true or false based on checkbox state
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create repository');
  }

  const repo = await response.json();

  // Step 2: Add README.md file
  const readmeContent = `# ${repoData.name}\n\n${repoData.description}\n\n## Getting Started\n\nWelcome to your new repository!`;
  const encodedContent = btoa(readmeContent); // Encode content to Base64

  const readmeResponse = await fetch(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/README.md`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Add README.md file',
        content: encodedContent, // Base64 encoded content for the README file
      }),
    }
  );

  if (!readmeResponse.ok) {
    throw new Error('Failed to add README.md file');
  }

  return repo; // Return the created repo object
};

// Delete Repository
export const deleteRepo = async (owner: string, repoName: string) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete repository');
  }

  return response.status === 204
    ? 'Repository deleted successfully'
    : 'Repository deletion failed';
};

// Fetch User Followers
export const fetchFollowers = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}/followers`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch followers');
  }

  return response.json(); // Returns an array of followers
};

// Helper function to parse total repositories from the link header
const parseLinkHeader = (linkHeader: any, reposPerPage: number) => {
  if (!linkHeader) return 0;  // Handle missing Link header
  const lastLink = linkHeader.split(',').find((link: any) => link.includes('rel="last"'));
  const totalMatch = lastLink?.match(/&page=(\d+)/);
  return totalMatch ? parseInt(totalMatch[1], 10) * reposPerPage : 0;
};
