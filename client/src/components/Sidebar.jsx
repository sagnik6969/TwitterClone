import React from "react";

import SidebarItem from "./SidebarItem";
import Button from "./Button";
import "./sidebar.css";

import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

function Sidebar() {
  //console.log(clickprop.clickfunction)
  return (
    <div className="sidebar">
      <SidebarItem Icon={TwitterIcon} text={""} activeState={true} />
      <SidebarItem Icon={HomeIcon} text={"Home"} activeState={true} />
      <SidebarItem Icon={ExploreIcon} text="Explore" activeState={false} />
      <SidebarItem
        Icon={NotificationsIcon}
        text="Notifications"
        activeState={false}
      />
      <SidebarItem Icon={MailOutlineIcon} text="Messages" activeState={false} />
      <SidebarItem
        Icon={BookmarkBorderIcon}
        text="Bookmarks"
        activeState={false}
      />
      <SidebarItem Icon={ListAltIcon} text="Lists" activeState={false} />
      <SidebarItem
        Icon={PersonOutlineIcon}
        text="Profile"
        activeState={false}
      />
      <SidebarItem
        Icon={MoreHorizOutlinedIcon}
        text="More"
        activeState={false}
      />
      <Button />
    </div>
  );
}
export default Sidebar;
