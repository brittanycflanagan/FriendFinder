// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends"); //(does this need to be friends.js?)

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form datnoa (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
  //console.log("current user Data:"+req.body);
    
    

    //For every item in the fiendsarray, add the difference. Push the result to a "score" results to a temporary array. inthe array return the corresponding object. 
//     var arr = [14, 58, 20, 77, 66, 82, 42, 67, 42, 4]
// var min = Math.min.apply(Math, arr)
// console.log(min)
    //  if for every item in the arry, if array === min then return data friendsData[i]

    friendsData.push(req.body); //adds newest data to friends object (if unique!!)

    var currentUserScores = req.body.scores;
      console.log(currentUserScores);
       //get the last user in the array & set to current user
      var finalScores =[];
      for (var i=0;i<friendsData.length;i++) { //make sure doesn't compare to last/current user
        var scores = []; 
        for (var j=0;j<friendsData[i].scores.length-1;j++) {
          console.log("User 1 Score:"+currentUserScores[j]);
          console.log("User 2 Score:"+friendsData[i].scores[j]);
          var difference = Math.abs(currentUserScores[j] - friendsData[i].scores[j]);
          console.log(difference);
          scores.push(difference);
         }
         console.log("differences:"+scores);
         
         var totalScore = 0;
         for (var k=0;k<scores.length;k++) {
           totalScore = totalScore+scores[k];
         }
         console.log("total score:"+ totalScore)
         if (totalScore!=0) {
         finalScores.push(totalScore);
         }
         //sum scores, add total difference to another array

        }
        

        //find the lowest number in the finalScores array
        console.log("FINAL SCORES:"+finalScores);
        var min = Math.min.apply(Math, finalScores)
        console.log(min);
        var compatibleFriend;
        for (i=0;i<finalScores.length;i++) {
           if (finalScores[i] === min) {
           console.log(friendsData[i]);
           res.json(friendsData[i]);
          }
          
         }
    
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  
};
