// Simple test script to check API endpoints
// Vercel dev typically runs on port 3000 or another port
const API_BASE = 'http://localhost:3000/api'

async function testAPI() {
  console.log('Testing API endpoints...')

  try {
    // Test doctors endpoint
    const doctorsResponse = await fetch(`${API_BASE}/doctors`)
    console.log('Doctors endpoint status:', doctorsResponse.status)

    if (doctorsResponse.ok) {
      const data = await doctorsResponse.json()
      console.log('Doctors data:', data)
    } else {
      console.log('Doctors error:', await doctorsResponse.text())
    }

    // Test pharmacies endpoint
    const pharmaciesResponse = await fetch(`${API_BASE}/pharmacies`)
    console.log('Pharmacies endpoint status:', pharmaciesResponse.status)

    if (pharmaciesResponse.ok) {
      const data = await pharmaciesResponse.json()
      console.log('Pharmacies data:', data)
    } else {
      console.log('Pharmacies error:', await pharmaciesResponse.text())
    }

  } catch (error) {
    console.error('API test failed:', error.message)
  }
}

testAPI()
