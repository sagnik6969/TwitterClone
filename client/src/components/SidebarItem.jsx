import React from "react";
import "./sidebarItem.css";
function SidebarItem({ text, Icon, activeState }) {
  return (
    <div className={`sidebarItem ${activeState && "active"}`}>
      <Icon className="icon" />
      {text !== "" && <h2>{text}</h2>}
    </div>
  );
}

export default SidebarItem;
