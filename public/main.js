$(document).ready(function(){
  $('#input').keyup(function(e){
    if (e.keyCode == 13) {
      var $item = $(this).val();
      $.post('/create', {description: $item},function(res){
        console.log('res =', res);
      $('#list').append( '<form method=post action="/delete/'+ res + '"><button>X</button></form>' + '<li>' + '<div class="edit" contenteditable="true">'+ $item + '</div>' + '</li>');
      e.currentTarget.value = " "
      })
    }
  });

  // STRIKETHROUGH TEXT ON CLICK
  // $('.todo').on('click', function(e) {
  //   $(this).toggleClass('complete');
  // });

  $('.edit').keyup(function(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log('enter');
      var $edit = $(this).text();
      console.log($edit);

    $.post('/update', {description: $edit}, function(res){
      console.log('res =', res);
    });


    }
  });
});
