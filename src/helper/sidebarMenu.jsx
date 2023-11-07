import { AttachMoney, Dashboard, MoneyOff, People } from "@mui/icons-material";
import { AccountCircleOutlined } from "@mui/icons-material";

export const menu = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    path: "dashboard/",
  },
  {
    name: "Profile",
    icon: <AccountCircleOutlined />,
    path: "dashboard/profile",
  },
  {
    name: "All Users",
    icon: <People />,
    path: "dashboard/all-users",
  },
  {
    name: "Withdraw Money",
    icon: <MoneyOff />,
    path: "dashboard/withdraw",
  },
  {
    name: "Deposit Money",
    icon: <AttachMoney />,
    path: "dashboard/deposit",
  },
];
