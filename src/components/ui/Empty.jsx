import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "Package", 
  title = "No data available", 
  description = "Get started by adding your first item",
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={32} className="text-slate-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-900 mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-slate-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;