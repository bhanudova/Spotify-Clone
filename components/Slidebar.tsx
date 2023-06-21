"use client"
import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi"
import Box from "./Box";
import SlidebarItem from "./SlidebarItem";
import Library from "./Library";
import { Song } from "@/types";

interface SlidebarProps {
    children: React.ReactNode;
    songs:Song[]
}

const Slidebar: React.FC<SlidebarProps> = ({ children,songs }) => {
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/'
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname == '/search',
            href: '/search',
        }
    ], [pathname]);

    return (
        <div className="flex h-full p-2">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px]">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SlidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library songs={songs}/>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2 p-2">
                {children}
            </main>
        </div>
    )
}

export default Slidebar;
