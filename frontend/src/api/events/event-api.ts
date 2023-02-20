import axios from 'axios'

const defaultOptions = { // Default config options for authentication
    
    headers: {
      'Content-Type': 'application/json',
    },

  };

let axiosInstance = axios.create(defaultOptions)

axiosInstance.interceptors.request.use((configData: any | undefined) => {
    
    const authToken = localStorage.getItem("token");
    configData.headers.Authorization = authToken ? `Bearer ${authToken}` : "" // Store the token in the header
    return configData;
})

export const createEvent = async (eventPayLoad: any): Promise<any> => {

    try {

        const response = await axios.post("/api/event/events", eventPayLoad);
        const data = await response.data;
    
        return data;
    } 
    
    catch(err: any) {
       
        if(err) {
            return console.error(err);
        }
        
    }

}