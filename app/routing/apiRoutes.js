var friendsData = require("../data/friends");

module.exports = function(app) {

  // When users visit api/friends, show them the friends data json
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // Handles when a user submits the form / submits data to the server.
  app.post("/api/friends", function(req, res) {
    
    friendsData.push(req.body); //add user data to API
    // Tried to have application check if name is unique, but could not get it to update the modal with error message
       // var tally = 0;
       // for (var i=0;i<friendsData.length;i++) {
       //   if (req.body.name !== friendsData[i].name) {
       //     tally++;
       //   } 
       // }
       // if (tally === friendsData.length) {
       //   friendsData.push(req.body);
       // } else {
       //     return "That name already exisits in our database. Please try again with a unique name";
       // }
    
    var currentUserScores = req.body.scores;
    var finalScores =[]; //array to hold the final "friendship score" for each person in the application

    for (var i=0;i<friendsData.length;i++) { //for each person in the application
      var scores = []; //create an empty array to store the difference between each question
      for (var j=0;j<friendsData[i].scores.length-1;j++) { //circles through each answer
        // console.log("User 1 Score:"+currentUserScores[j]);
        // console.log("User 2 Score:"+friendsData[i].scores[j]);
          var difference = Math.abs(currentUserScores[j] - friendsData[i].scores[j]); //calculate the difference between the two people's answers
          // console.log(difference);
          scores.push(difference); 
      }
         
      var totalScore = 0; //adds the differences from each question (scores array) to come up with a total score for each person
      for (var k=0;k<scores.length;k++) {
        totalScore = totalScore+scores[k];
      }
      
      if (totalScore!=0) { //Add the total score for each person to the finalScores array (don't include the user's own data thought)
         finalScores.push(totalScore);
      }
    }
        
    //find the lowest number in the finalScores array, and return the corresponding json data
    var min = Math.min.apply(Math, finalScores)
    var compatibleFriend;
    for (i=0;i<finalScores.length;i++) {
      if (finalScores[i] === min) {
        res.json(friendsData[i]);
      }
    }    
  });
};
