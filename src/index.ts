//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base";
import { ImgRef } from "@alt1/base";

import compareImages from "resemblejs/compareImages"
import pixelmatch from "pixelmatch";

import ClueRewardReader from "./scripts/rewardreader";
import { ModalUIReader } from "./scripts/modeluireader";

import * as lsdb from './JSONs/LocalStorageInit.json';
import * as itemsTwoPlus from './JSONs/ItemsAndImagesAll.json';
import * as itemsOrgList from './JSONs/ItemsAndImagesOrgList.json';
import * as itemsOrgMinus from './JSONs/ItemsAndImagesOrgMinus.json';
import * as itemslegacyTwoPlus from './JSONs/ItemsAndImagesLegacyAll.json';
import * as itemsLegacyOrgList from './JSONs/ItemsAndImagesLegacyOrgList.json';
import * as itemsLegacyOrgMinus from './JSONs/ItemsAndImagesLegacyOrgMinus.json';

/* 
A couple of notes for development
- In order to adjust this plugin for other loot adjust two key things:
	* The JSONs, the initializer and the image lists
	* The Image or images that allow Alt1 to find the window 
- One would need to tweak various settings around to accomdate the loot window
- Value reader is also from the Clue Solver, so I'm not sure how it works, it may break.
*/

//tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

// TODO: FOR THE PROGRAMMERS AND DEBUGGERS
// Set this value to true or false to enable console log messages
var seeConsoleLogs = true;

var tierlist = ["easy", "medium", "hard", "elite", "master"]

var settingslist = ["OpenLogger/Checked button", "OpenLogger/Algorithm", "OpenLogger/ItemList", "OpenLogger/rerollToggle", "OpenLogger/lagDetect", 
					"OpenLogger/multiButtonPressDetect",  "OpenLogger/hybridPrecision", "OpenLogger/noMenu", "OpenLogger/RollbackDisplayLimit"]

var valuesAndCounts = ["OpenLogger/EValue", "OpenLogger/ECount", "OpenLogger/MValue", "OpenLogger/MCount", "OpenLogger/HValue", 
 					   "OpenLogger/HCount", "OpenLogger/ElValue", "OpenLogger/ElCount", "OpenLogger/MaValue", "OpenLogger/MaCount"]

var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item", 
					"sixth_item", "seventh_item", "eigth_item", "ninth_item"];
					

var listOfItemsAll = [];
var listOfitemsTwoPlus = [];
var listOfItemsOrgList = [];
var listOfItemsOrgMinus = [];
var listOfItemsLegacyAll = [];
var listOfItemslegacyTwoPlus = [];
var listOfItemsLegacyOrgList = [];
var listOfItemsLegacyOrgMinus = [];

var listOfItemsAllArray = [];
var listOfitemsTwoPlusArray = [];
var listOfItemsOrgListArray = [];
var listOfItemsOrgMinusArray = [];
var listOfItemsLegacyAllArray = [];
var listOfItemslegacyTwoPlusArray = [];
var listOfItemsLegacyOrgListArray = [];
var listOfItemsLegacyOrgMinusArray = [];

var items = JSON;

var legacy = false;
var displaybox = true;

var lastItems = [];
var lastQuants = [];
var lastTier = [];
var lastValue = 0;

var lastReroll = [0, 0];

var autoCaptureInterval;

var noMenuInterval;

var opentabs = [true, true, true, true];

var lagDetected = false;

var buttonDisabletoggle = true;

var lagCounter = 0;

var insertVerif = [];

var imgs = a1lib.ImageDetect.webpackImages({
	trailComplete: require("./images/TrailComplete.data.png"),
	trailCompleteLegacy: require("./images/TrailCompleteLegacy.data.png"),
	rewardValue: require("./images/RewardValue.data.png"),
	rewardValueLegacy: require("./images/RewardValueLegacy.data.png"),
	rerollWindow: require("./images/rerollWindow.data.png"),
	rerollWindowLegacy: require("./images/rerollWindowLegacy.data.png")
});

// TODO: Consider adding an update price for all clues within history, current tier value
// TODO: Consider changing the coin icon depending on its quantity
// Maybe extend this with purple sweets, holy biscuits, and various seeds.
// TODO: Consider putting some functions in its own TS files for organization.


export async function initOnLoad() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLayClearGroup("icon");
		alt1.overLayClearGroup("lag");
		alt1.overLayClearGroup("nomenu");
		
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Initializing OpenLogger...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
	}

	// 09/07/2022: This function exists to attempt to preserve data when changing naming conventions over
	// due to singular domain, and localstorage overwriting itself.
	// Remove this later down the line or if youre making your own plugin
	await keytransfer()

	if (seeConsoleLogs) console.log("Initializing plugin...");
	toggleLootDisplay("broadcasts_rewards")
	toggleLootDisplay("general_rewards")
	toggleLootDisplay("common_rewards")
	toggleLootDisplay("rare_rewards")
	await init();
	if (seeConsoleLogs) console.log("\nInitialization complete!");
}


async function keytransfer(){
	let oldKeys = ["Checked button", "Algorithm", "ItemList", "rerollToggle", 
				   "lagDetect", "multiButtonPressDetect",  "hybridPrecision", 
				   "noMenu", "RollbackDisplayLimit", "EValue", "ECount", 
				   "MValue", "MCount", "HValue", "HCount", "ElValue", "ElCount", 
				   "MaValue", "MaCount", "autoCapture", "HistoryDisplayLimit", 
				   "PrimaryKeyHistory", "History", "items", "autoCapture"]
	
	let newKeys = ["OpenLogger/Checked button", "OpenLogger/Algorithm", "OpenLogger/ItemList", 
				   "OpenLogger/rerollToggle", "OpenLogger/lagDetect", "OpenLogger/multiButtonPressDetect",  
				   "OpenLogger/hybridPrecision", "OpenLogger/noMenu", "OpenLogger/RollbackDisplayLimit", 
				   "OpenLogger/EValue", "OpenLogger/ECount", "OpenLogger/MValue", "OpenLogger/MCount", 
				   "OpenLogger/HValue", "OpenLogger/HCount", "OpenLogger/ElValue", "OpenLogger/ElCount", 
				   "OpenLogger/MaValue", "OpenLogger/MaCount", "OpenLogger/autoCapture", 
				   "OpenLogger/HistoryDisplayLimit", "OpenLogger/PrimaryKeyHistory", "OpenLogger/History", 
				   "OpenLogger/items", "OpenLogger/autoCapture"]
	
	for(let i = 0; i < oldKeys.length; i++){
		if(localStorage.getItem(oldKeys[i]) != null){
			localStorage.setItem(newKeys[i], localStorage.getItem(oldKeys[i]))
			localStorage.removeItem(oldKeys[i])
		}
	}
}


