import { BirthData, HumanDesignChart } from '@/types/humandesign';

const API_URL = process.env.HD_API_URL || 'https://humandesignmcp-production.up.railway.app';

export async function calculateChart(birthData: BirthData): Promise<HumanDesignChart> {
  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(birthData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to calculate chart');
  }

  return response.json();
}

export async function getChart(id: string): Promise<HumanDesignChart | null> {
  const response = await fetch(`/api/chart/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch chart');
  }

  return response.json();
}
