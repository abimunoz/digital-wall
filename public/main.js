$(document).ready(function(){
  $('#text').keyup(function(e){
    if (e.keyCode == 13) {
      var $text = $(this).val();
      $.post('/create', {text: $text},function(res){
        console.log('res =', res);
      var post = (`
        <form method=post action="/delete/${res}">
          <button>X</button>
        </form>
        <li>
          <div class="edit" contenteditable="true">
            ${$text}
          </div>
        </li>
      `);
      $('#all-posts').append(post);
      e.currentTarget.value = " "
      })
    }
  });


  $('#all-posts').on('keyup', '.edit', function(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log('enter');
      $(this).blur();
      var $edit = $(this).text();
      console.log($edit);
      var id = $(this).attr('id');

    $.post('/update', {text: $edit, id: id}, function(res){
      console.log('res =', res);
    });


    }
  });
});
