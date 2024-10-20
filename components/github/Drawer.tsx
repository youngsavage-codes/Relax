import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createRepo } from "@/services/githubService";

// CreaterpoDrawer Component
export function CreaterpoDrawer() {
  const [repoName, setRepoName] = React.useState("");
  const [repoDescription, setRepoDescription] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false); // Reset success state
    try {
      const newRepo = {
        name: repoName,
        description: repoDescription,
        private: isPrivate, // Will be true if checkbox is checked, otherwise false for public
      };
      await createRepo(newRepo); // Use the updated createRepo function
      setRepoName('');
      setRepoDescription('');
      setIsPrivate(false);
      setSuccess(true);
    } catch (err) {
      setError("Failed to create repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className=" text-xs">Add Repo</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New Repository</DrawerTitle>
            <DrawerDescription className="text-xs font-[family-name:var(--font-geist-mono)]">Fill in the details to create a new GitHub repository.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4 font-[family-name:var(--font-geist-mono)]">
              <Input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Repository Name"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
              <Textarea
                className="w-full border rounded p-2"
                placeholder="Repository Description"
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
              />
              <div className="flex items-center space-x-2 font-[family-name:var(--font-geist-mono)]">
                <Checkbox
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={(checked) => setIsPrivate(checked === true)}
                />
                <Label htmlFor="private" className="text-xs">
                  Private Repository
                </Label>
              </div>
            </div>

            {error && <p className="text-red-500 mt-2 font-[family-name:var(--font-geist-mono)]">{error}</p>}
            {success && <p className="text-green-500 mt-2 text-xs font-[family-name:var(--font-geist-mono)]">Repository created successfully!</p>}
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={loading || !repoName}>
              {loading ? "Creating..." : "Submit"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
