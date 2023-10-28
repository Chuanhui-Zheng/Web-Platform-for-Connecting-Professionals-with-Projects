export function fileToDataUrl(file) {
  const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }
  
  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve,reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

/**
 * Checks the email
 * 
 * @param {string} email 
 * @returns {boolean} - false if invalid email, true if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email));
}

/**
 * Checks the password
 * 
 * @param {string} password 
 * @returns {boolean} - false if invalid password, true if valid password
 */
export function isValidPassword(password) {
  const passwordStr = String(password)
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const minLength = 8;

  return (
    passwordStr.length >= minLength
    && lowercaseRegex.test(passwordStr)
    && uppercaseRegex.test(passwordStr)
  );
}