var myApp = angular.module('myApp', []);

myApp.controller("GameController", ["$scope", function($scope) {
  
  //initialize the letter cell objects
  var letterCells = [];
  var lettersStr = "QWERTYUIOPASDFGHJKLZXCVBNM";
  var lettersAlphabetical = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var iterations = lettersStr.length;
  for(var i = 0; i < iterations; i++) {
    var theLetter = lettersStr.charAt(i);
    letterCells[i] = {
                        letter : theLetter, 
                        //the keycode for a is 65, for b it is 66, for c it is 67...
                        keyCode : 65 + lettersAlphabetical.indexOf(theLetter),
                        state : "normal",
                        monster : null
                      };
  }

  // create an alternate array sorted alphabetically, to optimize input processing
  var alphabeticalCells = letterCells.slice();
  alphabeticalCells.sort(function(a, b) {
    return a.letter < b.letter ? -1 : 1;
  });

  var myMonster = new Monster();
  myMonster.activate();
  
  var changeState = function(event) {
    
    //if the key pressed is a letter key...
    if(event.keyCode >= 65 && event.keyCode <= 90) {
      $scope.$apply( function(scope) {
        //subtract 65 from the keycode to find the correct index 
        var cell = scope.alphabeticalCells[event.keyCode - 65];
        var newInput = scope.currentInput + cell.letter;
            
        if(event.type == "keydown") {
          //down state
          cell.state = "down";

        } else {
          //see if the released key could fit into a word in the word bank.
          var iterations = $scope.wordbank.length;
          for(var i = 0; i < iterations; i++) {
            
            var word = scope.wordbank[i];
            if(word.indexOf(newInput) == 0) {
              if(newInput == word) {
                //the user completed a word!
                for (index in scope.cells) {
                  scope.cells[index].state = "normal"
                }
                //DEBUG
                myMonster.kill();

                scope.currentInput = "";
                
              } else {
                //selected state
                cell.state = "selected";
                scope.currentInput = newInput;
              }

              return;
            }
          }

          //if the released key isn't part of a word, reset its state
          cell.state = "normal";
        }
      });
    }
  } 
  
  document.addEventListener("keydown", changeState);
  document.addEventListener("keyup", changeState);
  
  //expose scope properties
  $scope.cells = letterCells;
  $scope.alphabeticalCells = alphabeticalCells;
  
  $scope.wordbank = ["MUNCH", "BLAST", "MATCH", "MUST"];
  
  $scope.currentInput = "";
}]);