export async function init() {
	buttonDisabler();

	// TODO: This is a fix for when the buttons are clicked once.
	// When clicked once, it does nothing but when clicked a second
	// time, it closes and works properly.
	// Figure out in toggleLootDisplay how to fix it. Might worry
	// about it in the next logger project...

	// Initializing LocalStorage items
	if (seeConsoleLogs) console.log("Initializing LocalStorage items...");

	if (localStorage.getItem("OpenLogger/items") == null) {
		localStorage.setItem("OpenLogger/items", JSON.stringify(lsdb))
	}

	for (let i = 0; i < valuesAndCounts.length; i++) {
		if (localStorage.getItem(valuesAndCounts[i]) == null) {
			localStorage.setItem(valuesAndCounts[i], "0");
		}
	}

	items = JSON.parse(localStorage.getItem("OpenLogger/items"));


	// This code should be able to save your data after the optimization update.
	// This snippet can be removed a few months in the future or for future projects with this code.
	// ~ 08/10/2022
	let keys = Object.keys(lsdb);
	for (let i = 0; i < keys.length; i++) {
		if (localStorage.getItem(keys[i]) != null) {
			for (let j = 0; j < items[keys[i]].tier.length; j++) {
				let itemsQuant = parseInt(items[keys[i]].quantity[items[keys[i]].tier[j]]);
				let lsItemQuant = parseInt(JSON.parse(localStorage.getItem(keys[i])).quantity[items[keys[i]].tier[j]]);
				items[keys[i]].quantity[items[keys[i]].tier[j]] = itemsQuant + lsItemQuant;
			}
			localStorage.removeItem(keys[i]);
		}
	}


	if (seeConsoleLogs) console.log("LocalStorage items initialized.");

	if (seeConsoleLogs) console.log("Initializing radio buttons...");
	if (localStorage.getItem("OpenLogger/Checked button") == null) { // Checked button init check
		if (seeConsoleLogs) console.log("Defaulting button to easy...");
		let ele = document.getElementById("easy") as HTMLInputElement;
		ele.checked = true;
		(document.getElementById('clue_tier') as HTMLSpanElement).textContent = "Easy";
		localStorage.setItem("OpenLogger/Checked button", "easy");
	}
	else { // If it does, set the button and span
		if (seeConsoleLogs) console.log("Setting previously set radio button: " + localStorage.getItem("OpenLogger/Checked button") + "...");
		let temp = localStorage.getItem("OpenLogger/Checked button");
		let ele = document.getElementById(temp) as HTMLInputElement;
		ele.checked = true;
		(document.getElementById('clue_tier') as HTMLSpanElement).textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
	}

	if (seeConsoleLogs) console.log("Radio buttons initialized.");


	let tierSpans = document.getElementsByClassName("current_tier_button") as HTMLCollectionOf<HTMLSpanElement>;
	for (let i = 0; i < tierSpans.length; i++) {
		if (seeConsoleLogs) console.log("Setting tier spans to", currentTier()[0]);
		tierSpans[i].textContent = currentTier()[0];
	}

	if (localStorage.getItem("OpenLogger/Algorithm") == null) { // Algorithim init check
		if (seeConsoleLogs) console.log("Defaulting Algorithm button to Hybrid...");
		localStorage.setItem("OpenLogger/Algorithm", "hybrid");
	}

	if (localStorage.getItem("OpenLogger/ItemList") == null) { // Item Referense list init check
		if (seeConsoleLogs) console.log("Defaulting ItemList to Organized List...");
		localStorage.setItem("OpenLogger/ItemList", "orglist");
	}

	if (localStorage.getItem("OpenLogger/autoCapture") == null) { // Autocapture check
		if (seeConsoleLogs) console.log("Defaulting autocapture to off...");
		localStorage.setItem("OpenLogger/autoCapture", "false");
	}

	if (localStorage.getItem("OpenLogger/rerollToggle") == null) { // Reroll toggle check
		if (seeConsoleLogs) console.log("Defaulting reroll toggle to true...");
		localStorage.setItem("OpenLogger/rerollToggle", "true");
	}

	if (localStorage.getItem("OpenLogger/lagDetect") == null) { // Lag Detection toggle check
		if (seeConsoleLogs) console.log("Defaulting lag detect to true...");
		localStorage.setItem("OpenLogger/lagDetect", "true");
	}

	if (localStorage.getItem("OpenLogger/multiButtonPressDetect") == null) { // Button double press detection
		if (seeConsoleLogs) console.log("Defaulting multi button press detect to true...");
		localStorage.setItem("OpenLogger/multiButtonPressDetect", "true");
	}

	if (localStorage.getItem("OpenLogger/noMenu") == null) { // No hover display box
		if (seeConsoleLogs) console.log("Defaulting no menu box to true");
		localStorage.setItem("OpenLogger/noMenu","false");
	}
	else if (localStorage.getItem("OpenLogger/noMenu") == "true") {
		if (seeConsoleLogs) console.log("Enabling no menu box");
		noMenuCheck();
	}

	if (localStorage.getItem("OpenLogger/hybridPrecision") == null) { // Hybrid precision value
		if (seeConsoleLogs) console.log("Defaulting hybridPrecision to 0.3...");
		localStorage.setItem("OpenLogger/hybridPrecision", "0.3");
	}

	if (localStorage.getItem("OpenLogger/History") == null) { // History initializer
		if (seeConsoleLogs) console.log("Creating history");
		localStorage.setItem("OpenLogger/History",JSON.stringify([]));
	}

	
	if (localStorage.getItem("OpenLogger/PrimaryKeyHistory") == null) { // Initialize primary key for history
		if (seeConsoleLogs) console.log("Defaulting PrimaryKeyHistory to 1");
		localStorage.setItem("OpenLogger/PrimaryKeyHistory", "1");
	}

	
	if (localStorage.getItem("OpenLogger/HistoryDisplayLimit") == null) { // Initialize history display limit
		if (seeConsoleLogs) console.log("Defaulting history display limit to 25");
		localStorage.setItem("OpenLogger/HistoryDisplayLimit", "25");
	}
	updateItems();

	if (seeConsoleLogs) console.log("\n")

	// Set up image libraries
	await arraySetup();

	//Set display
	lootDisplay();
 
	//Set up settings
	settingsInit();

	//Set up history window
	historyInit();

	//Set up insert window
	insertInit();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("OpenLogger ready!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
	
	buttonEnabler();
}


export async function changeClueTierSpan(id: string, event: Event) {
	// Set the clue_tier span for the checked box
	(document.getElementById("number_of_rewards") as HTMLDivElement).textContent = "0";
	(document.getElementById("value_of_rewards") as HTMLDivElement).textContent = "Loading...";
	(document.getElementById("average_of_rewards") as HTMLDivElement).textContent = "Loading...";

	buttonDisabler();
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Loading " + (id[0] + id.slice(1).toLowerCase()) + " clues...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 10000, "", true, true);
	}

	if (seeConsoleLogs) console.log("Setting button to " + (id[0].toUpperCase() + id.slice(1).toLowerCase()) + "...");
	(document.getElementById('clue_tier') as HTMLSpanElement).textContent = (id[0].toUpperCase() + id.slice(1).toLowerCase());
	(document.getElementById(id) as HTMLInputElement).checked = true;
	localStorage.setItem("OpenLogger/Checked button", id);

	let tierSpans = document.getElementsByClassName("current_tier_button") as HTMLCollectionOf<HTMLSpanElement>;
	for (let i = 0; i < tierSpans.length; i++) {
		tierSpans[i].textContent = currentTier()[0];
	}

	// Clear reward slots and value
	(document.getElementById("rewards_value") as HTMLSpanElement).textContent = "0";
	for (let i = 0; i < 9; i++) {
		(document.getElementById(rewardSlots[i]) as HTMLSpanElement).textContent = "";
	}

	// Set up image libraries
	await arraySetup();

	//Set display
	lootDisplay();
 
	//Set up settings
	settingsInit();

	//Set up history window
	historyClear();
	historyInit();

	//Set up insert window
	insertInit();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx((id[0].toUpperCase() + id.slice(1).toLowerCase()) + " tier rewards & images loaded!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true)
	}
	buttonEnabler();
	lastReroll = [0, 0];
}


