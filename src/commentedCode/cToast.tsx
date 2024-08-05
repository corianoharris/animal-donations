import { toast, ToastContainer } from 'react-toastify';  // Import 'toast' and 'ToastContainer' from the 'react-toastify' library
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS styles for 'react-toastify'
import React from 'react';  // Import React library

// Define the Toast component
const Toast = () => {
    return (
        // Render the ToastContainer component
        <ToastContainer position="bottom-right" />
        // ToastContainer is used to display toast notifications
        // 'position="bottom-right"' positions the notifications at the bottom right of the screen
    );
};

export default Toast;
// Export the Toast component so it can be used in other parts of the application
