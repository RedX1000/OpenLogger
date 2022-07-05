//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";

import compareImages from "resemblejs/compareImages"
import pixelmatch from "pixelmatch";

import ClueRewardReader from "./scripts/rewardreader";
import { ModalUIReader } from "./scripts/modeluireader";

import * as lsdb from './JSONs/LocalStorageInit.json';
import * as itemsFull from './JSONs/ItemsAndImages.json';
import * as itemsReorg from './JSONs/ItemsAndImagesReorganized.json';
import * as itemsReorgTwo from './JSONs/ItemsAndImagesReorganizedTwo.json';
import * as itemsLegacyFull from './JSONs/ItemsAndImagesLegacy.json';
import * as itemsLegacyReorg from './JSONs/ItemsAndImagesLegacyReorganized.json';
import * as itemsLegacyReorgTwo from './JSONs/ItemsAndImagesLegacyReorganizedTwo.json';

//tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", "sixth_item", "seventh_item", "eigth_item", "ninth_item"];
var tierlist = ["easy", "medium", "hard", "elite", "master"]

// When adding new objects to LocalStorage that ARE NOT items, put that object into this list
// Otherwise displaying items to the rewards display will break.
var ignorelist = ["EValue", "ECount", "MValue", "MCount", "HValue",
	"HCount", "ElValue", "ElCount", "MaValue", "MaCount",
	"Checked button", "Algorithm", "ItemList", "autoCapture",
	"rerollToggle", "lagDetect", "multiButtonPressDetect", 
	"hybridPrecision", "noMenu", "Rollback", "PrimaryKeyRollback",
	"RollbackDisplayLimit"];

var listOfItemsAll;
var listOfItemsFull;
var listOfItemsReorg;
var listOfItemsReorgTwo;
var listOfItemsLegacyAll;
var listOfItemsLegacyFull;
var listOfItemsLegacyReorg;
var listOfItemsLegacyReorgTwo;

var listOfItemsAllArray = [];
var listOfItemsFullArray = [];
var listOfItemsReorgArray = [];
var listOfItemsReorgTwoArray = [];
var listOfItemsLegacyAllArray = [];
var listOfItemsLegacyFullArray = [];
var listOfItemsLegacyReorgArray = [];
var listOfItemsLegacyReorgTwoArray = [];

var legacy = false;
var displaybox = true;

var lastItems = [];
var lastQuants = [];
var lastTier;
var lastValue = 0;

var lastReroll = [0, 0];

var autoCaptureInterval;

var opentabs = [true, true, true, true];

var lagDetected = false;

var toggle = true

var autoAdjust = true

var noMenuInterval;


export function refresh() {
	location.reload();
}


