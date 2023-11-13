import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";


const settings = ["Administração", "Dados Cadastrais", "Reservas", "Sair"];

function MenuCabecalho() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const abrirLogin = () => {
    navigate("/login");
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (pagina: string) => {
    switch (pagina) {
      case "Administração":
        navigate("/admin");
        break;
      case "Dados Cadastrais":
        navigate("/usuario");
        break;
      case "Reservas":
        navigate("/usuario/reservas");
        break;
      case "Sair":
        autenticacaoStore.logout();
        navigate("/");
        break;
      default:
        setAnchorElUser(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (anchorElUser && !anchorElUser.contains(event.target as Node)) {
        setAnchorElUser(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorElUser]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Menu de opções">
        {autenticacaoStore.estaAutenticado ?
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
            <Avatar alt={autenticacaoStore.usuario.nomeUsuario} src="/static/images/avatar/2.jpg" />
          </IconButton>
          :
          <Button variant="contained" onClick={abrirLogin}>
            Entrar
          </Button>
        }

      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          ((autenticacaoStore.usuario.tipoUsuario === "CLIENTE" && setting !== "Administração")
            || (autenticacaoStore.usuario.tipoUsuario !== "CLIENTE"))
          &&
          (<MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>)
        ))}
      </Menu>
    </Box>
  );
}

export default MenuCabecalho;