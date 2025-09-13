import React, { useMemo, useState } from 'react'
import LocationMap from '../components/LocationMap'
import { mockDoctors, mockPharmacies, mockFacilities } from '../data/mockData'
import { AppBar, Toolbar, Typography, Box, FormControl, InputLabel, Select, MenuItem, Drawer, List, ListItem, ListItemText, Checkbox, FormControlLabel, Button } from '@mui/material'

export default function MapDemo() {
  const [cityFilter, setCityFilter] = useState<string>('All')
  const [typeDoctors, setTypeDoctors] = useState(true)
  const [typePharmacies, setTypePharmacies] = useState(true)
  const [typeFacilities, setTypeFacilities] = useState(true)

  const cities = useMemo(() => {
    const set = new Set<string>()
    mockDoctors.forEach(d => set.add(d.location.city))
    mockPharmacies.forEach(p => set.add(p.city))
    mockFacilities.forEach(f => set.add(f.city))
    return ['All', ...Array.from(set)]
  }, [])

  const doctorMarkers = mockDoctors.map(d => ({ id: `doc-${d.id}`, name: `Dr. ${d.firstName} ${d.lastName}`, address: d.location.address, city: d.location.city, coordinates: d.location.coordinates, type: 'doctor' }))
  const pharmacyMarkers = mockPharmacies.map(p => ({ id: `ph-${p.id}`, name: p.name, address: p.address, city: p.city, coordinates: p.coordinates, type: 'pharmacy' }))
  const facilityMarkers = mockFacilities.map(f => ({ id: `fac-${f.id}`, name: f.name, address: f.address, city: f.city, coordinates: f.coordinates, type: f.type }))

  let items = [...doctorMarkers, ...pharmacyMarkers, ...facilityMarkers]
  if (!typeDoctors) items = items.filter(i => i.type !== 'doctor')
  if (!typePharmacies) items = items.filter(i => i.type !== 'pharmacy')
  if (!typeFacilities) items = items.filter(i => !(i.type && (i.type.toLowerCase() === 'laboratoire' || i.type.toLowerCase() === 'imagerie')))
  if (cityFilter !== 'All') items = items.filter(i => i.city === cityFilter)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">Carte des établissements - Mounsin</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: 260, [`& .MuiDrawer-paper`]: { width: 260, top: '64px' } }}>
        <List>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Ville</InputLabel>
              <Select value={cityFilter} label="Ville" onChange={(e) => setCityFilter(e.target.value)}>
                {cities.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControlLabel control={<Checkbox checked={typeDoctors} onChange={(e) => setTypeDoctors(e.target.checked)} />} label="Docteurs" />
          </ListItem>
          <ListItem>
            <FormControlLabel control={<Checkbox checked={typePharmacies} onChange={(e) => setTypePharmacies(e.target.checked)} />} label="Pharmacies" />
          </ListItem>
          <ListItem>
            <FormControlLabel control={<Checkbox checked={typeFacilities} onChange={(e) => setTypeFacilities(e.target.checked)} />} label="Laboratoires/Imagerie" />
          </ListItem>
          <ListItem>
            <Button variant="contained" onClick={() => { setCityFilter('All'); setTypeDoctors(true); setTypePharmacies(true); setTypeFacilities(true) }}>Réinitialiser</Button>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '260px', marginTop: '64px' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Visualisation</Typography>
        <LocationMap items={items} center={{ lat: 0.0, lng: 9.0 }} zoom={6} />
      </Box>
    </Box>
  )
}