export function initOnLoad(){
	alt1.overLayClearGroup("overlays");
	alt1.overLayClearGroup("icon");
	alt1.overLayClearGroup("lag");
	alt1.overLayClearGroup("nomenu");
	
	alt1.overLaySetGroup("overlays");
	alt1.overLayTextEx("Initializing OpenLogger...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
	init()
}

export async function init() {

	buttonDisabler()
	console.log("Initializing plugin...");
	let keys = Object.keys(lsdb);
	if (localStorage.getItem("Checked button") == null) { // Checked button init check
		console.log("Defaulting button to easy...");
		let ele = document.getElementById("easy") as HTMLInputElement;
		ele.checked = true;
		document.getElementById('clue_tier').textContent = "Easy";
		localStorage.setItem("Checked button", "easy");
	}
	else { // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("Checked button") + "...");
		let temp = localStorage.getItem("Checked button");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
		document.getElementById('clue_tier').textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
	}

	let tierSpans = document.getElementsByClassName("current_tier_button");
	for (let i = 0; i < tierSpans.length; i++)
		tierSpans[i].textContent = currentTier()[0]

	if (localStorage.getItem("Algorithm") == null) { // Algorithim init check
		console.log("Defaulting button to Hybrid...");
		localStorage.setItem("Algorithm", "hybrid");
	}

	if (localStorage.getItem("ItemList") == null) { // Item Referense list init check
		console.log("Defaulting list to Organized List...");
		localStorage.setItem("ItemList", "orglist");
	}

	if (localStorage.getItem("autoCapture") == null) {
		console.log("Defaulting autocapture to off...");
		localStorage.setItem("autoCapture", "false");
	}
	else {
		if(autoAdjust == true){
			if (localStorage.getItem("autoCapture") == "true"){
				document.getElementById("toggleunlocktrack").classList.remove("enabled")
				localStorage.setItem("autoCapture", "false");
			}
		}
		else{
			autoAdjust = true
		}
	}

	if (localStorage.getItem("rerollToggle") == null) {
		console.log("Defaulting reroll toggle to true...");
		localStorage.setItem("rerollToggle", "true");
	}

	//Initialize lag detection
	if (localStorage.getItem("lagDetect") == null) {
		console.log("Defaulting lag detect to true...");
		localStorage.setItem("lagDetect", "true");
	}

	//Initialize button double press detection
	if (localStorage.getItem("multiButtonPressDetect") == null) {
		console.log("Defaulting multi button press detect to true...");
		localStorage.setItem("multiButtonPressDetect", "true");
	}

	console.log("Radio buttons initialized.\n ");

	// Initializing the rest of the LocalStorage
	console.log("Initializing LocalStorage...");
	for (let i = 0; i < keys.length; i++)
		if (!(localStorage.getItem(keys[i]))) // If doesn't exist, add it
			localStorage.setItem(keys[i], JSON.stringify(lsdb[keys[i]]));
	console.log("LocalStorage initialized.\n ");

	// Initialize loot display as flexy
	let lootdisplay = Array.from(document.getElementsByClassName('loot_display') as HTMLCollectionOf<HTMLElement>)
	for (let i = 0; i < lootdisplay.length; i++) {
		lootdisplay[i].style.display = 'flex'
	}

	// Initialize Hybrid precision
	if (localStorage.getItem("hybridPrecision") == null) {
		console.log("Defaulting hybridPrecision to 0.3...");
		localStorage.setItem("hybridPrecision", "0.3");
	}

	// Initialize No Hover rectangle
	if (localStorage.getItem("noMenu") == null){
		console.log("Defaulting no menu box to true")
		localStorage.setItem("noMenu","false")
	}
	else if(localStorage.getItem("noMenu") == "true"){
		console.log("Enabling no menu box")
		noMenuCheck()
	}

	// Initialize Rollback
	if (localStorage.getItem("Rollback") == null){
		console.log("Creating rollback")
		localStorage.setItem("Rollback",JSON.stringify([]))
	}

	// Initialize primary key for rollbacks
	if (localStorage.getItem("PrimaryKeyRollback") == null){
		console.log("Creating rollback primary key")
		localStorage.setItem("PrimaryKeyRollback", "1")
	}

	// Initialize rollback display limit
	if (localStorage.getItem("RollbackDisplayLimit") == null){
		console.log("Creating rollback display limit")
		localStorage.setItem("RollbackDisplayLimit", "25")
	}

	// Set up image libraries
	await arraySetup()

	//listOfItemsLegacyArray = []
	//for(let i = 0; i < listOfItemsLegacy.length; i++){
	//	let temp = [listOfItemsLegacy[i].name, listOfItemsLegacy[i].base64, 0.0];
	//	listOfItemsLegacyArray.push(temp);
	//}

	//Set display
	lootDisplay()
 
	//Set up settings
	settingsInit()

	//Set up rollback window
	rollbackInit()

	alt1.overLayClearGroup("overlays");
	alt1.overLaySetGroup("overlays");
	alt1.overLayTextEx("OpenLogger ready!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
	console.log("Initialization complete");
	buttonDisabler()
}


export async function changeClueTierSpan(id: string, event: Event) {
	// Set the clue_tier span for the checked box
	buttonDisabler()
	alt1.overLayClearGroup("overlays");
	alt1.overLaySetGroup("overlays");
	alt1.overLayTextEx("Loading " + (id[0] + id.slice(1).toLowerCase()) + " clues...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);

	console.log("Setting button to " + (id[0].toUpperCase() + id.slice(1).toLowerCase()) + "...");
	document.getElementById('clue_tier').textContent = (id[0].toUpperCase() + id.slice(1).toLowerCase());
	(document.getElementById(id) as HTMLInputElement).checked = true
	localStorage.setItem("Checked button", id);

	let tierSpans = document.getElementsByClassName("current_tier_button");
	for (let i = 0; i < tierSpans.length; i++) {
		tierSpans[i].textContent = currentTier()[0]
	}

	// Clear reward slots and value
	document.getElementById("rewards_value").textContent = "0"
	for (let i = 0; i < 9; i++) {
		document.getElementById(rewardSlots[i]).textContent = "";
	}

	// Set up rollback window
	await rollbackClear()
	rollbackInit()

	// Set up arrays
	await arraySetup()

	//Set display
	lootDisplay()


	alt1.overLayClearGroup("overlays");
	alt1.overLaySetGroup("overlays");
	alt1.overLayTextEx((id[0].toUpperCase() + id.slice(1).toLowerCase()) + " tier rewards & images loaded!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
	buttonDisabler()
	lastReroll = [0, 0]
}


export async function cleardb(choice: any) {
	let keys = Object.keys(localStorage)
	let current = currentTier()

	if (choice == 1) { // Nuclear reset all
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Resetting OpenLogger...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}

		localStorage.clear();
		document.getElementById("toggleunlocktrack").classList.remove("enabled");
		
		//await init();

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("OpenLogger successfully reset! Restarting...", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		await new Promise(resolve => setTimeout(resolve, 750));
		location.reload()
	}
	else if (choice == 2) { // Full item db clear
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Clearing all items from reward database...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		autoAdjust = false

		localStorage.setItem(current[1], "0");
		localStorage.setItem(current[2], "0");
		for (let i = 0; i < keys.length; i++) {
			if (ignorelist.includes(keys[i])) {
				continue;
			}
			localStorage.removeItem(keys[i]);
		}

		let clearlist = ["EValue", "ECount", "MValue", "MCount", "HValue", "HCount", "ElValue", "ElCount", "MaValue", "MaCount"];
		for (let i = 0; i < clearlist.length; i++) {
			localStorage.removeItem(clearlist[i]);
		}

		await init();
		
		localStorage.setItem("Rollback","[]")

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("All items cleared successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	else if (choice == 3){ // Reset settings
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Reseting settings to default...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		autoAdjust = false

		// Yay learning for(const item of array) :))))
		var temp = ignorelist.slice()
		for(const item of temp){
			if(!(["EValue", "ECount", "MValue", "MCount", "HValue", "HCount", "ElValue", "ElCount", "MaValue", "MaCount", "autoCapture", "PrimaryKeyRollback", "Rollback"].includes(item))){
				localStorage.removeItem(item)
			}
		}
		await init()

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Settings reset successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	else if (choice == 4) { // Current tier clear
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Clearing " + (currentTier()[0][0].toUpperCase() + (currentTier()[0].slice(1)).toLowerCase()) + " reward database...",
				a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}

		localStorage.setItem(current[1], "0");
		localStorage.setItem(current[2], "0");
		for (let i = 0; i < keys.length; i++) {
			if (ignorelist.includes(keys[i])) {
				continue;
			}
			let temp = JSON.parse(localStorage.getItem(keys[i]));
			temp.quantity[current[0]] = (0).toString();
			localStorage.setItem(keys[i], JSON.stringify(temp));
		}

		let lsRollback = JSON.parse(localStorage.getItem("Rollback"))
		for(let i = lsRollback.length - 1; i >= 0; i--){
			if(lsRollback[i][3][0] == currentTier()[0]){
				let temp = lsRollback[i]
				lsRollback.splice(i, 1)
				localStorage.setItem("Rollback",JSON.stringify(lsRollback))
			}
		}

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx((currentTier()[0][0].toUpperCase() + (currentTier()[0].slice(1)).toLowerCase()) + " cleared successfully!",
				a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	
	let ele = document.getElementById("rollback_body")
	let container = document.createElement("div")
	container.textContent = "There's nothing here. Start scanning!"
	container.setAttribute('style','font-size: 20px; text-align: center; margin: auto; padding: auto;')
	ele.append(container)

	await rollbackClear()
	rollbackInit()

	document.getElementById("number_of_clues").textContent = "0";
	document.getElementById("value_of_clues").textContent = "0";
	document.getElementById("average_of_clues").textContent = "0";
	let divs = document.getElementsByClassName("loot_display");
	for (let i = 0; i < divs.length; i++) {
		divs[i].textContent = "";
	}
	for (let i = 0; i < 9; i++) {
		document.getElementById(rewardSlots[i]).textContent = "";
	}
	document.getElementById("rewards_value").textContent = "0";

	lastItems = [];
	lastQuants = [];
	lastTier;
	lastValue = 0;
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
	rewardValueLegacy: require("./images/RewardValueLegacy.data.png"),
	rerollWindow: require("./images/rerollWindow.data.png")
});

//listen for pasted (ctrl-v) images, usually used in the browser version of an app
//a1lib.PasteInput.listen(img => {
//	findtrailComplete(img);
//}, (err, errid) => {

//});

a1lib.on("alt1pressed", alt1pressedcapture)

function alt1pressedcapture() {
	if(toggle == true){
		if (document.getElementById("docapturebutton").getAttribute("title") === ("Disabled while scanning. Please wait...")) {
			return;
		}
		else if (document.getElementById("docapturebutton").getAttribute("title") === ("Disable autocapture to use this button")) {
			return;
		}
		else {
			capture(false);
		}
	}

}

//You can reach exports on window.TEST because of
//config.makeUmd("testpackage", "TEST"); in webpack.config.ts
export async function capture(autobool: boolean) {
	if (!window.alt1) {
		return;
	}
	if (!alt1.permissionPixel) {
		return;
	}

	if (localStorage.getItem("multiButtonPressDetect") === "true") {
		if (!autobool) {
			document.getElementById("docapturebutton").setAttribute("onclick", "");
			document.getElementById("docapturebutton").setAttribute("title", "Disabled while scanning. Please wait...");
			document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
			await new Promise(resolve => setTimeout(resolve, 200));
		}
	}

	var img = a1lib.captureHoldFullRs();
	const promises = [];
	promises.push(await findtrailComplete(img, autobool));
	await Promise.all(promises);
	console.log("finished checking")

	if (localStorage.getItem("multiButtonPressDetect") === "true") {
		if (!autobool) {
			await new Promise(resolve => setTimeout(function () {
				document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)")
				document.getElementById("docapturebutton").setAttribute("title", "")
				document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration")
			}, 400));
		}
	}
}


async function findtrailComplete(img: ImgRef, autobool: boolean) {
	let noWindow = false;
	let reroll = false;
	try {
		try {
			var loc = img.findSubimage(await imgs.trailCompleteLegacy);
			let testvalue = 0 + loc[0].x; // Tests and breaks
			console.log("legacy window");
			legacy = true;
		} catch (e) {
			try {
				try {
					try {
						//TODO: add legacy support for reroll window checking
						var loc = img.findSubimage(await imgs.rerollWindow/*Legacy*/);
						let testvalue = 0 + loc[0].x; // Tests and breaks
						console.log("reroll window");
						reroll = false;
					} catch (e) {
						var loc = img.findSubimage(await imgs.rerollWindow);
						let testvalue = 0 + loc[0].x; // Tests and breaks
						console.log("reroll window");
						reroll = false;
					}
				} catch (e) {
					var loc = img.findSubimage(await imgs.trailComplete);
					let testvalue = 0 + loc[0].x; // Tests and breaks
					console.log("Non-legacy window");
					legacy = false;
				}
			} catch (e) {
				//console.log("noWindow")
				noWindow = true;
			}
		}
		if (reroll) {
			return;
		}
		if (noWindow) {
			return;
		}

		let crops = new Array<ImageData>(9);
		let topCrops = new Array<ImageData>(9);

		// Tweak these two values below if jagex adjusts the pixel placement of the items
		// Values to tweak in case jagex borks the item placement on the screen
		// x1, +1 = right, -1 = left
		// y1, +1 = up, -1 = down
		// Adjust top crops as well, for the x1 and y1 values for it
		if (!legacy) {
			var x1 = loc[0].x - 1;
			var y1 = loc[0].y + 39;
		}
		else {
			var x1 = loc[0].x - 112;
			var y1 = loc[0].y + 39;
		}

		for (let i = 0; i < crops.length; i++) {
			crops[i] = img.toData(x1, y1, 32, 32);
			topCrops[i] = img.toData(x1, loc[0].y + 41, 32, 8);
			x1 += 40;
		}

		// Give me the total value!
		// If this breaks, value is obfuscated. Second way to scan it for validity.
		let value = 0;
		try {
			let rewardreader = new ClueRewardReader();
			rewardreader.pos = ModalUIReader.find()[0];
			value = rewardreader.read(img).value;
			let valueStr = value.toString()
			var valueList = [];

			for(let i = valueStr.length - 1; i > 0; i--){
				valueList.push(valueStr)
				valueStr = valueStr.slice(0,-1)
			}

			let lastValueStr = lastValue.toString()
			var lastValueList = []
			for(let i = lastValueStr.length - 1; i > 0; i--){
				lastValueList.push(lastValueStr)
				lastValueStr = lastValueStr.slice(0,-1)
			}
			
		} catch (e) {
			return;
		}
		///console.log(value, lastValue, valueList, lastValueList)
		///console.log("Is",value,"equal to",lastValue,"?")
		///console.log("Is",lastValue,"located in",valueList,"?")
		///console.log("Is",value,"located in",lastValueList,"?")
		if (autobool == true) {
			if (lastValue == 0) {
				// Pass
				console.log("value is zero");
			}
			else if (value == lastValue){
				return
			}
			else if (/*valueList.includes(lastValue.toString()) ||*/ lastValueList.includes(value.toString())) {
				return;
			}
		}
		//TODO: give the rectangle borders its own group name "rect"
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("rect");
		if (!legacy) {
			alt1.overLayRect(a1lib.mixColor(255, 144, 0), loc[0].x - 27, loc[0].y - 13, await imgs.trailComplete.width + 278, await imgs.trailComplete.height + 213, 60000, 2);
		}
		else {
			alt1.overLayRect(a1lib.mixColor(255, 144, 0), loc[0].x - 138, loc[0].y - 13, await imgs.trailCompleteLegacy.width + 278, await imgs.trailCompleteLegacy.height + 213, 60000, 2);
		}

		// Check if this is a reroll
		let rerollVal;
		if (!legacy) {
			rerollVal = img.toData(loc[0].x + 231, loc[0].y + 175, 8, 9);
			// alt1.overLayRect(a1lib.mixColor(2,255,232), loc[0].x + 231, loc[0].y + 175, 8, 9, 2000, 1);
		}
		else {
			rerollVal = img.toData(loc[0].x + 231, loc[0].y + 175, 8, 9);
			// alt1.overLayRect(a1lib.mixColor(0,255,0), loc[0].x - 400, loc[0].y - 400, 8, 9, 2000, 2);
		}

		let promises = []
		if (localStorage.getItem("rerollToggle") == "true") {
			promises = [];
			promises.push(await rerollCheck(rerollVal, false));
			await Promise.all(promises);
		}
		else {
			console.log("Reroll toggle is false");
		}

		let prevValue = lastValue;
		lastValue = value;
		if (!lagDetected) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("lag");
			alt1.overLaySetGroup("lag");
			alt1.overLayTextEx("Capturing rewards...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
		}
		var itemResults = [];
		promises = [];
		if (!legacy) {
			var x1 = loc[0].x - 1;
			var y1 = loc[0].y + 39;
		}
		else {
			var x1 = loc[0].x - 112;
			var y1 = loc[0].y + 39;
		}
		let notBlank = false;
		for (let i = 0; i < 9; i++) {
			if (window.alt1) {
				alt1.overLayClearGroup("icon");
				alt1.overLaySetGroup("icon");
			}
			if (displaybox) {
				// Keep an eye on this in case it incorrectly gives numbers...
				if (window.alt1) {
					alt1.overLayRect(a1lib.mixColor(255, 144, 0), x1, loc[0].y + 39, 32, 32, 2000, 1);
					alt1.overLayText((i + 1).toString(), a1lib.mixColor(255, 144, 0, 255), 18, x1 + 5, loc[0].y + 40, 2000)
				}
			}
			x1 += 40
			promises.push(itemResults.push(await compareItems(crops[i])));
			if (localStorage.getItem("lagDetect") == "true") {
				if (itemResults[i] == "Blank") {
					notBlank = true;
				}
				else if (itemResults[i] !== "Blank" && notBlank) {
					//Do a thing. This detects whether there was a break or not.
					if (window.alt1) {
						alt1.overLayClearGroup("overlays");
						alt1.overLayClearGroup("lag");
						alt1.overLaySetGroup("lag");
						alt1.overLayTextEx("Lag detected, rescanning...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 1500, "", true, true);
					}
					lagDetected = true;
					lastValue = 0;
					capture(autobool);
					return;
				}
			}
		}
		if (localStorage.getItem("lagDetect") == "true") {
			for (let i = 0; i < itemResults.length; i++) {
				if (itemResults[itemResults.length - 1] !== "Blank") {
					break;
				}
				else if (itemResults[i] !== "Blank") {
					continue;
				}
				else {
					console.log(itemResults[i])

					let newImg = a1lib.captureHoldFullRs();
					let x = 0;
					if (!legacy) {
						console.log("is not legacy")
						var loc2 = newImg.findSubimage(await imgs.trailComplete);
						x = loc2[0].x + (40 * (i));
					}
					else {
						var loc2 = newImg.findSubimage(await imgs.trailCompleteLegacy);
						x = loc[0].x - 112 + (40 * (i));
					}

					if (window.alt1) {
						alt1.overLayClearGroup("overlays");
						alt1.overLaySetGroup("overlays");
						alt1.overLayTextEx("Checking last item for lag...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 170, 1000, "", true, true);
						alt1.overLayClearGroup("icon");
						alt1.overLaySetGroup("icon");
						alt1.overLayRect(a1lib.mixColor(125, 194, 33), x - 1, loc2[0].y + 39, 32, 32, 2000, 1);
					}

					let lastcrop = newImg.toData(x - 1, loc2[0].y + 39, 32, 32);
					let lastresult;
					let promises2 = [];
					promises2.push(lastresult = await compareItems(lastcrop));
					await Promise.all(promises2);
					console.log(itemResults, i);
					console.log("Comparing", itemResults[i], "to", lastresult);
					if (lastresult === itemResults[i]) {
						break;
					}
					else {
						if (window.alt1) {
							alt1.overLayClearGroup("overlays");
							alt1.overLayClearGroup("lag");
							alt1.overLaySetGroup("lag");
							alt1.overLayTextEx("Lag detected, rescanning...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
						}
						lagDetected = true;
						lastValue = 0;
						capture(autobool);
						return;
					}
				}
			}
		}
		await Promise.all(promises);

		//Maybe comment this out later idk
		let equalArrays = true;
		if (autobool) {
			if (lastItems.length == 0) {
				// Pass
			}
			else {
				for (let i = 0; i < itemResults.length; i++) {
					if (itemResults[i] !== lastItems[i])
						equalArrays = false;
				}
				if (prevValue == value && !equalArrays) {
					if (window.alt1) {
						alt1.overLayClearGroup("overlays");
						alt1.overLaySetGroup("overlays");
						alt1.overLayTextEx("                 Casket misread.\nPause Autocapture (if on) and restart\n  plugin or rollback, and try again.",
							a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
					}
					lastValue = prevValue;
					return;
				}
			}
		}

		// Tweaks for Pixelmatch on TwoMatch or All Images. Don't rely on this...
		// It's a hardcode. I hate it.
		for(let i = 0; i > itemResults.length; i++){
			if(currentTier[0] == "medium" && itemResults[i] == "Huge plated rune salvage"){
				itemResults[i] = "Huge plated adamant salvage"
			}
		}


		// Give me the quantity of the items!
		var quantResults = [];
		promises = [];
		for (let i = 0; i < 9; i++) {
			if (itemResults[i] == "Blank") {
				break;
			}
			promises.push(quantResults.push(await readQuantities(topCrops[i])));
		}
		await Promise.all(promises);
		console.log(quantResults);

		// Send it to the LS!
		promises = [];
		let success = true;
		promises.push(success = await submitToLS(itemResults, quantResults, value));
		await Promise.all(promises);
		if (!success) {
			var notSuccess = 1 / 0;
		}

		// Record data for last casket
		lastItems = itemResults.slice();
		lastQuants = quantResults.slice();
		lastTier = currentTier();

		addRollbackToLs(lastValue, lastItems, lastQuants, lastTier)
		
		// Put the items and quantites on the display!
		document.getElementById("rewards_value").textContent = value.toLocaleString("en-US");
		for (let i = 0; i < 9; i++) {
			document.getElementById(rewardSlots[i]).textContent = "";
		}

		for (let i = 0; i < quantResults.length; i++) {
			// Displaying in Rewards Capture
			let nodevar = document.createElement("itembox");
			let imgvar = document.createElement("img");
			let quantvar = document.createElement("span");
			nodevar.setAttribute('style', 'position:relative; margin: auto; padding:auto 42px auto 2px; width:37px; height:37px; display:flex; align-items:center; text-align:center;');
			nodevar.setAttribute('title', quantResults[i] + " x " + itemResults[i]);
			imgvar.src = encodeURI("./images/items/" + itemResults[i] + ".png");
			imgvar.setAttribute('style', 'margin:auto;');
			imgvar.ondragstart = function() { return false; };
			quantvar.textContent = quantResults[i];
			if (!quantResults[i].includes("k")) {
				quantvar.setAttribute('style', 'position:absolute; left:0; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); color:rgb(255,255,0); text-shadow:1px 1px #000000;');
			}
			else {
				quantvar.setAttribute('style', 'position:absolute; left:0; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); color:rgb(255,255,255); text-shadow:1px 1px #000000;');
			}
			nodevar.append(quantvar);
			nodevar.append(imgvar);
			document.getElementById(rewardSlots[i]).appendChild(nodevar);
		}

		//Show it on the screen!
		lootDisplay();


		//console.log("Value at end of script is",lastValue)
		//console.log(lastItems, lastQuants, lastTier, lastValue)

		//Display the victory screen!!!
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("rect");
			alt1.overLayClearGroup("lag");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx((currentTier()[0][0].toUpperCase() + (currentTier()[0].slice(1)).toLowerCase()) + " rewards captured successfully!",
				a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
			if (!legacy) {
				alt1.overLayRect(a1lib.mixColor(0, 255, 0), loc[0].x - 27, loc[0].y - 13, await imgs.trailComplete.width + 278, await imgs.trailComplete.height + 213, 1000, 2);
			}
			else {
				alt1.overLayRect(a1lib.mixColor(0, 255, 0), loc[0].x - 138, loc[0].y - 13, await imgs.trailCompleteLegacy.width + 278, await imgs.trailCompleteLegacy.height + 213, 1000, 2);
			}
		}
		lagDetected = false;
	} catch (e) {
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("lag");
			alt1.overLayClearGroup("rect");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("        A crash occured.\n\n     Remove any obstructions, \n check tier, open a reward casket, \nreload plugin or clear database and try again",
				a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
		}
		throw e;
	} finally {

	}
}


async function compareItems(item: ImageData) {
	//TODO: Try to get Legacy to work better
	//Legacy works, but I don't have a lot of testing mateirals

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

	if (!legacy) {
		if (localStorage.getItem("ItemList") == "all") {
			var matches = listOfItemsAllArray.slice();
			var imgset = listOfItemsAll;
		}
		else if (localStorage.getItem("ItemList") == "twoplus") {
			var matches = listOfItemsFullArray.slice();
			var imgset = listOfItemsFull;
		}
		else if (localStorage.getItem("ItemList") == "orglist") {
			var matches = listOfItemsReorgArray.slice();
			var imgset = listOfItemsReorg;
		}
		else if (localStorage.getItem("ItemList") == "orgminus") {
			var matches = listOfItemsReorgTwoArray.slice();
			var imgset = listOfItemsReorgTwo;
		}

	}
	else { // Legacy kinda janky. Need to figure it out more
		if (localStorage.getItem("ItemList") == "all") {
			var matches = listOfItemsLegacyAllArray.slice();
			var imgset = listOfItemsLegacyAll
		}
		else if (localStorage.getItem("ItemList") == "twoplus") {
			var matches = listOfItemsLegacyFullArray.slice();
			var imgset = listOfItemsLegacyFull
		}
		else if (localStorage.getItem("ItemList") == "orglist") {
			var matches = listOfItemsLegacyReorgArray.slice();
			var imgset = listOfItemsLegacyReorg
		}
		else if (localStorage.getItem("ItemList") == "orgminus") {
			var matches = listOfItemsLegacyReorgTwoArray.slice();
			var imgset = listOfItemsLegacyReorgTwo
		}
	}

	//Check if the item is blank first
	var imgdata = await compareImages(item, matches[0][1], { output: {}, ignore: "less" });
	matches[0][2] = imgdata.rawMisMatchPercentage;
	if (matches[0][2] == 0.00) {
		return "Blank";
	}
	matches.shift() // Remove blank from the list

	if (localStorage.getItem("Algorithm") == "resemblejs") {
		var found = matches[0];
		const promises = [];

		// Webworkers code. Doesn't work yet
		// var myWorker = new Worker("resembleJSCompare.ts", { type: "module" })
		// for (let i = 0; i < matches.length; i++) {
		// 	console.log("At item number:",i)
		// 	if(window.Worker){
		// 		promises.push(new Promise(resolve => {
		// 			myWorker.postMessage([item, matches[i][1]])
		// 			myWorker.onmessage = function(e) {
		// 				console.log("message received from worker:", e[0])
		// 				matches[i][2] = e[0]
		// 				resolve(e[0]);
		// 			}
		// 		}))
		// 	}
		// }
		// await Promise.all(promises);

		// Original copy in case shit hits the fan when figuring out WebWorkers
		for (let i = 0; i < matches.length; i++) {
			promises.push(await compareImages(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
				matches[i][2] = data.rawMisMatchPercentage;
			}));
			if (found[2] > matches[i][2]) {
				found = matches[i]
			}	
		}
		await Promise.all(promises);
	}

	else if (localStorage.getItem("Algorithm") == "pixelmatch") {
		/* List of items that do not identify in PixelMatch
			- Huge Plated Adamant Salvage identifies as Huge Plated Rune Salvage when using TwoPlus or All
		*/

		var found = matches[0];
		const promises = [];
		for (let i = 0; i < matches.length; i++) {
			promises.push(matches[i][2] = pixelmatch(item.data, matches[i][3].data, null, item.width, item.height, {includeAA: true, threshold: 0.1 }));
			if (found[2] > matches[i][2]) {
				found = matches[i];
			}
		}
		await Promise.all(promises);
	}

	else if (localStorage.getItem("Algorithm") == "hybrid") {

		// First we check with Pixelmatch and get the comparison of everything to the item
		let promises = [];
		let total = 0;
		for (let i = 0; i < matches.length; i++) {
			promises.push(matches[i][2] = pixelmatch(item.data, matches[i][3].data, null, item.width, item.height, {includeAA: true, threshold: 0.1 }));
			total += matches[i][2]
		}

		// Then we get the average so we can remove half of the items that don't match
		let average = total / matches.length
		let precision = parseFloat(localStorage.getItem("hybridPrecision")) //1 does nothing
		console.log(parseFloat(localStorage.getItem("hybridPrecision")))
		await Promise.all(promises);
		
		for(let i = matches.length-1; i > 0; i--){
			if(matches[i][2] > (average * precision)){
				matches.splice(i,1)
			}
		}
		
		//Now we find the correct item with ResembleJS!
		promises = []
		var found = matches[0];
		for (let i = 0; i < matches.length; i++) {
			promises.push(await compareImages(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
				matches[i][2] = data.rawMisMatchPercentage;
			}));
			if (found[2] > matches[i][2]) {
				found = matches[i]
			}	
		}
		await Promise.all(promises);
	}
	console.log(found[0]);
	return found[0];
}


async function readQuantities(item: ImageData) {
	// Instead oif reading top to bottom individulally, 
	// Read from left to right Read left to right with all columns together
	// And since the height is always the same I dont have ot worry about changing
	// the value of the width of the number.

	// Maybe consider this for optimizations :^?
	let itemCan = document.createElement("canvas");
	let itemCon = itemCan.getContext('2d');
	itemCan.width = item.width;
	itemCan.height = item.height;
	itemCon.putImageData(item, 0, 0);
	var itemImg = new Image();
	itemImg.src = itemCan.toDataURL("image/png");
	itemCon.drawImage(itemImg, 0, 0)
	let pixels = itemCon.getImageData(0, 0, item.width, item.height);
	//console.log(pixels)
	let pixarr = [];
	let pixeldata = 0;
	for (let i = 0; i < 8; i++) {
		let arr2 = [];
		for (let j = 0; j < 32; j++) {
			let vals = { r: pixels.data[pixeldata], g: pixels.data[pixeldata + 1], b: pixels.data[pixeldata + 2], a: pixels.data[pixeldata + 3] };
			pixeldata += 4;
			arr2.push(vals);
		}
		pixarr.push(arr2);
	}

	let pixelCount = 0;
	let streak = 0;
	let longestStreak = 0;
	let yellowInCol = false;
	let noYellowStreak = 0;
	let numbers = "";
	//console.log(pixarr.length, pixarr[0].length)
	for (let i = 0; i < pixarr[0].length; i++) {
		if (noYellowStreak == 3) {
			break;
		}

		for (let j = 0; j < pixarr.length; j++) {
			if (pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 	 // Yellow, Every screen has this
				|| pixarr[j][i].r == 254 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 	 // Very slightly darker yellow, a screenie had this...
				|| pixarr[j][i].r == 253 && pixarr[j][i].g == 253 && pixarr[j][i].b == 0 	 // Slightly darker yellow, for safety
				|| pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255) { // White, elites and masters only
				pixelCount++;
				streak++;
				noYellowStreak = 0;
				yellowInCol = true;
				if (streak > longestStreak) {
					longestStreak = streak;
				}
			}
			else {
				streak = 0;
			}
		}
		if (pixelCount == 0) {
			noYellowStreak++;
		}
		else if (yellowInCol == false) {
			if (pixelCount == 11) {
				if (longestStreak == 3) {
					numbers += "7";
				}
				else { // 9
					numbers += "1";
				}
			}
			else if (pixelCount == 13) {
				if (longestStreak == 3) {
					numbers += "3";
				}
				else {//if 6
					numbers += "4";
				}
			}
			else if (pixelCount == 14) {
				numbers += "0";
			}
			else if (pixelCount == 15) {
				if (longestStreak == 3) {
					numbers += "2";
				}
				else if (longestStreak == 4) {
					numbers += "5";
				}
				else if (longestStreak == 7) {
					numbers += "9";
				}
				else { //if 8
					numbers += "k";
					pixelCount = 0;
					break;
				}
			}

			else if (pixelCount == 18) {
				numbers += "6";
			}
			else { // if pixelCount == 19
				numbers += "8";
			}

			longestStreak = 0;
			pixelCount = 0;
			noYellowStreak++;
		}
		yellowInCol = false;
	}
	if (pixelCount > 5) {
		numbers += "0";
	}
	if (numbers != "") {
		return numbers;
	}
	else {
		return "1";
	}
}


async function submitToLS(item: any[], quant: any[], value: any) {
	let current = currentTier();

	//Add items to database
	console.log("Adding to database...");
	for (let i = 0; i < quant.length; i++) {
		// If you get null or undefined here, check if one of your rewards doesn't exist in LocalStorage or LocalStorageInit
		// Or maybe the name might be incorrectly written in, idk
		//console.log("checking if in array", item[i]);
		if (JSON.parse(localStorage.getItem(item[i])).tier.includes(current[0])) {
			let temp = JSON.parse(localStorage.getItem(item[i]));
			let tempQuant = quant[i].slice();
			if (quant[i].includes('k')) {
				tempQuant = tempQuant.slice(0, -1);
				tempQuant += "000";
			}
			temp.quantity[current[0]] = parseInt(temp.quantity[current[0]]) + parseInt(tempQuant);
			localStorage.setItem(item[i], JSON.stringify(temp));
		}
		else {
			return false;
		}
	}

	// Increase value and count
	localStorage.setItem(current[1], JSON.stringify((JSON.parse(localStorage.getItem(current[1])) + value)));
	localStorage.setItem(current[2], JSON.stringify(JSON.parse(localStorage.getItem(current[2])) + 1));

	return true;
}


function lootDisplay() {
	let current = currentTier();

	//Set Number of clues and Current and Average values
	document.getElementById("number_of_clues").textContent = JSON.parse(localStorage.getItem(current[2])).toLocaleString("en-US");
	document.getElementById("value_of_clues").textContent = JSON.parse(localStorage.getItem(current[1])).toLocaleString("en-US");
	if (parseInt(JSON.parse(localStorage.getItem(current[2]))) != 0) {
		document.getElementById("average_of_clues").textContent = Math.round(parseInt(JSON.parse(localStorage.getItem(current[1]))) / parseInt(JSON.parse(localStorage.getItem(current[2])))).toLocaleString("en-US");
	}
	else {
		document.getElementById("average_of_clues").textContent = "0";
	}

	//Set the icons in the tabs
	tabDisplay(current[0]);
}


function tabDisplay(current: string) {
	let keys = Object.keys(localStorage);
	let divs = document.getElementsByClassName("loot_display");
	for (let i = 0; i < divs.length; i++) {
		divs[i].textContent = "";
	}
	for (let i = 0; i < keys.length; i++) {
		// console.log(keys[i]) Check this in case of a break
		if (ignorelist.includes(keys[i]) || JSON.parse(localStorage.getItem(keys[i])).quantity[current] == 0) {
			continue;
		}

		let ele = document.getElementById(JSON.parse(localStorage.getItem(keys[i])).tab + "_loot");
		let nodevar = document.createElement("itembox");
		let imgvar = document.createElement("img");
		let quantvar = document.createElement("span");

		nodevar.setAttribute('style', 'position:relative; margin: 3px 7px 0px 1px; padding:auto 30px auto auto; width:37px; height:37px; display:flex; align-items:center; text-align:center; order: ' + parseInt(JSON.parse(localStorage.getItem(keys[i])).order) + ';');
		nodevar.setAttribute('title', JSON.parse(localStorage.getItem(keys[i])).quantity[current] + " x " + keys[i])
		imgvar.src = encodeURI("./images/items/" + keys[i] + ".png");
		imgvar.setAttribute('style', 'margin:0 auto;');
		imgvar.ondragstart = function() { return false; };
		
		if (parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) > 9999999) {
			quantvar.setAttribute('style', 'position:absolute; left:0px; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(0,255,128); text-shadow:1px 1px #000000;');
			quantvar.textContent = Math.trunc(parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) / 1000000).toString() + "M";
		}
		else if (parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) > 99999) {
			quantvar.setAttribute('style', 'position:absolute; left:0px; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,255); text-shadow:1px 1px #000000;');
			quantvar.textContent = Math.trunc(parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) / 1000).toString() + "k";
		}
		else {
			quantvar.setAttribute('style', 'position:absolute; left:0px; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); text-shadow:1px 1px #000000;');
			quantvar.textContent = Math.trunc(JSON.parse(localStorage.getItem(keys[i])).quantity[current]) + "";
		}

		nodevar.append(quantvar);
		nodevar.append(imgvar);
		ele.append(nodevar);
	}
}


function currentTier() {
	let currButton = "";
	for (let i = 0; i < tierlist.length; i++) {
		if ((document.getElementById(tierlist[i]) as HTMLInputElement).checked) {
			currButton = tierlist[i];
			if (currButton == 'easy') {
				return [currButton, "EValue", "ECount"];
			}
			else if (currButton == 'medium') {
				return [currButton, "MValue", "MCount"];
			}
			else if (currButton == 'hard') {
				return [currButton, "HValue", "HCount"];
			}
			else if (currButton == 'elite') {
				return [currButton, "ElValue", "ElCount"];
			}
			else if (currButton == 'master') {
				return [currButton, "MaValue", "MaCount"];
			}
		}
	}
}


export function exporttocsv() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Generating CSV...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}

	let csvinfo = [];
	csvinfo.push(["Item", "Easy", "Medium", "Hard", "Elite", "Master"]);
	let keys = Object.keys(lsdb);
	let currOrder = 1;
	for (let i = 0; i < keys.length; i++) {
		if (!ignorelist.includes(keys[i])) {
			continue;
		}
		let val = JSON.parse(localStorage.getItem(keys[i]));
		if (keys[i] == "ECount") {
			csvinfo.push(["Easy Total Count", val, "", "", "", ""]);
		}
		else if (keys[i] == "EValue") {
			csvinfo.push(["Easy Total Value", val, "", "", "", ""]);
		}
		else if (keys[i] == "MCount") {
			csvinfo.push(["Medium Total Count", "", val, "", "", ""]);
		}
		else if (keys[i] == "MValue") {
			csvinfo.push(["Medium Total Value", "", val, "", "", ""]);
		}
		else if (keys[i] == "HCount") {
			csvinfo.push(["Hard Total Count", "", "", val, "", ""]);
		}
		else if (keys[i] == "HValue") {
			csvinfo.push(["Hard Total Value", "", "", val, "", ""]);
		}
		else if (keys[i] == "ElCount") {
			csvinfo.push(["Elite Total Count", "", "", "", val, ""]);
		}
		else if (keys[i] == "ElValue") {
			csvinfo.push(["Elite Total Value", "", "", "", val, ""]);
		}
		else if (keys[i] == "MaCount") {
			csvinfo.push(["Master Total Count", "", "", "", "", val]);
		}
		else if (keys[i] == "MaValue") {
			csvinfo.push(["Master Total Value", "", "", "", "", val]);
		}
	}
	for (let i = 0; i < keys.length; i++) {
		if (ignorelist.includes(keys[i])) {
			continue;
		}
		for (let j = 0; j < keys.length; j++) {
			if (ignorelist.includes(keys[j])) {
				continue;
			}
			if (JSON.stringify(JSON.parse(localStorage.getItem(keys[j])).order) == currOrder.toString()) {
				let val = JSON.parse(localStorage.getItem(keys[j]));
				let one = val.quantity.easy.toString();
				let two = val.quantity.medium.toString();
				let three = val.quantity.hard.toString();
				let four = val.quantity.elite.toString();
				let five = val.quantity.master.toString();
				if (one == "0") {
					one = "";
				}
				if (two == "0") {
					two = "";
				}
				if (three == "0") {
					three = "";
				}
				if (four == "0") {
					four = "";
				}
				if (five == "0") {
					five = "";
				}
				csvinfo.push([keys[j], one, two, three, four, five]);
				currOrder++;
				break;
			}
		}
	}

	const d = new Date();
	let csvContent = "";
	csvinfo.forEach(function (i) {
		let row = i.join(",");
		csvContent += row + "\r\n";
	});
	let filename = "OpenLogger CSV " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".csv";
	var encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", filename);
	document.body.appendChild(link); // Required for FF
	link.click();
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("CSV Generated!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
}


async function addRollbackToLs(value: number, items: any, quants: any, tier: any){
	for(let i = items.length - 1; i >= 0; i--){
		if(items[i] == "Blank"){
			items.splice(i, 1)
		}
	}

	for(let i = 0; i < quants.length; i++){
		if (quants[i].includes('k')) {
			quants[i] = quants[i].slice(0, -1);
			quants[i] += "000";
		}
	}

	let previous = [items, quants, value, tier, localStorage.getItem(tier[2]), localStorage.getItem("PrimaryKeyRollback")]
	let temp = JSON.parse(localStorage.getItem("Rollback"))
	temp.push(previous)
	localStorage.setItem("Rollback", JSON.stringify(temp))
	localStorage.setItem("PrimaryKeyRollback", JSON.stringify(parseInt(localStorage.getItem("PrimaryKeyRollback")) + 1))

	await rollbackClear()
	rollbackInit()
}


async function rollbackClear(){
	let body = document.getElementById("rollback_body")
	while (body.firstChild){
		body.removeChild(body.lastChild)
	}
}


export function rollback() {
	//console.log(localStorage.getItem("Rollback"))
	if(localStorage.getItem("Rollback") == "[]"){
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Nothing to roll back from ls", a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
		}
		return;
	}

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Rolling back last reward...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}

	rollbackFunc(true);
	document.getElementById("rewards_value").textContent = "0";
	for (let i = 0; i < 9; i++)
		document.getElementById(rewardSlots[i]).textContent = "";
	lootDisplay();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Previous rewards rolled back successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
}


