/**
 * Decode the JWT token to get the payload data
 * @param {*} token 
 * @returns 
 */
function decodeJWT(token) {
  // Get the payload part
  const base64Url = token.split('.')[1];

  // Replace URL-safe characters
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  // Return the decoded payload
  return JSON.parse(jsonPayload);
}

export default decodeJWT