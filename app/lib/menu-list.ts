import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

const adminMenuList: Group[] = [
  {
    groupLabel: "Admin Menu",
    menus: [
      {
        href: "/dashboard",
        label: "Dashboard",
        active: false,
        icon: LayoutGrid,
        submenus: []
      }
    ]
  },
  {
    groupLabel: "Contents",
    menus: [
      {
        href: "/users",
        label: "Users",
        active: false,
        icon: Users,
        submenus: [
          {
            href: "/users",
            label: "All Users",
            active: false,
          },
          {
            href: "/users/attendance",
            label: "Attendance",
            active: false,
          },
        ]
      },
      {
        href: "/users/classes",
        label: "Courses",
        active: false,
        icon: Bookmark,
        submenus: []
      },
    ]
  },
  {
    groupLabel: "Settings",
    menus: [
      {
        href: "/account",
        label: "Account",
        active: false,
        icon: Settings,
        submenus: []
      }
    ]
  }
];

const teacherMenuList: Group[] = [
  {
    groupLabel: "Teacher Menu",
    menus: [
      {
        href: "/dashboard",
        label: "Dashboard",
        active: false,
        icon: LayoutGrid,
        submenus: []
      },
      {
        href: "/classes",
        label: "My Classes",
        active: false,
        icon: SquarePen,
        submenus: []
      }
    ]
  },
  {
    groupLabel: "Settings",
    menus: [
      {
        href: "/account",
        label: "Account",
        active: false,
        icon: Settings,
        submenus: []
      }
    ]
  }
];

const studentMenuList: Group[] = [
  {
    groupLabel: "Student Menu",
    menus: [
      {
        href: "/dashboard",
        label: "Dashboard",
        active: false,
        icon: LayoutGrid,
        submenus: []
      },
      {
        href: "/studentClasses",
        label: "My Classes",
        active: false,
        icon: Bookmark,
        submenus: []
      }
    ]
  },
  // {
  //   groupLabel: "Settings",
  //   menus: [
  //     {
  //       href: "/account",
  //       label: "Account",
  //       active: false,
  //       icon: Settings,
  //       submenus: []
  //     }
  //   ]
  // }
];

const noUserMenuList: Group[] = [
  {
    groupLabel: "Not Signed In",
    menus: []
  }
];
// active: pathname.includes("/dashboard"),
// active: pathname === "/users"

export function getMenuList(pathname: string, role: string): Group[] {
  let menuList: Group[];

  switch (role) {
    case "admin":
      menuList = adminMenuList;
      break;
    case "student":
      menuList = studentMenuList;
      break;
    case "teacher":
      menuList = teacherMenuList;
      break;
    default:
      menuList = noUserMenuList; // Return an empty list if no role matches
  };

  menuList.forEach(group => {
    group.menus.forEach(menu => {
      menu.active = pathname.includes(menu.href);
      menu.submenus.forEach(submenu => {
        submenu.active = pathname === submenu.href;
      });
    });
  });

  return menuList;
}
