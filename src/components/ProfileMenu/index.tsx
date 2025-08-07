import UserPhoto from "@/components/UserPhoto";
import { IconButton } from "@mui/material";
import { Menu, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import MembroMenu from "./MembroMenu";
import "./profile-menu-style.css";

const ProfileMenu = () => {

    return (
        <Menu
            tabIndex={9999}
            
            menuButton={
                <IconButton type="button">
                    <UserPhoto />
                </IconButton>
            }
            align="end"
            direction="bottom"
            arrow
        >
            <MenuHeader>Perfil</MenuHeader>
            <MembroMenu />
        </Menu>
    );
};

export default ProfileMenu;
