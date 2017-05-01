 // Initial array of celebrities
      var topics = ["Arnold Schwarzenegger", "Samuel L Jackson", "Keanu Reeves", "Dave Chappelle", "Jim Carey"];

      // Function for displaying topic data
      function renderButtons() {

        // Deleting the topic buttons prior to adding new topic buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#topics-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("topic");
          // Adding a data-attribute with a value of the topic at index i
          a.attr("data-search", topics[i]);
          // Providing the button's text with a value of the topic at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#topics-view").append(a);


            $('button').on('click',function(){
            var x = $(this).data("search");

            var queryURL = "http://api.giphy.com/v1/gifs/search?q="+x+"&api_key=dc6zaTOxFJmzC&limit=10";
            console.log(queryURL);

            $.ajax({url:queryURL,method:"GET"})
            .done(function(response){
              console.log(response);
            for(var i=0;i<response.data.length;i++){
            $('#GIFArea').prepend("<p>Rating: "+response.data[i].rating+"</p>");
            $('#GIFArea').prepend("<img src='"+response.data[i].images.downsized.url+"'>");
            }
        
            })
            })

          
        }
      }

      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
        topics.push(topic);

        // calling renderButtons which handles the processing of our topic array
        renderButtons();

        
      });

      // Calling the renderButtons function at least once to display the initial list of topics
      renderButtons();