function rollbackFunc(valueClear: boolean) { // TODO: Edit this once you get the interface up and running... Consider sending in an index value...
	let lsRollback = JSON.parse(localStorage.getItem("Rollback"))
	let lastRoll = lsRollback[lsRollback.length - 1]
	//	Index 0 = Items
	//	Index 1 = Quantities
	//	Index 2 = Value of clue
	// 	Index 3 = Tier of clue, value and count

	//console.log("Rolling back:", lastRoll[0], lastRoll[1], lastRoll[2], lastRoll[3]);
	for (let i = 0; i < lastRoll[0].length; i++) {
		let temp = JSON.parse(localStorage.getItem(lastRoll[0][i]))
		temp.quantity[lastRoll[3][0]] = temp.quantity[lastRoll[3][0]] - lastRoll[1][i];
		localStorage.setItem(lastRoll[0][i], JSON.stringify(temp))
	}

	// Decrease value and count
	localStorage.setItem(lastRoll[3][1], JSON.stringify(JSON.parse(localStorage.getItem(lastRoll[3][1])) - lastRoll[2]));
	localStorage.setItem(lastRoll[3][2], JSON.stringify(JSON.parse(localStorage.getItem(lastRoll[3][2])) - 1));

	//console.log("Before splice:",lsRollback,"length is:",lsRollback.length)
	lsRollback.pop()
	//console.log("After splice:",lsRollback)
	localStorage.setItem("Rollback", JSON.stringify(lsRollback))
	
	if (valueClear) {
		lastValue = 0;
	}
}


