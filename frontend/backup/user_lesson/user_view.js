$(document).ready(function(){

    setVideo();

});

function setVideo(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('link');

    document.getElementsByTagName('iframe').setAttribute('src',myParam);
}