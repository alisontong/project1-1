$(function() {

  
  var foodsController = {
    
    template: _.template($('#food-template').html()),

    all: function() {
      $.get('/api/foods', function(data) {
        var allFoods = data;
        
        
        _.each(allFoods, function(food) {
          
          var $foodHtml = $(foodsController.template(food));
          $('#food-list').prepend($foodHtml);
        });
        
        foodsController.addEventHandlers();
      });
    },

    function(name, price, description) {
      var foodData = [{name: "Gongbaojiding", price: 15, description: "one of the most popular sichuan dish and has been well-liked in China for thousands of years"},
                      {name:"Chaofan", price: 10, description:"most popular Chinese fast food worldwide. It's convenient,tasty and inexpensive"}];
      
      $.post('/api/foods', foodData, function(data) {
     
        var $foodHtml = $(foodsController.template(data));
        $('#food-list').prepend($foodHtml);
      });
    },

    function(foodId, updatedName, updatedPrice, updatedDescription) {
     
      $.ajax({
        type: 'PUT',
        url: '/api/foods/' + foodId,
        data: {
          name: updatedName,
          price: updatedPrice,
          description:updatedDescription
        },
        success: function(data) {
          var $foodHtml = $(foodsController.template(data));
          $('#food-' + foodId).replaceWith($foodHtml);
        }
      });
    },
    
    function(foodId) {
      $.ajax({
        type: 'DELETE',
        url: '/api/foods/' + foodId,
        success: function(data) {
          $('#food-' + foodId).remove();
        }
      });
    },

 
    addEventHandlers: function() {
      $('#food-list')
        
        .on('submit', '.update-food', function(event) {
          event.preventDefault();
          var foodId = $(this).closest('.food').attr('data-id');
          var updatedName = $(this).find('.updated-name').val();
          var updatedPrice = $(this).find('.updated-price').val();
          var updatedDescription = $(this).find('.updated-description').val();
          foodsController.update(foodId, updatedAuthor, updatedText);
        })
        
        .on('click', '.delete-food', function(event) {
          event.preventDefault();
          var foodId = $(this).closest('.food').attr('data-id');
          foodsController.delete(foodId);
        });
    },

    function() {
      foodsController.all();
      
      
      $('#new-food').on('submit', function(event) {
        event.preventDefault();
        var newName = $('#new-name').val();
        var newText = $('#new-text').val();
        var newDescription = $('#new-description').val();
        foodsController.create(newName, newText, newDescription);
        
        
        $(this)[0].reset();
        $('#new-Name').focus();
      });
    }
  };

  foodsController.setupView();

});