function rollbackInit(){
	let lsRollback = JSON.parse(localStorage.getItem("Rollback"))
	//console.log(lsRollback)
	let title = document.getElementById("rollback_tier_caps")
	title.textContent = currentTier()[0][0].toUpperCase() + currentTier()[0].slice(1).toLowerCase()

	let quantity = document.getElementById("rollback_quantity")
	quantity.textContent = localStorage.getItem("RollbackDisplayLimit")

	if(lsRollback.length == 0){
		let ele = document.getElementById("rollback_body")
		let container = document.createElement("div")
		container.textContent = "There's nothing to roll back. Start scanning!"
		container.setAttribute('style','font-size: 20px; text-align: center; margin: auto; padding: auto;')
		ele.append(container)
	}
	else{
		var index = parseInt(localStorage.getItem(currentTier()[2]));
		var limit = 0
		for(let i = lsRollback.length - 1; i >= 0 ; i--){ //Navigating lsRollback
			if(limit <= parseInt(localStorage.getItem("RollbackDisplayLimit"))){
				let temp = lsRollback[i]
				if(temp[3][0] === currentTier()[0]){
					let ele = document.getElementById("rollback_body")
					let container = document.createElement("div")
					container.setAttribute("style", /*'background: url("styles/nis/alt1-currentskin/background.png");*/'background: url(images/items/Blank.png); margin: 10px 0px; padding: 5px 5px; display:grid; grid-template-columns: repeat(10 auto); align-items:center; border: 5px solid #f0b216; border-style: ridge;')
					container.setAttribute('id','container' + temp[5])

					let count = document.createElement("div")
					count.textContent = (temp[3][0][0].toUpperCase() + temp[3][0].slice(1).toLowerCase()) + " Clue: " + index
					count.setAttribute('style','width: auto; margin: auto 0 0 10; text-align: left; position: relative; color: #f0b216; font-family: "trajan-pro-3"; font-size: 12px; line-height: 20px; user-select: none; word-wrap: break-all; -webkit-user-select: none; grid-column: 1 / 4; grid-row: 1; text-shadow: 1px 1px 2px #000000;')
					count.setAttribute('class','rollbackCount')
					container.append(count)

					let value = document.createElement("div")
					value.textContent = "Reward Value: "+temp[2].toLocaleString("en-US")
					value.setAttribute('style','width: auto; margin: auto 0 0 10; text-align: left; position: relative; color: #f0b216; font-family: "trajan-pro-3"; font-size: 13px; line-height: 20px; user-select: none; word-wrap: break-all; -webkit-user-select: none; grid-column: 4 / span 10; grid-row: 1; text-shadow: 1px 1px 2px #000000;')
					container.append(value)

					for(let j = 0; j < 9; j++){ // Navigating temp
						//console.log(temp[0][j])]
						let nodevar = document.createElement("itembox");
						let imgvar = document.createElement("img")
						let quantvar = document.createElement("span")

						nodevar.setAttribute('style', 'position:relative; margin: auto; padding:auto; width:32px; height:32px; display:flex; align-items:center; text-align:center; grid-row: 2;'/* order: ' + parseInt(JSON.parse(localStorage.getItem(keys[i])).order) + ';'*/);
						imgvar.setAttribute('style', 'margin: auto; padding: auto;');
						imgvar.ondragstart = function() { return false; };

						try{
							imgvar.src = encodeURI("./images/items/" + temp[0][j] + ".png");
							nodevar.setAttribute('title', temp[1][j] + " x " + temp[0][j])

							//console.log("quantity is: ",parseInt(temp[1][j]))

							if (temp[1][j] > 9999999) {
								quantvar.setAttribute('style', 'position:absolute; left:0; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(0,255,128); text-shadow:1px 1px #000000;');
								quantvar.textContent = Math.trunc(temp[1][j] / 1000000).toString() + "M";
							}
							else if (temp[1][j] > 99999) {
								console.log("white test")
								quantvar.setAttribute('style', 'position:absolute; left:0; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,255); text-shadow:1px 1px #000000;');
								quantvar.textContent = Math.trunc(temp[1][j] / 1000).toString() + "k";
							}
							else {
								quantvar.setAttribute('style', 'position:absolute; left:0; top:-5px; font-family:Runescape Chat Font; font-size:16px; color:rgb(255,255,0); text-shadow:1px 1px #000000;');
								quantvar.textContent = temp[1][j] + "";
							}

						} catch (e) {
							imgvar.src = encodeURI("./images/items/Transparent.png")
						}

						if(quantvar.textContent == "undefined"){
							quantvar.textContent = ""
							nodevar.removeAttribute("title");
							imgvar.src = encodeURI("./images/items/Transparent.png")
						}

						nodevar.append(imgvar)
						nodevar.append(quantvar)
						container.append(nodevar)

					}
				
					let buttonbox = document.createElement("div")
					let button = document.createElement("div")
					buttonbox.setAttribute('style','width: 125px; display: flex; grid-row: 1 / span 2; grid-column: 10; align-items:center; position:relative')
					buttonbox.setAttribute('id','container'+temp[5]+'buttonbox')
					button.setAttribute('style','width: 100%; cursor: pointer; text-align: center; color: #000; font-family: "trajan-pro-3"; font-size: 18px; line-height: 32px; user-select: none; -webkit-user-select: none;')
					button.setAttribute('class','nisbutton')
					button.setAttribute('id','container'+temp[5]+'button')
					button.setAttribute('onClick','TEST.rollbackVeri("container'+temp[5]+'button")')
					button.textContent = "Delete"

					buttonbox.append(button)
					container.append(buttonbox)
					ele.append(container)
					index--
					limit++
				}
			}
			else{
				break;
			}
		}

		if(index == parseInt(localStorage.getItem(currentTier()[2]))){
			let ele = document.getElementById("rollback_body")
			let container = document.createElement("div")
			container.textContent = "There's nothing to roll back. Start scanning!"
			container.setAttribute('style','font-size: 20px; text-align: center; margin: auto; padding: auto;')
			ele.append(container)
		}
	}
}


