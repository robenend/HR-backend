const nameRegex = /^[A-Za-z]+$/;
const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
const contactNumberRegex = /^\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to validate the first name
const validateName = (name) => {
  return nameRegex.test(name);
};

// Function to validate the date of birth
const validateDateOfBirth = (dateOfBirth) => {
  return dateOfBirthRegex.test(dateOfBirth);
};

// Function to validate the contact number
const validateContactNumber = (contactNumber) => {
  return contactNumberRegex.test(contactNumber);
};

const validateEmail = (email) => {
  return emailRegex.test(email);
};

module.exports = {
  validateName,
  validateDateOfBirth,
  validateContactNumber,
  validateEmail
};