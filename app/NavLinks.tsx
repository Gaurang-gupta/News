'use client'
import { categories } from "../constants";
import { usePathname } from "next/navigation"
import NavLink from "./NavLink";

function NavLinks() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname?.split('/').pop() === path;
    }
  return (
    <nav className="grid grid-cols-4 md:grid-cols-7 text-xs md:text-sm gap-4 pb-10 max-w-6xl mx-auto border-b">
        {categories.map((category) => (
            <NavLink 
                isActive={isActive(category)} 
                key={category} 
                category={category}
            />
        ))}
    </nav>
  )
}

export default NavLinks