export function rollbackVeri(id: any){
	let buttonbox = document.getElementById(id+"box")
	let button = document.getElementById(id)
	buttonbox.removeChild(button)

	let buttonYes = document.createElement("div")
	let buttonNo = document.createElement("div")

	buttonbox.setAttribute('style','display: grid; grid-template-columns: repeat(2, auto); width: 125px; grid-row: 1 / span 2; grid-column: 10;')

	buttonYes.setAttribute('style',' width: 97%; cursor: pointer; text-align: center; color: #000; font-family: "trajan-pro-3"; font-size: 18px; line-height: 32px; user-select: none; -webkit-user-select: none;')
	buttonYes.setAttribute('class','nisbutton')
	buttonYes.setAttribute('onclick','TEST.rollbackYes("'+id+'")')
	buttonYes.textContent = "Yes"

	buttonNo.setAttribute('style',' width: 97%; cursor: pointer; text-align: center; color: #000; font-family: "trajan-pro-3"; font-size: 18px; line-height: 32px; user-select: none; -webkit-user-select: none;')
	buttonNo.setAttribute('class','nisbuttonblue')
	buttonNo.setAttribute('onclick','TEST.rollbackNo("'+id+'")')
	buttonNo.textContent = "No"

	buttonbox.append(buttonYes, buttonNo)
	console.log("Made no and yes")
}


