import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, label, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-all duration-200 font-medium",
          isActive && "bg-primary-600 text-white shadow-sm border-l-4 border-primary-800",
          className
        )
      }
    >
      <ApperIcon name={icon} size={20} />
      <span>{label}</span>
    </NavLink>
  );
};

export default NavItem;