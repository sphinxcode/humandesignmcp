import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Fallback cities for when Google API is not configured
const POPULAR_CITIES = [
  { place_id: 'manila', description: 'Manila, Metro Manila, Philippines', structured_formatting: { main_text: 'Manila', secondary_text: 'Metro Manila, Philippines' } },
  { place_id: 'new_york', description: 'New York, NY, USA', structured_formatting: { main_text: 'New York', secondary_text: 'NY, USA' } },
  { place_id: 'los_angeles', description: 'Los Angeles, CA, USA', structured_formatting: { main_text: 'Los Angeles', secondary_text: 'CA, USA' } },
  { place_id: 'london', description: 'London, UK', structured_formatting: { main_text: 'London', secondary_text: 'UK' } },
  { place_id: 'paris', description: 'Paris, France', structured_formatting: { main_text: 'Paris', secondary_text: 'France' } },
  { place_id: 'tokyo', description: 'Tokyo, Japan', structured_formatting: { main_text: 'Tokyo', secondary_text: 'Japan' } },
  { place_id: 'sydney', description: 'Sydney, NSW, Australia', structured_formatting: { main_text: 'Sydney', secondary_text: 'NSW, Australia' } },
  { place_id: 'singapore', description: 'Singapore', structured_formatting: { main_text: 'Singapore', secondary_text: 'Singapore' } },
  { place_id: 'hong_kong', description: 'Hong Kong', structured_formatting: { main_text: 'Hong Kong', secondary_text: 'China' } },
  { place_id: 'dubai', description: 'Dubai, United Arab Emirates', structured_formatting: { main_text: 'Dubai', secondary_text: 'United Arab Emirates' } },
  { place_id: 'berlin', description: 'Berlin, Germany', structured_formatting: { main_text: 'Berlin', secondary_text: 'Germany' } },
  { place_id: 'toronto', description: 'Toronto, ON, Canada', structured_formatting: { main_text: 'Toronto', secondary_text: 'ON, Canada' } },
  { place_id: 'mumbai', description: 'Mumbai, Maharashtra, India', structured_formatting: { main_text: 'Mumbai', secondary_text: 'Maharashtra, India' } },
  { place_id: 'sao_paulo', description: 'Sao Paulo, Brazil', structured_formatting: { main_text: 'Sao Paulo', secondary_text: 'Brazil' } },
  { place_id: 'mexico_city', description: 'Mexico City, Mexico', structured_formatting: { main_text: 'Mexico City', secondary_text: 'Mexico' } },
  { place_id: 'bangkok', description: 'Bangkok, Thailand', structured_formatting: { main_text: 'Bangkok', secondary_text: 'Thailand' } },
  { place_id: 'jakarta', description: 'Jakarta, Indonesia', structured_formatting: { main_text: 'Jakarta', secondary_text: 'Indonesia' } },
  { place_id: 'bali', description: 'Bali, Indonesia', structured_formatting: { main_text: 'Bali', secondary_text: 'Indonesia' } },
  { place_id: 'cebu', description: 'Cebu City, Philippines', structured_formatting: { main_text: 'Cebu City', secondary_text: 'Philippines' } },
  { place_id: 'davao', description: 'Davao City, Philippines', structured_formatting: { main_text: 'Davao City', secondary_text: 'Philippines' } },
  { place_id: 'quezon', description: 'Quezon City, Metro Manila, Philippines', structured_formatting: { main_text: 'Quezon City', secondary_text: 'Metro Manila, Philippines' } },
  { place_id: 'makati', description: 'Makati, Metro Manila, Philippines', structured_formatting: { main_text: 'Makati', secondary_text: 'Metro Manila, Philippines' } },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query || query.length < 2) {
    return NextResponse.json({ predictions: [] });
  }

  // If Google API key is configured, use Google Places API
  if (GOOGLE_API_KEY) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(cities)&key=${GOOGLE_API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ predictions: data.predictions || [] });
      }
    } catch (error) {
      console.error('Google Places API error:', error);
    }
  }

  // Fallback: Filter popular cities based on query
  const normalizedQuery = query.toLowerCase();
  const filteredCities = POPULAR_CITIES.filter(city =>
    city.description.toLowerCase().includes(normalizedQuery) ||
    city.structured_formatting.main_text.toLowerCase().includes(normalizedQuery)
  ).slice(0, 5);

  return NextResponse.json({ predictions: filteredCities });
}
