import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function UserCard({ user, className }: { user: any; className?: string }) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold">{user.name}</h3>
          <span className="text-xs">{user.timeAgo}</span>
        </div>
        <CardDescription>
          <h3 className="text-xs">{user.description}</h3>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs">
        {user.message}
      </CardContent>
      <CardFooter className="text-xs flex gap-x-5">
        <span>{user.status}</span>
      </CardFooter>
    </Card>
  );
}
