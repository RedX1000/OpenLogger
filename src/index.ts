//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";
import * as resemble from "resemblejs";
import compareImages from "resemblejs/compareImages"
import * as lsdb from './JSONs/LocalStorageInit.json';
import * as items from './JSONs/ItemsAndImages.json';

//tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", "sixth_item", "seventh_item", "eigth_item", "ninth_item"]
var tierlist = ["easy", "medium", "hard", "elite", "master"]
var listOfItems
var listOfItemsArray = []
var firstiter = false

export function refresh(){
	location.reload();
}

export function init(){
	// Set the checked button
	let keys = Object.keys(lsdb);
	if(localStorage.getItem("Checked button") == null){ // If doesn't exist yet
		console.log("Defaulting button to easy...");
		const ele = document.getElementById("easy") as HTMLInputElement;
		ele.checked = true;
		document.getElementById('clue_tier').textContent = "Easy";
		localStorage.setItem("Checked button", "easy");
	}
	else{ // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("Checked button") + "...");
		let temp = localStorage.getItem("Checked button");
		const ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
		document.getElementById('clue_tier').textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
	}
	console.log("Radio buttons initialized.\n ");

	// Initializing the rest of the LocalStorage
	console.log("Initializing LocalStorage...");
	for(let i = 0; i < keys.length; i++)
		if(!(localStorage.getItem(keys[i]))) // If doesn't exist, add it
			localStorage.setItem(keys[i], JSON.stringify(lsdb[keys[i]]));
	console.log("LocalStorage initialized.\n ");

	// Initializing the image collection
	console.log("Initializing image list...")
	listOfItems = items.any
	let otherItems
	if((document.getElementById("easy") as HTMLInputElement).checked)
		otherItems = items.easy;
	else if((document.getElementById("medium") as HTMLInputElement).checked)
		otherItems = items.medium;
	else if((document.getElementById("hard") as HTMLInputElement).checked)
		otherItems = items.hard;
	else if((document.getElementById("elite") as HTMLInputElement).checked)
		otherItems = items.elite;
	else if((document.getElementById("master") as HTMLInputElement).checked)
		otherItems = items.master;
	listOfItems = listOfItems.concat(otherItems)
	console.log("Image list initialized.")

	// Turning image collection into array
	listOfItemsArray = []
	for(let i = 0; i < listOfItems.length; i++){
		let temp = [listOfItems[i].name, listOfItems[i].base64, 0.0];
		listOfItemsArray.push(temp);
	}
		
}

export function changeClueTierSpan(id){
	// Set the clue_tier span for the checked box
	let tier = (id[0].toUpperCase() + id.slice(1).toLowerCase());
	console.log("Setting button to "+tier+"...");
	document.getElementById('clue_tier').textContent = tier;
	localStorage.setItem("Checked button", id);

	// Set the new image list
	listOfItems = items.any;
	let otherItems;
	if(tier == "Easy")
		otherItems = items.easy;
	else if(tier == "Medium")
		otherItems = items.medium;
	else if(tier == "Hard")
		otherItems = items.hard;
	else if(tier == "Elite")
		otherItems = items.elite;
	else if(tier == "Master")
		otherItems = items.master;
	listOfItems = listOfItems.concat(otherItems);
	console.log(listOfItems);

	// Set new array
	listOfItemsArray = []
	for(let i = 0; i < listOfItems.length; i++){
		let temp = [listOfItems[i].name, listOfItems[i].base64, 0.0];
		listOfItemsArray.push(temp);
	}
}

//loads all images as raw pixel data async, images have to be saved as *.data.png
//this also takes care of metadata headers in the image that make browser load the image
//with slightly wrong colors
//this function is async, so you cant acccess the images instantly but generally takes <20ms
//use `await imgs.promise` if you want to use the images as soon as they are loaded
var imgs = a1lib.ImageDetect.webpackImages({
	trailComplete: require("./images/TrailComplete.data.png")
});

//listen for pasted (ctrl-v) images, usually used in the browser version of an app
a1lib.PasteInput.listen(img => {
	findtrailComplete(img);
}, (err, errid) => {

});

//You can reach exports on window.TEST because of
//config.makeUmd("testpackage", "TEST"); in webpack.config.ts
export function capture() {
	if (!window.alt1) {
		return;
	}
	if (!alt1.permissionPixel) {
		return;
	}
	var img = a1lib.captureHoldFullRs();
	findtrailComplete(img);
}

