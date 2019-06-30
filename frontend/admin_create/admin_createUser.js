
 var checkId = '';
$(document).ready(function(){
    checkId = '';
    debugger;
    $('.save-lesson').on('click','.lesson-title-add',(function(){
        debugger;
        var title = $('#template-lesson').html();
        $('.title-group').last().after( title );
    }));
    
    $('.save-lesson').on('click','.lesson-subject-add',(function(){
        debugger;
        var subject = $('#template-subject').html();
        $(this).parent().parent().parent().after(subject);
    }));
    
    $('.save-lesson').on('click','.lesson-topic-add',(function(){
        debugger;
        var subject =  $('#template-topic').html();
        $(this).parent().parent().parent().after(subject);
    }));
    
    $('.save-lesson').on('click','.lesson-title-remove',(function(){
        debugger;
        if($(this).parent().parent().parent().siblings().length != 1){
            $(this).parent().parent().parent().remove();
        }else{
            alert("ไม่สามารถลบได้เพราะเป็นตัวสุดท้าย");
        }
      
    }));
    
    $('.save-lesson').on('click','.lesson-subject-remove',(function(){
        debugger;
        if($(this).parent().parent().parent().siblings().length != 1){
            $(this).parent().parent().parent().remove();
        }else{
            alert("ไม่สามารถลบได้เพราะเป็นตัวสุดท้าย");
        }
    }));
    
    $('.save-lesson').on('click','.lesson-topic-remove',(function(){
        debugger;
        if($(this).parent().parent().parent().siblings().length != 1){
            $(this).parent().parent().parent().remove();
        }else{
            alert("ไม่สามารถลบได้เพราะเป็นตัวสุดท้าย");
        }
    }));
    


});


// $('#userpass-form').on('submit', function (e) {

//     e.preventDefault();

//     $.ajax({
//       type: 'post',
//       url: 'post.php',
//       data: $('form').serialize(),
//       success: function () {
//         alert('form was submitted');
//       }
//     });

//   });
function topicObjetc(){
    this.name = '';
    this.link = '';
}
function subjectObject(){
    this.name = '';
    this.topic = [];
}
function titleObject(){
    this.name = '';
    this.subject = [];
}


function saveData(){
    var result = {lesson : []};
    var title = document.getElementsByClassName('title-group');
    debugger;
    var i;
    try{
    for(i = 0 ; i < title.length ; i++){
        var titlTmp = new titleObject();
        var subject = title[i].getElementsByClassName('subject-group');
        var j;
        for(j = 0; j < subject.length ; j++){
            var subjectTmp = new subjectObject();
            var topic = subject[j].getElementsByClassName('topic-group');
            var k;
            for(k = 0; k < topic.length ; k++){
                var topicTmp = new topicObjetc();
                topicTmp.name = topic[k].getElementsByClassName('topic')[0].value;
                topicTmp.link = topic[k].getElementsByClassName('topic-link')[0].value ;
                subjectTmp.topic.push(topicTmp);
            } 
            subjectTmp.name = subject[j].getElementsByClassName('subject')[0].value ;
            titlTmp.subject.push(subjectTmp);
        }
        titlTmp.name =  title[i].getElementsByClassName('title')[0].value;
        result.lesson.push(titlTmp);
    }
        }catch(e){
         debugger;
    }
    var xhr  = new XMLHttpRequest();
    xhr.withCredentials = true
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert(this.response);
            return false;
        }
    };
   
    xhr.open("PUT","http://127.0.0.1:5000/user/updatelesson/" + JSON.parse(checkId)._id,true);
    //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(result));
    return false;
}



function senddata(event){

    var data = {
        username : document.getElementById('username').value,
        password : document.getElementById('password').value,
    };


    var xhr  = new XMLHttpRequest();
    xhr.withCredentials = true
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            checkId = this.response;
            alert(JSON.parse(checkId)._id);
        
        $('.save-userpass').hide();
        $('.save-lesson').show();
        $('#manage-password').removeClass('active');
        $('#manage-lesson').addClass('active');

        }else if(this.readyState == 4 && this.status != 200){
            alert(this.responseText);

        }
    };
    xhr.open("POST","http://127.0.0.1:5000/user/register",true);
    //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
    return false;
}
    


