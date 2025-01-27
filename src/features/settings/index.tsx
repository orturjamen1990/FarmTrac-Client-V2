import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { CalendarIcon, FolderIcon, HomeIcon, UsersIcon } from "lucide-react";

export default function Settings() {
  const navigation = [
    {
      name: "Account",
      href: "/settings/account",
      icon: HomeIcon,
      current: true,
    },
    {
      name: "Appearance",
      href: "/settings/appearance",
      icon: CalendarIcon,
      current: false,
    },

    { name: "Secuirty", href: "#", icon: UsersIcon, current: false },
    {
      name: "Notifications",
      href: "/settings/notifications",
      icon: FolderIcon,
      current: false,
    },
    { name: "Billing", href: "#", icon: CalendarIcon, current: false },
  ];

  const router = useRouter();
  return (
    <>
      <div className="mx-auto lg:flex lg:gap-x-16 lg:px-8 overflow-hidden">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={cn(
                        item.current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <Separator orientation="vertical" />
        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
