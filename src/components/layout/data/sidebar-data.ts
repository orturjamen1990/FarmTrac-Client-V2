import { type SidebarData } from "../types";
import { useSelector } from "react-redux";
import { userInfo } from "@/stores/common-slices/authSlice";
import {
  LayoutDashboardIcon,
  UsersIcon,
  LeafyGreenIcon,
  LandPlotIcon,
  TruckIcon,
  TractorIcon,
  ShieldCheckIcon,
  CalendarIcon,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";

export const useSidebarData = (): SidebarData => {
  const authStore = useSelector(userInfo);

  const user = {
    name: `${authStore.user?.firstName} ${authStore.user?.lastName}`,
    email: authStore.user?.email,
  };

  const sidebarData = {
    user: {
      ...(user as any),
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Shadcn Admin",
        logo: Command,
        plan: "Vite + ShadcnUI",
      },
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
    ],
    navGroups: [
      {
        title: "General",
        items: [
          {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboardIcon,
          },
          {
            title: "Local Shipping Certificates",
            url: "/local-shipping-certificates",
            icon: ShieldCheckIcon,
          },
          {
            title: "Calendar",
            url: "/calendar",
            icon: CalendarIcon,
          },
          {
            title: "Customers",
            url: "/customers",
            icon: UsersIcon,
          },
          {
            title: "Marketers",
            url: "/marketers",
            // icon: IconPackages,
          },
          {
            title: "Carriers",
            url: "/carriers",
            badge: "3",
            icon: TruckIcon,
          },
          {
            title: "Growers",
            url: "/growers",
            badge: "3",
            icon: LeafyGreenIcon,
          },
          {
            title: "Growing Areas",
            url: "/growing-areas",
            icon: LandPlotIcon,
          },
          {
            title: "Vehicles",
            url: "/vehicles",
            icon: TractorIcon,
          },
          {
            title: "Pallets",
            url: "/pallets",
            // icon: TractorIcon,
          },
        ],
      },
      {
        title: "Other",
        items: [
          {
            title: "Adminstartion",
            // icon: IconSettings,
            items: [
              // icon: IconSettings,
              {
                title: "Pallet Types",
                url: "/pallet-types",
                // icon: TractorIcon,
              },
              {
                title: "Customer Types",
                url: "/customer-types",
                // icon: TractorIcon,
              },
              {
                title: "Produces",
                url: "/produces",
                // icon: TractorIcon,
              },
              {
                title: "Packaging Types",
                url: "/packaging-types",
                // icon: TractorIcon,
              },
              {
                title: "Shipping Certificate Status",
                url: "/shipping-certificate/statuses",
                // icon: TractorIcon,
              },
              {
                title: "Shipping Certificate Types",
                url: "/shipping-certificate/types",
                // icon: TractorIcon,
              },
            ],
          },
          {
            title: "Help Center",
            url: "/help-center",
            // icon: IconHelp,
          },
        ],
      },
    ],
  };

  return sidebarData;
};
