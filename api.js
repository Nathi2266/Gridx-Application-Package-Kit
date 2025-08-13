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

export const registerUser = async ({ full_name, email, password, phone_number }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ full_name, email, password, phone_number }),
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

export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch profile');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateProfile = async ({ token, full_name, email, phone_number, profile_image_url }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ full_name, email, phone_number, profile_image_url }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update profile');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const changePassword = async ({ token, current_password, new_password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/me/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ current_password, new_password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to change password');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateNotifications = async ({ token, enabled }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/me/notifications`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ enabled }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update notifications');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
