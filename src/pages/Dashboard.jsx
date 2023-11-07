import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LeftSidebar from "../components/utils/LeftSidebar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useAuthObserver from "../hooks/useAuthObserver";

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const [unsubscribe, auth] = useAuthObserver();

  //Auth observer
  useEffect(() => {
    unsubscribe();
    return () => unsubscribe();
  }, [auth]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            textTransform="uppercase"
          >
            {location?.pathname?.split("/")[2] || "dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <LeftSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: 6,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
