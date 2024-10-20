const url = "http://localhost:5000/api/user";
import axios from "axios";


export const fetchUsers = async () => {
    try{
        const response = await axios.get(`${url}/`, {
            headers: {
              "Content-Type": "application/json",
            },
          })

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Error: ${response.data.message}`);
          }
      
          console.log("User created successfully:", response.data);
          return response.data;
    } catch(err) {

    }
}