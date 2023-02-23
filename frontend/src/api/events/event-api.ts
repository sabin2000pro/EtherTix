import axios from 'axios'

const defaultOptions = { // Default config options for authentication
    
    headers: {
      'Content-Type': 'application/json',
    },

  };

let axiosInstance = axios.create(defaultOptions)

axiosInstance.interceptors.request.use((configData: any | undefined) => {
    
    const eventToken = localStorage.getItem("token");
    configData.headers.Authorization = eventToken ? `Bearer ${eventToken}` : "" // Store the token in the header
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

export const getAllEventData = async (eventPayLoad: any): Promise<any> => {

    try{
    const response = await axios.delete("/api/event/events", eventPayLoad);
        const data = await response.data;
    
        return data;
    } 
    
    catch(err: any) {
       
        if(err) {
            return console.error(err);
        }
}
}

export const getSingleEventData = async (eventPayLoad: any): Promise<any> => {

    try{
    const response = await axios.delete("/api/event/events", eventPayLoad);
        const data = await response.data;
    
        return data;
    } 
    
    catch(err: any) {
       
        if(err) {
            return console.error(err);
        }
}
}

export const deleteSingleEvent = async (eventPayLoad: any): Promise<any> => {

    try {

        const response = await axios.delete("/api/event/events", eventPayLoad);
        const data = await response.data;
    
        return data;
    } 
    
    catch(err: any) {
       
        if(err) {
            return console.error(err);
        }
        
    }
}
