function firstFunction(){
    // var node = document.createElement("Tificates");
    // var textnode = document.createTextNode("Test");
    // node.setAttribute("id", "loot");
    // node.setAttribute('style', 'padding:5px 0px 0px 0px;color:green;height:35px;width:35px;background:blue;margin:0px 2px;');
    // node.appendChild(textnode);
    // console.log(document.getElementsByClassName("loot_display").length)
    // for(i = 0; i < document.getElementsByClassName("loot_display").length; i++){
    //     var node = document.createElement("Tificates");
    //     var textnode = document.createTextNode("Test");
    //     node.setAttribute("class", "loot");
    //     node.setAttribute('style', 'padding:0px 0px;color:green;height:35px;width:35px;background:blue;margin:0px 3px 5px 3px;');
    //     node.appendChild(textnode);
    //     document.getElementsByClassName("loot_display")[i].appendChild(node)
    // }
    
    // Creating dataset array from 
    console.log("Creating the dataset");
    console.log(items);
    let anyImages = items.any;
    let otherImages = [];

    if(document.getElementById("easy").checked)
        otherImages = items.easy;
    else if(document.getElementById("medium").checked)
        otherImages = items.medium;
    else if(document.getElementById("hard").checked)
        otherImages = items.hard;
    else if(document.getElementById("elite").checked)
        otherImages = items.elite;
    else if(document.getElementById("master").checked)
        otherImages = items.master;

    let itemList = anyImages.concat(otherImages);
    console.log(itemList);
    var keys = Object.keys(lsdb);

    let anyItem = []
    for(i=0; i<keys.length; i++){
        if(lsdb[keys[i]].tab);
    }

    //for(i=0; i<lsdb.length; i++){
    //    for(j=0; j<JSON.parse(lsdb.ge))
    //}
    var randomList = []
    for(i=0; i < 4; i++){
        randomList.push(keys[Math.floor(Math.random() * (keys.length + 0) + 0)]);
    }
    console.log(randomList);
    for(i=0; i<randomList.length; i++){
        var node = document.createElement("Tificates");
        var img = document.createElement("img");
        var text = document.createTextNode(localStorage.getItem(randomList[i]).quantity.localStorage.getItem("Checked button"))
        img.src = encodeURI("images/picture files/items/"+randomList[i]+".png")
        img.setAttribute("class", "loot");
        node.setAttribute('style', 'width:35px; height:35px; background:green; margin:0px 3px 5px 3px; display:flex; align-items:center; text-align:center;data-hover:'+randomList[i]+';');
        node
        img.setAttribute('style', 'background:purple; margin:0 auto;')
        node.appendChild(img);
        node.appendChild(text);
        document.getElementsByClassName("loot_display")[i].appendChild(node)
    }
        
    
    // randomList.push(JSON.parse(otherImages[Math.floor(Math.random() * (otherImages.length + 0) + 0)]))

    console.log(randomList)
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

function changeClueTierSpan(id){
    // Set the clue_tier span for the checked box
    document.getElementById('clue_tier').textContent = id[0].toUpperCase() + id.slice(1).toLowerCase();
    localStorage.setItem("Checked button", id);
}

function start(){
    //  Initializing/Loading radio button
    var keys = Object.keys(lsdb);
    if(localStorage.getItem("Checked button") == null){ // If doesn't exist yet
        console.log("Defaulting button to easy...");
        document.getElementById("easy").checked = true;
        document.getElementById('clue_tier').textContent = "Easy";
        localStorage.setItem("Checked button", "easy");
    }
    else{ // If it does, set the button and span
        console.log("Setting previously set radio button: " + localStorage.getItem("Checked button") + "...");
        var temp = localStorage.getItem("Checked button");
        document.getElementById(temp).checked = true;
        document.getElementById('clue_tier').textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
    }
    console.log("Radio buttons initialized.\n ");

    //  Initializing the rest of the LocalStorage
    console.log("Initializing LocalStorage...");
    for(i=0; i < keys.length; i++)
        if(!(localStorage.getItem(keys[i]))) // If doesn't exist, add it
            localStorage.setItem(keys[i], JSON.stringify(lsdb[keys[i]]));

    console.log("LocalStorage initialized.\n ");

    // Checking which rewards exist in n caskets


    // for(i=0; i < keys.length; i++){
    //     if(JSON.parse(localStorage.getItem(keys[i])).tier.length >= 3)
    //         console.log(keys[i])
        // console.log(keys[i])
        // console.log(JSON.parse(localStorage.getItem(keys[i])).tab)
        // console.log(JSON.parse(localStorage.getItem(keys[i])).quantity)
        // console.log(JSON.parse(localStorage.getItem(keys[i])).order)
    // }

    // Add things to the display if greater than zero
}