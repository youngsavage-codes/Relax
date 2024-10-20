import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function UserAvatar({repo}: any) {
    return (
      <Avatar>
        <AvatarImage src={repo.owner.avatar_url} alt="@shadcn" />
        <AvatarFallback>{repo.owner.login[0]}{repo.owner.login[3]}</AvatarFallback>
      </Avatar>
    )
}
  