export function rollbackNo(id: any){
	console.log("In no")
	let buttonbox = document.getElementById(id+"box")
	while (buttonbox.firstChild){
		buttonbox.removeChild(buttonbox.lastChild)
	}
	buttonbox.setAttribute('style','width: 125px; display: flex; grid-row: 1 / span 2; grid-column: 10; align-items:center;')
	
	let button = document.createElement("div")
	button.setAttribute('style','width: 95%; cursor: pointer; margin: auto; text-align: center; color: #000; font-family: "trajan-pro-3"; font-size: 18px; line-height: 32px; user-select: none; -webkit-user-select: none;')
	button.setAttribute('class','nisbutton')
	button.setAttribute('id', id)
	button.setAttribute('onClick','TEST.rollbackVeri("'+id+'")')
	button.textContent = "Delete"

	buttonbox.append(button)
}


export function rollbackYes(id: any){
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Rolling back reward...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}

	let container = document.getElementById(id.replace('button', ''))
	container.remove()

	let pKey = id.replace('container','')
	pKey = parseInt(pKey.replace('button',''))

	console.log(pKey)
	let lsRollback = JSON.parse(localStorage.getItem("Rollback"))
	for(let i = 0; i < lsRollback.length; i++){
		if(lsRollback[i][5] == pKey){
			var temp = lsRollback[i]
			lsRollback.splice(i, 1)
			localStorage.setItem("Rollback",JSON.stringify(lsRollback))
			break;
		}
	}
	
	console.log(temp)
	for (let i = 0; i < temp[0].length; i++) {
		let item = JSON.parse(localStorage.getItem(temp[0][i]))
		item.quantity[temp[3][0]] = item.quantity[temp[3][0]] - parseInt(temp[1][i]);
		localStorage.setItem(temp[0][i], JSON.stringify(item))
	}

	// Decrease value and count
	localStorage.setItem(temp[3][1], JSON.stringify(JSON.parse(localStorage.getItem(temp[3][1])) - temp[2]));
	localStorage.setItem(temp[3][2], JSON.stringify(JSON.parse(localStorage.getItem(temp[3][2])) - 1));

	console.log("Removed",pKey,"from LS")
	if(pKey == ((parseInt(localStorage.getItem("PrimaryKeyRollback"))) - 1)){
		document.getElementById("rewards_value").textContent = "0";
		for (let i = 0; i < 9; i++)
			document.getElementById(rewardSlots[i]).textContent = "";
	}

	let rollbackCount = document.getElementsByClassName('rollbackCount')
	let index = parseInt(localStorage.getItem(currentTier()[2]))
	for(let i = 0; i < parseInt(localStorage.getItem(currentTier()[2])); i++){
		if(i >= parseInt(localStorage.getItem("RollbackDisplayLimit"))){
			break;
		}
		console.log(i);
		console.log(rollbackCount[i].textContent,"is now",(currentTier()[0][0].toUpperCase() + currentTier()[0].slice(1).toLowerCase()) + " Clue: " + index);
		rollbackCount[i].textContent = (currentTier()[0][0].toUpperCase() + currentTier()[0].slice(1).toLowerCase()) + " Clue: " + index;
		index--;
	}


	//for(let i = parseInt(localStorage.getItem(currentTier()[2])) - 1; i >= 0; i--){
	//	rollbackCount[i].textContent = (currentTier()[0][0].toUpperCase() + currentTier()[0].slice(1).toLowerCase()) + " Clue: " + index
	//	index--
	//}

	rollbackClear();
	rollbackInit();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Previous rewards rolled back successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}

	lootDisplay();
}


async function arraySetup() {
	// Set new array of current tier
	listOfItemsFull = itemsFull.any.concat(itemsFull[currentTier()[0]]);
	listOfItemsReorg = itemsReorg.any.concat(itemsReorg[currentTier()[0]]);
	listOfItemsReorgTwo = itemsReorgTwo.any.concat(itemsReorgTwo[currentTier()[0]]);
	listOfItemsLegacyFull = itemsLegacyFull.any.concat(itemsLegacyFull[currentTier()[0]]);
	listOfItemsLegacyReorg = itemsLegacyReorg.any.concat(itemsLegacyReorg[currentTier()[0]]);
	listOfItemsLegacyReorgTwo = itemsLegacyReorgTwo.any.concat(itemsLegacyReorgTwo[currentTier()[0]]);

	// Turning image collection into array
	listOfItemsFullArray = [];
	listOfItemsReorgArray = [];
	listOfItemsReorgTwoArray = [];
	listOfItemsLegacyFullArray = [];
	listOfItemsLegacyReorgArray = [];
	listOfItemsLegacyReorgTwoArray = [];

	// Setting Array items and ImageData arrays
	var promises = [];
	for (let i = 0; i < listOfItemsFull.length; i++) {
		if (i < listOfItemsFull.length) {
			listOfItemsFullArray.push([listOfItemsFull[i].name, listOfItemsFull[i].base64, 0.0]);
			if (localStorage.getItem("ItemList") == "twoplus"){
				promises.push(await _base64ToImageData(listOfItemsFullArray[i][1], 32, 32).then(data => { 
					listOfItemsFullArray[i].push(data) 
				}));
			}
		}
		if (i < listOfItemsReorg.length) {
			listOfItemsReorgArray.push([listOfItemsReorg[i].name, listOfItemsReorg[i].base64, 0.0]);
			if (localStorage.getItem("ItemList") == "orglist"){
				promises.push(await _base64ToImageData(listOfItemsReorgArray[i][1], 32, 32).then(data => { 
					listOfItemsReorgArray[i].push(data) 
				}));

			}
		}
		if (i < listOfItemsReorgTwo.length) {
			listOfItemsReorgTwoArray.push([listOfItemsReorgTwo[i].name, listOfItemsReorgTwo[i].base64, 0.0]);
			if (localStorage.getItem("ItemList") == "orgminus"){
				promises.push(await _base64ToImageData(listOfItemsReorgTwoArray[i][1], 32, 32).then(data => { 
					listOfItemsReorgTwoArray[i].push(data)
				}));
			}
		}
		if (i < listOfItemsLegacyFull.length) {
			listOfItemsLegacyFullArray.push([listOfItemsLegacyFull[i].name, listOfItemsLegacyFull[i].base64, 0.0]);
			if (localStorage.getItem("ItemList") == "twoplus"){
				promises.push(await _base64ToImageData(listOfItemsLegacyFullArray[i][1], 32, 32).then(data => { 
					listOfItemsLegacyFullArray[i].push(data)
				}));
			}
		}
		if (i < listOfItemsLegacyReorg.length) {
			listOfItemsLegacyReorgArray.push([listOfItemsLegacyReorg[i].name, listOfItemsLegacyReorg[i].base64, 0.0]);
			if (localStorage.getItem("ItemList") == "orglist"){
				promises.push(await _base64ToImageData(listOfItemsLegacyReorgArray[i][1], 32, 32).then(data => { 
					listOfItemsLegacyReorgArray[i].push(data)
				}));
			}
		}
		if (i < listOfItemsLegacyReorgTwo.length) {
			listOfItemsLegacyReorgTwoArray.push([listOfItemsLegacyReorgTwo[i].name, listOfItemsLegacyReorgTwo[i].base64, 0.0]);
			if (localStorage.getItem("ItemList") == "orgminus"){
				promises.push(await _base64ToImageData(listOfItemsLegacyReorgArray[i][1], 32, 32).then(data => { 
					listOfItemsLegacyReorgTwoArray[i].push(data)
				}));
			}
		}
	}
	await Promise.all(promises);

	listOfItemsAll = itemsFull.any.concat(itemsFull.easy).concat(itemsFull.medium).concat(itemsFull.hard).concat(itemsFull.elite).concat(itemsFull.master);
	listOfItemsLegacyAll = itemsLegacyFull.any.concat(itemsLegacyFull.easy).concat(itemsLegacyFull.medium).concat(itemsLegacyFull.hard).concat(itemsLegacyFull.elite).concat(itemsLegacyFull.master);
	listOfItemsAllArray = [];
	listOfItemsLegacyAllArray = [];
	promises = [];
	for (let i = 0; i < listOfItemsAll.length; i++) {
		listOfItemsAllArray.push([listOfItemsAll[i].name, listOfItemsAll[i].base64, 0.0]);
		listOfItemsLegacyAllArray.push([listOfItemsLegacyAll[i].name, listOfItemsLegacyAll[i].base64, 0.0]);
		if (localStorage.getItem("ItemList") == "all"){
			promises.push(await _base64ToImageData(listOfItemsAllArray[i][1], 32, 32).then(data => { 
				listOfItemsAllArray[i].push(data)
			}));
			promises.push(await _base64ToImageData(listOfItemsLegacyAllArray[i][1], 32, 32).then(data => { 
				listOfItemsLegacyAllArray[i].push(data)
			}));
		}
	}
	await Promise.all(promises);
	// console.log("DEBUG:",listOfItemsFullArray, listOfItemsReorgArray, listOfItemsReorgTwoArray, listOfItemsLegacyFullArray, listOfItemsLegacyReorgArray, listOfItemsLegacyReorgTwoArray, listOfItemsFullArray, listOfItemsLegacyFullArray, listOfItemsAllUint8ArrayArray)
}


