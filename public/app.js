function saveEvent(){
  $(".table-striped").on("click",".save", function(){
    var currentRow=$(this).closest("tr");
    var col1 = currentRow.find("td:eq(0)").text();
    var col2 = currentRow.find("td:eq(1)").text();

    $.ajax({
      method:"POST",
      url:"/api/save",
      data: { title:col1, summary:col2 }
    }).done(function(data){

    }); // end of $.ajax
  });
}

function deleteArticle(){
  $(".table-striped").on("click", ".delete", function() {
      // console.log("test");
      console.log($(this).parent("td"));
      var rowId = $(this).parent("td").parent("tr").attr('id');
      console.log(rowId);
      $(this).closest("tr").remove();
      $.ajax({
        method:"DELETE",
        url:"/api/article/" + rowId
      }).done(function(data){
        // window.location="/articles";
      });
  });
}

function createComment(){
  $(".saveComments").on("click", function(){
    var newComment = $("#myTextArea").val();
    console.log(newComment);
    $.ajax({
      method:"POST",
      url:"/api/new_comment",
      data: { body:newComment }
    }).done(function(data){
      
    }); // end of $.ajax
  });
}

$(document).ready(function(){
  //console.log("ready!");
  $("#scrape").on("click",function(){
    //console.log("hello");
    $("tbody").empty();
    $.ajax({
      method:"GET",
      url:"/scrape"
    }).done(function(data){
      console.log(data);
      // $("#headings").contents().remove();
      $("#headings").html("<h1>Scraped Articles</h1>");
      for(var i=0; i < data.length; i++){
        $("#nyt-articles").append(
        "<tbody><tr><td>" +data[i].title+"</td>"+
                "<td>" + data[i].summary+"</td>"+
                "<td><button class='btn btn-success save'> Save Article </button></td></tr></tbody>"
        );
      }
      saveEvent();
    });
  });

  $("#home").on("click", function(event){
    event.preventDefault();
    window.location ="/";
  });

  $("#savedArticles").on("click", function(event){
    event.preventDefault();
    $.ajax({
      method:"GET",
      url:"/articles"
    }).done(function(data){
      console.log(data);
      $("#page-title1").html("S");
      $("#page-title2").html("AVED");
      $("#page-title3").html("A");
      $("#page-title4").html("RTICLES");
      $("#headings").html("<h1>Saved Articles</h1>");
      $("tbody").empty();

      for(var i=0; i < data.length; i++){
        $("#nyt-articles").append(
        "<tbody><tr id ="+ data[i]._id+" ><td>" +data[i].title+"</td>"+
                "<td>" + data[i].summary+"</td>"+
                "<td><button class='btn btn-success articleComments' data-toggle='modal' data-target='#comment'>Article Notes</button></td><td><button class='btn btn-danger delete'>Delete Article</button></td></tr></tbody>"
        );
      }//end of for loop
      // deleteArticle();
      // displayArticleComments();
      createComment();
    });//end of $.ajax

  });

}); // END OF DOCUMENT READY

//create a comment first the display it






// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });


// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .done(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });