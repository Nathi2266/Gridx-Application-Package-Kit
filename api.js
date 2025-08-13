import { API_BASE_URL } from './config';

export const topUp = async ({ userId, amount, method, token }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/topup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId, amount, payment_method: method }),
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

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Login failed');
    }

    return { success: true, token: data.access_token };
  } catch (error) {
    console.error('Login API error:', error);
    return { success: false, error: error.message };
  }
};

export const registerUser = async ({ full_name, email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ full_name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Registration failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Registration API error:', error);
    return { success: false, error: error.message };
  }
};
