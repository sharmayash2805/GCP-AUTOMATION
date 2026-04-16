import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined'
import TimelineOutlined from '@mui/icons-material/TimelineOutlined'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Skeleton,
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
import { useEffect, useState } from 'react'
import { companies } from '../../data/companies'
import { activityLogs } from '../data/adminData'

function companyRows() {
  return companies.map((c) => ({
    id: c.id,
    name: c.name,
    sector: c.sector,
    state: c.state,
    totalLand: c.allocatedParcels.reduce((s, p) => s + p.area, 0).toFixed(1),
    creditsEarned: c.credits.earned,
    parcels: c.allocatedParcels.length,
    pending: c.pendingParcels.length,
    status: c.allocatedParcels.length > 0 ? 'Active' : 'Inactive',
    contactPerson: c.contactPerson,
    email: c.email,
    registeredOn: c.registeredOn,
  }))
}

function logBadge(severity) {
  const map = {
    success: { bgcolor: '#f0fdf4', color: '#16a34a' },
    info: { bgcolor: '#f0f9ff', color: '#0284c7' },
    warning: { bgcolor: '#fffbeb', color: '#d97706' },
    error: { bgcolor: '#fff5f5', color: '#dc2626' },
  }
  return map[severity] || { bgcolor: '#f5f5f4', color: '#57534e' }
}

function CompaniesPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setRows(companyRows())
      setLoading(false)
    }, 700)
    return () => clearTimeout(t)
  }, [])

  const totalCredits = companies.reduce((s, c) => s + c.credits.earned, 0)
  const totalRedeemed = companies.reduce((s, c) => s + c.credits.redeemed, 0)
  const totalLand = companies.reduce(
    (s, c) => s + c.allocatedParcels.reduce((a, p) => a + p.area, 0),
    0,
  )

  const summaryStats = [
    { label: 'Companies', value: companies.length, color: '#16a34a' },
    { label: 'Credits Issued', value: totalCredits.toLocaleString('en-IN'), color: '#0284c7' },
    { label: 'Credits Redeemed', value: totalRedeemed.toLocaleString('en-IN'), color: '#d97706' },
    { label: 'Land Allocated', value: `${totalLand.toFixed(1)} ha`, color: '#7c3aed' },
  ]

  return (
    <Box>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff', fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
            Companies &amp; Activity Logs
          </Typography>
          <Typography variant="body2" sx={{ color: '#d6d3d1', mt: 0.25, fontSize: { xs: '0.78rem', sm: '0.875rem' } }}>
            Registered company profiles and system-wide activity timeline.
          </Typography>
        </Box>
      </motion.div>

      {/* Summary Stats */}
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 2.5 } }}>
        {summaryStats.map((s) => (
          <Grid item xs={6} sm={3} key={s.label}>
            <Card sx={{ textAlign: 'center', '&:hover': { transform: 'translateY(-2px)' }, transition: 'transform 0.2s' }}>
              <CardContent sx={{ py: { xs: 1.5, sm: 2 } }}>
                <Typography sx={{ fontSize: { xs: '1.4rem', sm: '1.7rem' }, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography variant="caption" sx={{ color: '#78716c', fontSize: { xs: '0.62rem', sm: '0.72rem' } }}>
                  {s.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {/* Companies Table */}
        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent sx={{ px: { xs: 1, sm: 1.5 }, py: { xs: 1.5, sm: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                <ApartmentOutlined sx={{ color: '#16a34a', fontSize: 20 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Registered Companies
                </Typography>
              </Stack>

              {/* Scrollable table */}
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 560 }}>
                  <TableHead>
                    <TableRow
                      sx={{
                        '& .MuiTableCell-head': {
                          fontWeight: 700,
                          color: '#57534e',
                          bgcolor: '#f5f5f4',
                          fontSize: '0.73rem',
                          whiteSpace: 'nowrap',
                          py: 1,
                        },
                      }}
                    >
                      <TableCell>Company</TableCell>
                      <TableCell>Sector</TableCell>
                      <TableCell align="right">Land (ha)</TableCell>
                      <TableCell align="right">Credits</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 5 }).map((__, j) => (
                              <TableCell key={j}>
                                <Skeleton variant="text" height={20} />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      : rows.map((r) => (
                          <TableRow key={r.id} hover>
                            <TableCell>
                              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#1c1917', lineHeight: 1.3 }}>
                                {r.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#a8a29e', fontSize: '0.68rem' }}>
                                {r.contactPerson} · {r.state}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={r.sector}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.66rem', whiteSpace: 'nowrap' }}
                              />
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
                              {r.totalLand}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700, color: '#16a34a', fontSize: '0.82rem' }}>
                              {r.creditsEarned.toLocaleString('en-IN')}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={r.status}
                                color={r.status === 'Active' ? 'success' : 'default'}
                                size="small"
                                sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Company Detail Cards */}
              {!loading && (
                <Box sx={{ mt: 2.5 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: '#78716c', fontWeight: 700, fontSize: '0.66rem', letterSpacing: 0.8, mb: 1.25, display: 'block' }}
                  >
                    Contact Details
                  </Typography>
                  <Grid container spacing={1.25}>
                    {rows.map((r) => (
                      <Grid item xs={12} sm={6} key={r.id}>
                        <Box
                          sx={{
                            p: 1.5,
                            bgcolor: '#f5f5f4',
                            borderRadius: 1.5,
                            border: '1px solid #e7e5e4',
                            '&:hover': { bgcolor: '#f0f0ef' },
                            transition: 'background-color 0.15s',
                          }}
                        >
                          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', mb: 0.5 }}>
                            {r.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#78716c', display: 'block', fontSize: '0.68rem' }}>
                            📧 {r.email}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#78716c', display: 'block', fontSize: '0.68rem' }}>
                            📅 Reg: {r.registeredOn}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#78716c', display: 'block', fontSize: '0.68rem' }}>
                            🌲 {r.parcels} active · ⏳ {r.pending} pending
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Timeline */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                <TimelineOutlined sx={{ color: '#d97706', fontSize: 20 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Activity Timeline
                </Typography>
              </Stack>
              <Box sx={{ maxHeight: { xs: 380, sm: 540 }, overflowY: 'auto', pr: 0.25 }}>
                {activityLogs.map((log, i) => {
                  const badge = logBadge(log.severity)
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.03 }}
                    >
                      <Box sx={{ display: 'flex', gap: 1.25, mb: 0.5 }}>
                        {/* Dot + connector */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Box
                            sx={{
                              width: 9,
                              height: 9,
                              borderRadius: '50%',
                              bgcolor: badge.color,
                              mt: 0.55,
                              flexShrink: 0,
                            }}
                          />
                          {i < activityLogs.length - 1 && (
                            <Box
                              sx={{ width: 2, flexGrow: 1, bgcolor: '#e7e5e4', my: 0.2, minHeight: 18 }}
                            />
                          )}
                        </Box>
                        {/* Log content */}
                        <Box sx={{ pb: 1.25, minWidth: 0 }}>
                          <Chip
                            label={log.type}
                            size="small"
                            sx={{
                              bgcolor: badge.bgcolor,
                              color: badge.color,
                              fontWeight: 700,
                              fontSize: '0.62rem',
                              height: 17,
                              borderRadius: 1,
                              mb: 0.25,
                            }}
                          />
                          <Typography
                            sx={{ fontSize: '0.75rem', color: '#1c1917', fontWeight: 500, lineHeight: 1.4, mt: 0.25 }}
                          >
                            {log.detail}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#a8a29e', fontSize: '0.66rem' }}>
                            {log.company} · {log.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  )
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CompaniesPage
