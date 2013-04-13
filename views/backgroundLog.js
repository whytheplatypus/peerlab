define([], function(){
    function log(peer, msg){
        var t = document.querySelector("#background-log-template");
        t.content.querySelector('strong').innerHTML = peer;
        t.content.querySelector('span').innerHTML = msg;
        document.getElementById("background_logs").insertBefore(t.content.cloneNode(true), document.getElementById("background_logs").firstChild);
    }
    return log;
});