$(document).ready(function(){
  $('#input').keyup(function(e){
    if (e.keyCode == 13) {
      var $item = $(this).val();
      $.post('/create', {description: $item},function(res){
        console.log('res =', res);
      var todo = (`
        <form method=post action="/delete/${res}">
          <button>X</button>
        </form>
        <li>
          <div class="edit" contenteditable="true">
            ${$item}
          </div>
        </li>
      `);
      $('#list').append(todo);
      e.currentTarget.value = " "
      })
    }
  });


  $('#list').on('keyup', '.edit', function(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log('enter');
      $(this).blur();
      var $edit = $(this).text();
      console.log($edit);
      var oid = $(this).attr('oid');

    $.post('/update', {description: $edit, oid: oid}, function(res){
      console.log('res =', res);
    });


    }
  });
});
