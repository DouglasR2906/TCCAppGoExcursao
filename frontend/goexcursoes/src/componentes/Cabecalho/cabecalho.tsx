import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// class Cabecalho extends React.Component {
//   render() {
//     return (
//       <Grid container spacing={3} height={1} bgcolor={'#267881'} sx={{ padding: '5px', opacity: 0.7 }}>
//         <Grid item xs justifyContent={"flex-start"}>
//           <img src="/imagens/logo.png" alt="logo-cabeçalho" style={{ height: '5rem' }} />
//         </Grid>
//         <Grid item xs={4} md={8} display= 'flex' alignItems='center' fontSize={24}>
//           <Grid container spacing={2}>
//             <Grid item><Button variant="text" sx={{color: '#267881'}} href="1">Lazer</Button></Grid>
//             <Grid item><Button variant="text" sx={{color: 'white'}} href="1">Eventos</Button></Grid>
//             <Grid item><Button variant="text" sx={{color: 'white'}} href="1">Shows</Button></Grid>
//             <Grid item><Button variant="text" sx={{color: 'white'}} href="1">Concursos</Button></Grid>

//           </Grid>
//         </Grid>
//         <Grid item xs justifyContent={"flex-end"} alignItems="center" style={{padding:'2rem'}}>
//           <IconButton size="large"><AccountCircleIcon /></IconButton>
//         </Grid>
//       </Grid >
//     );
//   }
// };

// export default Cabecalho;

const pages = ['Lazer', 'Eventos', 'Shows', 'Concursos'];
const settings = ['Dados Cadastrais', 'Reservas', 'Sair'];

function Cabecalho() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{ borderRadius: 0, width: '7rem', height: '3rem', display: { xs: 'none', md: 'flex' }, mr: 1 }}
            src="/imagens/logo.png"
            alt="logo-cabeçalho"
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            sx={{ borderRadius: 0, width: '7rem', height: '3rem', display: { xs: 'flex', md: 'none' }, mr: 1 }}
            src="/imagens/logo.png"
            alt="logo-cabeçalho"
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#287881', display: 'block', fontWeight: 700, fontSize: 18 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu de opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Cabecalho;
