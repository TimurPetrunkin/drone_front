import React, { useState } from 'react';
import './App.css';
import NewConnectPage from './pages/NewConnectPage';
import ConnectsPage from './pages/ConnectsPage';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AppBarNav from './components/AppBarNav/AppBarNav';
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Toolbar,
  createTheme,
  Container,
} from "@mui/material";
import ViewPage from './pages/ViewPage';
import ModelPage from './pages/ModelPage';
import ArchivePage from './pages/ArchivePage';
import PlayerPage from './pages/PlayerPage';
import "@fontsource/roboto";
import ModelSettings from './pages/ModelSettings';

function App() {

  const [themeMod, setThemeMod] = useState(()=>{
    return !localStorage.theme ? "light": localStorage.theme 
  });

  const defaultTheme = createTheme({
    palette: {
      mode: themeMod,
      primary: {
        main: '#002855',
      },
      secondary:{
        main: '#fe5000',
      },
      error:{
        main: '#8d193c',
      }
    },
    typography: {
    myh: {
      fontWeight: 500,
    },
  },
  });

  return (
    <BrowserRouter>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
      <AppBarNav setThemeMod={setThemeMod} theme={themeMod}/>
      <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />  
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>  
      <Routes>
        <Route path="/" element={<ConnectsPage/>}/>
        <Route path="/new_connect" element={<NewConnectPage/>}/>
        <Route path="/view" element={<ViewPage/>}/>
        <Route path="/model" element={<ModelPage/>}/>
        <Route path="/videos" element={<ArchivePage/>}/>
        <Route path="/player" element={<PlayerPage/>}/>
        <Route path="/model_settings" element={<ModelSettings/>}/>
      </Routes>
      </Container>   
        </Box>
      </Box>
    </ThemeProvider>  
    </BrowserRouter>
  );
}

export default App;
