import axios from 'axios'

// Create the base URL
const eventAPI = axios.create({
    baseURL: "http://localhost:5301/api/v1/events"
})

eventAPI.interceptors.request.use((configuration) => {
  const authToken = localStorage.getItem("token"); // Handle JWT Functionality


      // Add the JWT to the request if it exists
      if (authToken) {
         configuration.headers!.Authorization = `Bearer ${authToken}`;
      }

      return configuration;
})