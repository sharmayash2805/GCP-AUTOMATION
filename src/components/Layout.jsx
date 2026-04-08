import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { Alert, Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const drawerWidth = 240

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} isMobile />
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: `${drawerWidth}px` },
          mt: '64px',
          p: 3,
          backgroundColor: '#f0fdf4',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Alert
          icon={<InfoOutlined sx={{ color: '#16a34a' }} />}
          severity="info"
          sx={{
            mb: 3,
            borderRadius: 0,
            fontSize: '0.82rem',
            backgroundColor: '#dcfce7',
            color: '#14532d',
            border: '1px solid #bbf7d0',
            '& .MuiAlert-message': { py: 0.2 },
          }}
        >
          Prototype demonstration — Green Credit Programme under the Environment
          (Protection) Act, 1986
        </Alert>

        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
