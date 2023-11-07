/* eslint-disable react/prop-types */
import { Avatar, Box, Drawer, Stack, Typography } from "@mui/material";
import { drawer } from "../../helper/drawer";
import { blueGrey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebar = ({ window, mobileOpen, handleDrawerToggle }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawerWidth = 240;

  const { user } = useSelector(({ auth }) => auth);

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: blueGrey[50],
            },
          }}
          open
        >
          <Link to="/dashboard/profile" style={{ textDecoration: "none" }}>
            <Stack direction="row" alignItems="center" gap={1} p={2}>
              <Avatar>{!user?.photoURL && user?.displayName[0]}</Avatar>
              <Typography variant="h5">
                {user?.displayName?.length > 8
                  ? user?.displayName?.split(" ")[0]
                  : user?.displayName}
              </Typography>
            </Stack>
          </Link>

          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default LeftSidebar;
