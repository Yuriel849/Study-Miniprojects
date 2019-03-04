// Ajax functions to handle adding and deleting items on the To-Do List
$(document).ready(function() {
    $('form').on('submit', function() {
        var item = $('form input');
        var todo = { item: item.val() };
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data) { // returned "data" is not actually used now
                location.reload();
            }
        });
        return false;
    });
  
    $('li').on('click', function() {
        var item = $(this).text().replace(/ /g, "-"); // replace empty spaces with hyphens -> in order to add to URI
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data) { // returned "data" is not actually used now
                location.reload();
            }
        });
    });
});