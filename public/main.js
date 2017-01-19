console.log ("linked!");


$(document).ready(function(){
  $('#input').keyup(function(e){
    if (e.keyCode == 13) {
      var $item = $(this).val();
      $.post('/create', {description: $item},function(res){
        console.log('res =', res);
      $('#list').append( '<form method=post action="/delete/'+ 1 +'"><button>X</button></form>' + '<li class="todo">' + $item + '</li>');
      e.currentTarget.value = " "
      })
    }
  });

  $('.todo').on('click', function(e) {
    $(this).toggleClass('complete');
  });
});
