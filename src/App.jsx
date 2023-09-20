import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import {
  Navbar,
  Footer,
  Sidebar,
  TooltipComponent,
  ThemeSettings,
} from "./components";
import {
  Area,
  Bar,
  Calendar,
  Customers,
  Dashboard,
  Employees,
  Financial,
  Kanban,
  Line,
  Orders,
  Pie,
  Pyramid,
  Stacked,
} from "./pages";

import { ContextProvider, useStateContext } from "./contexts/ContextProvider";

import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

import "./App.css";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);
const App = () => {
  const { activeMenu, screenSize, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();
  
  return (
    <div className={currentMode === "Dark" ?  'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: currentColor, borderRadius: "50%" }}
                onClick={() => { setThemeSettings(true)}}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div
              className={`w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white transition-all`}
            >
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg transition-all">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div
              className={`fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ${
                screenSize <= 768 && activeMenu ? "blur-[2px]" : "blur-none"
              }`}
            >
              <Navbar />
            </div>

            {themeSettings && <ThemeSettings />}
            <div
              className={`${
                screenSize <= 768 && activeMenu ? "blur-[2px]" : "blur-none"
              }`}
            >
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Pages */}
                <Route path="/customers" element={<Customers />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/orders" element={<Orders />} />
                {/* Apps */}
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/kanban" element={<Kanban />} />
                {/* Charts */}
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/line" element={<Line />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
