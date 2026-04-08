import BusinessCenter from '@mui/icons-material/BusinessCenter'
import EnergySavingsLeaf from '@mui/icons-material/EnergySavingsLeaf'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar({ onMenuClick, isMobile }) {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        height: 64,
        justifyContent: 'center',
        bgcolor: '#ffffff',
        color: '#14532d',
        borderBottom: '1px solid #dcfce7',
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', px: { xs: 1.5, sm: 2.5 } }}>
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 1, color: '#14532d', display: { md: 'none' } }}
            aria-label="open navigation"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
          <IconButton
            disableRipple
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#16a34a',
              '&:hover': { bgcolor: '#15803d' },
            }}
          >
            <EnergySavingsLeaf sx={{ color: '#ffffff', fontSize: 20 }} />
          </IconButton>

          <Box>
            <Typography sx={{ fontWeight: 700, color: '#14532d', fontSize: '1.1rem', lineHeight: 1.1 }}>
              GreenCredit Portal
            </Typography>
            <Typography sx={{ color: '#6b7280', fontSize: '0.72rem', lineHeight: 1.2 }}>
              MoEFCC, Govt. of India
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Chip
            icon={<BusinessCenter fontSize="small" />}
            label={`${currentUser.name} · ${currentUser.sector}`}
            color="success"
            variant="outlined"
            size="small"
            sx={{ maxWidth: { xs: 170, md: '100%' }, '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' } }}
          />
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar