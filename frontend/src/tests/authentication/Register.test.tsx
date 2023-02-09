const axios = require('axios');
const {registerUser} = require('../../api/auth/auth-api');

describe('register account service', () => {
    it('should make a POST request to the correct endpoint with the correct data', async () => {
      // setup fake response from the endpoint
      const response = {
        data: {
          success: true,
          message: 'Account created successfully'
        }
      };

            // call the service with test data
            const result = await registerUser({
                email: 'test@example.com',
                password: 'password123'
              });

      const postResult = await axios.post('/api/auth/register', result)
      console.log(postResult);
  
      // import the service
  

  
      // check the result
      expect(result).toEqual(response.data);
      expect(axios.post).toHaveBeenCalledWith('/api/auth/register', {
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });