// AUTO-RUNNING AI AGENT - 100% FREE
// Runs automatically every week
// Uses strict quality filters (no API costs)

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// COMPREHENSIVE EU CITIES - Focus on motorcycle-heavy regions
// Italy, Germany, France, Spain have highest motorcycle ownership
const ALL_CITIES = [
  // Italy (highest motorcycle density in EU)
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964 },
  { name: 'Milan', country: 'Italy', lat: 45.4642, lon: 9.1900 },
  { name: 'Naples', country: 'Italy', lat: 40.8518, lon: 14.2681 },
  { name: 'Turin', country: 'Italy', lat: 45.0703, lon: 7.6869 },
  { name: 'Bologna', country: 'Italy', lat: 44.4949, lon: 11.3426 },
  { name: 'Florence', country: 'Italy', lat: 43.7696, lon: 11.2558 },
  { name: 'Genoa', country: 'Italy', lat: 44.4056, lon: 8.9463 },
  { name: 'Palermo', country: 'Italy', lat: 38.1157, lon: 13.3615 },
  { name: 'Venice', country: 'Italy', lat: 45.4408, lon: 12.3155 },
  { name: 'Verona', country: 'Italy', lat: 45.4384, lon: 10.9916 },
  { name: 'Padua', country: 'Italy', lat: 45.4064, lon: 11.8768 },
  { name: 'Brescia', country: 'Italy', lat: 45.5416, lon: 10.2118 },
  
  // Germany (strong motorcycle culture)
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
  { name: 'Munich', country: 'Germany', lat: 48.1351, lon: 11.5820 },
  { name: 'Hamburg', country: 'Germany', lat: 53.5511, lon: 9.9937 },
  { name: 'Frankfurt', country: 'Germany', lat: 50.1109, lon: 8.6821 },
  { name: 'Cologne', country: 'Germany', lat: 50.9375, lon: 6.9603 },
  { name: 'Stuttgart', country: 'Germany', lat: 48.7758, lon: 9.1829 },
  { name: 'Düsseldorf', country: 'Germany', lat: 51.2277, lon: 6.7735 },
  { name: 'Dortmund', country: 'Germany', lat: 51.5136, lon: 7.4653 },
  { name: 'Essen', country: 'Germany', lat: 51.4556, lon: 7.0116 },
  { name: 'Nuremberg', country: 'Germany', lat: 49.4521, lon: 11.0767 },
  
  // France (high motorcycle usage)
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  { name: 'Marseille', country: 'France', lat: 43.2965, lon: 5.3698 },
  { name: 'Lyon', country: 'France', lat: 45.7640, lon: 4.8357 },
  { name: 'Toulouse', country: 'France', lat: 43.6047, lon: 1.4442 },
  { name: 'Nice', country: 'France', lat: 43.7102, lon: 7.2620 },
  { name: 'Bordeaux', country: 'France', lat: 44.8378, lon: -0.5792 },
  { name: 'Lille', country: 'France', lat: 50.6292, lon: 3.0573 },
  { name: 'Strasbourg', country: 'France', lat: 48.5734, lon: 7.7521 },
  
  // Spain (warm climate, high scooter/motorcycle usage)
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038 },
  { name: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734 },
  { name: 'Valencia', country: 'Spain', lat: 39.4699, lon: -0.3763 },
  { name: 'Seville', country: 'Spain', lat: 37.3891, lon: -5.9845 },
  { name: 'Zaragoza', country: 'Spain', lat: 41.6488, lon: -0.8891 },
  { name: 'Málaga', country: 'Spain', lat: 36.7213, lon: -4.4214 },
  { name: 'Bilbao', country: 'Spain', lat: 43.2630, lon: -2.9350 },
  
  // Greece (warm climate, islands, high motorcycle usage)
  { name: 'Athens', country: 'Greece', lat: 37.9838, lon: 23.7275 },
  { name: 'Thessaloniki', country: 'Greece', lat: 40.6401, lon: 22.9444 },
  
  // Portugal
  { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393 },
  { name: 'Porto', country: 'Portugal', lat: 41.1579, lon: -8.6291 },
  
  // Netherlands (high cycling culture includes motorcycles)
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041 },
  { name: 'Rotterdam', country: 'Netherlands', lat: 51.9225, lon: 4.47917 },
  { name: 'The Hague', country: 'Netherlands', lat: 52.0705, lon: 4.3007 },
  
  // Belgium
  { name: 'Brussels', country: 'Belgium', lat: 50.8503, lon: 4.3517 },
  { name: 'Antwerp', country: 'Belgium', lat: 51.2194, lon: 4.4025 },
  
  // Austria (Alpine touring, BMW culture)
  { name: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738 },
  { name: 'Graz', country: 'Austria', lat: 47.0707, lon: 15.4395 },
  
  // Switzerland (Alpine touring)
  { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417 },
  { name: 'Geneva', country: 'Switzerland', lat: 46.2044, lon: 6.1432 },
  
  // UK (already have London data, add more)
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { name: 'Manchester', country: 'United Kingdom', lat: 53.4808, lon: -2.2426 },
  { name: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lon: -1.8904 },
  
  // Scandinavia
  { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686 },
  { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
  { name: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522 },
  { name: 'Helsinki', country: 'Finland', lat: 60.1695, lon: 24.9354 },
  
  // Eastern Europe
  { name: 'Prague', country: 'Czech Republic', lat: 50.0755, lon: 14.4378 },
  { name: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402 },
  { name: 'Warsaw', country: 'Poland', lat: 52.2297, lon: 21.0122 },
  { name: 'Kraków', country: 'Poland', lat: 50.0647, lon: 19.9450 },
  { name: 'Bucharest', country: 'Romania', lat: 44.4268, lon: 26.1025 },
  { name: 'Sofia', country: 'Bulgaria', lat: 42.6977, lon: 23.3219 },
  
  // Ireland
  { name: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603 },
];

