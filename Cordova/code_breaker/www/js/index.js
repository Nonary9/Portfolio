document.addEventListener('deviceready',function(){
    //nao e afetado pela configuracao do dispositivo
    //cordova plugin add https://github.com/phonegap/phonegap-mobile-accessibility
    MobileAccessibility.usePreferredTextZoom(false);
    

});


document.addEventListener('init', function(event){
    var page = event.target;

    if (page.id === "title.html") {
        title_js.init();
    }
    else if(page.id === "game.html"){

        game_js.init();
        
    }
    

    
    // if(page.id === "title.html"){
    //     var elem_btn = document.getElementById("startBtn");

    //     elem_btn.addEventListener('click', function(){
    //         var navi = document.getElementById("navi");
    //         navi.pushPage("game.html");

    //         // ons.notification.alert('ボタンを押しました');
    //     });
    // }
});
