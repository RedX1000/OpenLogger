function firstFunction(){
    var node = document.createElement("Tificates");
    var textnode = document.createTextNode("Test");
    node.setAttribute("id", "loot");
    node.setAttribute('style', 'padding:5px 0px 0px 0px;color:green;height:35px;width:35px;background:blue;margin:0px 2px;');
    node.appendChild(textnode);
    console.log(document.getElementsByClassName("loot_display").length)
    for(i = 0; i < document.getElementsByClassName("loot_display").length; i++){
        var node = document.createElement("Tificates");
        var textnode = document.createTextNode("Test");
        node.setAttribute("class", "loot");
        node.setAttribute('style', 'padding:0px 0px;color:green;height:40px;width:40px;background:blue;margin:0px 3px 5px 3px;');
        node.appendChild(textnode);
        document.getElementsByClassName("loot_display")[i].appendChild(node)
    }

    
    console.log("Creating the dataset");

    console.log(items);

    let anyArray = items.any;
    let otherArray = [];
    if(document.getElementById("easy").checked)
        otherArray = items.easy;
    else if(document.getElementById("medium").checked)
        otherArray = items.medium;
    else if(document.getElementById("hard").checked)
        otherArray = items.hard;
    else if(document.getElementById("elite").checked)
        otherArray = items.elite;
    else if(document.getElementById("master").checked)
        otherArray = items.master;

    let itemList = anyArray.concat(otherArray);
    console.log(itemList);

}

function cleardb(){
    [].forEach.call(document.querySelectorAll('.loot'),function(e){
        e.parentNode.removeChild(e);
    });
}

function solution(){
//     //A few notes
//     // - Skip over yellow and white text
//     // - Is an autocompletion
//     // - pixel comparison each time
//     // - check within 2 absolute value I think

 }