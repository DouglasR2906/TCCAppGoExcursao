import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";

interface Props {
  posicao: "fixed" | "absolute" | "sticky" | "static" | "relative" | undefined;
  exibirUsuario: boolean
}

const settings = ["Dados Cadastrais", "Reservas", "Administração", "Sair"];

function Cabecalho({ posicao, exibirUsuario }: Props) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const abrirLogin = () => {
    navigate("/login");
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (pagina: string) => {
    if (pagina === "Administração") {
      navigate("/admin");
    }
    if (pagina === "Sair") {
      autenticacaoStore.logout;
    }

    setAnchorElUser(null);
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
    <AppBar position={posicao} sx={{
      background: "#e1e1e4",
    }}>
      <Container maxWidth="xl" sx={{ opacity: 1 }}>
        <Toolbar >
          <Link to={"/"}>
            <Avatar
              sx={{ borderRadius: 0, width: "7rem", height: "3rem", display: { xs: "flex", md: "flex" }, mr: 1 }}
              src="/imagens/logo.png"
              alt="logo-cabeçalho"
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/*<IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning"
            >
              <MenuIcon />
            </IconButton>
             <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link to={page.to}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          {/* <Link to={"/"}>
            <Avatar
              sx={{ borderRadius: 0, width: "7rem", height: "3rem", display: { xs: "flex", md: "none" }, mr: 1 }}
              src="/imagens/logo.png"
              alt="logo-cabeçalho"
            />
          </Link> */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {/* {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#287881", display: "block", fontWeight: 700, fontSize: 18 }}
              >
                <Link to={page.to}>
                  {page.label}
                </Link>
              </Button>
            ))} */}
          </Box>

          {exibirUsuario &&
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
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Cabecalho;
