import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "@mui/material";
import DragDrop from "./dragdrop";
import {  useNavigate } from "react-router-dom";



const drawerWidth = 240;


export default function Home(){
  let navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("authtodo")){
      navigate("/login")
    }
  })

    return(
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
                add search button
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
       
          <List>
            
            <ListItem button key={"Overview"}>
                <ListItemIcon>
                  <HomeIcon></HomeIcon>
                </ListItemIcon>
                <ListItemText primary={"Overview"} />
              </ListItem>

            <ListItem button key={"Stats"}>
                <ListItemIcon>
                  <BarChartIcon></BarChartIcon>
                </ListItemIcon>
                <ListItemText primary={"Stats"} />
              </ListItem>

              <ListItem button key={"Projects"}>
                <ListItemIcon>
                  <FolderOpenIcon></FolderOpenIcon>
                </ListItemIcon>
                <ListItemText primary={"Projects"} />
              </ListItem>

              <ListItem button key={"Chat"}>
                <ListItemIcon>
                  <ChatIcon></ChatIcon>
                </ListItemIcon>
                <ListItemText primary={"Chat"} />
              </ListItem>

              <ListItem button key={"Calender"}>
                <ListItemIcon>
                  <CalendarTodayIcon></CalendarTodayIcon>
                </ListItemIcon>
                <ListItemText primary={"Calender"} />
              </ListItem>

              <ListItem button key={"Settings"}>
                <ListItemIcon>
                  <SettingsIcon></SettingsIcon>
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItem>
              <ListItem button key={"Log out"}>
                <ListItemIcon>
                  <LogoutIcon></LogoutIcon>
                </ListItemIcon>
                <ListItemText primary={"Log out"} />
              </ListItem>
          </List>
          
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 8 }}
        >

        <div >
          <h1>
            Project
          </h1>
        </div>
          <DragDrop></DragDrop>
         
       
        </Box>
      </Box>
    
    )
}