export async function cleardb(choice: any) {
	let keys = Object.keys(items);

	if (choice == 1) { // Nuclear reset all
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Resetting OpenLogger...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}

		localStorage.clear();

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("OpenLogger successfully reset! Restarting...", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		await new Promise(resolve => setTimeout(resolve, 750));
		location.reload();
	}
	else if (choice == 2) { // Full item db clear
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Clearing all items from reward database...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}

		localStorage.removeItem("items");
		localStorage.removeItem("History");
		for (let i = 0; i < valuesAndCounts.length; i++) {
			localStorage.removeItem(valuesAndCounts[i]);
		}
		await init();

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("All items cleared successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	else if (choice == 3) { // Reset settings
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Reseting settings to default...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		
		if (localStorage.getItem("OpenLogger/noMenu") === "true") {
			localStorage.setItem("OpenLogger/noMenu", "false");
			noMenuCheck();
		}
		for (let i = 0; i < settingslist.length; i++) {
			localStorage.removeItem(settingslist[i]);
		}

		await init();

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

		localStorage.setItem(currentTier()[1], "0");
		localStorage.setItem(currentTier()[2], "0");
		for (let i = 0; i < keys.length; i++) {
			items[keys[i]].quantity[currentTier()[0]] = 0;
		}
		updateItems()

		let lsHistory = JSON.parse(localStorage.getItem("OpenLogger/History"));
		for (let i = lsHistory.length - 1; i >= 0; i--) {
			if (lsHistory[i][3][0] == currentTier()[0] || lsHistory[i][3][0] == currentTier()[0] + " [C] ") {
				lsHistory.splice(i, 1);
			}
		}
		localStorage.setItem("OpenLogger/History",JSON.stringify(lsHistory));

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx((currentTier()[0][0].toUpperCase() + (currentTier()[0].slice(1)).toLowerCase()) + " cleared successfully!",
				a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
	}
	
	let ele = document.getElementById("history_body") as HTMLDivElement;
	let container = document.createElement("div") as HTMLDivElement;
	container.textContent = "There's nothing here to display. Start scanning!";
	container.setAttribute('class','nothingToDisplayContainer');
	ele.append(container);

	await historyClear();
	historyInit();

	(document.getElementById("number_of_rewards") as HTMLSpanElement).textContent = "0";
	(document.getElementById("value_of_rewards") as HTMLSpanElement).textContent = "0";
	(document.getElementById("average_of_rewards") as HTMLSpanElement).textContent = "0";
	let divs = document.getElementsByClassName("loot_display") as HTMLCollectionOf<HTMLDivElement>;
	for (let i = 0; i < divs.length; i++) {
		divs[i].textContent = "";
	}
	for (let i = 0; i < 9; i++) {
		(document.getElementById(rewardSlots[i]) as HTMLDivElement).textContent = "";
	}
	(document.getElementById("rewards_value") as HTMLSpanElement).textContent = "0";

	lastItems = [];
	lastQuants = [];
	lastTier = [];
	lastValue = 0;
}


async function arraySetup() {
	// TODO: Look into optimizing this function
	// Set new array of current tier
	// Turning image collection into array
	let arrayLength = 0;
	if (localStorage.getItem("OpenLogger/ItemList") == "twoplus") {
		listOfitemsTwoPlus = itemsTwoPlus.any.concat(itemsTwoPlus[currentTier()[0]]);
		listOfItemslegacyTwoPlus = itemslegacyTwoPlus.any.concat(itemslegacyTwoPlus[currentTier()[0]]);
		listOfitemsTwoPlusArray = [];
		listOfItemslegacyTwoPlusArray = [];
		arrayLength = listOfitemsTwoPlus.length;
	}
	else if (localStorage.getItem("OpenLogger/ItemList") == "orglist") {
		listOfItemsOrgList = itemsOrgList.any.concat(itemsOrgList[currentTier()[0]]);
		listOfItemsLegacyOrgList = itemsLegacyOrgList.any.concat(itemsLegacyOrgList[currentTier()[0]]);
		listOfItemsOrgListArray = [];
		listOfItemsLegacyOrgListArray = [];
		arrayLength = listOfItemsOrgList.length;
	}
	else if (localStorage.getItem("OpenLogger/ItemList") == "orgminus") {
		listOfItemsOrgMinus = itemsOrgMinus.any.concat(itemsOrgMinus[currentTier()[0]]);
		listOfItemsLegacyOrgMinus = itemsLegacyOrgMinus.any.concat(itemsLegacyOrgMinus[currentTier()[0]]);
		listOfItemsOrgMinusArray = [];
		listOfItemsLegacyOrgMinusArray = [];
		arrayLength = listOfItemsOrgMinus.length;
	}


	// Setting Array items and ImageData arrays
	let promises = [];
	for (let i = 0; i < arrayLength; i++) {
		if (localStorage.getItem("OpenLogger/ItemList") == "twoplus") {
			if (i < listOfitemsTwoPlus.length) {
				listOfitemsTwoPlusArray.push([listOfitemsTwoPlus[i].name, listOfitemsTwoPlus[i].base64, 0.0]);
				promises.push(await _base64ToImageData(listOfitemsTwoPlusArray[i][1], 32, 32).then(data => { 
					listOfitemsTwoPlusArray[i].push(data);
				}));
			}
			if (i < listOfItemslegacyTwoPlus.length) {
				listOfItemslegacyTwoPlusArray.push([listOfItemslegacyTwoPlus[i].name, listOfItemslegacyTwoPlus[i].base64, 0.0]);
				promises.push(await _base64ToImageData(listOfItemslegacyTwoPlusArray[i][1], 32, 32).then(data => { 
					listOfItemslegacyTwoPlusArray[i].push(data);
				}));
			}
		}

		else if (localStorage.getItem("OpenLogger/ItemList") == "orglist") {
			if (i < listOfItemsOrgList.length) {
				listOfItemsOrgListArray.push([listOfItemsOrgList[i].name, listOfItemsOrgList[i].base64, 0.0]);
				promises.push(await _base64ToImageData(listOfItemsOrgListArray[i][1], 32, 32).then(data => { 
					listOfItemsOrgListArray[i].push(data);
				}));
			}
			if (i < listOfItemsLegacyOrgList.length) {
				listOfItemsLegacyOrgListArray.push([listOfItemsLegacyOrgList[i].name, listOfItemsLegacyOrgList[i].base64, 0.0]);
					promises.push(await _base64ToImageData(listOfItemsLegacyOrgListArray[i][1], 32, 32).then(data => { 
					listOfItemsLegacyOrgListArray[i].push(data);
				}));
			}
		}

		else if (localStorage.getItem("OpenLogger/ItemList") == "orgminus") {
			if (i < listOfItemsOrgMinus.length) {
				listOfItemsOrgMinusArray.push([listOfItemsOrgMinus[i].name, listOfItemsOrgMinus[i].base64, 0.0]);
				promises.push(await _base64ToImageData(listOfItemsOrgMinusArray[i][1], 32, 32).then(data => { 
					listOfItemsOrgMinusArray[i].push(data);
				}));
			}
			if (i < listOfItemsLegacyOrgMinus.length) {
				listOfItemsLegacyOrgMinusArray.push([listOfItemsLegacyOrgMinus[i].name, listOfItemsLegacyOrgMinus[i].base64, 0.0]);
				promises.push(await _base64ToImageData(listOfItemsLegacyOrgListArray[i][1], 32, 32).then(data => { 
					listOfItemsLegacyOrgMinusArray[i].push(data);
				}));
			}
		}
	}
	await Promise.all(promises);


	if (localStorage.getItem("OpenLogger/ItemList") == "all") {
		listOfItemsAll = itemsTwoPlus.any.concat(itemsTwoPlus.easy).concat(itemsTwoPlus.medium).concat(itemsTwoPlus.hard).concat(itemsTwoPlus.elite).concat(itemsTwoPlus.master);
		listOfItemsLegacyAll = itemslegacyTwoPlus.any.concat(itemslegacyTwoPlus.easy).concat(itemslegacyTwoPlus.medium).concat(itemslegacyTwoPlus.hard).concat(itemslegacyTwoPlus.elite).concat(itemslegacyTwoPlus.master);
		listOfItemsAllArray = [];
		listOfItemsLegacyAllArray = [];
		promises = [];
		for (let i = 0; i < listOfItemsAll.length; i++) {
			listOfItemsAllArray.push([listOfItemsAll[i].name, listOfItemsAll[i].base64, 0.0]);
			listOfItemsLegacyAllArray.push([listOfItemsLegacyAll[i].name, listOfItemsLegacyAll[i].base64, 0.0]);
			promises.push(await _base64ToImageData(listOfItemsAllArray[i][1], 32, 32).then(data => { 
				listOfItemsAllArray[i].push(data);
			}));
			promises.push(await _base64ToImageData(listOfItemsLegacyAllArray[i][1], 32, 32).then(data => { 
				listOfItemsLegacyAllArray[i].push(data);
			}));
		}
		await Promise.all(promises);
	}
}


a1lib.on("alt1pressed", alt1pressedcapture);
function alt1pressedcapture() {
	if (buttonDisabletoggle == true) {
		if ((document.getElementById("docapturebutton") as HTMLDivElement).getAttribute("title") === ("Disabled while scanning. Please wait...")) {
			return;
		}
		else if ((document.getElementById("docapturebutton") as HTMLDivElement).getAttribute("title") === ("Disable autocapture to use this button")) {
			return;
		}
		else {
			capture(false);
		}
	}

}


export async function capture(autobool: boolean) {
	if (!window.alt1) {
		return;
	}
	if (!alt1.permissionPixel) {
		return;
	}

	if (localStorage.getItem("OpenLogger/multiButtonPressDetect") === "true") {
		if (!autobool) {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Disabled while scanning. Please wait...");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
			await new Promise(resolve => setTimeout(resolve, 200));
		}
	}

	let img = a1lib.captureHoldFullRs();

	const promises = [];
	promises.push(await findtrailComplete(img, autobool));
	await Promise.all(promises);
	if (seeConsoleLogs) console.log("Finished checking clue scroll");

	if (localStorage.getItem("OpenLogger/multiButtonPressDetect") === "true") {
		if (!autobool) {
			await new Promise(resolve => setTimeout(function () {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
			}, 400));
		}
	}
}


async function findtrailComplete(img: ImgRef, autobool: boolean) {
	// If 3 rerolls..., default
	// Adjust this if you want to add more rerolls.
	if (lagCounter == 5) {
		autoDisableCheckAuto(event);
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("lag");
			alt1.overLayClearGroup("rect");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Too much lag or back to back loot detected.\n\n        Autocapture has been automatically\nturned off. Manually capture this clue or turn\n         autocapture back on and try again",
				a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
		}
		lagCounter = 0;
		return;
	}

	try {
		let loc: any;
		const imgCaptures = [img.findSubimage(imgs.rerollWindow),
							 img.findSubimage(imgs.trailComplete),						      
						     img.findSubimage(imgs.rerollWindowLegacy),
						     img.findSubimage(imgs.trailCompleteLegacy)];
		if (imgCaptures[0][0] !== undefined) {
			loc = imgCaptures[0];
			if (seeConsoleLogs) console.log("reroll window");
			return;
		}
		else if (imgCaptures[1][0] !== undefined) {
			loc = imgCaptures[1];
			if (seeConsoleLogs) console.log("Non-legacy window");
			legacy = false;
		}
		else if (imgCaptures[2][0] !== undefined) {
			loc = imgCaptures[2];
			if (seeConsoleLogs) console.log("reroll legacy window");
			return;
		}
		else if (imgCaptures[3][0] !== undefined) {
			loc = imgCaptures[3];
			if (seeConsoleLogs) console.log("legacy window");
			legacy = true;
		}
		else {
			return;
		}

		// TODO: Tweak these two values below if jagex adjusts the pixel placement of the items
		// Values to tweak in case jagex borks the item placement on the screen
		// x1, +1 = right, -1 = left
		// y1, +1 = up, -1 = down
		// Adjust top crops as well, for the x1 and y1 values for it
		// Consider making this an option in the settings.
		let xdefault: number
		let ydefault: number
		let xRect: number
		let yRect: number
		if (!legacy) {
			xdefault = loc[0].x - 1;
			ydefault = loc[0].y + 39;
			xRect = loc[0].x - 27;
			yRect = loc[0].y - 13;
		}
		else {
			xdefault = loc[0].x - 112;
			ydefault = loc[0].y + 39;
			xRect = loc[0].x - 139;
			yRect = loc[0].y - 12;
		}

		let x1 = xdefault
		let y1 = ydefault

		let crops = new Array<ImageData>(9);
		let topCrops = new Array<ImageData>(9);
		for (let i = 0; i < crops.length; i++) {
			crops[i] = img.toData(x1, y1, 32, 32);
			topCrops[i] = img.toData(x1, loc[0].y + 41, 32, 8);
			x1 += 40;
		}

		// Give me the total value!
		// If this breaks, value is obfuscated. Second way to scan it for validity.
		
		// FIXME: Try to rework this try/catch to an if/else block.
		let value = 0;
		let lastValueList = [];
		try {
			let rewardreader = new ClueRewardReader();  // Thanks Skillbert
			rewardreader.pos = ModalUIReader.find()[0]; // For these two functions
			value = rewardreader.read(img).value;
			let valueStr = value.toString();
			let valueList = [];

			for (let i = valueStr.length - 1; i > 0; i--) {
				valueList.push(valueStr);
				valueStr = valueStr.slice(0,-1);
			}

			let lastValueStr = lastValue.toString();
			for (let i = lastValueStr.length - 1; i > 0; i--) {
				lastValueList.push(lastValueStr);
				lastValueStr = lastValueStr.slice(0,-1);
			}
		} catch (e) {
			return;
		}

		if (autobool == true) {
			if (lastValue == 0) {
				if (seeConsoleLogs) console.log("value is zero");
			}
			else if (value == lastValue) {
				return;
			}
			else if (/*valueList.includes(lastValue.toString()) ||*/ lastValueList.includes(value.toString())) {
				return;
			}
		}

		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("rect");
			alt1.overLayRect(a1lib.mixColor(255, 144, 0), xRect, yRect, imgs.trailComplete.width + 278, imgs.trailComplete.height + 213, 60000, 2);
		}

		// Check if this is a reroll
		let rerollVal = img.toData(loc[0].x + 231, loc[0].y + 175, 8, 9);

		if (localStorage.getItem("OpenLogger/rerollToggle") == "true") {
			await rerollCheck(rerollVal, false);
		}
		else {
			if (seeConsoleLogs) ("Reroll toggle is false");
		}

		let prevValue = lastValue;
		lastValue = value;
		if (!lagDetected) {
			if (window.alt1) {
				alt1.overLayClearGroup("overlays");
				alt1.overLayClearGroup("lag");
				alt1.overLaySetGroup("lag");
				alt1.overLayTextEx("Capturing rewards...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
			}
		}
		let itemResults = [];
		let promises = [];

		x1 = xdefault
		y1 = ydefault

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
			if (localStorage.getItem("OpenLogger/lagDetect") == "true") {
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
		if (localStorage.getItem("OpenLogger/lagDetect") == "true") {
			for (let i = 0; i < itemResults.length; i++) {
				if (itemResults[itemResults.length - 1] !== "Blank") {
					break;
				}
				else if (itemResults[i] !== "Blank") {
					continue;
				}
				else {
					if (seeConsoleLogs) console.log(itemResults[i]);

					let newImg = a1lib.captureHoldFullRs();
					let x = 0;
					let loc2;
					if (!legacy) {
						if (seeConsoleLogs) console.log("is not legacy")
						loc2 = newImg.findSubimage(imgs.trailComplete);
						x = loc2[0].x + (40 * (i));
					}
					else {
						loc2 = newImg.findSubimage(imgs.trailCompleteLegacy);
						x = loc2[0].x - 112 + (40 * (i));
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
					let lastresult = "";
					let promises2 = [];
					promises2.push(lastresult = await compareItems(lastcrop));
					await Promise.all(promises2);
					if (seeConsoleLogs) console.log(itemResults, i);
					if (seeConsoleLogs) console.log("Comparing", lastresult, "to", itemResults[i]);

					// Consider doing a value check in here...
					
					// TODO: If capture issues with lag checking happen look here...
					// I think this might be fixed, but idk
					let comparison = true;
					if (autobool) {
						try {
							let itemResultsNoBlanks = []
							for (let i = 0; i < itemResults.length; i++) {
								if (itemResults[i] !== "Blank") {
									itemResultsNoBlanks.push(itemResults[i]);
								}
								else {
									break;
								}
							}
							let lsHistory = JSON.parse(localStorage.getItem("OpenLogger/History"))[JSON.parse(localStorage.getItem("OpenLogger/History")).length-1][0];
							if (seeConsoleLogs) console.log("Checking arrays for equivalence:",JSON.parse(localStorage.getItem("OpenLogger/History"))[JSON.parse(localStorage.getItem("OpenLogger/History")).length-1][0], itemResultsNoBlanks);
							if (lsHistory.join(',') === itemResultsNoBlanks.join(',')) { // https://stackoverflow.com/a/6230314
								if (seeConsoleLogs) console.log(lsHistory.join(','),"and",itemResultsNoBlanks.join(','),"are the same...");
								if (seeConsoleLogs) console.log("They're the same. make it false.");
								comparison = false;
							}
						} catch (e) {
							console.log("Something broke.", e);
						}
					}

					let lagDetectValue = new ClueRewardReader();
					lagDetectValue.pos = ModalUIReader.find()[0];

					if (!comparison) {
						if (window.alt1) {
							alt1.overLayClearGroup("overlays");
							alt1.overLayClearGroup("lag");
							alt1.overLaySetGroup("lag");
							alt1.overLayTextEx("Lag detected, rescanning...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
						}
						lagDetected = true;
						lastValue = 0;
						lagCounter++;
						capture(autobool);
						return;
					} // TODO: Put some console log test statements in here...
					else if (lastresult === itemResults[i]) {
						break;
					}
					else if (parseInt(lastValueList[0]) === parseInt("lagDetectValue")) {
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
						lagCounter++;
						capture(autobool);
						return;
					}
				}
			}
		}
		await Promise.all(promises);

		lagCounter = 0

		// TODO: See if this even does anything
		//Maybe comment this out later idk
		let equalArrays = true;
		if (autobool) {
			if (lastItems.length == 0) {
				if (seeConsoleLogs) console.log("last item length is 0. Pass...");
			}
			else {
				for (let i = 0; i < itemResults.length; i++) {
					if (itemResults[i] !== lastItems[i]) {
						equalArrays = false;
						if (seeConsoleLogs) console.log("Equal arrays false");
					}
				}
				if (prevValue == value && !equalArrays) {
					if (window.alt1) {
						alt1.overLayClearGroup("overlays");
						alt1.overLaySetGroup("overlays");
						alt1.overLayTextEx("                 Casket misread.\nPause Autocapture (if on) and restart\n  plugin or rollback, and try again.",
							a1lib.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
					}
					lastValue = prevValue;
					if (seeConsoleLogs) console.log("equal arrays is false, setting last value to previous value");
					return;
				}
			}
		}

		// FIXME: Tweaks for Pixelmatch on TwoMatch or All Images. Don't rely on this...
		// It's a hardcode. I hate it.
		for (let i = 0; i > itemResults.length; i++) {
			if (currentTier()[0] == "medium" && itemResults[i] == "Huge plated rune salvage") {
				itemResults[i] = "Huge plated adamant salvage";
			}
		}

		// Give me the quantity of the items!
		let quantResults = [];
		promises = [];
		for (let i = 0; i < 9; i++) {
			if (itemResults[i] == "Blank") {
				break;
			}
			promises.push(quantResults.push(await readQuantities(topCrops[i])));
		}
		await Promise.all(promises);
		if (seeConsoleLogs) (quantResults);

		// Send it to the LS!
		promises = [];
		promises.push(await submitToLS(itemResults, quantResults, value));
		await Promise.all(promises);

		// Record data for last casket
		lastItems = itemResults.slice();
		lastQuants = quantResults.slice();
		lastTier = currentTier();

		addHistoryToLs(lastValue, lastItems, lastQuants, lastTier);
		
		// Put the items and quantites on the display!
		(document.getElementById("rewards_value") as HTMLSpanElement).textContent = value.toLocaleString("en-US");
		for (let i = 0; i < 9; i++) {
			(document.getElementById(rewardSlots[i]) as HTMLDivElement).textContent = "";
		}

		for (let i = 0; i < quantResults.length; i++) {
			// Displaying in Rewards Capture
			let nodevar = document.createElement("itembox") as HTMLDivElement;
			let imgvar = document.createElement("img") as HTMLImageElement;
			let quantvar = document.createElement("span") as HTMLSpanElement;

			nodevar = nodeMaker(parseInt(quantResults[i]), itemResults[i], "recent")
			imgvar = imgMaker(itemResults[i])
			quantvar = quantMaker(parseInt(quantResults[i]))

			nodevar.append(quantvar);
			nodevar.append(imgvar);
			(document.getElementById(rewardSlots[i]) as HTMLDivElement).appendChild(nodevar);
		}

		//Show it on the screen!
		lootDisplay();

		//Display the victory screen!!!
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLayClearGroup("rect");
			alt1.overLayClearGroup("lag");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx((currentTier()[0][0].toUpperCase() + (currentTier()[0].slice(1)).toLowerCase()) + " rewards captured successfully!",
				a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
			alt1.overLayRect(a1lib.mixColor(0, 255, 0), xRect, yRect, imgs.trailComplete.width + 278, imgs.trailComplete.height + 213, 1000, 2);
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
		buttonEnabler();
		console.log(e);
		return;
	}
}


async function compareItems(item: ImageData) {
	//TODO: Try to get Legacy to work better
	//Legacy works, but I don't have a lot of testing materials

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

	let matches = [];
	if (!legacy) {
		if (localStorage.getItem("OpenLogger/ItemList") == "all") {
			matches = listOfItemsAllArray.slice();
		}
		else if (localStorage.getItem("OpenLogger/ItemList") == "twoplus") {
			matches = listOfitemsTwoPlusArray.slice();
		}
		else if (localStorage.getItem("OpenLogger/ItemList") == "orglist") {
			matches = listOfItemsOrgListArray.slice();
		}
		else if (localStorage.getItem("OpenLogger/ItemList") == "orgminus") {
			matches = listOfItemsOrgMinusArray.slice();
		}
	}

	else { // Legacy works. But I don't test with it often. I think its okay...
		if (localStorage.getItem("OpenLogger/ItemList") == "all") {
			matches = listOfItemsLegacyAllArray.slice();
		}
		else if (localStorage.getItem("OpenLogger/ItemList") == "twoplus") {
			matches = listOfItemslegacyTwoPlusArray.slice();
		}
		else if (localStorage.getItem("OpenLogger/ItemList") == "orglist") {
			matches = listOfItemsLegacyOrgListArray.slice();
		}
		else if (localStorage.getItem("OpenLogger/ItemList") == "orgminus") {
			matches = listOfItemsLegacyOrgMinusArray.slice();
		}
	}

	//Check if the item is blank first
	let imgdata = await compareImages(item, matches[0][1], { output: {}, ignore: "less" });
	matches[0][2] = imgdata.rawMisMatchPercentage;
	if (matches[0][2] == 0.00) {
		return "Blank";
	}
	matches.shift(); // Remove blank from the list

	let found = [];
	if (localStorage.getItem("OpenLogger/Algorithm") == "resemblejs") {
		found = matches[0];
		const promises = [];

		for (let i = 0; i < matches.length; i++) {
			promises.push(await compareImages(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
				matches[i][2] = data.rawMisMatchPercentage;
			}));
			if (found[2] > matches[i][2]) {
				found = matches[i];
			}	
		}
		await Promise.all(promises);
	}

	else if (localStorage.getItem("OpenLogger/Algorithm") == "pixelmatch") {
		/* List of items that do not identify in pure PixelMatch
			- Huge Plated Adamant Salvage identifies as Huge Plated Rune Salvage when using TwoPlus or All
		*/

		found = matches[0];
		const promises = [];
		for (let i = 0; i < matches.length; i++) {
			promises.push(matches[i][2] = pixelmatch(item.data, matches[i][3].data, null, item.width, item.height, {includeAA: true, threshold: 0.1 }));
			if (found[2] > matches[i][2]) {
				found = matches[i];
			}
		}
		await Promise.all(promises);
	}

	else if (localStorage.getItem("OpenLogger/Algorithm") == "hybrid") {
		// First we check with Pixelmatch and get the comparison of everything to the item
		let promises = [];
		let total = 0;
		for (let i = 0; i < matches.length; i++) {
			promises.push(matches[i][2] = pixelmatch(item.data, matches[i][3].data, null, item.width, item.height, {includeAA: true, threshold: 0.1 }));
			total += matches[i][2];
		}

		// Then we get the average so we can remove half of the items that don't match
		let average = total / matches.length;
		let precision = parseFloat(localStorage.getItem("OpenLogger/hybridPrecision")); //1 does nothing
		await Promise.all(promises);
		
		// TODO: Consider combining this and the next for loop.
		for (let i = matches.length-1; i > 0; i--) {
			if (matches[i][2] > (average * precision)) {
				matches.splice(i,1);
			}
		}
		
		//Now we find the correct item with ResembleJS!
		promises = [];
		found = matches[0];
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
	return found[0];
}


async function readQuantities(item: ImageData) {
	// Instead of reading top to bottom individulally, 
	// Read from left to right Read left to right with all columns together
	// And since the height is always the same I dont have to worry about changing
	// the value of the width of the number.

	// Maybe consider this for optimizations :^?
	let itemCan = document.createElement("canvas") as HTMLCanvasElement;
	let itemCon = itemCan.getContext('2d');
	itemCan.width = item.width;
	itemCan.height = item.height;
	itemCon.putImageData(item, 0, 0);
	let itemImg = new Image();
	itemImg.src = itemCan.toDataURL("image/png");
	itemCon.drawImage(itemImg, 0, 0);
	let pixels = itemCon.getImageData(0, 0, item.width, item.height);
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

	for (let i = 0; i < pixarr[0].length; i++) {
		if (noYellowStreak == 3) {
			break;
		}

		for (let j = 0; j < pixarr.length; j++) {
			if (pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 ||   // Yellow, Every screen has this
				pixarr[j][i].r == 254 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 ||   // Very slightly darker yellow, a screenie had this...
				pixarr[j][i].r == 253 && pixarr[j][i].g == 253 && pixarr[j][i].b == 0 ||   // Slightly darker yellow, for safety
				pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255) { // White, elites and masters only
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
					numbers += "000";
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

	let valueCan = document.createElement("canvas") as HTMLCanvasElement;
	let valueCon = valueCan.getContext('2d');
	valueCan.width = value.width;
	valueCan.height = value.height;
	valueCon.putImageData(value, 0, 0);
	let valueImg = new Image();
	valueImg.src = valueCan.toDataURL("image/png");
	valueCon.drawImage(valueImg, 0, 0);
	let pixels = valueCon.getImageData(0, 0, value.width, value.height);

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


async function submitToLS(item: any[], quant: any[], value: any) {
	//Add items to database
	if (seeConsoleLogs) console.log("Adding to database...");
	for (let i = 0; i < quant.length; i++) {
		// If you get null or undefined here, check if one of your rewards doesn't exist in LocalStorage or LocalStorageInit
		// Or maybe the name might be incorrectly written in, idk
		// console.log("checking if in array", item[i]);
		if (items[item[i]].tier.includes(currentTier()[0])) {
			let tempQuant = quant[i].slice();
			if (quant[i].includes('k')) {
				tempQuant = tempQuant.slice(0, -1);
				tempQuant += "000";
			}

			items[item[i]].quantity[currentTier()[0]] = parseInt(items[item[i]].quantity[currentTier()[0]]) + parseInt(tempQuant);
			updateItems();
		}
		else {
			return false;
		}
	}

	// Increase value and count
	localStorage.setItem(currentTier()[1], JSON.stringify((JSON.parse(localStorage.getItem(currentTier()[1])) + value)));
	localStorage.setItem(currentTier()[2], JSON.stringify(JSON.parse(localStorage.getItem(currentTier()[2])) + 1));

	return true;
}


async function addHistoryToLs(value: number, items: any, quants: any, tier: any) {
	// The order of how History items are logged
	// Index 1: Items (Array)
	// Index 2: Quantities (Array)
	// Index 3: Value
	// Index 4: Tier info (Array)
	// Index 5: Tier casket count
	// Index 6: History Primary Key

	for (let i = items.length - 1; i >= 0; i--) {
		if (items[i] == "Blank") {
			items.splice(i, 1);
		}
	}

	for (let i = 0; i < quants.length; i++) {
		if (quants[i].includes('k')) {
			quants[i] = quants[i].slice(0, -1);
			quants[i] += "000";
		}
	}
	
	let previous = [items, quants, value, tier, localStorage.getItem(tier[2]), localStorage.getItem("OpenLogger/PrimaryKeyHistory")];
	let temp = JSON.parse(localStorage.getItem("OpenLogger/History"))
	temp.push(previous);

	localStorage.setItem("OpenLogger/History", JSON.stringify(temp));
	localStorage.setItem("OpenLogger/PrimaryKeyHistory", JSON.stringify(parseInt(localStorage.getItem("OpenLogger/PrimaryKeyHistory")) + 1));

	await historyClear();
	historyInit();
}


function lootDisplay() {
	//Set Number of clues and Current and Average values
	(document.getElementById("number_of_rewards") as HTMLSpanElement).textContent = parseInt(JSON.parse(localStorage.getItem(currentTier()[2]))).toLocaleString("en-US");
	(document.getElementById("value_of_rewards") as HTMLSpanElement).textContent = parseInt(JSON.parse(localStorage.getItem(currentTier()[1]))).toLocaleString("en-US");
	if (parseInt(JSON.parse(localStorage.getItem(currentTier()[2]))) != 0) {
		(document.getElementById("average_of_rewards") as HTMLSpanElement).textContent = Math.round(parseInt(JSON.parse(localStorage.getItem(currentTier()[1]))) / parseInt(JSON.parse(localStorage.getItem(currentTier()[2])))).toLocaleString("en-US");
	}
	else {
		(document.getElementById("average_of_rewards") as HTMLSpanElement).textContent = "0";
	}

	//Set the icons in the tabs
	tabDisplay();
}


function tabDisplay() {
	let keys = Object.keys(items);
	let divs = document.getElementsByClassName("loot_display") as HTMLCollectionOf<HTMLDivElement>;
	for (let i = 0; i < divs.length; i++) {
		divs[i].textContent = "";
	}
	for (let i = 0; i < keys.length; i++) {
		// Interesting tidbit: Comment out this if block to display every item, 
		// but quantities will be undefined for the given tier if it doesn't exist in it.
		if (items[keys[i]].quantity[currentTier()[0]] == undefined || items[keys[i]].quantity[currentTier()[0]] == 0) {
			continue;
		}

		let ele = document.getElementById(items[keys[i]].tab + "_loot") as HTMLDivElement;
		let nodevar = document.createElement("itembox");
		let imgvar = document.createElement("img");
		let quantvar = document.createElement("span");

		nodevar = nodeMaker(parseInt(items[keys[i]].quantity[currentTier()[0]]), keys[i], "tab");
		nodevar.style.order = orderChecker(parseInt(items[keys[i]].order), keys[i]).toString();
		imgvar = imgMaker(keys[i]);
		
		// This if else only exists for when I comment out the above if block.
		// Nice for viewing all of the loot.
		if (items[keys[i]].quantity[currentTier()[0]] == undefined) {
			quantvar = quantMaker(0);
		}
		else {
			quantvar = quantMaker(items[keys[i]].quantity[currentTier()[0]]);
		}

		nodevar.append(quantvar);
		nodevar.append(imgvar);
		ele.append(nodevar);
	}
}


async function historyClear() {
	removeChildNodes(document.getElementById("history_body") as HTMLDivElement);
}


function rollbackFunc(valueClear: boolean) { // TODO: Edit this once you get the interface up and running... Consider sending in an index value...
	let lsHistory = JSON.parse(localStorage.getItem("OpenLogger/History"));
	let lastRoll = lsHistory[lsHistory.length - 1];
	//	Index 0 = Items
	//	Index 1 = Quantities
	//	Index 2 = Value of clue
	// 	Index 3 = Tier of clue, value and count

	if (seeConsoleLogs) console.log("Rolling back:", lastRoll[0], lastRoll[1], lastRoll[2], lastRoll[3]);
	for (let i = 0; i < lastRoll[0].length; i++) {
		items[lastRoll[0][i]].quantity[lastRoll[3][0]] = items[lastRoll[0][i]].quantity[lastRoll[3][0]] - lastRoll[1][i];
		updateItems();
	}

	// Decrease value and count
	localStorage.setItem(lastRoll[3][1], JSON.stringify(JSON.parse(localStorage.getItem(lastRoll[3][1])) - lastRoll[2]));
	localStorage.setItem(lastRoll[3][2], JSON.stringify(JSON.parse(localStorage.getItem(lastRoll[3][2])) - 1));

	lsHistory.pop();
	localStorage.setItem("OpenLogger/History", JSON.stringify(lsHistory));
	
	if (valueClear) {
		lastValue = 0;
	}
}


function historyInit() {
	let lsHistory = JSON.parse(localStorage.getItem("OpenLogger/History"))
	
	let title = document.getElementById("history_tier_caps") as HTMLDivElement;
	title.textContent = currentTierUpper();

	let quantity = document.getElementById("history_quantity") as HTMLDivElement;
	quantity.textContent = localStorage.getItem("OpenLogger/HistoryDisplayLimit");

	if (lsHistory.length == 0) {
		let ele = document.getElementById("history_body");
		let container = document.createElement("div") as HTMLDivElement;
		container.textContent = "There's nothing to display. Start scanning!"
		container.setAttribute('class','nothingToDisplayContainer')
		ele.append(container);
	}
	else {
		let index = parseInt(localStorage.getItem(currentTier()[2]));
		let limit = 0;
		for (let i = lsHistory.length - 1; i >= 0 ; i--) { //Navigating lsHistory
			if (limit < parseInt(localStorage.getItem("OpenLogger/HistoryDisplayLimit"))) {
				let temp = lsHistory[i];
				if (temp[3][0].replace(" [C] ","") === currentTier()[0]) {
					let ele = document.getElementById("history_body") as HTMLDivElement;
					let container = document.createElement("div") as HTMLDivElement;
					container.setAttribute("class", "historyDisplayContainer");
					container.setAttribute('id','container' + temp[5]);

					if (temp[3][0].includes(" [C] ")) {
						let customSpan = document.createElement("span") as HTMLSpanElement;
						customSpan.setAttribute("class", "customSpan");
						customSpan.setAttribute("title", "Custom clue manually inserted.");
						customSpan.textContent = " [C] ";
						let countText = currentTierUpper() + " Clue" + ": " + index;

						let count = document.createElement("div") as HTMLDivElement;
						count.innerHTML = countText;
						count.setAttribute('class', 'historyCount');
						count.append(customSpan);
						container.append(count);
					}
					else {
						let count = document.createElement("div") as HTMLDivElement;
						count.textContent = (currentTierUpper()) + " Clue: " + index;
						count.setAttribute('class', 'historyCount');
						container.append(count);
					}

					let value = document.createElement("div") as HTMLDivElement;
					value.textContent = "Reward Value: "+temp[2].toLocaleString("en-US");
					value.setAttribute('class','historyValue');
					container.append(value);

					for (let j = 0; j < 9; j++) { // Navigating temp
						let nodevar = document.createElement("itembox") as HTMLDivElement;
						let imgvar = document.createElement("img") as HTMLImageElement;
						let quantvar = document.createElement("span") as HTMLSpanElement;
						
						if (temp[1][j] !== undefined) {
							imgvar = imgMaker(temp[0][j]);
							nodevar = nodeMaker(parseInt(temp[1][j]), temp[0][j], "history");
							quantvar = quantMaker(temp[1][j]);
						}
						else {
							imgvar = imgMaker("Transparent");
							nodevar.setAttribute("class", "node_history");
							nodevar.removeAttribute("title");
							quantvar.textContent = "";
						}

						nodevar.append(imgvar);
						nodevar.append(quantvar);
						container.append(nodevar);
					}
				
					let buttonbox = document.createElement("div") as HTMLDivElement;
					let button = document.createElement("div") as HTMLDivElement;
					buttonbox.setAttribute('class','buttonboxHistory');
					buttonbox.setAttribute('id','container'+temp[5]+'buttonbox');
					button.setAttribute('class','nisbutton historyButtonStyle');
					button.setAttribute('id','container'+temp[5]+'button');
					button.setAttribute('onClick','TEST.rollbackVeri("container'+temp[5]+'button")');
					button.textContent = "Delete";

					buttonbox.append(button);
					container.append(buttonbox);
					ele.append(container);
					index--;
					limit++;
				}
			}
			else {
				break;
			}
		}

		if (index == parseInt(localStorage.getItem(currentTier()[2]))) {
			let ele = document.getElementById("history_body") as HTMLDivElement;
			let container = document.createElement("div") as HTMLDivElement;
			container.textContent = "There's nothing to display. Start scanning!";
			container.setAttribute('class','nothingToDisplayContainer');
			ele.append(container);
		}
	}
}


export function rollbackVeri(id: any) {
	let buttonbox = document.getElementById(id+"box") as HTMLDivElement;
	let button = document.getElementById(id) as HTMLDivElement;
	buttonbox.removeChild(button);

	let buttonYes = document.createElement("div") as HTMLDivElement;
	let buttonNo = document.createElement("div") as HTMLDivElement;

	buttonbox.setAttribute('class','buttonBoxHistoryVerify');

	buttonYes.setAttribute('class','nisbutton buttonVerif');
	buttonYes.setAttribute('onclick','TEST.rollbackYes("'+id+'")');
	buttonYes.textContent = "Yes";

	buttonNo.setAttribute('class','nisbuttonblue buttonVerif');
	buttonNo.setAttribute('onclick','TEST.rollbackNo("'+id+'")');
	buttonNo.textContent = "No";

	buttonbox.append(buttonYes, buttonNo);
}


export function rollbackYes(id: any) {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Rolling back reward...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
	if (seeConsoleLogs) console.log("Rolling back reward from history...");

	let container = document.getElementById(id.replace('button', '')) as HTMLDivElement;
	container.remove();

	let pKey = parseInt(id.replace('container','').replace('button',''));

	let lsHistory = JSON.parse(localStorage.getItem("OpenLogger/History"));
	let temp = [];
	for (let i = 0; i < lsHistory.length; i++) {
		if (lsHistory[i][5] == pKey) {
			temp = lsHistory[i];
			lsHistory.splice(i, 1);
			localStorage.setItem("OpenLogger/History",JSON.stringify(lsHistory));
			break;
		}
	}
	
	for (let i = 0; i < temp[0].length; i++) {
		items[temp[0][i]].quantity[temp[3][0].replace(" [C] ","")] = items[temp[0][i]].quantity[temp[3][0].replace(" [C] ","")] - parseInt(temp[1][i]);
		updateItems();
	}

	// Decrease value and count
	localStorage.setItem(temp[3][1], JSON.stringify(JSON.parse(localStorage.getItem(temp[3][1])) - temp[2]));
	localStorage.setItem(temp[3][2], JSON.stringify(JSON.parse(localStorage.getItem(temp[3][2])) - 1));

	if (seeConsoleLogs) console.log("Removed",temp,":",pKey,"from LS");
	if (pKey == ((parseInt(localStorage.getItem("OpenLogger/PrimaryKeyHistory"))) - 1)) {
		(document.getElementById("rewards_value") as HTMLDivElement).textContent = "0";
		for (let i = 0; i < 9; i++) {
			(document.getElementById(rewardSlots[i]) as HTMLDivElement).textContent = "";
		}
	}

	let historyCount = document.getElementsByClassName('historyCount') as HTMLCollectionOf<HTMLDivElement>;
	let index = parseInt(localStorage.getItem(currentTier()[2]));
	for (let i = 0; i < parseInt(localStorage.getItem(currentTier()[2])); i++) {
		if (i >= parseInt(localStorage.getItem("OpenLogger/RollbackDisplayLimit"))) {
			break;
		}
		if (historyCount[i] == undefined) {
			continue;
		}
		historyCount[i].textContent = (currentTierUpper()) + " Clue: " + index;
		index--;
	}

	historyClear();
	historyInit();
	lootDisplay();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Previous rewards rolled back successfully!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
}


export function rollbackNo(id: any) {
	let buttonbox = document.getElementById(id+"box") as HTMLDivElement;
	removeChildNodes(buttonbox);
	buttonbox.setAttribute('class','buttonboxHistory');
	
	let button = document.createElement("div") as HTMLDivElement;
	button.setAttribute('class','nisbutton historyButtonStyle');
	button.setAttribute('id', id);
	button.setAttribute('onClick','TEST.rollbackVeri("'+id+'")');
	button.textContent = "Delete";

	buttonbox.append(button);
}


export function insertInitEx() {
	insertInit();
}


async function insertInit() {
	let title = document.getElementById("insert_tier_caps") as HTMLDivElement;
	title.textContent = currentTierUpper();
	title = document.getElementById("insert_tier_title_caps") as HTMLDivElement;
	title.textContent = currentTierUpper();

	let keys = Object.keys(items);
	let list = [["Blank", "~Nothing~", 0]];
	for (let i = 0; i < keys.length; i++) {
		if (items[keys[i]].tier.includes(currentTier()[0])) {
			list.push([keys[i], keys[i], items[keys[i]].order]);
		}
	}

	list.sort(function (a: any, b: any) { // https://stackoverflow.com/a/16097058
		if (a[2] === b[2]) return 0;
		else return (a[2] < b[2]) ? -1 : 1;
	});

	let itemBoxes = document.getElementsByClassName("items") as HTMLCollectionOf<HTMLSelectElement>;
	let quantBoxes = document.getElementsByClassName("item_quants") as HTMLCollectionOf<HTMLInputElement>;
	let valueBox = document.getElementById("value_input") as HTMLInputElement;
	valueBox.value = "0";

	for (let i = 0; i < itemBoxes.length; i++) {
		removeChildNodes(itemBoxes[i]) ;
		quantBoxes[i].value = "0";

		for (let j = 0; j < list.length; j++) {
			let option = document.createElement('option') as HTMLOptionElement;
			option.value = list[j][0].toString();
			option.textContent = list[j][1].toString();
			option.setAttribute('class', "insert_options");
			itemBoxes[i].append(option);
		}
	}
}


export async function fetchFromGE() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Fetching prices from GE...",a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
	}

	let items = []
	let quants = []
	let itemDivs = document.getElementsByClassName("items") as HTMLCollectionOf<HTMLSelectElement>
	let quantDivs = document.getElementsByClassName("item_quants") as HTMLCollectionOf<HTMLInputElement>

	for (let i = 0; i < itemDivs.length; i++) {
		if (itemDivs[i].options[itemDivs[i].selectedIndex].value == "Blank") {
			continue;
		}
		if (["Saradomin page", "Guthix page", "Zamorak page", "Armadyl page", "Bandos page", "Ancient page"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {	
			items.push((itemDivs[i].options[itemDivs[i].selectedIndex].value) + " 1");
		}
		else if (["Dragon platelegs-skirt ornament kit (or)", "Dragon platelegs-skirt ornament kit (sp)"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {
			items.push((itemDivs[i].options[itemDivs[i].selectedIndex].value).replace("-","/"));
		}
		else {
			items.push((itemDivs[i].options[itemDivs[i].selectedIndex].value));
		}
		quants.push(parseInt(quantDivs[i].value));
	}
	if (seeConsoleLogs) console.log("Fetched items from GE are", items, "quants are", quants);

	if (items.length == 0) {
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Nothing selected to fetch.\nTry selecting some items.",
				a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		if (seeConsoleLogs) console.log("No items...");
		return;
	}

	let prices = [];
	for (let i = 0; i < items.length; i++) {
		try {
			await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=" + items[i].replace("+","%2B").replace("+","%2B"))
  				.then(function(response) {
  				  return response.json();
  				})
  				.then(function(data) {
  				  prices.push(data[items[i]].price);
  				});
		} catch (e) {
			if (seeConsoleLogs) console.log("It failed... setting to 0...", items[i], items[i].replace("+","%2B").replace("+","%2B"));
			prices.push(0);
    	}
	}

	let grandTotal = 0;
	for (let i = 0; i < items.length; i++) {
		if (items[i] == "Coins") {
			grandTotal += quants[i];
		}
		else {
			grandTotal += (quants[i] * prices[i]);
		}
	}
	let ele = document.getElementById("value_input") as HTMLInputElement;
	ele.value = grandTotal + "";

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Prices fetched successfully!",
			a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	}
}


export function verifyInsert(event: Event) {
	if (seeConsoleLogs) console.log("Collecting info from insert...");
	let items = [];
	let quants = [];
	let totalPrice = parseInt((document.getElementById("value_input") as HTMLInputElement).value);
	let itemDivs = document.getElementsByClassName("items") as HTMLCollectionOf<HTMLSelectElement>;
	let quantDivs = document.getElementsByClassName("item_quants") as HTMLCollectionOf<HTMLInputElement>;

	removeChildNodes(document.getElementById("value_input") as HTMLDivElement);

	for (let i = 0; i < itemDivs.length; i++) {
		if (itemDivs[i].options[itemDivs[i].selectedIndex].value == "Blank") {
			continue;
		}
		items.push(itemDivs[i].options[itemDivs[i].selectedIndex].value);
		quants.push(parseInt(quantDivs[i].value));
	}
	if (seeConsoleLogs) console.log("items verifying are", items, "quants are", quants);

	if (items.length == 0) {   
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Nothing selected to insert.\n\u200a\u200aTry selecting some items.",
				a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
		}
		if (seeConsoleLogs) console.log("No items...");
		event.stopPropagation();
		return;
	}

	let curr = (parseInt(localStorage.getItem(currentTier()[2])) + 1).toString();
	let ele = document.getElementById("insertVerif_body") as HTMLDivElement;
	let container = document.createElement("div") as HTMLDivElement;
	container.setAttribute("class", 'historyDisplayContainer');
	container.setAttribute('id','container' + curr);

	let customSpan = document.createElement("span") as HTMLSpanElement;
	customSpan.setAttribute("class", "customSpan");
	customSpan.setAttribute("title", "Custom clue manually inserted.");
	customSpan.textContent = " [C] ";

	let countText = currentTierUpper() + " Clue" + ": " + curr;
	let count = document.createElement("div") as HTMLDivElement;
	count.innerHTML = countText;
	count.setAttribute('class','historyCount');
	count.append(customSpan);
	container.append(count);

	let value = document.createElement("div") as HTMLDivElement;
	value.textContent = "Reward Value: " + totalPrice.toLocaleString("en-US");
	value.setAttribute('class','historyValue');
	container.append(value);

	for (let j = 0; j < 9; j++) { // Navigating temp
		let nodevar = document.createElement("itembox") as HTMLDivElement;
		let imgvar = document.createElement("img") as HTMLImageElement;
		let quantvar = document.createElement("span") as HTMLSpanElement;

		if (quants[j] !== undefined) {
			imgvar = imgMaker(items[j]);
			nodevar = nodeMaker(parseInt(quants[j]), items[j], "history");
			quantvar = quantMaker(quants[j]);
		}
		else {
			imgvar = imgMaker("Transparent");
			nodevar.setAttribute("class", "node_history");
			nodevar.removeAttribute("title");;
			quantvar.textContent = "";
		}

		nodevar.append(imgvar);
		nodevar.append(quantvar);
		container.append(nodevar);
	}
	
	let buttonbox = document.createElement("div") as HTMLDivElement;
	let button = document.createElement("div") as HTMLDivElement;
	buttonbox.setAttribute('class','buttonboxHistory');
	buttonbox.setAttribute('id','container'+ curr +'buttonbox');
	button.setAttribute('class','nisbutton historyButtonStyle');
	button.setAttribute('id','container'+ curr +'button');
	button.textContent = "Sample";

	let customTier = currentTier();
	customTier[0] += " [C] ";
	insertVerif = [items, quants, totalPrice, customTier];

	buttonbox.append(button);
	container.append(buttonbox);
	ele.append(container);

	if (seeConsoleLogs) console.log("Insert collected");
}


export function insertToDB() {
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Submitting custom clue to Database...",
			a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
	}
	
	let items = insertVerif[0];
	let quants = [];
	for (let i = 0; i < insertVerif[1].length; i++) {
		quants.push(insertVerif[1][i].toString());
	}
	let value = insertVerif[2];
	let tier = insertVerif[3];
	
	insertInit();
	submitToLS(items, quants, parseInt(value));
	addHistoryToLs(parseInt(value), items, quants, tier);
	lootDisplay();

	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Custom " + currentTier()[0] + " clue submitted successfully!",
			a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
	}
}


export function settingsInit() {
	if (seeConsoleLogs) console.log("Initializing settings...");

	if (seeConsoleLogs) console.log("Setting previously set radio button for Algorithm: " + localStorage.getItem("OpenLogger/Algorithm") + "...");
	let temp = localStorage.getItem("OpenLogger/Algorithm");
	let ele = document.getElementById(temp) as HTMLInputElement;
	ele.checked = true;

	if (seeConsoleLogs) console.log("Setting previously set radio button for ItemList: " + localStorage.getItem("OpenLogger/ItemList") + "...");
	temp = localStorage.getItem("OpenLogger/ItemList");
	ele = document.getElementById(temp) as HTMLInputElement;
	ele.checked = true;

	if (seeConsoleLogs) console.log("Setting previously set radio button for rerollToggle: " + localStorage.getItem("OpenLogger/rerollToggle") + "...");
	if (localStorage.getItem("OpenLogger/rerollToggle") == "true") {
		ele = document.getElementById("rerollon") as HTMLInputElement;
		ele.checked = true;
	}
	else if (localStorage.getItem("OpenLogger/rerollToggle") == "false") {
		ele = document.getElementById("rerolloff") as HTMLInputElement;
		ele.checked = true;
	}

	if (seeConsoleLogs) console.log("Setting previously set radio button for lagDetect: " + localStorage.getItem("OpenLogger/lagDetect") + "...");
	if (localStorage.getItem("OpenLogger/lagDetect") == "true") {
		ele = document.getElementById("lagon") as HTMLInputElement;
		ele.checked = true;
	}
	else if (localStorage.getItem("OpenLogger/lagDetect") == "false") {
		ele = document.getElementById("lagoff") as HTMLInputElement;
		ele.checked = true;
	}

	if (seeConsoleLogs) console.log("Setting previously set radio button for MultiButtonPressDetect: " + localStorage.getItem("OpenLogger/multiButtonPressDetect") + "...");
	if (localStorage.getItem("OpenLogger/multiButtonPressDetect") == "true") {
		ele = document.getElementById("multion") as HTMLInputElement;
		ele.checked = true;
	}
	else if (localStorage.getItem("OpenLogger/multiButtonPressDetect") == "false") {
		ele = document.getElementById("multioff") as HTMLInputElement;
		ele.checked = true;
	}

	if (seeConsoleLogs) console.log("Setting previously set radio button for noMenu: " + localStorage.getItem("OpenLogger/noMenu") + "...");
	if (localStorage.getItem("OpenLogger/noMenu") == "true") {
		ele = document.getElementById("menuon") as HTMLInputElement;
		ele.checked = true;
	}
	else if (localStorage.getItem("OpenLogger/noMenu") == "false") {
		ele = document.getElementById("menuoff") as HTMLInputElement;
		ele.checked = true;
	}
	
	if (seeConsoleLogs) console.log("Setting previously set radio button for hybridPrecision: " + localStorage.getItem("OpenLogger/hybridPrecision") + "...");
	ele = document.getElementById("hybrid_precision") as HTMLInputElement;
	ele.value = localStorage.getItem("OpenLogger/hybridPrecision");
	
	if (seeConsoleLogs) console.log("Setting previously set radio button for HistoryDisplayLimit: " + localStorage.getItem("OpenLogger/HistoryDisplayLimit") + "...");
	ele = document.getElementById("history_display_limit") as HTMLInputElement;
	ele.value = localStorage.getItem("OpenLogger/HistoryDisplayLimit");

	if (seeConsoleLogs) console.log("Settings initialized!");
}


export async function saveSettings(alg: string, list: string, reroll: string, lag: string, multi: string, menu: string, precision: string, limit: string) {
	buttonDisabler();
	if (seeConsoleLogs) console.log("Saving settings...");
	if (window.alt1) {
		alt1.overLayClearGroup("overlays");
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Saving settings...", a1lib.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
	}
	localStorage.setItem("OpenLogger/Algorithm", alg);
	localStorage.setItem("OpenLogger/ItemList", list);
	localStorage.setItem("OpenLogger/rerollToggle", reroll);
	localStorage.setItem("OpenLogger/lagDetect", lag);
	localStorage.setItem("OpenLogger/hybridPrecision", precision);
	localStorage.setItem("OpenLogger/HistoryDisplayLimit", limit);

	if (localStorage.getItem("OpenLogger/multiButtonPressDetect") !== multi) {
		localStorage.setItem("OpenLogger/multiButtonPressDetect", multi);
		if (seeConsoleLogs) console.log("Adjusting saved values")
		if (multi === "true") {
			if (localStorage.getItem("OpenLogger/autoCapture") === "true") {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Disable autocapture to use this button");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
			}
		}
		else if (multi === "false") {
			if (localStorage.getItem("OpenLogger/autoCapture") === "true") {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
			}
			else {
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
				(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
				(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
			}
		}
	}

	if (localStorage.getItem("OpenLogger/noMenu") !== menu) {
		localStorage.setItem("OpenLogger/noMenu", menu);
		noMenuCheck();
	}

	historyClear();
	historyInit();
	settingsInit();
	await arraySetup();
	buttonEnabler()
	
	if (window.alt1) {
		alt1.overLayClearGroup("overlays"); 
		alt1.overLaySetGroup("overlays");
		alt1.overLayTextEx("Settings saved!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
	}
	if (seeConsoleLogs) console.log("Settings saved!");
}


export function autoDisableCheckAuto(event: Event) {
	if ((document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.contains("enabled")) {
		toggleCapture(event);
	}
}


export function toggleCapture(event: Event) {
	if ((document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.contains("enabled")) {
		(document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.remove("enabled");
		localStorage.setItem("OpenLogger/autoCapture", "false");
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Autocapture disabled!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
		}
	}
	else {
		(document.getElementById("toggleunlocktrack") as HTMLDivElement).classList.add("enabled");
		localStorage.setItem("OpenLogger/autoCapture", "true");
		if (window.alt1) {
			alt1.overLayClearGroup("overlays");
			alt1.overLaySetGroup("overlays");
			alt1.overLayTextEx("Autocapture enabled!", a1lib.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
		}
	}
	autoCheck();

	if (event != undefined) {
		event.stopPropagation();
	}
}


function autoCheck() {
	if (localStorage.getItem("OpenLogger/autoCapture") === "true") {
		if (localStorage.getItem("OpenLogger/multiButtonPressDetect") === "true") {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Disable autocapture to use this button");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
		}
		autoCaptureInterval = window.setInterval(async function () {
			let promises = [];
			promises.push(autoCallCapture());
			await Promise.all(promises);
		}, 1000);
	}
	else {
		if (localStorage.getItem("OpenLogger/multiButtonPressDetect") === "true") {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
		}
		window.clearInterval(autoCaptureInterval);
		autoCaptureInterval = null;
	}
}


function autoCallCapture() {
	capture(true);
}


function noMenuCheck() {
	if (localStorage.getItem("OpenLogger/noMenu") === "true") {
		noMenuInterval = window.setInterval(async function () {
			let img = a1lib.captureHoldFullRs();
			let loc = img.findSubimage(imgs.trailComplete);

			let rewardreader = new ClueRewardReader();
			rewardreader.pos = ModalUIReader.find()[0];
			let value = rewardreader.read(img).value;
			let length = value.toString().length
			let comma = Math.floor(length / 3)
			if (seeConsoleLogs) console.log("Highlighting value...")
			
			if (window.alt1) {
				alt1.overLayClearGroup("nomenu");
				alt1.overLaySetGroup("nomenu");
				alt1.overLayRect(a1lib.mixColor(255, 50, 50), loc[0].x + 246 - (5 * length) + (1 * comma), loc[0].y + 94, 0 + (8 * length) + (4 * comma), imgs.trailComplete.height + 6, 60000, 2);
				alt1.overLayTextEx("NO MENUS HERE", a1lib.mixColor(255, 50, 50), 10, loc[0].x + 245, loc[0].y + 118, 50000, "", true, true);
			}
			
		}, 1000);
	}
	else {
		if (window.alt1) {
			alt1.overLayClearGroup("nomenu");
		}
		window.clearInterval(noMenuInterval);
		noMenuInterval = null;
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
	
	let lsHistory = JSON.parse(localStorage.getItem("OpenLogger/History"))
	let keys = Object.keys(items);
	let currOrder = 1;
	if (seeConsoleLogs) console.log("Generating CSV...");
	if (seeConsoleLogs) console.log("Getting values and counts...");

	let eCount = parseInt(localStorage.getItem("OpenLogger/ECount"))
	let eValue = parseInt(localStorage.getItem("OpenLogger/EValue"))
	let mCount = parseInt(localStorage.getItem("OpenLogger/MCount"))
	let mValue = parseInt(localStorage.getItem("OpenLogger/MValue"))
	let hCount = parseInt(localStorage.getItem("OpenLogger/HCount"))
	let hValue = parseInt(localStorage.getItem("OpenLogger/HValue"))
	let elCount = parseInt(localStorage.getItem("OpenLogger/ElCount"))
	let elValue = parseInt(localStorage.getItem("OpenLogger/ElValue"))
	let maCount = parseInt(localStorage.getItem("OpenLogger/MaCount"))
	let maValue = parseInt(localStorage.getItem("OpenLogger/MaValue"))

	csvinfo.push(["Total Count", eCount.toString(), 
								 mCount.toString(), 
								 hCount.toString(), 
								 elCount.toString(), 
								 maCount.toString()]);

	csvinfo.push(["Total Value", eValue.toString(), 
								 mValue.toString(), 
								 hValue.toString(), 
								 elValue.toString(), 
								 maValue.toString()]);

	if (seeConsoleLogs) console.log("Getting item quantities...");
	for (let i = 0; i < keys.length; i++) {
		for (let j = 0; j < keys.length; j++) {
			if (items[keys[j]].order == currOrder.toString()) {
				let val = items[keys[j]];
				let one = val.quantity.easy;
				let two = val.quantity.medium;
				let three = val.quantity.hard;
				let four = val.quantity.elite;
				let five = val.quantity.master;
				if (one == undefined || one == "0") { // .toLocaleString("en-US")
					one = "";
				} 
				else { 
					one = one.toString()
				}
				if (two == undefined || two == "0") {
					two = "";
				} 
				else { 
					two = two.toString()
				}
				if (three == undefined || three == "0") {
					three = "";
				} 
				else { 
					three = three.toString()
				}
				if (four == undefined || four == "0") {
					four = "";
				} else { 
					four = four.toString()
				}
				if (five == undefined || five == "0") {
					five = "";
				} 
				else { 
					five = five.toString()
				} 
				csvinfo.push([keys[j], one, two, three, four, five]);
				currOrder++;
				break;
			}
		}
	}
	csvinfo.push(["--------","--------","--------","--------","--------","--------","--------","--------","--------","--------","--------"])
	csvinfo.push(["--------","--------","--------","--------","--------","--------","--------","--------","--------","--------","--------"])
	csvinfo.push(["Captured Clue History", 'Parse tier at " : " and " [C] "','Parse items at " x "'])
	csvinfo.push(["Clue Tier & Count", "Clue Value", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9"])

	if (seeConsoleLogs) console.log("Setting history in csv...")
	for (let i = 0; i < lsHistory.length; i++) {
		let temp = [lsHistory[i][3][0] + " : " + lsHistory[i][4], lsHistory[i][2].toString()]
		for (let j = 0; j < 9; j++) {
			if (lsHistory[i][0][j] != undefined) {
				temp.push(parseInt(lsHistory[i][1][j]).toString() + " x " + lsHistory[i][0][j].toString())
			}
			else {
				temp.push("")
			}
		}
		csvinfo.push(temp)
	}

	const d = new Date();
	let csvContent = "";
	csvinfo.forEach(function (i) {
		let row = i.join(",");
		csvContent += row + "\r\n";
	});

	let filename = "OpenLogger CSV " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "_" + d.getHours() + "-" + d.getMinutes() + "-" +d.getSeconds()+ ".csv";
	let encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent);
	let link = document.createElement("a") as HTMLAnchorElement;
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


function nodeMaker(quant: number, item: string, attribute:string) {
	let nodevar = document.createElement("itembox") as HTMLDivElement
	if (attribute === "tab") {
		nodevar.setAttribute("class", "node_tab")
		nodevar.setAttribute('style', 'order: ' + orderChecker(parseInt(items[item].order), item) + ';');
	}
	else if (attribute === "history") {
		nodevar.setAttribute("class", "node_history")
	}
	else if (attribute === "recent") {
		nodevar.setAttribute("class", "node_recent")
	}
	nodevar.setAttribute('title', quant.toLocaleString("en-US") + " x " + item)
	return nodevar

}


function imgMaker(item: string) {
	let imgvar = document.createElement("img") as HTMLImageElement;
	imgvar.src = encodeURI("./images/items/" + item + ".png");
	imgvar.setAttribute('style', 'margin:auto;');
	imgvar.ondragstart = function() { return false; };
	return imgvar
}


function quantMaker(quant: number) {
	let quantvar = document.createElement("span") as HTMLSpanElement

	if (quant > 9999999 || quant < -9999999) {
		quantvar.setAttribute('class', 'quant_green_text');
		quantvar.textContent = Math.trunc(quant / 1000000).toString() + "M";
	}
	else if (quant > 99999 || quant > 9999 || quant < -9999 || quant < -99999) {
		quantvar.setAttribute('class', 'quant_white_text');
		quantvar.textContent = Math.trunc(quant / 1000).toString() + "k";
	}
	else {
		quantvar.setAttribute('class', 'quant_yellow_text');
		quantvar.textContent = quant + "";
	}
	return quantvar
}


function currentTier() {
	let currButton = "";
	for (let i = 0; i < tierlist.length; i++) {
		if ((document.getElementById(tierlist[i]) as HTMLInputElement).checked) {
			currButton = tierlist[i];
			if (currButton == 'easy') {
				return [currButton, "OpenLogger/EValue", "OpenLogger/ECount"];
			}
			else if (currButton == 'medium') {
				return [currButton, "OpenLogger/MValue", "OpenLogger/MCount"];
			}
			else if (currButton == 'hard') {
				return [currButton, "OpenLogger/HValue", "OpenLogger/HCount"];
			}
			else if (currButton == 'elite') {
				return [currButton, "OpenLogger/ElValue", "OpenLogger/ElCount"];
			}
			else if (currButton == 'master') {
				return [currButton, "OpenLogger/MaValue", "OpenLogger/MaCount"];
			}
		}
	}
}


function currentTierUpper() {
	return (currentTier()[0][0].toUpperCase() + currentTier()[0].slice(1).toLowerCase())
}


function removeChildNodes(div: any) { // https://stackoverflow.com/a/40606838
	while (div.firstChild) {
        div.firstChild.remove();
    }
}


function _base64ToImageData(buffer: string, width: any, height: any) { // https://stackoverflow.com/questions/68495924
    return new Promise(resolve => {
  	  	let image = new Image();
  	  	image.addEventListener('load', function (e) {
  	  	  	let canvasElement = document.createElement('canvas') as HTMLCanvasElement;
  	  	  	canvasElement.width = width;
  	  	  	canvasElement.height = height;
  	  	  	let context = canvasElement.getContext('2d');
  	  	  	context.drawImage(e.target as HTMLVideoElement, 0, 0, width, height);
  	  	  	resolve(context.getImageData(0, 0, width, height));
  	  	});
  	  	image.src = buffer;
  	});
}


export function toggleLootDisplay(id: string) {
	let lootdisplay = Array.from(document.getElementsByClassName('loot_display') as HTMLCollectionOf<HTMLElement>);
	let tab = document.getElementById(id) as HTMLInputElement;

	if (id == "broadcasts_rewards") {
		lootdisplay[0].style.display = (lootdisplay[0].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[0].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide broadcast rewards' : 'Click here to show broadcast rewards';
		opentabs[0] = (lootdisplay[0].style.display == 'flex') ? true : false;
	}
	else if (id == "general_rewards") {
		lootdisplay[1].style.display = (lootdisplay[1].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[1].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[1].style.display == 'flex') ? 'Click here to hide general rewards' : 'Click here to show general rewards';
		opentabs[1] = (lootdisplay[1].style.display == 'flex') ? true : false;
	}
	else if (id == "common_rewards") {
		lootdisplay[2].style.display = (lootdisplay[2].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[2].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[2].style.display == 'flex') ? 'Click here to hide common rewards' : 'Click here to show common rewards';
		opentabs[2] = (lootdisplay[2].style.display == 'flex') ? true : false;
	}
	else if (id == "rare_rewards") {
		lootdisplay[3].style.display = (lootdisplay[3].style.display == 'flex') ? 'none' : 'flex';
		tab.style.textDecoration = (lootdisplay[3].style.display == 'flex') ? 'none' : 'line-through';
		tab.title = (lootdisplay[3].style.display == 'flex') ? 'Click here to hide rare rewards' : 'Click here to show rare rewards';
		opentabs[3] = (lootdisplay[3].style.display == 'flex') ? true : false;
	}
	if (seeConsoleLogs) console.log(opentabs)

	let truecount = 0;
	for (let i = 0; i < opentabs.length; i++) {
		if (opentabs[i] == true) {
			truecount++;
		}
	}
	if (seeConsoleLogs) console.log(truecount)

	let minH = 0;
	if (truecount == 4) {
		minH = 25;
	}
	// Tinker with this. 
	// If you want to change the min heights for each thing, 
	// change variables starting below here
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


function updateItems() {
	localStorage.setItem("OpenLogger/items", JSON.stringify(items))
}


function orderChecker(order: number, item: string) {
	if (item == "Court summons") {
		order = 988
	}
	else if (item == "Guido's bonfire in a bottle") {
		order = 989
	}
	else if (item == "Bonus XP star (small)") {
		order = 990
	}
	else if (item == "Bonus XP star (medium)") {
		order = 991
	}
	else if (item == "Bonus XP star (large)") {
		order = 992
	}
	else if (item == "Bonus XP star (huge)") {
		order = 993
	}
	else if (item == "Re-roll token (easy)") {
		order = 994
	}
	else if (item == "Re-roll token (medium)") {
		order = 995
	}
	else if (item == "Re-roll token (hard)") {
		order = 996
	}
	else if (item == "Re-roll token (elite)") {
		order = 997
	}
	else if (item == "Re-roll token (master)") {
		order = 998
	}
	else if (item == "Sealed clue scroll (master)") {
		order = 999
	}
	else if (item == "Reward casket (easy)") {
		order = 1000
	}
	else if (item == "Reward casket (medium)") {
		order = 1001
	}
	else if (item == "Reward casket (hard)") {
		order = 1002
	}
	else if (item == "Reward casket (elite)") {
		order = 1003
	}
	else if (item == "Golden compass") {
		order = 1004
	}

	return order
}


function buttonDisabler() {
		if (localStorage.getItem("OpenLogger/autoCapture") !== "true") {
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "Currently disabled to due initialization, settings being saved, or autocapture");
			(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.setProperty("text-decoration", "line-through");
			(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "");
		}
		(document.getElementById("toggleunlocktrack") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("easy") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("medium") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("hard") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("elite") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("master") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_easy") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_medium") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_hard") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_elite") as HTMLDivElement).setAttribute("onclick", "");
		(document.getElementById("label_master") as HTMLDivElement).setAttribute("onclick", "");
		buttonDisabletoggle = false
}


function buttonEnabler() {
	if (localStorage.getItem("autoCapture") !== "true") {
		(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("title", "");
		(document.getElementById("docapturebuttonwords") as HTMLDivElement).style.removeProperty("text-decoration");
		(document.getElementById("docapturebutton") as HTMLDivElement).setAttribute("onclick", "TEST.capture(false)");
	}
	(document.getElementById("toggleunlocktrack") as HTMLDivElement).setAttribute("onclick", "TEST.toggleCapture(event)");
	(document.getElementById("easy") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('easy', event);");
	(document.getElementById("medium") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('medium', event);");
	(document.getElementById("hard") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('hard', event);");
	(document.getElementById("elite") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('elite', event);");
	(document.getElementById("master") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('master', event);");
	(document.getElementById("label_easy") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('easy', event);");
	(document.getElementById("label_medium") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('medium', event);");
	(document.getElementById("label_hard") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('hard', event);");
	(document.getElementById("label_elite") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('elite', event);");
	(document.getElementById("label_master") as HTMLDivElement).setAttribute("onclick", "TEST.changeClueTierSpan('master', event);");
	buttonDisabletoggle = true
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