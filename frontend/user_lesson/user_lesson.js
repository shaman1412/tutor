var user;
$(document).ready(function(){

    
debugger;
    var pathname = window.location.pathname;
    var lengthIn = "/login/lesson/".length;
    var indexpath = pathname.indexOf('/login/lesson/')
    var realpath = pathname.substring(indexpath + lengthIn,pathname.length);
    var xhr  = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            user = this.response;
            //alert(this.responseText);
            showUserDetail();
            return false; 
        }
    };
    xhr.open("GET","/user/getUserById/" + realpath ,true);
    //http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    return false;






})

function openInNewTab(link) {
    debugger;
    var lnk = link.getAttribute("set-link");
    var query= window.btoa(lnk);
    var win = window.open("/login/lessonView?link=" + query, '_blank');
    win.focus();
}


function showUserDetail(){
        if(user){
    try {
        debugger;
         var titleName = "titleId"
         var userObject = JSON.parse(user);
         var rightContent = document.getElementsByClassName('right-content')[0];
         var leftContent = document.getElementsByClassName('left-content')[0];
         var lesson = document.getElementById('title').getElementsByClassName('nav-item')[0];
         var subject = document.getElementById('subject').getElementsByClassName('list-group-item')[0];
         var topic = document.getElementById('topic').getElementsByClassName('topic-card')[0];
         var topicTitle = document.getElementById('topic-title').getElementsByClassName('container')[0];
         var topicSubject = document.getElementById('topic-subject').getElementsByClassName('clear-none')[0];
            for(titleIndex in userObject.lesson){
                if(userObject.lesson[titleIndex].invisible){
                    continue;
                }
                var cloneLesson = lesson.cloneNode(true);
                cloneLesson.getElementsByClassName('nav-link')[0].innerHTML = userObject.lesson[titleIndex].name;
                cloneLesson.getElementsByClassName('nav-link')[0].setAttribute("href", "#"+titleName + titleIndex);
                rightContent.getElementsByClassName('nav-tabs')[0].appendChild(cloneLesson);

                var SubjectlistGroup = document.createElement('ul');
                SubjectlistGroup.setAttribute('class', 'list-group');
                var subjectObject= userObject.lesson[titleIndex].subject;
                var allLeftConent  = leftContent.getElementsByClassName('all-list-group')[0];
                var clonetopicTitle = topicTitle.cloneNode(true);
                for(subjectIndex in subjectObject){
                    var cloneSubject = subject.cloneNode(true);
                    cloneSubject.innerHTML = subjectObject[subjectIndex].name;
                    SubjectlistGroup.appendChild(cloneSubject);
                  
                    var clonetopiciSubject = topicSubject.cloneNode(true);
      
                    var topicObject= subjectObject[subjectIndex].topic;
                    for(topicIndex in topicObject){
                        var cloneTopic = topic.cloneNode(true);
                        cloneTopic.setAttribute('set-link',topicObject[topicIndex].link);
                        cloneTopic.getElementsByClassName('card-title')[0].innerHTML = topicObject[topicIndex].name;
                        clonetopiciSubject.getElementsByClassName('all-topic-group')[0].appendChild(cloneTopic)

                    }
                    clonetopicTitle.appendChild(clonetopiciSubject);

                }
                allLeftConent.appendChild(SubjectlistGroup);
                clonetopicTitle.setAttribute("id", titleName + titleIndex);
                document.getElementsByClassName('tab-content')[0].appendChild(clonetopicTitle);
             
            }
          
            $('.nav-tabs').find('.nav-item:first').children().addClass('active');
        
            $('.list-group:first').find('.list-group-item:first').addClass('active');

            $('.tab-content').find('.container:first').addClass('active');

            $('.tab-content').find('.container:first').siblings().addClass('fade');

            $('.list-group-item').on('click', function(){
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            })

            $('.nav-tabs').on('click','.nav-item', function(){
                var index = $(this).index();
                //alert(index);
                $('.list-group').each(function(){
                    if(index == $(this).index()){
                        $(this).find('.list-group-item:first').addClass('active');
                        $(this).find('.list-group-item:first').siblings().removeClass('active');
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                });
            })

            $('.list-group').each(function(){
                if($(this).index() == 0){
                    $(this).find('.list-group-item:first').addClass('active');
                    $(this).find('.list-group-item:first').siblings().removeClass('active');
                    $(this).show();
                }else{
                    $(this).hide();
                }
            });


            $('.list-group-item').on('click', function(){
                var index = $(this).index();
                //alert(index);
                $('.tab-content').find('.container').filter('.active').find('.clear-none').each(function(){
        
                    if(index == $(this).index() - 1){
                        $(this).show();
                        
                    }else{
                        $(this).hide();
                    }
                });
            })

            $('.tab-content').find('.container').filter('.active').find('.clear-none').each(function(){
                if($(this).index() == 1){
                    $(this).show();
                    
                }else{
                    $(this).hide();
                }
            });

debugger;
          var  topGroupAll  = document.getElementsByClassName('all-topic-group')[0];

          topGroupAll.addEventListener('click', function(){
                alert('dsfsd');
            })



        } catch (error) {
                debugger;
        }
    
    
    
    
        }

}