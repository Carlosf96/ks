import { httpClient } from '@/utils/httpClient';
import { SERVICE_BASE_URL } from '@/config';

const path = '/api/v1';

export const apiClient = httpClient.create({
  baseURL: `${SERVICE_BASE_URL}${path}`,
  headers: {
    'content-type': 'application/json',
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiYWNjZXNzIiwiYXVkIjoidXNlciIsImV4cCI6MTU4ODYxMDQ1Mjg1MSwiaWF0IjoxNTgzMzQwMDUyODUyLCJqdGkiOiIwMTM4ZDRiNS0zYTE1LTQ1MjEtYTBhNi1jOWMzMTIxNjg1M2MiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6eyJpZCI6MSwibGV2ZWwiOiJBRE1JTklTVFJBVE9SIiwiZGVzY3JpcHRpb24iOiJLc3F1YXJlIGFkbWluaXN0cmF0b3IiLCJjcmVhdGVkQXQiOiIyMDIwLTAzLTAyVDIzOjI0OjUxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAzLTAyVDIzOjI0OjUxLjAwMFoifX0.cawk4dZmtsB6zyBWZEpUb3wf-RbkRizWAhKZ6o0PazA',
  },
});

apiClient.interceptors.request.use(
  config => {
    const user = window.localStorage.getItem('user');
    const userJSON = user ? JSON.parse(user) : '';

    config.headers.authorization = `Bearer ${userJSON.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
