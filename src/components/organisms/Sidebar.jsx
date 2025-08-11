import React from "react";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/students", icon: "Users", label: "Students" },
    { to: "/enquiries", icon: "MessageCircle", label: "Enquiries" }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-slate-200 min-h-screen">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <ApperIcon name="GraduationCap" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold font-display text-slate-900">DCI</h2>
              <p className="text-xs text-slate-500">Institute CRM</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <div className="p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <ApperIcon name="Shield" size={16} className="text-slate-600" />
              <span className="font-medium text-slate-700">System Status</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-slate-500">All systems operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
          <aside className="relative flex flex-col w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                    <ApperIcon name="GraduationCap" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold font-display text-slate-900">DCI</h2>
                    <p className="text-xs text-slate-500">Institute CRM</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <ApperIcon name="X" size={20} className="text-slate-600" />
                </button>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  className="w-full"
                />
              ))}
            </nav>
            
            <div className="p-4 border-t border-slate-200">
              <div className="p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <ApperIcon name="Shield" size={16} className="text-slate-600" />
                  <span className="font-medium text-slate-700">System Status</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-slate-500">All systems operational</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;