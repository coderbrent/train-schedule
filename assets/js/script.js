var config = {
  apiKey: "AIzaSyAuTewMizVNxwHPmg7bhsiOLURTGTJoFd0",
  authDomain: "train-schedule-d1e10.firebaseapp.com",
  databaseURL: "https://train-schedule-d1e10.firebaseio.com",
  projectId: "train-schedule-d1e10",
  storageBucket: "train-schedule-d1e10.appspot.com",
  messagingSenderId: "513467454982"
};

firebase.initializeApp(config);

var database = firebase.database();
var arrivalTime;

$("#submit-button").on("click", function() {
  event.preventDefault();
  var newTrain = {
    name: $("#train-name-input").val().trim(),
    dest: $("#destination-input").val().trim(),
    time: $("#first-train-time-input").val().trim(),
    freq: $("#frequency-input").val().trim()
  };

  // arrivalTime = currentTime.add(freq.time, 'minutes');
  // console.log(arrivalTime);

  database.ref().push({
    trainName: newTrain.name,
    trainDest: newTrain.dest,
    trainTime: newTrain.time,
    trainFreq: newTrain.freq
  }, function(error) {
    if(error) {
      console.warn("the write failed...");
    } else {
      console.log("data was saved successfully!");
    }
  })
})

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  var newRow = $("<tr>");
  var trainNameField = $("<td>").text(snapshot.val().trainName);
  var trainDestField = $("<td>").text(snapshot.val().trainDest);
  var trainTimeField = $("<td>").text(snapshot.val().trainTime);
  var trainFreqField = $("<td>").text(snapshot.val().trainFreq);

  newRow.append(trainNameField, trainDestField, trainFreqField, trainTimeField);
  $("tbody").append(newRow);

  })



