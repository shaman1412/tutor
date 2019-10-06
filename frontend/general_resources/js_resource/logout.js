function logout(event) {
  //event.preventDefault();
  //document.cookie = "tutorloginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = 'tutorloginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // window.location.href = "/";
}
