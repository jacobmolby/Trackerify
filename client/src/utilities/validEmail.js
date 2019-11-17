export default (email) => {
  let validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,7})+$/;
  return validEmail.test(email);
};
