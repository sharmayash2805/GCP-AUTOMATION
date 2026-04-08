import AccountBalance from '@mui/icons-material/AccountBalance'
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined'
import AttachMoney from '@mui/icons-material/AttachMoney'
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined'
import HourglassTop from '@mui/icons-material/HourglassTop'
import RedeemOutlined from '@mui/icons-material/RedeemOutlined'
import SavingsOutlined from '@mui/icons-material/SavingsOutlined'
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const redemptionOptions = [
  {
    id: 'offset-project',
    title: 'Carbon Offset Certificate',
    description: 'Redeem credits to offset verified corporate emissions.',
    requiredCredits: 100,
  },
  {
    id: 'esg-report',
    title: 'ESG Reporting Claim',
    description: 'Apply credits for annual sustainability declarations.',
    requiredCredits: 150,
  },
  {
    id: 'compliance',
    title: 'Compliance Adjustment',
    description: 'Redeem credits toward environmental compliance metrics.',
    requiredCredits: 200,
  },
  {
    id: 'neutralization',
    title: 'Net-Zero Neutralization',
    description: 'Use credits for long-term net-zero milestone accounting.',
    requiredCredits: 250,
  },
]

function CreditsDashboard() {
  const { currentUser } = useAuth()
  const [selectedOption, setSelectedOption] = useState(null)

  const availableCredits = currentUser.credits.earned - currentUser.credits.redeemed

  const statCards = [
    {
      label: 'Total Earned',
      value: currentUser.credits.earned,
      icon: <AttachMoney sx={{ color: '#4f46e5' }} />,
      bg: '#e0e7ff',
    },
    {
      label: 'Available',
      value: availableCredits,
      icon: <AccountBalance sx={{ color: '#16a34a' }} />,
      bg: '#dcfce7',
    },
    {
      label: 'Redeemed',
      value: currentUser.credits.redeemed,
      icon: <CheckCircleOutlined sx={{ color: '#2563eb' }} />,
      bg: '#dbeafe',
    },
    {
      label: 'In Pipeline',
      value: currentUser.credits.inPipeline,
      icon: <HourglassTop sx={{ color: '#d97706' }} />,
      bg: '#fef3c7',
    },
  ]

  const verificationType = (index) => {
    if (index % 3 === 0) {
      return 'AI + Officer Verified'
    }
    if (index % 3 === 1) {
      return 'AI Verified'
    }
    return 'Pending Officer Visit'
  }

  const verificationTypeColor = (type) => {
    if (type === 'AI + Officer Verified') {
      return 'success'
    }
    if (type === 'AI Verified') {
      return 'info'
    }
    return 'warning'
  }

  const creditStatus = (row) => {
    if (row.type === 'Redeemed') {
      return 'Credited'
    }
    if (row.type === 'Earned' && row.credits > 140) {
      return 'In Progress'
    }
    return 'Pipeline'
  }

  const statusColor = (status) => {
    if (status === 'Credited') {
      return 'success'
    }
    if (status === 'In Progress') {
      return 'warning'
    }
    return 'default'
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AccountBalanceWalletOutlined sx={{ color: '#14532d' }} />
          <Typography variant="h4" sx={{ color: '#14532d' }}>
            Credits Dashboard
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {statCards.map((card, index) => (
            <Grid key={card.label} item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {card.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ color: '#14532d', fontWeight: 700 }}>
                        {card.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.label}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Card>
          <CardHeader title="Credits Ledger" avatar={<VerifiedOutlined sx={{ color: '#16a34a' }} />} />
          <CardContent>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f0fdf4' }}>
                    {['Date', 'Activity', 'Parcel ID', 'Verification Type', 'Status', 'Credits'].map((label) => (
                      <TableCell key={label} sx={{ fontWeight: 700, color: '#14532d' }}>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUser.ledger.map((row, index) => {
                    const verify = verificationType(index)
                    const status = creditStatus(row)

                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.activity}</TableCell>
                        <TableCell>{row.parcelId}</TableCell>
                        <TableCell>
                          <Chip label={verify} size="small" color={verificationTypeColor(verify)} />
                        </TableCell>
                        <TableCell>
                          <Chip label={status} size="small" color={statusColor(status)} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: row.credits >= 0 ? '#16a34a' : '#d97706' }}>
                          {row.credits >= 0 ? `+${row.credits}` : row.credits}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Card sx={{ mt: 3 }}>
          <CardHeader title="Available Redemption Options" avatar={<RedeemOutlined sx={{ color: '#16a34a' }} />} />
          <CardContent>
            <Grid container spacing={2}>
              {redemptionOptions.map((option) => (
                <Grid key={option.id} item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          backgroundColor: '#dcfce7',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#16a34a',
                          mb: 1.2,
                        }}
                      >
                        <SavingsOutlined />
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {option.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {option.description}
                      </Typography>
                      <Divider sx={{ mb: 1.5 }} />

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Chip label={`Up to ${option.requiredCredits} GC`} size="small" variant="outlined" color="success" />
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => setSelectedOption(option)}
                        >
                          Redeem
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mt: 3 }}>
          <CardHeader title="Redemption History" />
          <CardContent>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f0fdf4' }}>
                    {['Date', 'Purpose', 'Credits Used', 'Status'].map((label) => (
                      <TableCell key={label} sx={{ fontWeight: 700, color: '#14532d' }}>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUser.redemptionHistory.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.purpose}</TableCell>
                      <TableCell>{row.creditsUsed}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          color={row.status === 'Approved' ? 'success' : row.status === 'In Progress' ? 'warning' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Stack>

      <Dialog open={Boolean(selectedOption)} onClose={() => setSelectedOption(null)}>
        <DialogTitle>Confirm Redemption</DialogTitle>
        <DialogContent>
          <Typography>
            Redemption request submitted. You will be notified within 7 working days by the nodal officer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedOption(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

export default CreditsDashboard