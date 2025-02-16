// src/config/email.js

const emailConfig = {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  };
  
  // Validate config
  const validateConfig = () => {
    const missingKeys = [];
    Object.entries(emailConfig).forEach(([key, value]) => {
      if (!value) missingKeys.push(key);
    });
  
    if (missingKeys.length > 0) {
      console.error(
        `Missing email configuration: ${missingKeys.join(', ')}. ` +
        'Please check your .env file.'
      );
    }
  };
  
  validateConfig();
  
  export default emailConfig;