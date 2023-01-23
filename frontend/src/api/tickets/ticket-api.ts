import axios from 'axios';

// Default config options
const defaultOptions = {
    
    headers: {
      'Content-Type': 'application/json',
    },

  };

let axiosInstance = axios.create(defaultOptions)

