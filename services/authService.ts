export const logout = () => {
    // Remove user and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Redirect to login page
    window.location.href = '/login'; // Adjust this path based on your app's login route
};
