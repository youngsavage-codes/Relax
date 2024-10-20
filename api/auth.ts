import axios from 'axios';

const url = 'http://localhost:5000'; // Updated with protocol

export const loginApi = async (email: string, password: string, router: any) => {
    try {
      const response = await axios.post(`${url}/api/auth/signin`, { email, password });
      
      if (response.status === 200) {
        const { token, user } = response.data;
  
        // Store token and user in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // Convert the user object to a string
        
        router.push('/');
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
    }
  };

  export const registerApi = async (fullName: string, userName: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${url}/api/auth/signup`, { fullName, userName, email, password });
  
      // Return true if the registration is successful (status code 201)
      return response.status === 201;
      
    } catch (err) {
      console.error(err); // Log the error for debugging
      return false; // Return false on failure
    }
  };
  