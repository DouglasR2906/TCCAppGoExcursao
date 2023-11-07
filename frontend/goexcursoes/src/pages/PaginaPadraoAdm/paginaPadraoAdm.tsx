import AddIcon from "@mui/icons-material/Add";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import LuggageIcon from "@mui/icons-material/Luggage";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cabecalho from "componentes/Genericos/Cabecalho/cabecalho";
import MenuCabecalho from "componentes/Genericos/MenuCabecalho/menuCabecalho";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 20;
const drawerWidthXs = 40;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won"t need it on your project.
   */
  window?: () => Window;
}

const menu =
  [
    {
      id: 1,
      value: "Nova Excursao",
      to: "novo"
    },
    {
      id: 2,
      value: "Excursoes",
      to: "/admin"
    },
    {
      id: 3,
      value: "Reservas",
      to: "reservas"
    },
    // {
    //   id: 4,
    //   value: "Relatorios",
    //   to: "relatorios"
    // },
    {
      id: 5,
      value: "Home",
      to: "/"
    }
  ];

export default function PaginaPadraoAdm(props: Props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const selecionarMenu = (paginaAhRedirencionar: string) => {
    navigate(paginaAhRedirencionar);
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Cabecalho posicao="static" exibirUsuario={false} />
      <Divider />
      <List>
        {menu.map(itemMenu => (
          <ListItem key={itemMenu.id} disablePadding>
            <ListItemButton onClick={() => selecionarMenu(itemMenu.to)}>
              <ListItemIcon>
                {itemMenu.id === 1 && <AddIcon />}
                {itemMenu.id === 2 && <CardTravelIcon />}
                {itemMenu.id === 3 && <LuggageIcon />}
                {itemMenu.id === 4 && <FormatListBulletedIcon />}
                {itemMenu.id === 5 && <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={itemMenu.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}%)` },
          ml: { md: `${drawerWidth}%` },
          background: "#e1e1e4",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color={"#237871"}>
            Administração
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }} />
          <MenuCabecalho />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: `${drawerWidth}%` }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: `${drawerWidthXs}%` },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: `${drawerWidth}%` },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}%)` } }}
      >
        <Toolbar />
        <Paper sx={{ p: 2, width: "100%", maxHeight: "85vh", overflow: "auto" }}>
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
}
