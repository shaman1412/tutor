$(document).ready(function() {

} );



function authenticate(){

    var data = {
        username : document.getElementById('username').value,
        password : document.getElementById('password').value
    };
    var xhr  = new XMLHttpRequest();
   
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const response = JSON.parse(this.response);
            window.location.href = response.redirect;
           
        }else if(this.readyState == 4 && this.status != 200){
            alert(this.responseText);

        }
    };
    xhr.open("POST","http://127.0.0.1:5000/user/authenticate" ,true);
    //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
    return false;
}

//onclick="window.location.href = 'admin_showList.html';"