function _base64ToImageData(buffer: string, width: any, height: any) { // https://stackoverflow.com/questions/68495924
    return new Promise(resolve => {
    var image = new Image();
    image.addEventListener('load', function (e) {
      var canvasElement = document.createElement('canvas');
      canvasElement.width = width;
      canvasElement.height = height;
      var context = canvasElement.getContext('2d');
      context.drawImage(e.target as HTMLVideoElement, 0, 0, width, height);
      resolve(context.getImageData(0, 0, width, height));
    });
    image.src = buffer;
  });
}


export function insert() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Doesn't work yet...", a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	}
}


export function settingsInit() {
	if (localStorage.getItem("Algorithm") == null) { // Algorithim init check
		console.log("Defaulting button to ResembleJS...");
		var ele = document.getElementById("resemblejs") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("Algorithm", "resemblejs");
	}
	else { // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("Algorithm") + "...");
		let temp = localStorage.getItem("Algorithm");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
	}

	if (localStorage.getItem("ItemList") == null) { // Item Referense list init check
		console.log("Defaulting list to Organized List...");
		var ele = document.getElementById("orglist") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("ItemList", "orglist");
	}
	else { // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("ItemList") + "...");
		let temp = localStorage.getItem("ItemList");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
	}

	//Change this to rerollToggle
	if (localStorage.getItem("rerollToggle") == null) { // Remove rerolls init check
		console.log("Defaulting reroll toggle to on...");
		var ele = document.getElementById("rerollon") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("rerollon", "true");
	}
	else { // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("rerollToggle") + "...");
		if (localStorage.getItem("rerollToggle") == "true") {
			var ele = document.getElementById("rerollon") as HTMLInputElement
			ele.checked = true;
		}
		else if (localStorage.getItem("rerollToggle") == "false") {
			var ele = document.getElementById("rerolloff") as HTMLInputElement
			ele.checked = true;
		}
	}

	if (localStorage.getItem("lagDetect") == null) { // Remove rerolls init check
		console.log("Defaulting reroll toggle to on...");
		var ele = document.getElementById("lagon") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("lagon", "true");
	}
	else { // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("lagDetect") + "...");
		if (localStorage.getItem("lagDetect") == "true") {
			var ele = document.getElementById("lagon") as HTMLInputElement;
			ele.checked = true;
		}
		else if (localStorage.getItem("lagDetect") == "false") {
			var ele = document.getElementById("lagoff") as HTMLInputElement;
			ele.checked = true;
		}
	}

	if (localStorage.getItem("multiButtonPressDetect") == null) { // Remove rerolls init check
		console.log("Defaulting reroll toggle to on...");
		var ele = document.getElementById("multion") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("multion", "true");
	}
	else { // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("multiButtonPressDetect") + "...");
		if (localStorage.getItem("multiButtonPressDetect") == "true") {
			var ele = document.getElementById("multion") as HTMLInputElement;
			ele.checked = true;
		}
		else if (localStorage.getItem("multiButtonPressDetect") == "false") {
			var ele = document.getElementById("multioff") as HTMLInputElement;
			ele.checked = true;
		}
	}

	if (localStorage.getItem("noMenu") == null) { // Remove rerolls init check
		console.log("Defaulting menu toggle to on...");
		var ele = document.getElementById("menuon") as HTMLInputElement;
		ele.checked = true;
		localStorage.setItem("menuon", "true");
	}
	else { // If it does, set the button and span
		console.log("Setting previously set radio button: " + localStorage.getItem("noMenu") + "...");
		if (localStorage.getItem("noMenu") == "true") {
			var ele = document.getElementById("menuon") as HTMLInputElement;
			ele.checked = true;
		}
		else if (localStorage.getItem("noMenu") == "false") {
			var ele = document.getElementById("menuoff") as HTMLInputElement;
			ele.checked = true;
		}
	}

	if (localStorage.getItem("hybridPrecision") == null) {
		console.log("Defaulting hybridPrecision to 0.3...");
		var ele = document.getElementById("hybrid_precision") as HTMLInputElement;
		ele.value = "0.3";
		localStorage.setItem("hybridPrecision", "0.3");
	}
	else{
		var ele = document.getElementById("hybrid_precision") as HTMLInputElement;
		ele.value = localStorage.getItem("hybridPrecision");
	}

	if (localStorage.getItem("RollbackDisplayLimit") == null) {
		console.log("Defaulting RollbackDisplayLimit to 25...");
		var ele = document.getElementById("rollback_display_limit") as HTMLInputElement;
		ele.value = "25";
		localStorage.setItem("RollbackDisplayLimit", "25");
	}
	else{
		var ele = document.getElementById("rollback_display_limit") as HTMLInputElement;
		ele.value = localStorage.getItem("RollbackDisplayLimit");
	}
}


export async function saveSettings(alg: string, list: string, reroll: string, lag: string, multi: string, menu: string, precision: string, limit: string) {
	buttonDisabler()
	alt1.overLayClearGroup("overlays");
	alt1.overLaySetGroup("overlays");
	alt1.overLayTextEx("Saving settings...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
	localStorage.setItem("Algorithm", alg);
	localStorage.setItem("ItemList", list);
	localStorage.setItem("rerollToggle", reroll);
	localStorage.setItem("lagDetect", lag);
	localStorage.setItem("hybridPrecision", precision)
	localStorage.setItem("RollbackDisplayLimit", limit)

	if (localStorage.getItem("multiButtonPressDetect") !== multi) {
		localStorage.setItem("multiButtonPressDetect", multi)
		console.log("Adjusting saved values")
		if (multi === "true") {
			if (localStorage.getItem("autoCapture") === "true") {
				document.getElementById("docapturebutton").setAttribute("onclick", "");
				document.getElementById("docapturebutton").setAttribute("title", "Disable autocapture to use this button");
				document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
			}
		}
		else if (multi === "false") {
			if (localStorage.getItem("autoCapture") === "true") {
				document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
				document.getElementById("docapturebutton").setAttribute("title", "");
				document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
			}
			else {
				document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
				document.getElementById("docapturebutton").setAttribute("title", "");
				document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
			}
		}
	}

	if (localStorage.getItem("noMenu") !== menu) {
		localStorage.setItem("noMenu", menu)
		noMenuCheck()
	}

	rollbackClear()
	rollbackInit()

	settingsInit()
	await arraySetup();
	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); 
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Settings saved!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
	buttonDisabler()
}


export function autoDisableCheckAuto(event: Event){
	if(document.getElementById("toggleunlocktrack").classList.contains("enabled")){
		toggleCapture(event)
	}
}


