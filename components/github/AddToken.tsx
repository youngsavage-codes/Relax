import * as React from "react";
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
import { Input } from "@/components/ui/input";

export function AddTokenDrawer() {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  // Function to store the token in localStorage
  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!token) {
        throw new Error("Token cannot be empty");
      }
      localStorage.setItem("githubToken", token); // Store the token
      setToken(""); // Reset the input field
      setSuccess(true); // Show success message

      // Reload the page on success
      setTimeout(() => {
        window.location.reload(); // Reloads the page after 1 second
      }, 1000); // Optional: delay the reload to give feedback to user
    } catch (err) {
      setError("Failed to store the token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className=" text-xs">Add Token</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add GitHub Token</DrawerTitle>
            <DrawerDescription className="text-xs font-[family-name:var(--font-geist-mono)]">
              Enter your GitHub token to store it locally.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4 font-[family-name:var(--font-geist-mono)]">
              <Input
                type="text"
                className="w-full border rounded p-2"
                placeholder="GitHub Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 mt-2 font-[family-name:var(--font-geist-mono)]">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 mt-2 text-xs font-[family-name:var(--font-geist-mono)]">
                Token stored successfully!
              </p>
            )}
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit} disabled={loading || !token}>
              {loading ? "Saving..." : "Submit"}
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
