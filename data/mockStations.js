// data/mockStations.js
// Mock DWLR (Digital Water Level Recorder) station data for India
// Generates 100+ stations across various states and districts

const states = [
  'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana', 
  'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu', 
  'Andhra Pradesh', 'Telangana', 'Kerala', 'West Bengal', 'Bihar',
  'Odisha', 'Chhattisgarh', 'Jharkhand', 'Assam'
];

const aquiferTypes = ['Alluvial', 'Hard Rock', 'Consolidated', 'Semi-Consolidated', 'Coastal'];
const statuses = ['Active', 'Inactive', 'Maintenance'];

// Representative coordinates for each state (approximate central locations)
const stateCoordinates = {
  'Maharashtra': { lat: 19.7515, lng: 75.7139 },
  'Gujarat': { lat: 22.2587, lng: 71.1924 },
  'Rajasthan': { lat: 27.0238, lng: 74.2179 },
  'Punjab': { lat: 31.1471, lng: 75.3412 },
  'Haryana': { lat: 29.0588, lng: 76.0856 },
  'Uttar Pradesh': { lat: 26.8467, lng: 80.9462 },
  'Madhya Pradesh': { lat: 22.9734, lng: 78.6569 },
  'Karnataka': { lat: 15.3173, lng: 75.7139 },
  'Tamil Nadu': { lat: 11.1271, lng: 78.6569 },
  'Andhra Pradesh': { lat: 15.9129, lng: 79.7400 },
  'Telangana': { lat: 18.1124, lng: 79.0193 },
  'Kerala': { lat: 10.8505, lng: 76.2711 },
  'West Bengal': { lat: 22.9868, lng: 87.8550 },
  'Bihar': { lat: 25.0961, lng: 85.3131 },
  'Odisha': { lat: 20.9517, lng: 85.0985 },
  'Chhattisgarh': { lat: 21.2787, lng: 81.8661 },
  'Jharkhand': { lat: 23.6102, lng: 85.2799 },
  'Assam': { lat: 26.2006, lng: 92.9376 }
};

const districts = {
  'Maharashtra': ['Nagpur', 'Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Solapur', 'Ahmednagar'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Haryana': ['Gurgaon', 'Faridabad', 'Rohtak', 'Hisar', 'Panipat'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Sambalpur'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Korba'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur']
};

// Generate random offset for coordinates
const randomOffset = () => (Math.random() - 0.5) * 2; // ±1 degree variation

// Generate mock stations
const generateMockStations = () => {
  const stations = [];
  let stationCounter = 1;

  states.forEach(state => {
    const stateDistricts = districts[state];
    const stateCode = state.substring(0, 2).toUpperCase();
    const baseCoords = stateCoordinates[state];
    
    // Generate 5-8 stations per state
    const numStations = Math.floor(Math.random() * 4) + 5;
    
    for (let i = 0; i < numStations; i++) {
      const district = stateDistricts[Math.floor(Math.random() * stateDistricts.length)];
      const stationId = `DWLR_${stateCode}_${String(stationCounter).padStart(3, '0')}`;
      
      stations.push({
        id: stationId,
        name: `${district} ${['Central', 'North', 'South', 'East', 'West'][Math.floor(Math.random() * 5)]} DWLR`,
        latitude: baseCoords.lat + randomOffset(),
        longitude: baseCoords.lng + randomOffset(),
        state: state,
        district: district,
        aquiferType: aquiferTypes[Math.floor(Math.random() * aquiferTypes.length)],
        status: statuses[Math.random() > 0.15 ? 0 : (Math.random() > 0.5 ? 1 : 2)], // 85% Active
        installationDate: new Date(2018 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1).toISOString(),
        depth: Math.floor(Math.random() * 80) + 20, // 20-100 meters
        currentWaterLevel: Math.floor(Math.random() * 30) + 5, // 5-35 meters below ground
        lastUpdated: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Within last hour
      });
      
      stationCounter++;
    }
  });

  return stations;
};

export const mockStations = generateMockStations();

// Helper function to get stations by state
export const getStationsByState = (state) => {
  return mockStations.filter(station => station.state === state);
};

// Helper function to get stations by district
export const getStationsByDistrict = (district) => {
  return mockStations.filter(station => station.district === district);
};

// Helper function to get station by ID
export const getStationById = (id) => {
  return mockStations.find(station => station.id === id);
};

// Helper function to get active stations
export const getActiveStations = () => {
  return mockStations.filter(station => station.status === 'Active');
};

// Get critical stations (water level > 80% of depth)
export const getCriticalStations = () => {
  return mockStations.filter(station => {
    const criticalLevel = station.depth * 0.8;
    return station.currentWaterLevel > criticalLevel && station.status === 'Active';
  });
};

export default mockStations;
