
let correctAnswer;
let maxNum = 7;
let rowsNum = 0;

var game_js= {
  // resetGame:function(){
  //   var elem_test = document.getElementById("reset");
  //   elem_test.addEventListener('click', function(){
  //       ons.notification.alert('Jogo resetado');  
  //   });
  // },
  
  // backTitle:function(){
  //   var navi = document.getElementById("navi");
  //   navi.popPage();
  // }
  init:function() {

    var elem_menu = document.getElementById("menu_btn");
    elem_menu.addEventListener('click', function () {
        fn.open();
    });
    
    var judge_btn = document.getElementById("judge_btn");
    judge_btn.addEventListener('click',function() {
      game_js.checkAns();
    });

    this.reset();
  },

  reset:function(){

    //resetar numero de linha da tabela
    rowsNum=0;

    //resetar e gerar uma respota para o jogo
    correctAnswer = this.genAnswer();
    console.log(correctAnswer);

    //resetar os paineis
    this.resetSquare();
    
    if (document.getElementById("judge_btn").disabled) {
      document.getElementById("judge_btn").disabled = false;
    }

    //temp debug
    // document.getElementById("restTemp").innerHTML = correctAnswer;

    var dialog = document.getElementById("start_dialog");
    if(dialog){
      dialog.show();
    }
    else{
      ons.createElement('dialog.html', { append: true })
        .then(function(dialog) {
          dialog.show();
        });
    }
    document.getElementById("start_button").addEventListener('click',function() {
      dialog.hide();
    })

    var newrow =
      '<ons-row class="title_row">' +
      "<ons-col class='tnum'>Nº</ons-col>"+
      "<ons-col class='t1'>Ⅰ</ons-col>"+
      "<ons-col class='t2'>Ⅱ</ons-col>"+
      "<ons-col class='t3'>Ⅲ</ons-col>"+
      "<ons-col class='thit'>HIT</ons-col>"+
      "<ons-col class='tblow'>BLOW</ons-col>"+
      "</ons-row>";
    document.getElementById("info").innerHTML = newrow;

    
    //resetar componente select 

    this.fillSelect("sel1");
    this.fillSelect("sel2");
    this.fillSelect("sel3");

  },


  hideDialog:function(id) {
    document.getElementById("start_dialog").hide;
  },

  fillSelect:function(id) {

    var targetSelect = document.getElementById(id);
    targetSelect.querySelector(".select-input")
    .innerHTML = "";
    
    for (let index = 0; index < maxNum; index++) {
      let tempElem = document.createElement("option");
      tempElem.setAttribute('value', index);
      tempElem.innerHTML = index;
      
      targetSelect.querySelector(".select-input")
      .appendChild(tempElem);
    }
  },

  checkAns:function() {
    
    let num1 = parseInt(document.getElementById("sel1").value);
    let num2 = parseInt(document.getElementById("sel2").value);
    let num3 = parseInt(document.getElementById("sel3").value);

    let answerArray = [num1,num2,num3];

    var answer = JSON.stringify(answerArray);
    var cAnswer = JSON.stringify(correctAnswer);

    //console.log(ap.toString() === ad.toString());  // -> true or false

    var hintResult = this.getHint(answerArray, correctAnswer);

    if (hintResult.hit ==3) {
      
        this.clearSquare(answerArray);

        console.log("correto!");
        ons.notification.alert('Parabéns!');

        document.getElementById("judge_btn").disabled = true;

    }

    else{
        console.log("errado!");
    }
  },

  resetSquare:function() {
    for (let index = 1; index < 4; index++) {
      let redSquare = document.getElementById("square"+((index).toString()));
      redSquare.innerHTML = "?";
      redSquare.style.border = "solid 5px crimson";
    
    }
  },
  clearSquare:function(answerArray) {
    answerArray.forEach(function(value, index) {
      console.log("square"+(index+1));
      let greenSquare = document.getElementById("square"+((index+1).toString()));
      greenSquare.innerHTML = value;
      greenSquare.style.border = "solid 5px chartreuse";
    });
  },

  genAnswer:function() {
    //obter as respostas do jogo
    var result = Array(3);
    result.fill(null);
    result.forEach(function(value, index) {
      result[index] = genRandNum(maxNum, result);
    });

    //gerar numeros rand diferentes
    function genRandNum(mNum, result){
      var randNum = Math.floor(Math.random() * mNum); 

      //se tiver numero igual gera um outro
      while(result.includes(randNum)){
        console.log(randNum + "gerando outro numero");
        randNum =  Math.floor(Math.random() * mNum); 
      }

      return randNum;
    }

    return result;
  },

  // verifica hit e blow e adiciona na tabela
  getHint:function(answer, cAnswer) {
    var hint = {
      hit : 0,
      blow : 0
    };

   answer.forEach(function(value, index){
    let numIndex = cAnswer.indexOf(answer[index]);
     if(numIndex==index){
      ++hint.hit;
      console.log(answer[index]+"hit!");
     }
     
     else if(numIndex>=0){
      ++hint.blow;
      console.log(answer[index]+"blow!");
     }
     else{
       console.log("miss");
     }

   });

   game_js.addData(answer, hint);

   return hint;
  },

  addData:function(answer, hint) {
    //processo para adicionar nova linha na tabela
    var targetTable = document.getElementById("info");

    var newDataRow = document.createElement("ons-row");

    ++rowsNum;

    for (let index = 0; index < 6; index++) {

      var newDataCol = document.createElement("ons-col");

      if (index == 0) {
        newDataCol.innerHTML = rowsNum;
        newDataCol.setAttribute("class","ctitle");
      } 
      else if(index < 4) {
        newDataCol.innerHTML = answer[index-1];
        newDataCol.setAttribute("class","cnum");
      }
      else if(index == 4){
        newDataCol.innerHTML = hint.hit;
        newDataCol.setAttribute("class","chit");
      }
      else if (index == 5) {
        newDataCol.innerHTML = hint.blow;
        newDataCol.setAttribute("class","cblow");
      }
      newDataRow.appendChild(newDataCol);
    }


    targetTable.appendChild(newDataRow);
  }

}
