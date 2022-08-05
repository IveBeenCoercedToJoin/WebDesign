/*
    For this project, we'll make a "choose your own adventure" game.
    The user will start on the home page, and make decisions to progress the story as they like.
    Whenever they make a decision, we will take them to a different "page"
        - These different pages are actually all the same .hbs file, just filled with different content
    
    We will use a query parameter in our url headers to tell the server where the user is in the story
    Unlike in the books, we don't have to use a number (for example, "go to page 53")!
        - Instead, we can have the paramater be some text that describes the action.
        - Example:
            - "to punch the monster, go to ~~~~?id=punch_monster"
            - "to run away, go to ~~~~?id=run_away"
            
        - This helps you as the writer keep better track of your story...
        - ...and also makes it harder for the user to cheat, since they'd have to guess the param correctly.
    We'll also use hyperlinks so that the user doesn't have to type in the id manually.
*/

var express = require("express");
var app = express();
var path = require("path");
var hbs = require("hbs");

/* swap from rendering html pages to using handlebars pages */
app.set("view engine", "hbs");
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));


/* when the user comes to our home page, send them something */
app.get("/", function(req, res){
    console.log(req.query.decision);  // print out what the user tried to do to the console
    
    /*
        We'll use an object called "data" to store whatever text we'd like to put on screen.
        For now, let's just set some random values, we'll change them below. 
        
                               text_to_show --  this is whatever story related text we want to describe to the user
            option_1_text and option_2_text --  these are the options they're given ("run" or "hide", for example)
        option_1_result and option_2_result --  these are the ids we will send them to when they click an option
    */
    data = {
        text_to_show: "sample sample sample",
        option_1_text: "Option 1",
        option_1_result: "option_1_result",
        option_2_text: "Option 2",
        option_2_result: "option_2_result"
    }
    
    // home
    if (req.query.decision == undefined) {
        data.text_to_show = "You arrive in a land of strange colours, on a path. An unidentifiable creature stares at you. It is small, with two legs, and one sticking out of the top of its back. When it realizes you have awoken, it screams."
        data.option_1_text = "Hit it"
        data.option_2_text = "Run backwards"
        data.option_3_text = "Run past"

        data.option_1_result = "?decision=hitit"
        data.option_2_result = "?decision=runback"
        data.option_3_result = "?decision=runpast2"
        res.render("home", data);

    } else if (req.query.decision == "runpast2") {
        data.text_to_show = "You attempt to run further down the path, but the creature somehow keeps blocking your way."
        data.option_1_text = "Hit it"
        data.option_2_text = "Run backwards"
        
        data.option_1_result = "?decision=hitit "
        data.option_2_result = "?decision=runback "
        res.render("home", data);

        //whack
    } else if (req.query.decision == "hitit") {
        data.text_to_show = "It turns away from you and spews a vomit-like fluid from its back \"leg's\" kneecap. It must not be a leg, but a weapon. There is fear in your heart as the ground beneath the vomit is dissolved."
        data.option_1_text = "Run past it"
        data.option_2_text = "Run backwards"

        // for the results, we can choose whatever we want. Let's be descriptive, but brief.
        data.option_1_result = "?decision=runpast"
        data.option_2_result = "?decision=runback"
        res.render("home", data);

    } else if (req.query.decision == "runpast") {
        data.text_to_show = "You wander further down the ant path, stopping at a fork in the road."
        data.option_1_text = "Left"
        data.option_2_text = "Right"
        
        data.option_1_result = "?decision=forkleft"
        data.option_2_result = "?decision=forkright"
        res.render("home", data);

    } else if (req.query.decision == "fork right") {
        data.text_to_show = "You walk down the right path, which may be the wrong one. There is a forest, but no leaves. The trees are collumns of stone."
        data.option_1_text = "Walk faster"
        data.option_2_text = "Return to the fork"
        
        data.option_1_result = "?decision=forkrightfast"
        data.option_2_result = "?decision=forkback"
        res.render("home", data);

    } else if (req.query.decision == "forkrightfast") {
        data.text_to_show = "Walking faster, you freeze when you hear a breaking noise. Your steps have triggered a collapse of the pillars."
        data.option_1_text = "Run further down the path"
        data.option_2_text = "Flee to the fork"
        
        data.option_1_result = "?decision=forkrightrun"
        data.option_2_result = "?decision=forkflee"
        res.render("home", data);

    } else if (req.query.decision == "forkrightrun") {
        data.text_to_show = "You try to continue down the path, hoping to outrun the collapse, but the pillars become walls, making you return to the fork. "
        data.option_1_text = "Go left"
        data.option_2_text = "Go left"
        
        data.option_1_result = "?decision=forkleft"
        data.option_2_result = "?decision=forkleft"
        res.render("home", data);

    } else if (req.query.decision == "forkback") {
        data.text_to_show = ""
        data.option_1_text = ""
        data.option_2_text = ""
        
        data.option_1_result = "?decision="
        data.option_2_result = "?decision="
        res.render("home", data);

        // runback
    } else if (req.query.decision == "runback") {
        data.text_to_show = "You fall in a hole and land in a nest of the creatures, twenty-five of them, to be exact. They are all smaller than the other one, but to you, just as annoying."
        data.option_1_text = "Take them on one by one"
        data.option_2_text = "Try to climb out."
        
        data.option_1_result = "?decision=onexone"
        data.option_2_result = "?decision=climb"
        res.render("home", data);
        
        //onexone
    } else if (req.query.decision == "onexone") {
        data.text_to_show = "The first creature is easy enough, and the second as well. You begin to feel a sense of pride."
        data.option_1_text = "Fight the rest"
        data.option_2_text = "Climb"
        
        data.option_1_result = "?decision=fightmore"
        data.option_2_result = "?decision=climb"
        res.render("home", data);

    } else if (req.query.decision == "fightmore") {
        data.text_to_show = "The time flies while maiming small otherworldly animals, and their conscious numbers dwindle to just one. The one left cowers in a corner, but before you attack, it screeches. The initial creature, the one that was staring at you, falls into the nest. It is a mother, and this may be your doom."
        data.option_1_text = "Charge"
        data.option_2_text = "Flee"
        
        data.option_1_result = "?decision=attackchild"
        data.option_2_result = "?decision=flee"
        res.render("home", data);

    } else if (req.query.decision == "flee") {
        data.text_to_show = "You climb out, and there is only one way to go."
        data.option_1_text = "Forwards"
        data.option_2_text = "Forwards"
        
        data.option_1_result = "?decision=runpast"
        data.option_2_result = "?decision=runpast"
        res.render("home", data);

    } else if (req.query.decision == "attackchild") {
        data.text_to_show = "You run at the mother, and she kicks you out of the nest. You climb back in, but she continues. There is only one way to go."
        data.option_1_text = "Forwards"
        data.option_2_text = "Forwards"
        
        data.option_1_result = "?decision=runpast"
        data.option_2_result = "?decision=runpast"
        res.render("home", data);

        //climb
    } else if (req.query.decision == "climb") {
        data.text_to_show = "You climb out, using rocks as handholds. The original creature is in its original position, and it notices you. "
        data.option_1_text = "Run past it "
        data.option_2_text = "Run backwards "
        
        data.option_1_result = "?decision=runpast"
        data.option_2_result = "?decision=runback2"
        res.render("home", data);

    } else if (req.query.decision == "runback2") {
        data.text_to_show = "The 25, now 23 creatures are still there. You now notice that they have only two legs. They have no weapons."
        data.option_1_text = "Attack them"
        data.option_2_text = "Climb out"
        
        data.option_1_result = "?decision=fightmore "
        data.option_2_result = "?decision=climb"
        res.render("home", data);
    }
    else {
        // the user should never really come here. if they did, you probably typoed one of the decisions
        // let's just send them back to the main page, and log a message for ourselves
        console.log("something broke. the user tried to make decision: " + req.query.decision);

        data.text_to_show = "You broke something"
        data.option_1_text = "Restart"
        data.option_2_text = ""
        data.option_1_result = ""
        data.option_2_result = ""
        res.render("home", data);   // <-------------------
    }
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
});