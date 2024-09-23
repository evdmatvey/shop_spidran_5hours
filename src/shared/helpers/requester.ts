import axios, { CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const requester = axios.create(options);
