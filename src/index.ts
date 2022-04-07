//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";
import * as resemble from "resemblejs";
import * as PNG from "pngjs"
import * as jsqr from "jsqr"
// import * as Buffer from "buffer";
import compareImages from "resemblejs/compareImages"
import * as pixelmatch from "pixelmatch"
import * as lsdb from './JSONs/LocalStorageInit.json';
import * as itemsFull from './JSONs/ItemsAndImages.json'
import * as itemsReorg from './JSONs/ItemsAndImagesReorganized.json'
import * as itemsReorgTwo from './JSONs/ItemsAndImagesReorganizedTwo.json';
import * as itemsLegacyFull from './JSONs/ItemsAndImagesLegacy.json'
import * as itemsLegacyReorg from './JSONs/ItemsAndImagesLegacyReorganized.json'
import * as itemsLegacyReorgTwo from './JSONs/ItemsAndImagesLegacyReorganizedTwo.json';
import ClueRewardReader from "./scripts/rewardreader";
import { ModalUIReader } from "./scripts/modeluireader";
import { IgnorePlugin, javascript, node } from "webpack";
import { imageDataFromBase64 } from "@alt1/base/dist/imagedetect";
import { listeners } from "process";
import { AsyncLocalStorage } from "async_hooks";

//tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", "sixth_item", "seventh_item", "eigth_item", "ninth_item"]
var tierlist = ["easy", "medium", "hard", "elite", "master"]
var ignorelist = ["EValue", "ECount", "MValue", "MCount", "HValue", "HCount", "ElValue", "ElCount", "MaValue", "MaCount", "Checked button","Algorithm","ItemList"]

var listOfItemsAll
var listOfItemsFull
var listOfItemsReorg
var listOfItemsReorgTwo
var listOfItemsLegacyAll
var listOfItemsLegacyFull
var listOfItemsLegacyReorg
var listOfItemsLegacyReorgTwo

var listOfItemsAllArray = []
var listOfItemsFullArray = []
var listOfItemsReorgArray = []
var listOfItemsReorgTwoArray = []
var listOfItemsLegacyAllArray = []
var listOfItemsLegacyFullArray = []
var listOfItemsLegacyReorgArray = []
var listOfItemsLegacyReorgTwoArray = []

var legacy = false
var displaybox = true

var lastItems = []
var lastQuants = []
var lastTier;// = []
var lastValue;// = []

export function refresh(){
	location.reload();
}

export function init(){
	// Set the checked button
	console.log("Initializing plugin...");
	let keys = Object.keys(lsdb);
	if(localStorage.getItem("Checked button") == null){ // Checked button init check
		console.log("Defaulting button to easy...");
		let ele = document.getElementById("easy") as HTMLInputElement;
		ele.checked = true;
		document.getElementById('clue_tier').textContent = "Easy";
		localStorage.setItem("Checked button", "easy");
		document.getElementById("current_tier_buttom").textContent = currentTier()[0]
	}
	else{ // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("Checked button") + "...");
		let temp = localStorage.getItem("Checked button");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
		document.getElementById('clue_tier').textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
		document.getElementById("current_tier_buttom").textContent = currentTier()[0]
	}

	if(localStorage.getItem("Algorithm") == null){ // Algorithim init check
		console.log("Defaulting button to ResembleJS...");
		localStorage.setItem("Algorithm", "resemblejs");
	}

	if(localStorage.getItem("ItemList") == null){ // Item Referense list init check
		console.log("Defaulting list to Organized List...");
		localStorage.setItem("ItemList", "orglist");
	}
	console.log("Radio buttons initialized.\n ");

	// Initializing the rest of the LocalStorage
	console.log("Initializing LocalStorage...");
	for(let i = 0; i < keys.length; i++)
		if(!(localStorage.getItem(keys[i]))) // If doesn't exist, add it
			localStorage.setItem(keys[i], JSON.stringify(lsdb[keys[i]]));
	console.log("LocalStorage initialized.\n ");

	arraySetup()

	//listOfItemsLegacyArray = []
	//for(let i = 0; i < listOfItemsLegacy.length; i++){
	//	let temp = [listOfItemsLegacy[i].name, listOfItemsLegacy[i].base64, 0.0];
	//	listOfItemsLegacyArray.push(temp);
	//}
	
	//Set display
	lootDisplay()
	console.log("Initialization complete");
}

