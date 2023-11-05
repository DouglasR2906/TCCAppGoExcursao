import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import MenuCabecalho from "../MenuCabecalho/menuCabecalho";

interface Props {
  posicao: "fixed" | "absolute" | "sticky" | "static" | "relative" | undefined;
  exibirUsuario: boolean
}

function Cabecalho({ posicao, exibirUsuario }: Props) {


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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }} />
          {exibirUsuario &&
            <MenuCabecalho />
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Cabecalho;
