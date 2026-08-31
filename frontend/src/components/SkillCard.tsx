import React from "react";

interface SkillCardProps {
  skillName: string;
  level: number; // 0-100
  verificationLevel?: "bronze" | "silver" | "gold" | "platinum";
  category?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skillName,
  level,
  verificationLevel = "bronze",
  category,
}) => {
  const verificationColors = {
    bronze: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    silver: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    platinum:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-slate-800 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {skillName}
          </h3>
          {category && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {category}
            </p>
          )}
        </div>
        {verificationLevel && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              verificationColors[verificationLevel]
            }`}
          >
            {verificationLevel.charAt(0).toUpperCase() +
              verificationLevel.slice(1)}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-right">
        {level}%
      </p>
    </div>
  );
};
