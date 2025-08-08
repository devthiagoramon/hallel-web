import { Divider, ListItemIcon, MenuItem } from "@mui/material";
import { Sparkle, User } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const MembroMenu = () => {
  const navigator = useNavigate();

  return (
    <>
      <MenuItem onClick={() => navigator("/profile")}>
        <ListItemIcon>
          <User size={20} />
        </ListItemIcon>
        Meu perfil
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Sparkle size={20} />
        </ListItemIcon>
        Virar associado
      </MenuItem>
      <Divider />
      <MenuItem>Comunidade</MenuItem>
      <MenuItem>Participação em eventos</MenuItem>
      <MenuItem>Participação em retiros</MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        style={{ color: "#F44336" }}
      >
        Sair
      </MenuItem>
    </>
  );
};

export default MembroMenu;