async function findtrailComplete(img: ImgRef) {
	var loc = img.findSubimage(imgs.trailComplete);

	//overlay the result on screen if running in alt1
	if (window.alt1) {
		if (loc.length != 0) {
			alt1.overLayRect(a1lib.mixColor(255,0,0), loc[0].x - 27, loc[0].y - 13, imgs.trailComplete.width + 278, imgs.trailComplete.height + 213, 2000, 3);
		} else {
			alt1.overLayTextEx("Couldn't find Rewards window. Remove\n    any obstructions or open a casket.", a1lib.mixColor(255, 255, 255), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}

	//get raw pixels of image and show on screen (used mostly for debug)  
	var buf = img.toData(loc[0].x - 27, loc[0].y - 13, imgs.trailComplete.width + 278, imgs.trailComplete.height + 213);
	//buf.show();

	console.log("About to run array...");
	let crops = new Array<ImageData>(9);
	// Tweak these two values below if jagex adjusts the pixel placement of the items
	var x1 = loc[0].x - 1;
	var y1 = loc[0].y + 39;
	for(let i = 0; i < crops.length; i++) {
		//console.log("In array check...");
		crops[i] = img.toData(x1, y1, 32, 32,);
		alt1.overLayRect(a1lib.mixColor(255,144,0), x1, loc[0].y + 39, 32, 32, 2000, 1);
		x1 += 40;

		// Displaying in Rewards Capture
		document.getElementById(rewardSlots[i]).textContent = ""
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		var imgvar = document.createElement("img");
		canvas.width = crops[i].width;
		canvas.height = crops[i].height;
		ctx.putImageData(crops[i], 0, 0);
		imgvar.src = canvas.toDataURL();
		document.getElementById(rewardSlots[i]).appendChild(imgvar);
		
	}
	
	console.log("Checking items...");
	console.log(listOfItemsArray.length);
	var itemresults = []
	let promises = []
	
	for(let i = 0; i < 9; i++){
		try{
			promises.push(itemresults.push(await compareItems(crops[i])));
		} catch(e){
			alt1.overLayTextEx("    Error occured. Please try again\nAvoid obstructions over the window", a1lib.mixColor(255, 100, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		// a1lib.mixColor(100, 255, 100) The Green of Success!
	}
	await Promise.all(promises)
	console.log(itemresults)
	console.log("Items checked.");

	var quantresults = []
	promises = []
	for(let i = 0; i < 9; i++){
		if(itemresults[i] == "Blank")
			continue;
		promises.push(quantresults.push(await readQuantites(crops[i])));
	}
	await Promise.all(promises)
	console.log(quantresults)
}
	
async function compareItems(item:ImageData){
	// Take copy of the original array
	let matches = listOfItemsArray.slice();

	// Can't use all at once. Can only do one color at a time.
	const yellow = {
		r: 255,
		g: 0,
		b: 0,
		a: 255
	};
	const black1 = {
		r: 0,
		g: 0,
		b: 0,
		a: 255
	};
	const black2 = {
		r: 0,
		g: 0,
		b: 1,
		a: 255
	};
	const black3 = {
		r: 0,
		g: 0,
		b: 2,
		a: 255
	};
	let colors = [yellow, black1, black2, black3]
	// Just hold this for now just in case...

	var imgdata = await compareImages(item, matches[0][1] , {output: {}, ignore: "less"})
	matches[0][2] = imgdata.misMatchPercentage;
	if(matches[0][2] == 0.00){ // If it is blank
		return "Blank";
	}

	matches.shift() // Remove blank if not blank
	const promises = []
	for(let i = 0; i < matches.length; i++)
		//	{output: {ignoreAreasColoredWith: colors}}
		// 	Choices are: yellow, black1, black2, black3
		promises.push(await compareImages(item, matches[i][1] , {output: {}, ignore: "less"} ).then(data => {
			matches[i][2] = data.misMatchPercentage;
		}));
	await Promise.all(promises)
	
	let precision = 30.00 // The lower the closer the match
	let totalDiscovered = 0 
	let found = ""
	while(found == "" || precision > 0){ // If item isnt found and precision falls below 0
		for(let i = matches.length-1; i >= 0; i --){
			if(matches[0][0] == matches[i][0]) // First item equivalent to the other items?
				totalDiscovered += 1
			else // If not, leave this loop
				break;
		}
		if(found != ""){ // If item found, leave
			break;
		}
		else if(totalDiscovered == matches.length){ // If all items are the same in the array, leave
			found = matches[0][0]
			break;
		}
		else // If not found, remove items from the array that are above precision
			var i = matches.length
			while(i--)
				if(matches[i][2] > precision)
					matches.splice(i, 1)
		
		// Various tweakable precision values at different thresholds
		if(precision > 10)
			precision -= 1;
		else if(precision > 5)
			precision -= 0.5;
		else if(precision > 2.5)
			precision -= 0.25;
		else if(precision > 1)
			precision -= 0.1;
		else if(precision > 0)
			precision -= 0.01;
		else
			break;
		totalDiscovered = 0
	}
	if(found != "") // If found return item
		return found
	else // If not, return blank
		return "Blank"
	//console.log("Out of while loop")
}

async function readQuantites(item: ImageData){
	// Now to figure out how to read the quantities...
}
//print text world
//also the worst possible example of how to use global exposed exports as described in webpack.config.json

//output.insertAdjacentHTML("beforeend", `
//	<div>paste an image of rs with homeport button (or not)</div>
//	<div onclick='TEST.capture()'>Click to capture if on alt1</div>`
//);

//check if we are running inside alt1 by checking if the alt1 global exists
if (window.alt1) {
	//tell alt1 about the app
	//this makes alt1 show the add app button when running inside the embedded browser
	//also updates app settings if they are changed
	alt1.identifyAppUrl("./appconfig.json");
}

