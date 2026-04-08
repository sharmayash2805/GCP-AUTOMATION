import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined'
import BarChartOutlined from '@mui/icons-material/BarChartOutlined'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import MapOutlined from '@mui/icons-material/MapOutlined'
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Company Dashboard', icon: DashboardOutlined },
  { to: '/land', label: 'Land Allocation', icon: MapOutlined },
  { to: '/analytics', label: 'AI Analytics', icon: BarChartOutlined },
  { to: '/credits', label: 'Credits Dashboard', icon: AccountBalanceWalletOutlined },
]

const drawerWidth = 240

function Sidebar({ mobileOpen, onClose }) {
  const { currentUser } = useAuth()
  const location = useLocation()

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', pt: '64px' }}>
      <Box sx={{ px: 2.5, py: 2.5, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <Avatar sx={{ bgcolor: '#ffffff', color: '#166534', width: 42, height: 42, fontWeight: 700, mb: 1.25 }}>
          {currentUser.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography sx={{ color: '#ecfdf5', fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.3 }}>
          {currentUser.name}
        </Typography>
      </Box>

      <List sx={{ px: 0, py: 1.5, flexGrow: 1 }}>
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to

          return (
            <ListItem key={link.to} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={link.to}
                onClick={onClose}
                sx={{
                  mx: 1,
                  borderRadius: isActive ? '0 8px 8px 0' : 1,
                  borderLeft: isActive ? '3px solid #4ade80' : '3px solid transparent',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.8)',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: 'inherit' }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem' }}>
          v1.0 · Prototype
        </Typography>
      </Box>
    </Box>
  )

  const drawerSx = {
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      borderRight: 'none',
      background: 'linear-gradient(180deg, #14532d 0%, #166534 50%, #15803d 100%)',
      color: '#ecfdf5',
    },
  }

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, ...drawerSx }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{ display: { xs: 'none', md: 'block' }, ...drawerSx }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}

export default Sidebar