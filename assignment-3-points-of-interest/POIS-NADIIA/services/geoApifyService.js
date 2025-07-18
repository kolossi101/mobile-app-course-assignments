import { API_CONFIG, MAP_CONFIG } from '../utils/constants';
import axios from 'axios';

const extractPOIData = (points) => {
  return points.map((point, index) => {
    const { properties, geometry } = point;
    const [longitude, latitude] = geometry.coordinates;
    const categories = properties.categories;
    let category = 'Unknown';

    if (categories.includes(API_CONFIG.CATEGORIES.RESTAURANTS)) {
      category = MAP_CONFIG.CATEGORY_DISPLAY.RESTAURANT;
    } else if (categories.includes(API_CONFIG.CATEGORIES.SERVICES)) {
      category = MAP_CONFIG.CATEGORY_DISPLAY.SERVICE;
    }

    return {
      id: properties.place_id,
      name: properties.name,
      address: properties.address_line2,
      category,
      coordinates: {
        latitude,
        longitude,
      },
      website: properties.website || null,
      phone: properties.contact?.phone || null,
    };
  });
};

export const fetchPOIs = async (latitude, longitude) => {
  try {
    if (!latitude || !longitude) {
      throw new Error('Missing required parameters: latitude and longitude');
    }
    if (!API_CONFIG.API_KEY) {
      console.log(`API KEY: ${API_CONFIG.API_KEY}`);
      throw new Error('Please set a valid GeoApify API key in constants.js');
    }
    // Assemble API URL
    const categories = `${API_CONFIG.CATEGORIES.RESTAURANTS},${API_CONFIG.CATEGORIES.SERVICES}`;
    const filter = `circle:${longitude},${latitude},${API_CONFIG.SEARCH_RADIUS}`;

    const url =
      `${API_CONFIG.BASE_URL}?` +
      `categories=${categories}&` +
      `conditions=${API_CONFIG.CONDITIONS}&` +
      `filter=${filter}&` +
      `limit=${API_CONFIG.MAX_RESULTS}&` +
      `apiKey=${API_CONFIG.API_KEY}`;

    console.log('Fetching POIs from:', url);
    // Get the response
    const response = await axios.get(url);
    // Extract the data
    const data = extractPOIData(response.data.features);

    return data;
  } catch (error) {
    console.error('Error fetching POIs:', error);
    throw error;
  }
};
