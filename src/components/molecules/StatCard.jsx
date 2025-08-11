import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ title, value, icon, gradient, iconColor, trend }) => {
  return (
    <Card className={`p-6 ${gradient} bg-gradient-to-br border-0 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold font-display mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-3 text-white/90">
              <ApperIcon name="TrendingUp" size={16} className="mr-1" />
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <ApperIcon name={icon} size={24} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;