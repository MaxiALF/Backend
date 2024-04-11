function has8char(password) {
  if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password) ) {
    const error = new Error("Password must have at least 8 characters and contain both letters and numbers!");
    error.statusCode = 400;
    throw error;
  }
}

export default has8char;
