//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";
import * as resemble from "resemblejs";
import compareImages from "resemblejs/compareImages"
import * as lsdb from './JSONs/LocalStorageInit.json';
import * as items from './JSONs/ItemsAndImages.json';
import { IgnorePlugin, node } from "webpack";
import { imageDataFromBase64 } from "@alt1/base/dist/imagedetect";

//tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", "sixth_item", "seventh_item", "eigth_item", "ninth_item"]
var tierlist = ["easy", "medium", "hard", "elite", "master"]
var listOfItems
var listOfItemsArray = []
var legacy = false
var displaybox = true

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
	trailComplete: require("./images/TrailComplete.data.png"),
	trailCompleteLegacy: require("./images/TrailCompleteLegacy.data.png"),
	rewardValue: require("./images/RewardValue.data.png"),
	rewardValueLegacy: require("./images/RewardValueLegacy.data.png")
});

//listen for pasted (ctrl-v) images, usually used in the browser version of an app
a1lib.PasteInput.listen(img => {
	findtrailComplete(img);
}, (err, errid) => {

});


a1lib.on("alt1pressed", capture)
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
	try{
		var loc = img.findSubimage(await imgs.trailCompleteLegacy);
		console.log(loc[0].x);
		console.log("Legacy window");
		legacy = true;
	} catch(e){
		var loc = img.findSubimage(await imgs.trailComplete);
		console.log(loc[0].x);
		console.log("Non-legacy window");
		legacy = false;
	}
	
	//overlay the result on screen if running in alt1
	if (window.alt1) {
		if (loc.length != 0) {
			if (displaybox){
				if(!legacy){
					alt1.overLayRect(a1lib.mixColor(255,0,0), loc[0].x - 27, loc[0].y - 13, await imgs.trailComplete.width + 278, await imgs.trailComplete.height + 213, 2000, 3);
				}
				else{	// Offset for x is 111
					alt1.overLayRect(a1lib.mixColor(0,255,0), loc[0].x - 138, loc[0].y - 13, await imgs.trailCompleteLegacy.width + 278, await imgs.trailCompleteLegacy.height + 213, 2000, 3);
				} 
			}
			else {
				alt1.overLayTextEx("Couldn't find Rewards window. Remove\n    any obstructions or open a casket.", a1lib.mixColor(255, 255, 255), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
			}
		}
	}   

	//get raw pixels of image and show on screen (used mostly for debug)  
	var buf = img.toData(loc[0].x - 27, loc[0].y - 13, await imgs.trailComplete.width + 278, await imgs.trailComplete.height + 213);

	let crops = new Array<ImageData>(9);
	let topCrops = new Array<ImageData>(9);
	
	// Tweak these two values below if jagex adjusts the pixel placement of the items
	if(!legacy){
		var x1 = loc[0].x - 1;
		var y1 = loc[0].y + 39;
	}
	else{
		var x1 = loc[0].x - 112;
		var y1 = loc[0].y + 39;
	}
	for(let i = 0; i < crops.length; i++) {
		crops[i] = img.toData(x1, y1, 32, 32);
		topCrops[i] = img.toData(x1, loc[0].y + 41, 32, 8);
		if(displaybox){
			alt1.overLayRect(a1lib.mixColor(255,144,0), x1, loc[0].y + 39, 32, 32, 2000, 1);
			alt1.overLayRect(a1lib.mixColor(255,144,20), x1, loc[0].y + 41, 32, 8, 2000, 1);
		}
		x1 += 40;
	}
	
	// Give me the items!
	var itemResults = []
	let promises = []
	for(let i = 0; i < 9; i++){
		try{
			promises.push(itemResults.push(await compareItems(crops[i])));
		} catch(e){
			alt1.overLayTextEx("    Error occured. Please try again\nAvoid obstructions over the window", a1lib.mixColor(255, 100, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		// a1lib.mixColor(100, 255, 100) The Green of Success!
	}
	await Promise.all(promises)
	console.log(itemResults)

	// Give me the quantity of the items!
	var quantResults = []
	promises = []
	for(let i = 0; i < 9; i++){
		if(itemResults[i] == "Blank")
			continue;
		promises.push(quantResults.push(await readQuantites(topCrops[i])));
	}
	await Promise.all(promises)
	console.log(quantResults)

	// Give me the total value!
	//alt1.clearBinds()
	if(!legacy){
		//var loc = img.findSubimage(await imgs.rewardValue);
		var valueCap = img.toData(loc[0].x - 10, loc[0].y + 97, await imgs.rewardValue.width + 175, await imgs.rewardValue.height);
		alt1.overLayRect(a1lib.mixColor(255,144,20), loc[0].x - 10, loc[0].y + 97, await imgs.rewardValue.width + 175, await imgs.rewardValue.height, 2000, 1)
	}
	else{
		//var loc = img.findSubimage(await imgs.rewardValueLegacy);
		var valueCap = img.toData(loc[0].x - 110, loc[0].y + 97, await imgs.rewardValueLegacy.width + 175, await imgs.rewardValueLegacy.height);
		alt1.overLayRect(a1lib.mixColor(255,144,20), loc[0].x - 122, loc[0].y + 97, await imgs.rewardValueLegacy.width + 175, await imgs.rewardValueLegacy.height, 2000, 1);
	}

	// Put the items and quantites on the display!
	for(let i = 0; i < 9; i++)
		document.getElementById(rewardSlots[i]).textContent = "";
	for(let i = 0; i < quantResults.length; i++){
		// Displaying in Rewards Capture
		let nodevar = document.createElement("itembox");
		let imgvar = document.createElement("img");
		imgvar.src = encodeURI("./images/items/"+itemResults[i]+".png");
		let quantvar = document.createElement("span");
		quantvar.textContent = quantResults[i];
		nodevar.setAttribute('style', 'position:relative; margin:auto; margin-top: 3px; width:35px; height:35px; display:flex; align-items:center; text-align:center;');
        imgvar.setAttribute('style', 'margin:0 auto;');
		if(!quantResults[i].includes("k"))
			quantvar.setAttribute('style','position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); text-shadow:1px 1px #000000;');
		else
			quantvar.setAttribute('style','position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,255); text-shadow:1px 1px #000000;');
		nodevar.append(quantvar);
		nodevar.append(imgvar);
		document.getElementById(rewardSlots[i]).appendChild(nodevar);
	}
	let totalValue
	promises = []
	promises.push(totalValue = await captureValue(valueCap));
	await Promise.all(promises)

	// Send it to the LS!!!!
	promises = []
	for(let i = 0; i < quantResults.length; i++){
		promises.push(await submitToLS(itemResults[i], quantResults[i], 1));
	}
	await Promise.all(promises)
}
	
async function compareItems(item:ImageData){
	//TODO: Try to get Legacy to work properly
	//Legacy is a bit janky right now, it can't identify blank
	//spaces and it can't identify some items...
	
	// Take copy of the original array
	let matches = listOfItemsArray.slice();

	// Can't use all at once. Can only do one color at a time.
	// const yellow = { r: 255, g: 0, b: 0, a: 255};
	// const black1 = { r: 0, g: 0, b: 0, a: 255};
	// const black2 = { r: 0, g: 0, b: 1, a: 255};
	// const black3 = { r: 0, g: 0, b: 2, a: 255};
	// const legacytan = { r: 62, g: 53, b: 40, a: 255};
	// const rs3blue = { r: 10, g: 31, b: 41, a: 255};

	// let colors = [yellow, black1, black2, black3]
	// Just hold this for now just in case...
	
	if(!legacy){ //Legacy interface?
		var imgdata = await compareImages(item, matches[0][1] , {output: {}, ignore: "less"})
		matches[0][2] = imgdata.rawMisMatchPercentage;
		if(matches[0][2] == 0.00)
			return "Blank"
	}
	else{ //Legacy interface.
		var imgdata = await compareImages(item, matches[1][1] , {output: {}, ignore: ["less", "colors"]})
		matches[1][2] = imgdata.rawMisMatchPercentage;
		if(matches[1][2] == 0.00) // If it is blank
			return "Blank";
	}

	matches.shift() // Remove blank if not blank
	matches.shift() // Remove blank if not blank
	//	{output: {ignoreAreasColoredWith: colors}}
	// 	Choices are: yellow, black1, black2, black3, legacytan, rs3blue	
	if(!legacy){
		var found = matches[0]
		const promises = []
		for(let i = 0; i < matches.length; i++)
			promises.push(await compareImages(item, matches[i][1] , {output: {}, ignore: "less"} ).then(data => {
				matches[i][2] = data.rawMisMatchPercentage;
				if(found[2] > matches[i][2])
					found = matches[i]
			}));
		await Promise.all(promises)
	}
	else{
		var found = matches[0]
		const promises = []
		for(let i = 0; i < matches.length; i++)
			promises.push(await compareImages(item, matches[i][1] , {output: {}, ignore: "less"} ).then(data => {
				matches[i][2] = data.rawMisMatchPercentage;
				if(found[2] > matches[i][2])
					found = matches[i]
			}));
		await Promise.all(promises)
	}
	return found[0]
	
	//	I have a smart friend. Below this is my solution and
	// 	this one here is his.
	// let found = matches[0]
	// for(let i = 0; i < matches.length; i++) // Get the closest match.
		
	
	
	//console.log(matches)
	//let precision = 30.00 // The lower the closer the match
	//let totalDiscovered = 0 
	//let found = ""
	//while(found == "" || precision > 0){ // If item isnt found and precision falls below 0
	//	for(let i = matches.length-1; i >= 0; i --){
	//		if(matches[0][0] == matches[i][0]) // First item equivalent to the other items?
	//			totalDiscovered += 1
	//		else // If not, leave this loop
	//			break;
	//	}
	//	if(found != ""){ // If item found, leave
	//		break;
	//	}
	//	else if(totalDiscovered == matches.length){ // If all items are the same in the array, leave
	//		found = matches[0][0]
	//		break;
	//	}
	//	else // If not found, remove items from the array that are above precision
	//		var i = matches.length
	//		while(i--)
	//			if(matches[i][2] > precision)
	//				matches.splice(i, 1)
	//	
	//	// Various tweakable precision values at different thresholds
	//	if(precision > 10)
	//		precision -= 1;
	//	else if(precision > 5)
	//		precision -= 0.5;
	//	else if(precision > 2.5)
	//		precision -= 0.25;
	//	else if(precision > 1)
	//		precision -= 0.1;
	//	else if(precision > 0)
	//		precision -= 0.01;
	//	else
	//		break;
	//	totalDiscovered = 0
	//}
	//if(found != "") // If found return item
	// return found
	//else // If not, return blank
	//	return "Blank"
}

async function readQuantites(item: ImageData){
	// Instead oif reading top to bottom individulally, 
	// Read from left to right Read left to right with all columns together
	// And since the height is always the same I dont have ot worry about changing
	// the value of the width of the number.

	// Maybe consider this for optimizations :^?
	let itemCan = document.createElement("canvas");
	let itemCon = itemCan.getContext('2d');
	itemCan.width = item.width
	itemCan.height = item.height
	itemCon.putImageData(item, 0, 0);
	var itemImg = new Image();
	itemImg.src = itemCan.toDataURL("image/png")
	itemCon.drawImage(itemImg, 0, 0)
	let pixels = itemCon.getImageData(0, 0, item.width, item.height)
	console.log(pixels)
	let pixarr = []
	let pixeldata = 0
	for(let i = 0; i < 8; i++){
		let arr2 = []
		for(let j = 0; j < 32; j++){
			let vals = {r: pixels.data[pixeldata], g: pixels.data[pixeldata+1], b: pixels.data[pixeldata+2], a: pixels.data[pixeldata+3]}
			pixeldata += 4
			arr2.push(vals)
		}
		pixarr.push(arr2)
	}

	let pixelCount = 0
	let streak = 0
	let longestStreak = 0
	let yellowInCol = false
	let noYellowStreak = 0
	let numbers = ""
	console.log(pixarr.length, pixarr[0].length)
	for(let i = 0; i < pixarr[0].length; i++){
		if(noYellowStreak == 3)
			break;
		for(let j = 0; j < pixarr.length; j++){
			if(pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 || pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255){
				pixelCount++
				streak++
				noYellowStreak = 0
				yellowInCol = true
				if(streak > longestStreak)
					longestStreak = streak;
			}
			else
				streak = 0
		}
		if(pixelCount == 0)
			noYellowStreak++;
		else if(yellowInCol == false){
			if(pixelCount == 11){
				if(longestStreak == 3)
					numbers += "7"
				else // 9
					numbers += "1"
			}
			else if(pixelCount == 13){
				if(longestStreak == 3)
					numbers += "3"
				else //if 6
					numbers += "4"
			}
			else if(pixelCount == 14)
				numbers += "0"
			else if(pixelCount == 15)
				if(longestStreak == 3)
					numbers += "2"
				else if(longestStreak == 4)
					numbers += "5"
				else if(longestStreak == 7)
					numbers += "9"
				else{ //if 8
					numbers += "k"
					break;
				}
			else if(pixelCount == 18)
				numbers += "6"
			else // if pixelCount == 19
				numbers += "8"
			
			longestStreak  = 0;
			pixelCount = 0;
			noYellowStreak ++;
		}
		yellowInCol = false;
	}
	if(pixelCount == 10)
		numbers += "0"
	if(numbers != "")
		return numbers;
	else
		return "1";
}

async function captureValue(value: ImageData){
	//Implement readquantites in here
	// Current Reward Value is 194
	// Pixels to record
	/*
	RGB()
	RGB()
	RGB()
	RGB()
	RGB()
	RGB()
	RGB()
	RGB()
	*/
	// 0 = 
	// 1 = 
	// 2 = 
	// 3 = 
	// 4 = 
	// 5 = 
	// 6 = 
	// 7 = 
	// 8 = 
	// 9 = 
}

async function submitToLS(item: String, quantity: String, value: any){
	let deposit = ""	
	for(let i = 0; i < tierlist.length; i++)
		if((document.getElementById(tierlist[i]) as HTMLInputElement).checked)
			deposit = tierlist[i]
	
	let lsItem = JSON.parse(localStorage.getItem(item.valueOf())).tier.includes(deposit)
	
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

