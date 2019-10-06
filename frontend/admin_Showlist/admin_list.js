$(document).ready(function(){
    getAllUser();
})

function getAllUser(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          
            myObj = JSON.parse(this.responseText);
            createTable(myObj);
        }
    };
    xmlhttp.open("GET", "/user/list", true);
    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function createTable(response){
    var tableBody = document.getElementsByClassName("table-body")[0];
    var txt = "<tbody class=\"trigevent\" >";
    for(index in response){
        txt += "<tr  userId= "+ response[index]._id + ">";
        txt += "<td class=\"item\">" + response[index].name + "</td>";
        txt += "<td class=\"item\">" + response[index].username + "</td>";
        txt += "<td class=\"item\">" + response[index].status + "</td>";
        txt += "<td class=\"item\">" + response[index].updateDate + "</td>";
        txt += "</tr>";
    }
    txt += "</tbody>"
    tableBody.innerHTML = txt;
    $('#example').DataTable();
    setEventClickShowDetailUser();

    var lol = '\uf002 Search users';
    $('input').addClass('font-awsome have-fontawsome');
    $('input').attr("placeholder",lol);

    $('.have-fontawsome').on('keyup', function(){
        var input = $(this);
        if(input.val().length == 0){
            input.addClass('font-awsome');
        }else{
            input.removeClass('font-awsome');
        }
    });

    $('tr').removeClass('odd');
    $('td').removeClass('sorting_1');

}

function setEventClickShowDetailUser(){
    var tr = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for(item of tr){
        item.addEventListener("click", function(){
            window.location.href = "/login/edit/" +  this.getAttribute('userid');
        });
    }
}

