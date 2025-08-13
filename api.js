import { API_BASE_URL } from './config';

export const topUp = async ({ userId, amount, method, token }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/topup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, amount, method }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Top-up failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Top-up API error:', error);
    return { success: false, error: error.message };
  }
};
