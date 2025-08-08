import UserPhoto from "@/components/UserPhoto";
import { IconButton, Menu } from "@mui/material";
import "@szhsin/react-menu/dist/index.css";
import MembroMenu from "./MembroMenu";
import "./profile-menu-style.css";
import { useState } from "react";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} type="button">
        <UserPhoto />
      </IconButton>
      <Menu
        id="profile-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MembroMenu />
      </Menu>
    </>
  );
};

export default ProfileMenu;
