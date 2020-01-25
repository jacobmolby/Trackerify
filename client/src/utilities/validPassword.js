export default password => {
  const validPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})'
  );
  return validPassword.test(password);
};
