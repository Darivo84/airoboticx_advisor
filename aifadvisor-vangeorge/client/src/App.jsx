import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
// import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import AIChatbot from "./components/AIChatbot/AIChatbot.jsx";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route
            path="/dashboard"
            element={
              // <PrivateRoute>
              <Dashboard />
              // </PrivateRoute>
            } />
        </Routes>
        <AIChatbot />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
