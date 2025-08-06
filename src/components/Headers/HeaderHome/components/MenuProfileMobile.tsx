import {
    ControlledMenu,
    MenuHeader
} from "@szhsin/react-menu";
import MembroMenu from "@/components/ProfileMenu/MembroMenu";
import React, { type Dispatch, forwardRef, type SetStateAction } from "react";

interface MenuProfileMobileProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MenuProfileMobile = forwardRef<
    HTMLButtonElement,
    MenuProfileMobileProps
>((props, ref) => {
    return (
        <ControlledMenu
            anchorRef={ref as React.RefObject<HTMLButtonElement>}
            state={props.isOpen ? "open" : "closed"}
            onClose={() => props.setIsOpen(false)}
        >
            <MenuHeader>Perfil</MenuHeader>
            <MembroMenu />
        </ControlledMenu>
    );
});

export default MenuProfileMobile;