export function toggleCapture(event: Event) {
	try{
		if (document.getElementById("toggleunlocktrack").classList.contains("enabled")) {
			document.getElementById("toggleunlocktrack").classList.remove("enabled");
			localStorage.setItem("autoCapture", "false");
			if (window.alt1) {
				alt1.overLayClearGroup("overlays");
				alt1.overLaySetGroup("overlays");
				alt1.overLayTextEx("Autocapture disabled!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
			}
		}
		else {
			document.getElementById("toggleunlocktrack").classList.add("enabled");
			localStorage.setItem("autoCapture", "true");
			if (window.alt1) {
				alt1.overLayClearGroup("overlays");
				alt1.overLaySetGroup("overlays");
				alt1.overLayTextEx("Autocapture enabled!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
			}
		}
		autoCheck();
		event.stopPropagation();
	} catch (e){
		console.log("Clear Options Menu or Settings auto-disabling autocapture. In the event of bugfixing and getting this message in this function, try re-enabling this throw.")
		//throw(e)
	}
}


function autoCheck() {
	if (localStorage.getItem("autoCapture") === "true") {
		if (localStorage.getItem("multiButtonPressDetect") === "true") {
			document.getElementById("docapturebutton").setAttribute("onclick", "");
			document.getElementById("docapturebutton").setAttribute("title", "Disable autocapture to use this button");
			document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
		}
		autoCaptureInterval = window.setInterval(async function () {
			let promises = [];
			promises.push(await autoCallCapture());
			await Promise.all(promises);
		}, 1000);
	}
	else {
		if (localStorage.getItem("multiButtonPressDetect") === "true") {
			document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
			document.getElementById("docapturebutton").setAttribute("title", "");
			document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
		}
		window.clearInterval(autoCaptureInterval);
		autoCaptureInterval = null;
	}
}


function autoCallCapture() {
	capture(true);
}


function noMenuCheck(){
	if (localStorage.getItem("noMenu") === "true") {
		noMenuInterval = window.setInterval(async function () {
			alt1.overLayClearGroup("nomenu");
			alt1.overLaySetGroup("nomenu");
			var img = a1lib.captureHoldFullRs();
			var loc = img.findSubimage(await imgs.trailComplete);

			let rewardreader = new ClueRewardReader();
			rewardreader.pos = ModalUIReader.find()[0];
			let value = rewardreader.read(img).value;
			let length = value.toString().length
			let comma = Math.floor(length / 3)
			console.log("Highlighting value...")
			
			alt1.overLayRect(a1lib.mixColor(255, 50, 50), loc[0].x + 246 - (5 * length) + (1 * comma), loc[0].y + 94, 0 + (8 * length) + (4 * comma), await imgs.trailComplete.height + 6, 60000, 2);
			alt1.overLayTextEx("NO MENUS HERE", a1lib.mixColor(255, 50, 50), 10, loc[0].x + 245, loc[0].y + 118, 50000, "", true, true);
			
		}, 1000);
	}
	else {
		alt1.overLayClearGroup("nomenu");
		window.clearInterval(noMenuInterval);
		noMenuInterval = null;
	}
}


async function rerollCheck(value: ImageData, valueClear: boolean) {

	/*
	I will check for these colors:		Total values match as follows
		- 000000 (RGB: 0,0,0)				- 1 = 41
		- fab630 (RGB: 250, 182, 48)		- 2 = 31
		- fac33b (RGB: 250, 195, 59)		- 3 = 28
		- e49b20 (RGB: 228, 155, 32)		- 4 = 33
		- fabb34 (RGB: 250, 187, 52)		- 5 = 30
	
	These will determine how many rerolls exist.

	var rerollList = [[0, 0], [1, 41], [2, 31], [3, 28], [4, 33], [5, 30]]
	*/

	let valueCan = document.createElement("canvas");
	let valueCon = valueCan.getContext('2d');
	valueCan.width = value.width;
	valueCan.height = value.height;
	valueCon.putImageData(value, 0, 0);
	var valueImg = new Image();
	valueImg.src = valueCan.toDataURL("image/png");
	valueCon.drawImage(valueImg, 0, 0);
	let pixels = valueCon.getImageData(0, 0, value.width, value.height);

	let pixarr = []
	let pixeldata = 0
	for (let i = 0; i < 8; i++) {
		let arr2 = []
		for (let j = 0; j < 32; j++) {
			let vals = { r: pixels.data[pixeldata], g: pixels.data[pixeldata + 1], b: pixels.data[pixeldata + 2], a: pixels.data[pixeldata + 3] }
			pixeldata += 4;
			arr2.push(vals);
		}
		pixarr.push(arr2);
	}

	let tempReroll = [0, 0]
	for (let i = 0; i < pixarr.length; i++) {
		for (let j = 0; j < pixarr[i].length; j++) {
			if (pixarr[i][j].r == 0 && pixarr[i][j].g == 0 && pixarr[i][j].b == 0 ||
				pixarr[i][j].r == 250 && pixarr[i][j].g == 182 && pixarr[i][j].b == 48 ||
				pixarr[i][j].r == 250 && pixarr[i][j].g == 195 && pixarr[i][j].b == 59 ||
				pixarr[i][j].r == 228 && pixarr[i][j].g == 155 && pixarr[i][j].b == 32 ||
				pixarr[i][j].r == 250 && pixarr[i][j].g == 187 && pixarr[i][j].b == 52) {
				tempReroll[1] += 1;
			}
		}
	}

	if (tempReroll[1] == 0) {
		tempReroll[0] = 0;
	}
	else if (tempReroll[1] == 41) {
		tempReroll[0] = 1;
	}
	else if (tempReroll[1] == 31) {
		tempReroll[0] = 2;
	}
	else if (tempReroll[1] == 28) {
		tempReroll[0] = 3;
	}
	else if (tempReroll[1] == 33) {
		tempReroll[0] = 4;
	}
	else if (tempReroll[1] == 30) {
		tempReroll[0] = 5;
	}

	//console.log("tempReroll:", tempReroll)
	//console.log("lastReroll:", lastReroll)

	if (lastReroll[0] < tempReroll[0]) {
		lastReroll[0] = tempReroll[0];
		lastReroll[1] = tempReroll[1];
	}
	else if (lastReroll[0] > tempReroll[0]) {
		rollbackFunc(valueClear);
		lastReroll[0] = tempReroll[0];
		lastReroll[1] = tempReroll[1];
	}

}


export function toggleLootDisplay(id: string) {
	let lootdisplay = Array.from(document.getElementsByClassName('loot_display') as HTMLCollectionOf<HTMLElement>);
	let tab = document.getElementById(id) as HTMLInputElement;

	// TODO: Figure out why General, Common, and Rare don't switch to "show rewards" text.
	if (id == "broadcasts_rewards") {
		lootdisplay[0].style.display = (lootdisplay[0].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[0].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide broadcast rewards' : 'Click here to show broadcast rewards';
		opentabs[0] = (lootdisplay[0].style.display == 'flex') ? true : false;
	}
	else if (id == "general_rewards") {
		lootdisplay[1].style.display = (lootdisplay[1].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[1].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide general rewards' : 'Click here to show general rewards';
		opentabs[1] = (lootdisplay[1].style.display == 'flex') ? true : false;
	}
	else if (id == "common_rewards") {
		lootdisplay[2].style.display = (lootdisplay[2].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[2].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide common rewards' : 'Click here to show common rewards';
		opentabs[2] = (lootdisplay[2].style.display == 'flex') ? true : false;
	}
	else if (id == "rare_rewards") {
		lootdisplay[3].style.display = (lootdisplay[3].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[3].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide rare rewards' : 'Click here to show rare rewards';
		opentabs[3] = (lootdisplay[3].style.display == 'flex') ? true : false;
	}
	console.log(opentabs)

	let truecount = 0;
	for (let i = 0; i < opentabs.length; i++) {
		if (opentabs[i] == true) {
			truecount++;
		}
	}
	console.log(truecount)
	let minH = 0;
	if (truecount == 4) {
		minH = 25;
	}
	if (truecount == 3) {
		minH = 29;
	}
	if (truecount == 2) {
		minH = 35;
	}
	if (truecount == 1) {
		minH = 45;
	}

	if (opentabs[0]) {
		Array.from(document.getElementsByClassName('broadcasts') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = minH + "%";
	}
	else {
		Array.from(document.getElementsByClassName('broadcasts') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = "8%";
	}

	if (opentabs[1]) {
		Array.from(document.getElementsByClassName('general') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = minH + "%";
	}
	else {
		Array.from(document.getElementsByClassName('general') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = "8%";
	}

	if (opentabs[2]) {
		Array.from(document.getElementsByClassName('common') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = minH + "%";
	}
	else {
		Array.from(document.getElementsByClassName('common') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = "8%";
	}

	if (opentabs[3]) {
		Array.from(document.getElementsByClassName('rare') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = minH + "%";
	}
	else {
		Array.from(document.getElementsByClassName('rare') as HTMLCollectionOf<HTMLElement>)[0].style.minHeight = "8%";
	}
}


function buttonDisabler(){
	if (toggle == true) {
		if(localStorage.getItem("autoCapture") !== "true"){
			document.getElementById("docapturebutton").setAttribute("title", "Currently disabled to due initialization, settings being saved, or autocapture");
			document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
			document.getElementById("docapturebutton").setAttribute("onclick", "");
		}
		document.getElementById("toggleunlocktrack").setAttribute("onclick", "");
		document.getElementById("easy").setAttribute("onclick", "");
		document.getElementById("medium").setAttribute("onclick", "");
		document.getElementById("hard").setAttribute("onclick", "");
		document.getElementById("elite").setAttribute("onclick", "");
		document.getElementById("master").setAttribute("onclick", "");
		document.getElementById("label_easy").setAttribute("onclick", "");
		document.getElementById("label_medium").setAttribute("onclick", "");
		document.getElementById("label_hard").setAttribute("onclick", "");
		document.getElementById("label_elite").setAttribute("onclick", "");
		document.getElementById("label_master").setAttribute("onclick", "");
		toggle = false
	}
	else {
		if(localStorage.getItem("autoCapture") !== "true"){
			document.getElementById("docapturebutton").setAttribute("title", "");
			document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
			document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
		}
		document.getElementById("toggleunlocktrack").setAttribute("onclick", "TEST.toggleCapture(event)");
		document.getElementById("easy").setAttribute("onclick", "TEST.changeClueTierSpan('easy', event);");
		document.getElementById("medium").setAttribute("onclick", "TEST.changeClueTierSpan('medium', event);");
		document.getElementById("hard").setAttribute("onclick", "TEST.changeClueTierSpan('hard', event);");
		document.getElementById("elite").setAttribute("onclick", "TEST.changeClueTierSpan('elite', event);");
		document.getElementById("master").setAttribute("onclick", "TEST.changeClueTierSpan('master', event);");
		document.getElementById("label_easy").setAttribute("onclick", "TEST.changeClueTierSpan('easy', event);");
		document.getElementById("label_medium").setAttribute("onclick", "TEST.changeClueTierSpan('medium', event);");
		document.getElementById("label_hard").setAttribute("onclick", "TEST.changeClueTierSpan('hard', event);");
		document.getElementById("label_elite").setAttribute("onclick", "TEST.changeClueTierSpan('elite', event);");
		document.getElementById("label_master").setAttribute("onclick", "TEST.changeClueTierSpan('master', event);");
		toggle = true
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

