import { CalendarDays } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link"
import { formatDate } from "@/utils/DateFormatter"

export function CommitHoverCard({commit}: any) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
            Message: {formatDate(new Date(commit.commit.author.date).toLocaleDateString())}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex gap-5 space-x-4">
          <Avatar>
            <AvatarImage src={commit.author?.avatar_url} />
            <AvatarFallback>GT</AvatarFallback>
          </Avatar>
            <div className="space-y-1">
                <div className="text-xs space-y-1">
                    <div><strong className="font-semibold">Name:</strong> {commit.commit.committer.name}</div>
                    <div><strong className="font-semibold">Email:</strong> {commit.commit.committer.email}</div>
                </div>
                <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                    Commited - {formatDate(new Date(commit.commit.author.date).toLocaleDateString())}
                </span>
                </div>
          </div>
        </div>
        <div className="pt-5">
            <strong className="text-sm">Commit Message:</strong>
            <p className="text-xs">{commit.commit.message}</p>
        </div>
        <div className="py-5">
              <strong className="text-sm">Parent Commits:</strong>
              <ul className="text-xs">
                {commit.parents.map((parent: any) => (
                  <li key={parent.sha}>
                    <a href={parent.html_url} target="_blank" rel="noopener noreferrer">
                      {parent.sha.substring(0, 7)}
                    </a>
                  </li>
                ))}
              </ul>
        </div>
        <Button variant='outline' className="text-xs">
            <Link href={commit.html_url} target="_blank">View Commit</Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  )
}
