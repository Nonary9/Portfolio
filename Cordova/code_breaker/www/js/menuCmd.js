
ons.ready(function() {
  console.log("Onsen UI is ready!");
});

window.fn = {};
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};
window.fn.load = function(page) {
  var navigator = document.getElementById("navi");
  if (navigator) {
    navigator.resetToPage(page, { animation: "slide" }).then(function () {
      var menu = document.getElementById('menu');
      if (menu) {
        menu.close();
      }
    });
  }
};
window.fn.pushPage = function (page) {
  var navigator = document.getElementById("navi");
  if (navigator) {
    navigator.pushPage(page, { animation: "slide" });
  }
};
window.fn.popPage = function () {
  var navigator = document.getElementById("navi");
  if (navigator) {
    navigator.popPage({ animation: "slide" }).then(function () {
      var menu = document.getElementById('menu');
      if (menu) {
        menu.close();
      }
    });;
    
  }
};
window.fn.closePage = function() {
  var menu = document.getElementById('menu');
  menu.close();
}

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}
