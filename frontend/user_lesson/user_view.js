$(document).ready(function(){
try{
    setVideo();
}catch(err){
debugger;
}


});

function setVideo(){
    debugger;
    const urlParams = new URLSearchParams(window.location.search);
    var myParam = urlParams.get('link');
    var decodedData = window.atob(myParam)
    var removeSharing = decodedData.replace('view?usp=sharing', 'preview');
    var str = removeSharing.replace(/\s+/g, '');
    var iframe = " <iframe src=\"" + str+"\" frameborder=\"0\"  scrolling=\"no\" seamless=\"\" allowfullscreen=\"true\" width=\"640\" height=\"480\"></iframe>"
    document.getElementById('inputIframe').innerHTML = iframe;
}