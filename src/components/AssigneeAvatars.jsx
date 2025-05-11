import React from "react";

const AssigneeAvatars = ({ assignees }) => {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-yellow-100 text-yellow-800",
    "bg-indigo-100 text-indigo-800",
  ];

  const getInitials = (email) => {
    if (!email) return "";
    return (
      email[0].toUpperCase() + (email.split("@")[0][1]?.toUpperCase() || "")
    );
  };

  const getColorForUser = (email) => {
    if (!email) return colors[0];
    const colorIndex = email.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  return (
    <div>
      <p className="text-xs font-medium text-slate-500 mb-2">Assigned to:</p>
      <div className="flex flex-wrap gap-2">
        {assignees && assignees.length > 0 ? (
          assignees.map((user, index) => (
            <div
              key={index}
              className={`${getColorForUser(
                user.email
              )} rounded-full flex items-center justify-center w-8 h-8 text-xs font-semibold shadow-sm`}
              title={user.email}
            >
              {getInitials(user.email)}
            </div>
          ))
        ) : (
          <span className="text-xs text-slate-400 italic">No assignees</span>
        )}
      </div>
    </div>
  );
};

export default AssigneeAvatars;
