$(document).ready(function(){
  $('#input').keyup(function(e){
    if (e.keyCode == 13) {
      var $item = $(this).val();
      $.post('/create', {description: $item},function(res){
        console.log('res =', res);
      $('#list').append( '<form method=post action="/delete/'+ res + '"><button>X</button></form>' + ' ' + '<li>' + '<div class="edit" contenteditable="true">'+ $item + '</div>' + '</li>');
      e.currentTarget.value = " "
      })
    }
  });


  $('.edit').keyup(function(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log('enter');
      var $edit = $(this).text();
      console.log($edit);
      var oid = $(this).attr('oid');

    $.post('/update', {description: $edit, oid: oid}, function(res){
      console.log('res =', res);
    });


    }
  });
});
