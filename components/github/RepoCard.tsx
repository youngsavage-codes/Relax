import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { deleteRepo } from "@/services/githubService";
import { DeleteDialog } from "./DeleteDiolog";
import { LanguageList } from "./LanguageList"; // Import LanguageList component


export function RepoCard({ repo, languages }: any) {
  // Function to copy the clone URL to the clipboard
  const handleCopy = () => {
    navigator.clipboard
      .writeText(repo.clone_url)
      .then(() => {
        alert("Clone URL copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy clone URL.");
      });
  };

  // Function to handle repository deletion
  const handleDelete = async () => {
    try {
      await deleteRepo(repo.owner.login, repo.name);
      alert(`Repository ${repo.name} deleted successfully.`);
      // Optionally, trigger a refresh or update of the parent component to reflect the deletion
    } catch (error: any) {
      alert("Error deleting repository: " + error.message);
    }
  };

  return (
    <Card className="lg:w-[350px] hover:bg-gray-800 z-30 relative">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {repo.name}
          <DeleteDialog name={repo.name} handleDelete={handleDelete} />
        </CardTitle>
        <CardDescription className="text-sm font-mono">
          {repo.description ? repo.description : "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent className="font-mono">
        <Label className="text-xs">Repository URL: </Label>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs"
        >
          {repo.html_url}
        </a>
        <div className="mt-2">
          <Label className="text-xs">Languages:</Label>
          <LanguageList languages={languages} limit={3}/> {/* Use the new LanguageList component */}
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="flex space-x-2 items-center w-full">
          {/* Clone URL input field */}
          <Input
            id="clone_url"
            value={repo.clone_url}
            disabled
            className="text-xs w-full font-mono"
          />
          {/* Copy Button */}
          <Button className="text-xs" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