const STATE_FILE = path.join(__dirname, 'agent-state.json');
const SEARCH_RADIUS_KM = 30;
const CITIES_PER_RUN = 3; // Search 3 cities each time it runs

// Load agent state
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (error) {
    console.log('Creating new state file...');
  }
  return {
    currentCityIndex: 0,
    totalRuns: 0,
    totalShopsAdded: 0,
    lastRun: null,
    citiesCompleted: []
  };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function buildAddress(tags) {
  const parts = [];
  if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
  if (tags['addr:street']) parts.push(tags['addr:street']);
  if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
  if (tags['addr:city']) parts.push(tags['addr:city']);
  if (tags['addr:country']) parts.push(tags['addr:country']);
  return parts.length > 0 ? parts.join(', ') : 'Address not available';
}

async function searchCity(city) {
  console.log(`\n🔍 Searching ${city.name}, ${city.country}...`);
  
  const query = `
    [out:json][timeout:25];
    (
      node["shop"="motorcycle"]["service:repair"="yes"](around:${SEARCH_RADIUS_KM * 1000},${city.lat},${city.lon});
      way["shop"="motorcycle"]["service:repair"="yes"](around:${SEARCH_RADIUS_KM * 1000},${city.lat},${city.lon});
      node["shop"="motorcycle_repair"](around:${SEARCH_RADIUS_KM * 1000},${city.lat},${city.lon});
      way["shop"="motorcycle_repair"](around:${SEARCH_RADIUS_KM * 1000},${city.lat},${city.lon});
      node["craft"="motorcycle_repair"](around:${SEARCH_RADIUS_KM * 1000},${city.lat},${city.lon});
      way["craft"="motorcycle_repair"](around:${SEARCH_RADIUS_KM * 1000},${city.lat},${city.lon});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: { 'Content-Type': 'text/plain' }
    });

    const data = await response.json();
    console.log(`   Found ${data.elements.length} candidates`);
    return data.elements;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return [];
  }
}

function applyStrictFilters(shop, tags, name, city) {
  // FILTER 1: Must have valid name (minimum 3 characters, not generic)
  if (!name || name === 'Unknown' || name.length < 3) {
    return { pass: false, reason: 'No valid name' };
  }
  
  // Generic names to reject
  const genericNames = ['shop', 'garage', 'moto', 'motor', 'service', 'repair'];
  const lowerName = name.toLowerCase();
  const isGeneric = genericNames.every(generic => lowerName === generic);
  if (isGeneric) {
    return { pass: false, reason: 'Generic name only' };
  }

  // FILTER 2: STRICT bicycle keyword rejection
  const bicycleKeywords = [
    'bicycle', 'bike', 'bikes', 'vélo', 'velo', 'fahrrad', 
    'bici', 'cykel', 'fiets', 'pyörä', 'rower', 'bicicleta',
    'cycle', 'cycling', 'pushbike', 'pedal'
  ];
  
  for (const keyword of bicycleKeywords) {
    // Reject if contains bicycle keyword AND doesn't contain motorcycle keyword
    if (lowerName.includes(keyword)) {
      const motorcycleKeywords = ['motor', 'moto', 'mc ', 'motorcycle', 'mc-'];
      const hasMotorcycleKeyword = motorcycleKeywords.some(mk => lowerName.includes(mk));
      if (!hasMotorcycleKeyword) {
        return { pass: false, reason: `Bicycle keyword: ${keyword}` };
      }
    }
  }

  // FILTER 3: MUST have street address (not just city)
  const hasStreet = tags['addr:street'] && tags['addr:street'].length > 2;
  const hasHouseNumber = tags['addr:housenumber'];
  
  if (!hasStreet) {
    return { pass: false, reason: 'No street address' };
  }

  // FILTER 4: MUST have at least 3 address components
  const addressParts = [];
  if (tags['addr:housenumber']) addressParts.push(tags['addr:housenumber']);
  if (tags['addr:street']) addressParts.push(tags['addr:street']);
  if (tags['addr:postcode']) addressParts.push(tags['addr:postcode']);
  if (tags['addr:city']) addressParts.push(tags['addr:city']);
  
  if (addressParts.length < 3) {
    return { pass: false, reason: `Incomplete address (${addressParts.length}/3+ parts)` };
  }

  // FILTER 5: Distance check (strict 30km limit)
  const distance = calculateDistance(city.lat, city.lon, shop.lat, shop.lon);
  if (distance > SEARCH_RADIUS_KM) {
    return { pass: false, reason: `Too far (${distance.toFixed(1)}km > ${SEARCH_RADIUS_KM}km)` };
  }

  // FILTER 6: MUST be explicitly tagged as motorcycle repair
  const isMotoRepair = 
    (tags.shop === 'motorcycle' && tags['service:repair'] === 'yes') ||
    tags.shop === 'motorcycle_repair' ||
    tags.craft === 'motorcycle_repair';
  
  if (!isMotoRepair) {
    return { pass: false, reason: 'Not explicitly tagged as motorcycle repair' };
  }
  
  // FILTER 7: Reject if tagged as primarily sales (not repair)
  if (tags.shop === 'motorcycle' && !tags['service:repair']) {
    return { pass: false, reason: 'Motorcycle sales only, no repair service tagged' };
  }

  // FILTER 8: Check for valid coordinates (not default/placeholder values)
  if (shop.lat === 0 || shop.lon === 0) {
    return { pass: false, reason: 'Invalid coordinates' };
  }

  // FILTER 9: Reject if explicitly closed
  if (tags['disused'] === 'yes' || tags['abandoned'] === 'yes' || tags['demolished'] === 'yes') {
    return { pass: false, reason: 'Marked as closed/abandoned' };
  }

  // ALL FILTERS PASSED!
  return { pass: true, distance };
}

function processShops(shops, city) {
  const approved = [];
  const rejected = [];

  for (const shop of shops) {
    if (!shop.lat || !shop.lon) continue;

    const tags = shop.tags || {};
    const name = tags.name || tags['name:en'] || 'Unknown';

    const filterResult = applyStrictFilters(shop, tags, name, city);

    if (filterResult.pass) {
      const approvedShop = {
        place_id: `osm_${shop.type}_${shop.id}`,
        name: name,
        address: buildAddress(tags),
        city: `${city.name}, ${city.country}`,
        latitude: shop.lat,
        longitude: shop.lon,
        phone: tags.phone || tags['contact:phone'] || 'N/A',
        website: tags.website || tags['contact:website'] || 'N/A',
        hours: tags.opening_hours || 'N/A',
        business_type: 'Motorcycle repair shop',
        rating: 'N/A',
        reviews_count: 0,
        distance_from_city_center: filterResult.distance.toFixed(2),
        is_city_center: filterResult.distance <= 10,
        added_by: 'auto_agent',
        scraped_at: new Date().toISOString()
      };
      approved.push(approvedShop);
    } else {
      rejected.push({ name, reason: filterResult.reason });
    }
  }

  return { approved, rejected };
}

async function addToDatabase(shops) {
  if (shops.length === 0) return 0;

  console.log(`   📝 Adding ${shops.length} shops...`);

  try {
    const { error } = await supabase
      .from('repair_shops')
      .insert(shops);

    if (error) {
      console.error(`   ❌ Error: ${error.message}`);
      return 0;
    }
    
    console.log(`   ✅ Added successfully!`);
    return shops.length;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return 0;
  }
}

async function runAgent() {
  console.log('🤖 AUTO-RUNNING AGENT Starting...\n');
  console.log('=' .repeat(60));
  
  // PING DATABASE - Keeps Supabase free tier alive
  try {
    const { data, error } = await supabase
      .from('repair_shops')
      .select('place_id')
      .limit(1);
    if (error) {
      console.log('⚠️  Database ping failed:', error.message);
    } else {
      console.log('✅ Database ping successful - Supabase stays alive!');
    }
  } catch (error) {
    console.log('⚠️  Database ping error:', error.message);
  }
  
  const state = loadState();
  
  console.log('📊 Agent Status:');
  console.log(`   Total runs: ${state.totalRuns}`);
  console.log(`   Total shops added: ${state.totalShopsAdded}`);
  console.log(`   Cities completed: ${state.citiesCompleted.length}/${ALL_CITIES.length}`);
  console.log(`   Next city index: ${state.currentCityIndex}`);
  if (state.lastRun) {
    console.log(`   Last run: ${new Date(state.lastRun).toLocaleString()}`);
  }
  console.log('=' .repeat(60));
  console.log('\n🎯 Strict quality filtering enabled');
  console.log(`📍 Searching ${CITIES_PER_RUN} cities this run\n`);

  let totalApproved = 0;
  let totalRejected = 0;
  let totalAdded = 0;

  // Search next 3 cities
  for (let i = 0; i < CITIES_PER_RUN; i++) {
    const cityIndex = (state.currentCityIndex + i) % ALL_CITIES.length;
    const city = ALL_CITIES[cityIndex];

    const rawShops = await searchCity(city);
    const { approved, rejected } = processShops(rawShops, city);
    
    totalApproved += approved.length;
    totalRejected += rejected.length;

    const added = await addToDatabase(approved);
    totalAdded += added;

    console.log(`   📊 Approved: ${approved.length} | Rejected: ${rejected.length} | Added: ${added}`);

    if (!state.citiesCompleted.includes(city.name)) {
      state.citiesCompleted.push(city.name);
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Update state
  state.currentCityIndex = (state.currentCityIndex + CITIES_PER_RUN) % ALL_CITIES.length;
  state.totalRuns += 1;
  state.totalShopsAdded += totalAdded;
  state.lastRun = new Date().toISOString();
  saveState(state);

  console.log('\n' + '='.repeat(60));
  console.log('🎉 RUN COMPLETE!\n');
  console.log(`✅ Approved: ${totalApproved} shops`);
  console.log(`❌ Rejected: ${totalRejected} shops`);
  console.log(`💾 Added to DB: ${totalAdded} shops`);
  console.log(`\n📊 Total shops added (all time): ${state.totalShopsAdded}`);
  console.log(`🔄 Progress: ${state.citiesCompleted.length}/${ALL_CITIES.length} cities`);
  console.log('='.repeat(60));
  console.log('\n💡 Agent will run automatically again next week!');
}

runAgent().catch(console.error);