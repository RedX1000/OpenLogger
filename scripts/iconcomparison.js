function firstFunction(){
    var node = document.createElement("Tificates");
    var textnode = document.createTextNode("Test");
    node.setAttribute("id", "loot");
    node.setAttribute('style', 'padding:5 100;color:green');
    node.appendChild(textnode);
    document.getElementById("general_loot").appendChild(node);
    
    console.log("Creating the dataset");
    
    // WHAT THE FUCK IS GOING ON HERE???
    // ASYNC? JUST GIMMIE MY JSON INFO

    const data = require('./images/ItemsAndImages.json');
    console.log(data);

    let anyArray = [];
    $.getJSON("../images/ItemsAndImages.json", function(json){
        anyArray.load(json.any);
        console.log(anyArray);
    }) 
    console.log(anyArray);
    console.log(anyArray);

    //let tierArray = []
    //if document.getElementById("easy")
    
    var dat;
    $.getJSON("../images/ItemsAndImages.json", function(json){
        dat = json;
        console.log(dat);
    }) 
}

function solution(){
//     //A few notes
//     // - Skip over yellow and white text
//     // - Is an autocompletion
//     // - pixel comparison each time
//     // - check within 2 absolute value I think

 }