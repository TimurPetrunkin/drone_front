import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LeakAdd from "@mui/icons-material/LeakAdd";
import FolderIcon from '@mui/icons-material/Folder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom'

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Выбор подключения"/>
    </ListItemButton>
    <ListItemButton component={Link} to="/new_connect">
      <ListItemIcon>
        <LeakAdd />
      </ListItemIcon>
      <ListItemText primary="Подключение" />
    </ListItemButton>
    <ListItemButton component={Link} to="/videos">
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="Архив записей" />
    </ListItemButton>
  </React.Fragment>
);

