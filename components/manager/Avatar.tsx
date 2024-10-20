import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function UserAvatar({user}: any) {
    return (
      <Avatar>
        <AvatarImage src={user?.profilePicture} alt="@shadcn" />
        <AvatarFallback>{user?.fullName[0]}{user?.fullName[5]}</AvatarFallback>
      </Avatar>
    )
}
  