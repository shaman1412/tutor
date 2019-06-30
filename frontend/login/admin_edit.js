var user;
var userObject;
$(document).ready(function(){


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
    

    
    $('#manage-lesson').on('click',(function(){
        debugger;
        $('.save-userpass').hide();
        $('.save-lesson').show();
        $('#manage-password').removeClass('active');
        $('#manage-lesson').addClass('active');
    }));
    
    $('#manage-password').on('click',(function(){
        debugger;
        $('.save-userpass').show();
        $('.save-lesson').hide();
        $('#manage-lesson').removeClass('active');
        $('#manage-password').addClass('active');
    }));

    


    var xhr  = new XMLHttpRequest();
    // xhr.withCredentials = true
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            user = this.response;
            setLesson();
            return false; 
        }
    };
    xhr.open("GET","http://127.0.0.1:5000/user/getUserById/5d187ff409e28a2630ae8b6b" ,true);
    //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    return false;




})

function setLesson(){
    if(user){
        try {
            
      userObject = JSON.parse(user);
     var form = document.getElementById('lesson-form');
     var lesson = document.getElementById('template-lesson-scratch');
     var subject = document.getElementById('template-subject-scratch');
     var topic = document.getElementById('template-topic-scratch');
        for(titleIndex in userObject.lesson){
            var cloneLesson = lesson.content.cloneNode(true);
            form.appendChild(cloneLesson);
            document.getElementsByClassName('title-group')[titleIndex].getElementsByClassName('title')[0].value = userObject.lesson[titleIndex].name;
            var subjectObject= userObject.lesson[titleIndex].subject;
            for(subjectIndex in subjectObject){
                var formtitle = form.getElementsByClassName('title-group')[titleIndex];
                var cloneSubject = subject.content.cloneNode(true);
                formtitle.appendChild(cloneSubject);
                formtitle.getElementsByClassName('subject-group')[subjectIndex].getElementsByClassName('subject')[0].value = subjectObject[subjectIndex].name;
                var topicObject= subjectObject[subjectIndex].topic;
                for(topicIndex in topicObject){
                    var formSubject = formtitle.getElementsByClassName('subject-group')[subjectIndex];
                    var cloneTopic = topic.content.cloneNode(true);
                    formSubject.appendChild(cloneTopic);
                    formSubject.getElementsByClassName('topic-group')[topicIndex].getElementsByClassName('topic')[0].value = topicObject[topicIndex].name;
                    formSubject.getElementsByClassName('topic-group')[topicIndex].getElementsByClassName('topic-link')[0].value = topicObject[topicIndex].link;
                }
            }
        }
        $('#lesson-form').append("<button  type=\"submit\" id=\"button-save-lesson\" class=\"btn btn-primary float-right mt-2\">Saveee</button> ");

        $('.lesson-title-hide').on('click', function(){
            debugger;
            if( $(this).hasClass('btn-success')){
                $(this).removeClass('btn-success');
                $(this).addClass('btn-secondary');
                var index = $(this).parent().parent().parent().index();
                userObject.lesson[index].invisible = false;
            }else{
                $(this).addClass('btn-success');
                $(this).removeClass('btn-secondary');
                var index = $(this).parent().parent().parent().index();
                userObject.lesson[index].invisible = true;
            }
          
        });


        $('#lesson-form').find('.title-group').each(function(){
            var index = $(this).index();
            if(userObject.lesson[index].invisible){
                debugger;
                $(this).find('#lesson-title').find('.lesson-title-hide').addClass('btn-secondary');
                $(this).find('#lesson-title').find('.lesson-title-hide').removeClass('btn-success');
            }else{
                $(this).find('#lesson-title').find('.lesson-title-hide').addClass('btn-success');
                $(this).find('#lesson-title').find('.lesson-title-hide').removeClass('btn-secondary');
            }
           
        });


    } catch (error) {
            debugger;
    }




    }
}

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
    this.invisible = false;
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
        var checkInvi =  title[i].getElementsByClassName('lesson-title-hide')[0].classList.contains("btn-success");
        titlTmp.invisible = !checkInvi;
        result.lesson.push(titlTmp);
    }
        }catch(e){
         debugger;
    }
    var xhr  = new XMLHttpRequest();
 
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert(this.response);
            return false;
        }
    };
   
    xhr.open("PUT","http://127.0.0.1:5000/user/updatelesson/" + JSON.parse(user)._id,true);
    //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(result));
    return false;
}



function senddata(event){

    var data = {
        password : document.getElementById('password').value
    };


    var xhr  = new XMLHttpRequest();
   
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            checkId = this.response;
            alert(JSON.parse(checkId)._id);
                return true;
        }else if(this.readyState == 4 && this.status != 200){
            alert(this.responseText);

        }
    };
    xhr.open("PUT","http://127.0.0.1:5000/user/updatePass/" + JSON.parse(user)._id,true);
    //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
    return false;
}
    


