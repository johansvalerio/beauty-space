"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, LogOut } from "lucide-react"
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function DropDown({ session, userimage }: { session: Session, userimage: string }) {
    const username = session.user.name;
    const useremail = session.user.email;


    console.log(userimage);

    const router = useRouter();

    const handleSignOut = () => {
        router.push("/api/auth/signout");
    };

    const handleCitas = () => {
        router.push("/citas");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer border border-border hover:opacity-80 transition-opacity">
                    <AvatarImage src={userimage} alt={username} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        {username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={userimage} alt={username} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium capitalize">{username}</p>
                        <p className="text-xs text-gray-500">{useremail}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleCitas} className="cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Mis citas</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}