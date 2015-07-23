$(function() {

  $.get('/current-user', function(data){
    console.log(data);
    if (data) {
      $('#logout-message').show();
    } else {
      $('#signup, #login').show();
    }
  })

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

    create: function(newName, newPrice, newDescription,newPicture) {
      var foodData = {name:newName,price:newPrice,description:newDescription,picture:newPicture};
      
      $.post('/api/foods', foodData, function(data) {
     
        var $foodHtml = $(foodsController.template(data));
        $('#food-list').prepend($foodHtml);
      });
    },


    update:function(foodId, updatedName, updatedPrice, updatedDescription, updatedPicture) {
    
      $.ajax({
        type: 'PUT',
        url: '/api/foods/' + foodId,
        data: {
          name: updatedName,
          price: updatedPrice,
          description: updatedDescription,
          picture: updatedPicture
        },
        success: function(data) {
          var $foodHtml = $(foodsController.template(data));
          $('#food-' + foodId).replaceWith($foodHtml);
          console.log(data);
        }
      });
    },
    
    delete:function(foodId) {
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
          var updatedPicture = $(this).find('.updated-picture').val();
          foodsController.update(foodId, updatedName, updatedPrice, updatedDescription,updatedPicture);
        })
         
        .on('click', '.delete-food', function(event) {
          event.preventDefault();
          var foodId = $(this).closest('.food').attr('data-id');
          foodsController.delete(foodId);
        });
    },

    setupView: function() {
      foodsController.all();
      
      $('#new-food').on('submit', function(event) {
        event.preventDefault();
        var newName = $('#new-name').val();
        var newPrice = $('#new-price').val();
        var newDescription = $('#new-description').val();
        var newPicture = $('#new-picture').val();
        foodsController.create(newName, newPrice, newDescription,newPicture);
        
        
        $(this)[0].reset();
        $('#new-name').focus();
      });
    }
  };

  foodsController.setupView();

});