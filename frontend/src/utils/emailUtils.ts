import emailjs from "emailjs-com";

export const sendEmailNotification = async (
  recipientEmail: string,
  applicantName: string,
  status: string,
  message: string
) => {
  const templateParams = {
    to_email: recipientEmail,
    to_name: applicantName,
    status: status,
    message: message,
  };

  try {
    const response = await emailjs.send(
      "service_sflejad", // Replace with your EmailJS service ID
      "template_vsusodt", // Replace with your EmailJS template ID
      templateParams,
      "jrDCVvqI4peJwZ_Jd" // Replace with your EmailJS user ID
    );
    console.log("Email successfully sent!", response.status, response.text);
    return true; // Indicate success
  } catch (error) {
    console.error("Failed to send email:", error);
    return false; // Indicate failure
  }
};