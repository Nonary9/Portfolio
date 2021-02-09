var title_js = {
  init:function() {

    var elem_btn = document.getElementById("playBtn");
    elem_btn.addEventListener('click', function(){
        var navi = document.getElementById("navi");
        navi.pushPage("game.html");
    });

    var elem_btn = document.getElementById("howtoBtn");
    elem_btn.addEventListener('click', function(){
        var navi = document.getElementById("navi");
        navi.pushPage("howto.html");
    });

    
    var elem_reset = document.getElementById("reset_btn");
    elem_reset.addEventListener("click", function() {
      game_js.reset();
      fn.closePage();
      });

    var elem_reset = document.getElementById("exit_btn");
    elem_reset.addEventListener("click", function() {
    fn.popPage(); 
    });
  }
}