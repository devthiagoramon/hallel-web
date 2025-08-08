import { selectUserPhoto } from "@/store/userSlice";
import { Avatar } from "@mui/material";
import { UserCircle } from "phosphor-react";
import { useSelector } from "react-redux";
import { type CSSProperties } from "styled-components";

interface UserPhotoProps {
    photoStyle?: CSSProperties;
    size?: number,
    iconColor?: string
}

const UserPhoto = ({ photoStyle, size, iconColor }: UserPhotoProps) => {
    const photo = useSelector(selectUserPhoto) || "";

    if (photo === "") {
        return (
            <UserCircle size={size || 60} style={photoStyle} color={iconColor || "#343A40"} />
        );
    } else {
        return (
            <Avatar
                src={photo}
                sx={{ width: size || 60, height: size || 60, ...photoStyle }}
            />
        );
    }
};

export default UserPhoto;
