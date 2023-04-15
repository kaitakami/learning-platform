import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { signOut } from "next-auth/react";

const CustomAvatar = ({ image, name }: { image: string, name: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/app/user" className={`${buttonVariants({ variant: "link", size: "sm" })} w-full`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="destructive" size="sm" className="w-full" onClick={() => { signOut().catch(err => console.log(err)) }}>Logout</Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CustomAvatar
