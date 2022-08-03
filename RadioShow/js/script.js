//calls the radio station
function call() {
    $.get("/call", function(responseText){
        console.log("sucess!");
        if (responseText== "yes") {
            console.log("winner");
        } else {
            console.log("no winner");
        }
    });
}

//has the station reset the count
function reset() {

}