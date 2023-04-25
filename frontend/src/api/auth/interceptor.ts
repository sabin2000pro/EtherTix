import axios from 'axios';

export const defaultHeaderOptions = {

    headers: {
      "Content-Type": "application/json",
    },
  
  };

  export const processAuthInterceptor = () => {

    let axiosInstance = axios.create(defaultHeaderOptions);
  
     axiosInstance.interceptors.request.use((configData: any | undefined) => {
  
    const authToken = localStorage.getItem("token");

    configData.headers.Authorization = authToken ? `Bearer ${authToken}` : ""; // Store the token in the header


    return configData;
  
  });

  }
  
  