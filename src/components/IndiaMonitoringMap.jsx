import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { companies } from '../data/companies'

// Approximate coordinates for states/regions typically found in data
const stateCoords = {
  Maharashtra: [19.7515, 75.7139],
  Gujarat: [22.2587, 71.1924],
  Karnataka: [15.3173, 75.7139],
  'Madhya Pradesh': [22.9734, 78.6569],
  Chhattisgarh: [21.2787, 81.8661],
  'West Bengal': [22.9868, 87.8550],
  Odisha: [20.9517, 85.0985],
  Rajasthan: [27.0238, 74.2179],
  default: [20.5937, 78.9629],
}

// Helper to jitter coordinates so multiple parcels in the same state don't exact-overlap entirely
function jitter(coord, index) {
  const seed = (index * 0.1) % 0.8 - 0.4
  return [coord[0] + seed, coord[1] + seed * 1.5]
}

export default function IndiaMonitoringMap({ onParcelClick }) {
  const parcels = []
  
  // Aggregate all parcels
  companies.forEach((company) => {
    company.allocatedParcels.forEach((parcel) => {
      parcels.push({
        ...parcel,
        company: company.name,
        companyCredits: company.credits.earned,
        status: 'Active',
      })
    })
    company.pendingParcels.forEach((parcel) => {
      parcels.push({
        ...parcel,
        company: company.name,
        companyCredits: company.credits.earned,
        status: 'Pending',
      })
    })
  })

  // Assign colors based on status or flagged state
  // In a real app 'flagged' would be in the parcel data, we will simulate it for "Pending" as yellow, some active as red if specific names, else green.
  const getParcelColor = (p) => {
    if (p.status === 'Pending') return '#f59e0b' // Yellow
    if (p.state === 'Maharashtra' && p.area < 25) return '#dc2626' // Red (simulate a flagged area)
    return '#16a34a' // Green (restored / healthy)
  }

  return (
    <Box sx={{ height: 450, width: '100%', borderRadius: 3, overflow: 'hidden', border: '1px solid #d6d3d1' }}>
      <MapContainer 
        center={[22.5937, 78.9629]} 
        zoom={4.5} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          // Alternatively, an OSM standard map, but imagery feels more "monitoring"
          // We'll use cartodb positron for a cleaner data-viz look or satellite. Given prompt, satellite is cool! Let's mix satellite with borders if possible, but ESRI World Imagery is excellent.
        />
        {parcels.map((p, i) => {
          const baseCoord = stateCoords[p.state] || stateCoords.default
          const finalCoord = jitter(baseCoord, i)
          const color = getParcelColor(p)

          return (
            <CircleMarker
              key={p.id}
              center={finalCoord}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.8,
                weight: 2,
              }}
              radius={8}
            >
              <Popup>
                <Box sx={{ minWidth: 200, p: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1c1917', mb: 0.5 }}>
                    {p.id}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#57534e', fontSize: '0.8rem', mb: 1 }}>
                    {p.company}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" sx={{ color: '#a8a29e' }}>State:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{p.state}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" sx={{ color: '#a8a29e' }}>Area:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{p.area} ha</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mb={1.5}>
                    <Typography variant="caption" sx={{ color: '#a8a29e' }}>Status:</Typography>
                    <Chip 
                      label={p.status === 'Active' && color === '#dc2626' ? 'Flagged' : p.status} 
                      size="small" 
                      sx={{ 
                        height: 16, 
                        fontSize: '0.65rem', 
                        fontWeight: 700,
                        bgcolor: color + '20',
                        color: color
                      }} 
                    />
                  </Stack>
                  <Button 
                    variant="contained" 
                    size="small" 
                    fullWidth 
                    color="success"
                    sx={{ fontSize: '0.7rem' }}
                    onClick={() => onParcelClick && onParcelClick(p)}
                  >
                    View Details
                  </Button>
                </Box>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </Box>
  )
}
