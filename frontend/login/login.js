function authenticate() {
  var data = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.response);
      var d = new Date();
      var exdays = 1;
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = 'expires=' + d.toUTCString();
      // localStorage['token'] = response.token;
      // localStorage['username'] = response.username;\
      var cookies = 'tutorloginToken=' + response.token + ';' + expires + ';' + 'path=/;';
      document.cookie = cookies;
      console.log(document.cookie);
      //document.cookie = "tutorloginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = response.redirect;
    } else if (this.readyState == 4 && this.status != 200) {
      alert(this.responseText);
    }
  };
  xhr.open('POST', '/user/authenticate', true);
  //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.withCredentials = true;
  xhr.send(JSON.stringify(data));
  return false;
}

//onclick="window.location.href = 'admin_showList.html';"
