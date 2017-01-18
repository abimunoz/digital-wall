console.log ("linked!");


// =============================
// PSEUDO CODE
// =============================
// enter
// get the input value
// append to the ul
// var $input = $('#input').val();


$(document).ready(function(){
  $('#input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
        console.log('enter');
        var $value = $(this).val();
        console.log($value);
        $.get('/', function(res){
          $('ul').append('<li>' + '<span class="remove">x</span>' + $value + '</li>');
        })
    }
  });
});






// =============================
// OLD JAVASCRIPT
// =============================
// var handleEnter = function(event) {
//   if(event.keyCode === 13) {
//     // create element
//     var newElement = document.createElement("li");
//     // add text to element, also works with textContent, changed to innerHTML
//     newElement.innerHTML = "<span class='remove'>x</span>" + event.target.value;
//     // append to parent
//     inReturn.appendChild(newElement);
//     //clears text box
//     event.currentTarget.value = " ";
//
//
//
//     // click - event listener
//     newElement.addEventListener('click', removeItem);
//     // strikethrough - event listener
//     newElement.addEventListener('click', addClass);
//
//
//     // counter
// var li = document.getElementsByTagName("li")
// console.log(li.length)
// var counter = li.length
//   }
// }
//
// input.addEventListener('keyup', handleEnter)
//
//
// // remove element when you press x
// var removeItem = function(event){
//   if(event.target.classList.contains("remove")){
//   // use event.target if clicking
//   event.target.parentNode.remove();
//   }
// }
//
//
// // remove element when you press x
// var addClass = function(event){
//   this.classList.toggle('complete');
// }
