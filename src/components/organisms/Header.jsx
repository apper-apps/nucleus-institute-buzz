import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMobileMenuToggle }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/students":
        return "Students";
      case "/enquiries":
        return "Enquiries";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ApperIcon name="Menu" size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Deshmukh Computer Institute CRM
            </h1>
            <p className="text-sm text-slate-500 mt-1">{getPageTitle()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
            <ApperIcon name="Calendar" size={16} />
            <span>{new Date().toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200">
            <ApperIcon name="GraduationCap" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Admin Panel</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;