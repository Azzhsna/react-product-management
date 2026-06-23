export const BASE_URL = 'https://dummyjson.com';

const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export const apiGet = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, { 
    headers: getHeaders(),
    credentials: 'omit' // We are using Bearer tokens primarily, dummyjson supports include for cookies but let's stick to explicit headers if possible, or use include as user requested
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
};

export const apiPost = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
};

export const apiPut = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
};

export const apiDelete = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
};
