$(document).ready(function(){
  $('#add').click(function(e){
    $('#input').toggle();
  })


  $('#input').keyup(function(e){
    if (e.keyCode == 13) {
      var content = $(this).val();
      $.post('/create', {description: content},function(res){
        console.log('res =', res);
        console.log('content', content);
      var post = (`
        <form method=post action="/delete/${res}">
          <button class="remove">X</button>
        </form>
        <li>
          <div class="edit" contenteditable="true">
            ${content}
          </div>
        </li>`);
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

    $.post('/update', {description: $edit, id: id}, function(res){
      console.log('res =', res);
    });
    }
  });
});
