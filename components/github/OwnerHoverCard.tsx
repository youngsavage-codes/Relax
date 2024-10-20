import { CalendarDays } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define a type for the owner prop
interface Owner {
  login: string;
  avatar_url: string;
  followers_url: string;
  url: string;
}

// Define a type for the follower object
interface Follower {
  id: number;
  login: string;
  html_url: string;
}

interface OwnerHoverCardProps {
  owner: Owner;
}

export function OwnerHoverCard({ owner }: OwnerHoverCardProps) {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetch(owner.followers_url);
        const data: Follower[] = await response.json();
        setFollowers(data);
      } catch (err) {
        setError((err as Error).message); // Cast to Error to get message
      } finally {
        setLoading(false);
      }
    };

    getFollowers();
  }, [owner.followers_url]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-gray-400">
          Owner
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={owner.avatar_url} alt={owner.login} />
            <AvatarFallback>{owner.login.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-gray-400">{owner.login}</p>
          </div>
        </div>
        <div className="my-5">
          {loading ? (
            <p>Loading followers...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <strong>Followers:</strong>
              <ul>
                {followers.map(follower => (
                  <li key={follower.id}>
                    <a
                      href={follower.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {follower.login}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button variant='outline' className="text-xs">
          <Link href={owner.url} target="_blank">Profile</Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
