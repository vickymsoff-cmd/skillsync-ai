import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    direction: "up" | "down";
    value: number;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  className = "",
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-slate-800 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p
              className={`text-xs mt-2 ${
                trend.direction === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
            </p>
          )}
        </div>
        {icon && <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>}
      </div>
    </div>
  );
};