export function changeClueTierSpan(id){
	// Set the clue_tier span for the checked box
	console.log("Setting button to "+(id[0].toUpperCase() + id.slice(1).toLowerCase())+"...");
	document.getElementById('clue_tier').textContent = (id[0].toUpperCase() + id.slice(1).toLowerCase());
	(document.getElementById(id) as HTMLInputElement).checked = true
	localStorage.setItem("Checked button", id);
	document.getElementById("current_tier_buttom").textContent = currentTier()[0]

	// Clear reward slots and value
	document.getElementById("rewards_value").textContent = "0"
	for(let i = 0; i < 9; i++)
		document.getElementById(rewardSlots[i]).textContent = "";

	// Set up arrays
	arraySetup()

	//Set display
	lootDisplay()
	alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
	alt1.overLayTextEx((id[0].toUpperCase() + id.slice(1).toLowerCase())+" tier rewards & images loaded!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
}

export function cleardb(){
	// Consider prompting the user for this...
	// Confirm is disabled. Find a workaround...
	// if(confirm("Are you sure you want to clear the clue database?")){}
	// if(confirm("Deleting the entire database or just current selected tier?")){}
	// else{}	
	// localStorage.clear()
	// init()
	let keys = Object.keys(localStorage)
	let current = currentTier()

	localStorage.setItem(current[1], "0")
	localStorage.setItem(current[2], "0")
	for(let i = 0; i < keys.length; i++){
		if(ignorelist.includes(keys[i])) continue;
		let temp = JSON.parse(localStorage.getItem(keys[i]))
		temp.quantity[current[0]] = (0).toString()
		localStorage.setItem(keys[i], JSON.stringify(temp))
	}
	document.getElementById("number_of_clues").textContent = "0"
	document.getElementById("value_of_clues").textContent = "0"
	document.getElementById("average_of_clues").textContent = "0"
	let divs = document.getElementsByClassName("loot_display")
	for(let i = 0; i < divs.length; i++)
		divs[i].textContent = "";
	for(let i = 0; i < 9; i++)
		document.getElementById(rewardSlots[i]).textContent = "";
	document.getElementById("rewards_value").textContent = "0";
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
		if (window.alt1) {
			alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
			alt1.overLayTextEx("Capturing rewards...", a1lib.mixColor(255,144,0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
		}
		try{
			var loc = img.findSubimage(await imgs.trailCompleteLegacy);
			console.log(loc[0].x);
			console.log("Legacy window");
			legacy = true;
		} catch(e){
			var loc = img.findSubimage(await imgs.trailComplete);
			console.log("Non-legacy window");
			legacy = false;
		}
	
		let crops = new Array<ImageData>(9);
		let topCrops = new Array<ImageData>(9);
		
		// Tweak these two values below if jagex adjusts the pixel placement of the items
		// Values to tweak in case jagex borks the item placement on the screen
		// x1, +1 = right, -1 = left
		// y1, +1 = up, =1 = down
		// Adjust top crops as well, for the x1 and y1 values for it
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
			x1 += 40;
		}
	
		// Give me the total value!
		let rewardreader = new ClueRewardReader();
		rewardreader.pos = ModalUIReader.find()[0];
		let value = rewardreader.read(img).value;
		
		// Give me the items!
		var itemResults = []
		let promises = []
		if(!legacy){
			var x1 = loc[0].x - 1;
			var y1 = loc[0].y + 39;
		}
		else{
			var x1 = loc[0].x - 112;
			var y1 = loc[0].y + 39;
		}
		for(let i = 0; i < 9; i++){
			if (window.alt1) {
				alt1.overLayClearGroup("icon"); alt1.overLaySetGroup("icon")
			}
			if(displaybox){
				// Keep an eye on this in case it incorrectly gives numbers...
				if (window.alt1) {
					alt1.overLayRect(a1lib.mixColor(255,144,0), x1, loc[0].y + 39, 32, 32, 2000, 1);
					alt1.overLayText((i + 1).toString(), a1lib.mixColor(255,144,0,255), 18, x1+5, loc[0].y + 40, 2000)
				}
			}
			x1 += 40
			promises.push(itemResults.push(await compareItems(crops[i])));
		}	
		await Promise.all(promises)
		if (window.alt1)
			alt1.overLayClearGroup("icon")
		console.log(itemResults)
	
		// Give me the quantity of the items!
		var quantResults = []
		promises = []
		for(let i = 0; i < 9; i++){
			if(itemResults[i] == "Blank")
				break;
			promises.push(quantResults.push(await readQuantities(topCrops[i])));
		}
		await Promise.all(promises)
		console.log(quantResults)

		// Send it to the LS!
		promises = []
		let success = true
		promises.push(success = await submitToLS(itemResults, quantResults, value));
		await Promise.all(promises)
		if(!success)
			var notSuccess = 1 / 0
		
		// Put the items and quantites on the display!
		document.getElementById("rewards_value").textContent = value.toLocaleString("en-US")
		for(let i = 0; i < 9; i++)
			document.getElementById(rewardSlots[i]).textContent = "";
		for(let i = 0; i < quantResults.length; i++){
			// Displaying in Rewards Capture
			let nodevar = document.createElement("itembox");
			let imgvar = document.createElement("img");
			let quantvar = document.createElement("span");
			nodevar.setAttribute('style', 'position:relative; margin:auto; margin-top: 3px; width:35px; height:35px; display:flex; align-items:center; text-align:center;');
			nodevar.setAttribute('title',quantResults[i]+" x "+itemResults[i])
			imgvar.src = encodeURI("./images/items/"+itemResults[i]+".png");
			imgvar.setAttribute('style', 'margin:0 auto;');
			quantvar.textContent = quantResults[i];
			if(!quantResults[i].includes("k"))
				quantvar.setAttribute('style','position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); text-shadow:1px 1px #000000;');
			else
				quantvar.setAttribute('style','position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,255); text-shadow:1px 1px #000000;');
			nodevar.append(quantvar);
			nodevar.append(imgvar);
			document.getElementById(rewardSlots[i]).appendChild(nodevar);
		}

		//Show it on the screen!
		lootDisplay()
		
		// Record data for last casket
		lastItems = itemResults.slice()
		lastQuants = quantResults.slice()
		lastTier = currentTier()
		lastValue = value
		//console.log(lastItems, lastQuants, lastTier, lastValue)


		//Display the victory screen!!!
		if (window.alt1) {
			alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
			alt1.overLayTextEx((currentTier()[0][0].toUpperCase() + (currentTier()[0].slice(1)).toLowerCase())+" rewards captured successfully!", 
								a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true)
		}
	} catch(e){
		if (window.alt1) {
			alt1.overLayClearGroup("overlays")
			alt1.overLayTextEx("      Failed to capture rewards.\nRemove any obstructions, check\n    tier, or open a reward casket.", a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		throw e
	}
}
	
async function compareItems(item:ImageData){
	//TODO: Try to get Legacy to work properly
	//Legacy is a bit janky right now, it can't identify blank
	//spaces and it can't identify some items...
	// Take copy of the original array

	// Can't use all at once. Can only do one color at a time.
	// const yellow = { r: 255, g: 0, b: 0, a: 255};
	// const black1 = { r: 0, g: 0, b: 0, a: 255};
	// const black2 = { r: 0, g: 0, b: 1, a: 255};
	// const black3 = { r: 0, g: 0, b: 2, a: 255};
	// const legacytan = { r: 62, g: 53, b: 40, a: 255};
	// const rs3blue = { r: 10, g: 31, b: 41, a: 255};

	// let colors = [yellow, black1, black2, black3]
	// Just hold this for now just in case...

	 // Remove blank if not blank
	//	{output: {ignoreAreasColoredWith: colors}}
	// 	Choices are: yellow, black1, black2, black3, legacytan, rs3blue
	// all, twoplus, orglist, orgminus

	if(!legacy){
	}
	else{
	}
	
	document.getElementById("common_loot").textContent = ""
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var imgvar = document.createElement("img");
	canvas.width = item.width;
	canvas.height = item.height;
	ctx.putImageData(item, 0, 0);
	imgvar.src = canvas.toDataURL();
	document.getElementById("common_loot").appendChild(imgvar);

	if(!legacy){
		if(localStorage.getItem("ItemList") == "all")
			var matches = listOfItemsAllArray.slice();
		else if(localStorage.getItem("ItemList") == "twoplus")
			var matches = listOfItemsFullArray.slice();
		else if(localStorage.getItem("ItemList") == "orglist")
			var matches = listOfItemsReorgArray.slice();
		else if(localStorage.getItem("ItemList") == "orgminus")
			var matches = listOfItemsReorgTwoArray.slice();

		var imgdata = await compareImages(item, matches[0][1] , {output: {}, ignore: "less"})
		matches[0][2] = imgdata.rawMisMatchPercentage;
		if(matches[0][2] == 0.00)
			return "Blank"
		matches.shift()
		
		if(localStorage.getItem("Algorithm") == "resemblejs"){
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
		else if(localStorage.getItem("Algorithm") == "pixelmatch"){	
			var found = matches[0]
			const promises = []
			for(let i = 0; i < matches.length; i++){
				//const byteCharacters = atob(matches[i][1].replace("data:image/png;base64,",''))
				//const byteNumbers = new Array(byteCharacters.length)
				//for (let i = 0; i < byteCharacters.length; i++) {
				//	byteNumbers[i] = byteCharacters.charCodeAt(i);
				//}
				//const byteArray = new Uint8Array(byteNumbers)

				var buffer = Buffer.from(matches[i][1], "base64")

				//console.log("Original Image",item.data)
				//console.log("Reference Image",byteArray)
				//matches[i][2] = pixelmatch(item.data, buffer, null, item.width, item.height, {threshold: 0})
				console.log(matches[i][2])
				if(found[2] < found[i][2]){
					found = matches[i]
				}
			}
			await Promise.all(promises)
		}
	}	
	else{ // Legacy kinda janky. Need to figure it out
		if(localStorage.getItem("ItemList") == "all")
			var matches = listOfItemsLegacyAllArray.slice();
		else if(localStorage.getItem("ItemList") == "twoplus")
			var matches = listOfItemsLegacyFullArray.slice();
		else if(localStorage.getItem("ItemList") == "orglist")
			var matches = listOfItemsLegacyReorgArray.slice();
		else if(localStorage.getItem("ItemList") == "orgminus")
			var matches = listOfItemsLegacyReorgTwoArray.slice();
			
		var matches = listOfItemsLegacyReorgTwoArray.slice();
		var imgdata = await compareImages(item, matches[0][1] , {output: {}, ignore: ["less"]})
		matches[0][2] = imgdata.rawMisMatchPercentage;
		if(matches[0][2] == 0.00) // If it is blank
			return "Blank";
		matches.shift()

		if(localStorage.getItem("Algorithm") == "resemblejs"){
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
		else if(localStorage.getItem("Algorithm") == "pixelmatch"){

		}
	}
	console.log(found[0])
	return found[0]
}

async function readQuantities(item: ImageData){
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
	//console.log(pixels)
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
	//console.log(pixarr.length, pixarr[0].length)
	for(let i = 0; i < pixarr[0].length; i++){
		if(noYellowStreak == 3)
			break;
		for(let j = 0; j < pixarr.length; j++){
			if(pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 	 // Yellow, Every screen has this
			|| pixarr[j][i].r == 254 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 	 // Very slightly darker yellow, a screenie had this...
			|| pixarr[j][i].r == 253 && pixarr[j][i].g == 253 && pixarr[j][i].b == 0 	 // Slightly darker yellow, for safety
			|| pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255){ // White, elites and masters only
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
					pixelCount = 0;
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
	if(pixelCount > 5)
		numbers += "0"
	if(numbers != "")
		return numbers;
	else
		return "1";
}

async function submitToLS(item: any[], quant: any[], value: any){
	let current = currentTier()
	
	//Add items to database
	console.log("Adding to database...")
	for(let i = 0; i < quant.length; i++){
		// If you get null or undefined here, check if one of your rewards doesn't exist in LocalStorage or LocalStorageInit
		// Or maybe the name might be incorrectly written in, idk
		console.log("checking if in array")
		//console.log(JSON.parse(localStorage.getItem(item[i])).tier)
		if(JSON.parse(localStorage.getItem(item[i])).tier.includes(current[0])){
			let temp = JSON.parse(localStorage.getItem(item[i]))
			temp.quantity[current[0]] = (parseInt(temp.quantity[current[0]]) + parseInt(quant[i])).toString()
			localStorage.setItem(item[i], JSON.stringify(temp))
		}
		else
			return false;
	}
	
	// Increase value and count
	localStorage.setItem(current[1], JSON.stringify((JSON.parse(localStorage.getItem(current[1])) + value)))
	localStorage.setItem(current[2], JSON.stringify(JSON.parse(localStorage.getItem(current[2])) + 1))
	
	return true;
}

function lootDisplay(){
	let current = currentTier()
	
	//Set Number of clues and Current and Average values
	document.getElementById("number_of_clues").textContent = JSON.parse(localStorage.getItem(current[2])).toLocaleString("en-US")
	document.getElementById("value_of_clues").textContent = JSON.parse(localStorage.getItem(current[1])).toLocaleString("en-US")
	if(parseInt(JSON.parse(localStorage.getItem(current[2]))) != 0)
		document.getElementById("average_of_clues").textContent = Math.round(parseInt(JSON.parse(localStorage.getItem(current[1]))) / parseInt(JSON.parse(localStorage.getItem(current[2])))).toLocaleString("en-US")
	else
		document.getElementById("average_of_clues").textContent = "0"
	
	//Set the icons in the tabs
	tabDisplay(current[0])
}

function tabDisplay(current: string){
	let keys = Object.keys(localStorage)
	let divs = document.getElementsByClassName("loot_display")
	for(let i = 0; i < divs.length; i++)
		divs[i].textContent = "";
	for(let i = 0; i < keys.length; i++){
		if(ignorelist.includes(keys[i]) || JSON.parse(localStorage.getItem(keys[i])).quantity[current] == 0)
			continue;
		//console.log(JSON.parse(localStorage.getItem(keys[i])).tab+"_loot")
		let ele = document.getElementById(JSON.parse(localStorage.getItem(keys[i])).tab+"_loot")
		let nodevar = document.createElement("itembox");
		let imgvar = document.createElement("img");
		let quantvar = document.createElement("span");
		nodevar.setAttribute('style', 'position:relative; margin: 3 5 0 1; padding:0 7px 0 2px; width:35px; height:35px; display:flex; align-items:center; text-align:center; order: '+parseInt(JSON.parse(localStorage.getItem(keys[i])).order)+';');
		nodevar.setAttribute('title',JSON.parse(localStorage.getItem(keys[i])).quantity[current] +" x "+keys[i])
		imgvar.src = encodeURI("./images/items/"+keys[i]+".png");
		imgvar.setAttribute('style', 'margin:0 auto;');
		if(parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) > 9999999){
			quantvar.setAttribute('style','position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(0,255,128); text-shadow:1px 1px #000000;');
			quantvar.textContent = Math.trunc(parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) / 1000000).toString() + "M";
		}
		else if(parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) > 99999){
			quantvar.setAttribute('style','position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,255); text-shadow:1px 1px #000000;');
			quantvar.textContent = Math.trunc(parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) / 1000).toString() + "k";
		}
		else{
			quantvar.setAttribute('style','position:absolute; left:0; top:0; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); text-shadow:1px 1px #000000;');
			quantvar.textContent = Math.trunc(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) + "";
		}
		nodevar.append(quantvar);
		nodevar.append(imgvar);
		ele.append(nodevar)
	}
}

function currentTier(){
	let currButton = ""	
	for(let i = 0; i < tierlist.length; i++)
		if((document.getElementById(tierlist[i]) as HTMLInputElement).checked){
			currButton = tierlist[i]
			if(currButton == 'easy')
				return [currButton, "EValue", "ECount"]
			else if(currButton == 'medium')
				return [currButton, "MValue", "MCount"]
			else if(currButton == 'hard')
				return [currButton, "HValue", "HCount"]	
			else if(currButton == 'elite')
				return [currButton, "ElValue", "ElCount"]
			else if(currButton == 'master')
				return [currButton, "MaValue", "MaCount"]
		}
}

export function exporttocsv(){
	if (window.alt1) {
		alt1.overLayClearGroup("overlays")
		alt1.overLaySetGroup("overlays")
		alt1.overLayTextEx("Generating CSV...", a1lib.mixColor(255,144,0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
	}

	let csvinfo = []
	csvinfo.push(["Item","Easy","Medium","Hard","Elite","Master"])
	let keys = Object.keys(lsdb)
	let currOrder = 1
	for(let i = 0; i < keys.length; i++){
		if(!ignorelist.includes(keys[i]))
			continue;
		let val = JSON.parse(localStorage.getItem(keys[i]))
		if(keys[i] == "ECount")
			csvinfo.push(["Easy Total Count",val,"","","",""])
		else if(keys[i] == "EValue")
			csvinfo.push(["Easy Total Value",val,"","","",""])
		else if(keys[i] == "MCount")
			csvinfo.push(["Medium Total Count","",val,"","",""])
		else if(keys[i] == "MValue")
			csvinfo.push(["Medium Total Value","",val,"","",""])
		else if(keys[i] == "HCount")
			csvinfo.push(["Hard Total Count","","",val,"",""])
		else if(keys[i] == "HValue")
			csvinfo.push(["Hard Total Value","","",val,"",""])
		else if(keys[i] == "ElCount")
			csvinfo.push(["Elite Total Count","","","",val,""])
		else if(keys[i] == "ElValue")
			csvinfo.push(["Elite Total Value","","","",val,""])
		else if(keys[i] == "MaCount")
			csvinfo.push(["Master Total Count","","","","",val])
		else if(keys[i] == "MaValue")
			csvinfo.push(["Master Total Value","","","","",val])
	}
	for(let i = 0; i < keys.length; i++){
		if(ignorelist.includes(keys[i]))
			continue;
		for(let j = 0; j < keys.length; j++){
			if(ignorelist.includes(keys[j]))
				continue;
			if(JSON.stringify(JSON.parse(localStorage.getItem(keys[j])).order) == currOrder.toString()){
				let val = JSON.parse(localStorage.getItem(keys[j]))
				let one = val.quantity.easy.toString()
				let two = val.quantity.medium.toString()
				let three = val.quantity.hard.toString()
				let four = val.quantity.elite.toString()
				let five = val.quantity.master.toString()
				if(one == "0")
					one = ""
				if(two == "0")
					two = ""
				if(three == "0")
					three = ""
				if(four == "0")
					four = ""
				if(five == "0")
					five = ""
				csvinfo.push([keys[j], one, two, three, four, five])
				currOrder++
				break;
			}
		}
	}

	const d = new Date()
	let csvContent = "";
	csvinfo.forEach(function(i) {
	    let row = i.join(",");
	    csvContent += row + "\r\n";
	});
	let filename = "OpenLogger CSV "+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+".csv"
	var encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", filename);
	document.body.appendChild(link); // Required for FF
	link.click()
	if (window.alt1) {
		alt1.overLayClearGroup("overlays")
		alt1.overLaySetGroup("overlays")
		alt1.overLayTextEx("CSV Generated!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
	}
}

export function rollback(){
	console.log("Rolling back:",lastItems, lastQuants, lastTier, lastValue)
	if(lastItems.length == 0){
		if (window.alt1) {
			alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
			alt1.overLayTextEx("Nothing to roll back", a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
		}
		return;
	}
		
	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
		alt1.overLayTextEx("Rolling back last reward...", a1lib.mixColor(255,144,0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
	}
	
	// let lil = lastItems.length - 1
	// let lql = lastQuants.length - 1
	// let ltl = lastTier.length - 1
	// let lvl = lastValue.length - 1

	for(let i = 0; i < lastQuants.length; i++){
		console.log("checking if in array")
		//console.log(JSON.parse(localStorage.getItem(lastItems[i])).tier)
		if(JSON.parse(localStorage.getItem(lastItems[i])).tier.includes(lastTier[0])){
			let temp = JSON.parse(localStorage.getItem(lastItems[i]))
			temp.quantity[lastTier[0]] = (parseInt(temp.quantity[lastTier[0]]) - parseInt(lastQuants[i])).toString()
			localStorage.setItem(lastItems[i], JSON.stringify(temp))
		}
		else
			return false;
	}
	
	// Decrease value and count
	localStorage.setItem(lastTier[1], JSON.stringify((JSON.parse(localStorage.getItem(lastTier[1])) - lastValue)))
	localStorage.setItem(lastTier[2], JSON.stringify(JSON.parse(localStorage.getItem(lastTier[2])) - 1))
	
	lastItems = [] //= //lastItems.pop()
	lastQuants = []//= //lastQuants.pop()
	lastTier; //= //lastTier.pop()
	lastValue; //= lastValue.pop()
	document.getElementById("rewards_value").textContent = "0"
	for(let i = 0; i < 9; i++)
		document.getElementById(rewardSlots[i]).textContent = "";
	lootDisplay()

	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
		alt1.overLayTextEx("Previous rewards rolled back successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
	}
}

function arraySetup(){
	// Set new array
	listOfItemsFull = itemsFull.any.concat(itemsFull[currentTier()[0]]);
	listOfItemsReorg = itemsReorg.any.concat(itemsReorg[currentTier()[0]]);
	listOfItemsReorgTwo = itemsReorgTwo.any.concat(itemsReorgTwo[currentTier()[0]]);
	listOfItemsLegacyFull = itemsLegacyFull.any.concat(itemsLegacyFull[currentTier()[0]]);
	listOfItemsLegacyReorg = itemsLegacyReorg.any.concat(itemsLegacyReorg[currentTier()[0]]);
	listOfItemsLegacyReorgTwo = itemsLegacyReorgTwo.any.concat(itemsLegacyReorgTwo[currentTier()[0]]);

	// Turning image collection into array
	listOfItemsFullArray = []
	listOfItemsReorgArray = []
	listOfItemsReorgTwoArray = []
	listOfItemsLegacyFullArray = []
	listOfItemsLegacyReorgArray = []
	listOfItemsLegacyReorgTwoArray = []
	for(let i = 0; i < listOfItemsFull.length; i++){
		if(i < listOfItemsFull.length)
			listOfItemsFullArray.push([listOfItemsFull[i].name, listOfItemsFull[i].base64, 0.0])
		if(i < listOfItemsReorg.length)
			listOfItemsReorgArray.push([listOfItemsReorg[i].name, listOfItemsReorg[i].base64, 0.0])
		if(i < listOfItemsReorgTwo.length)
			listOfItemsReorgTwoArray.push([listOfItemsReorgTwo[i].name, listOfItemsReorgTwo[i].base64, 0.0])
		if(i < listOfItemsLegacyFull.length)
			listOfItemsLegacyFullArray.push([listOfItemsLegacyFull[i].name, listOfItemsLegacyFull[i].base64, 0.0])
		if(i < listOfItemsLegacyReorg.length)
			listOfItemsLegacyReorgArray.push([listOfItemsLegacyReorg[i].name, listOfItemsLegacyReorg[i].base64, 0.0])
		if(i < listOfItemsLegacyReorgTwo.length)
			listOfItemsLegacyReorgTwoArray.push([listOfItemsLegacyReorgTwo[i].name, listOfItemsLegacyReorgTwo[i].base64, 0.0])
	}

	listOfItemsAll = itemsFull.any.concat(itemsFull.easy).concat(itemsFull.medium).concat(itemsFull.hard).concat(itemsFull.elite).concat(itemsFull.master)
	listOfItemsLegacyAll = itemsLegacyFull.any.concat(itemsLegacyFull.easy).concat(itemsLegacyFull.medium).concat(itemsLegacyFull.hard).concat(itemsLegacyFull.elite).concat(itemsLegacyFull.master)
	listOfItemsAllArray = []
	listOfItemsLegacyAllArray = []
	for(let i = 0; i < listOfItemsAll.length; i++){
		listOfItemsAllArray.push([listOfItemsAll[i].name, listOfItemsAll[i].base64, 0.0])
		listOfItemsLegacyAllArray.push([listOfItemsLegacyAll[i].name, listOfItemsLegacyAll[i].base64, 0.0])
	}
	// console.log("DEBUG:",listOfItemsFullArray, listOfItemsReorgArray, listOfItemsReorgTwoArray, listOfItemsLegacyFullArray, listOfItemsLegacyReorgArray, listOfItemsLegacyReorgTwoArray, listOfItemsFullArray, listOfItemsLegacyFullArray)
}

export function insert(){
	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
		alt1.overLayTextEx("Doesn't work yet...", a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	}
}

export function settings(){
	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
		alt1.overLayTextEx("Algorithms does not work yet...", a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	}
	
	var settingsWindow = window.open("./settings.html", "_blank", "height=550, width=360, status=yes, toolbar=no, menubar=no, location=no,addressbar=no");

	//var childWin = window.open("./settings.html", "Settings", "height=400, width=200, status=yes, toolbar=no, menubar=no, location=no,addressbar=no"); 

	//if (window.alt1) {
	//	alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
	//	alt1.overLayTextEx(".", a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	//}
}

export function settingsInit(){
	if(localStorage.getItem("Algorithm") == null){ // Algorithim init check
		console.log("Defaulting button to ResembleJS...");
		var ele = document.getElementById("resemblejs") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("Algorithm", "resemblejs");
	}
	else{ // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("Algorithm") + "...");
		let temp = localStorage.getItem("Algorithm");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
	}

	if(localStorage.getItem("ItemList") == null){ // Item Referense list init check
		console.log("Defaulting list to Organized List...");
		var ele = document.getElementById("orglist") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("ItemList", "orglist");
	}
	else{ // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("ItemList") + "...");
		let temp = localStorage.getItem("ItemList");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
	}
}

export function saveSettings(alg: string, list: string){
	localStorage.setItem("Algorithm", alg)
	localStorage.setItem("ItemList", list)
	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); alt1.overLaySetGroup("overlays")
		alt1.overLayTextEx("Settings saved!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
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

