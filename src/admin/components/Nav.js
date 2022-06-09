import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { FaHospitalUser, FaUserNurse } from 'react-icons/fa';
import { RiAdminLine } from 'react-icons/ri';
import { MdOutlineInventory, MdSick } from 'react-icons/md';
import { Person } from '@mui/icons-material';

//admin pages
import WorkerLoginDetails from '../pages/WorkerLoginDetails';
import AdminLoginDetails from '../pages/AdminLoginDetails';
import Inventory from '../pages/Inventory';
import PatientsBiodata from '../pages/PatientsBiodata';
import PatientDetails from '../pages/Patients';
import Symptoms from '../pages/Symptoms';
import Diagnosis from '../pages/Diagnosis';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

export default function Nav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const handleDrawer = () => {
    setOpen(!open);
  };
  const handleNavigation = (index) => {
    if (index === 0) {
      navigate(`/worker-login`);
    }
    if (index === 1) {
      navigate(`/admin-login`);
    }
    if (index === 2) {
      navigate(`/inventory`);
    }
    if (index === 3) {
      navigate(`/patients-biodata`);
    }
    if (index === 4) {
      navigate(`/symptoms`);
    }
    if (index === 5) {
      navigate(`/diagnosis`);
    }
  };

  // const handleListItemActive = () => {
  //   setIsActive(!isActive);
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-green-500">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            EMR
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            'Worker Login',
            'Admin Login',
            'Inventory',
            'Patients Bio-Data',
            'Symptoms',
            'Diagnosis'
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  width: 25,
                  height: 25
                }}
                onClick={() => handleNavigation(index)}>
                <ListItemIcon
                  // sx={{
                  //   minWidth: 0,
                  //   mr: open ? 3 : 'auto',
                  //   justifyContent: 'center'
                  // }}
                  className={(open ? 'mr-3' : 'auto') + ' justify-center min-w-0 text-green-500'}>
                  {index === 0 ? (
                    <FaUserNurse />
                  ) : index === 1 ? (
                    <RiAdminLine />
                  ) : index === 2 ? (
                    <MdOutlineInventory />
                  ) : index === 3 ? (
                    <FaHospitalUser />
                  ) : index === 4 ? (
                    <MdSick />
                  ) : (
                    <MdSick />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="mb-3">
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Avatar className="bg-green-500 mt-1" variant="circular">
                <Person />
              </Avatar>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{ mt: -1, mr: 2, justifySelf: 'end' }}>
              Admin Name
            </Typography>
          </Box>
        </div>
        <Routes>
          <Route path="/worker-login" element={<WorkerLoginDetails />} />
          <Route path="/admin-login" element={<AdminLoginDetails />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/patients-biodata" element={<PatientsBiodata />} />
          <Route path="/patients-biodata/:id/:name" element={<PatientDetails />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
        </Routes>
      </Box>
    </Box>
  );
}
