# OpenLogger
## An open-source Alt1 Plugin designed for tracking clue rewards.
#### Report bugs or questions message me 🙂 -> Discord: RedX1000#3655
#### RuneApps forum page: https://runeapps.org/forums/viewtopic.php?pid=4751

* *NOTE: Legacy Interface mode works, but I don't test with it often, so use at your own risk, and report any crashes and bugs.* <br>

* *NOTE: When reporting a crash, please take a screenshot of the loot window and send it to me. Use Windows Key + Shift + S, Lightshot, or Gyazo to take the screenshot to avoid distortion.*

## Description
This application was created to provide players with a way to easily record their clue scrolls in bulk, or over the course of their clue runs, and to allow users to share their data with other users.

## How to install
### Click this link to install Openlogger to Alt1 automatically
#### <alt1://addapp/https://redx1000.github.io/OpenLogger/appconfig.json><br><br>
### Or use direct link
#### https://redx1000.github.io/OpenLogger <br>
#### To install with the direct link
1. Copy the direct link.
2. Open Alt1 applications and open the browser.
3. Paste link in URL bar and press enter.
4. Click Add App on the top of the page.
5. Accept permissions and click confirm.<br><br>

 # Instructions on how to use
 ### Capture Rewards
1. Open a reward casket (Easy, Medium, Hard, Elite, Master).
    * Make sure clue reward window is not obfuscated in order to get a correct reading, list of things to not obfuscate at the bottom.
2. Press the Capture button, press Alt+1, or enable Autocapture to record the clue interface.
3. Wait a bit, recording takes between 1 - 5 second depending on the tier of clue, the amount of rewards in the window, the image searching algorithmn used (WIP), and the image collection library used.
4. Rewards appear in the OpenLogger Interface with the value, and a dynamic display that updates when new rewards come in, along with the total and average value for the number of completed clues.

### Autocapture
* Clues can be autocaptured by clicking on the lock (Closed == On, Open == Off).
* This is turned off by default. Click the lock to enable it.
* Be careful when obfuscating details in the clue window, more specifically "Current Reward Value: X" coins and "Reroll Reward ( X )". 
* List of things to not hover over below at Additional Info.
* Easy way to fix a misread is to disable autocapture and rolling back and recapturing it.
* If items are not read when capturing, it is most likely caused by icons loading in. Check to see if Lag Detection settings are on in the OpenLogger settings and manually rollback and the clue should be automatically recaptured.
* In the event of a double-read, pause Autocapture, rollback, and open the next casket, then re-enable autocapture.

### Export to CSV
* Export to CSV will create a CSV value of the LocalStorage and allow the user to download the file.
* This will be useful for storing data long term or for crowdsourcing data.

### Rollback
* Rollback will rewind to the last rewards logged by one clue.
* Maybe support for further rollbacks will be added later, but for now you only get one.

## Clear Options Menu
* Clear DB Options has multiple choices that determine the scope of how much you want to delete from the Database of items.
* There are confirm windows for each option.
1. Clear currently selected tier: Clears the database of quantities, values, and clue counts from the currently selected tier.
2. Clear all items from database: Clears the database of quantities, values, and clue counts from all tiers, Easy to Master.
3. Completely reset OpenLogger: Nuclear option, **COMPLETELY** resets OpenLoggers settings and database. This is a recommended last option for troubleshooting. A value within `localStorage` may or may not change between updates (I try not to), and if it turns out that it breaks it, give this a try, otherwise reach out to me and we'll chat about it 🙂.
4. Reset Settings: Sets settings back to default settings. Default settings are marked with an asterisk or in hover-over text.
5. Refresh page: Refreshes the plugin, does not delete anything. That is all. It may help with potential updates, but we'll see.

## Toggleable loot tabs
* Click on the loot tab title to hide the loot, and click it again to show the loot.
* Hidden tabs will be strikethroughed, and the space below it will be hidden.
* Hovering over it will give a tooltip on whether you can hide or show the loot.

## Settings
* Settings allow for user choice of Algorithm for icon recognition, list of reference images used for icon recognition, and for miscellaneous settings toggles.
* Hover over the corresponding buttons title to learn more about what it does.

### Image Searching Algorithm
1. ResembleJS: Image recognition library using [`ResembleJS`](https://github.com/rsmbl/Resemble.js) that compares entire images and returns a percentage value. It is slow, but it is very accurate. 
    * Recommended image collections: OrgList or OrgMinus, for best speed results.
2. Pixelmatch: Image recognition library using [`Pixelmatch`](https://github.com/mapbox/pixelmatch) that compares images pixel by pixel for and returns a percentage value. It is very fast, but can be less accurate than ResembleJS.
    * Recommended image collections: OrgList or OrgMinus, but you can use any library with good speed. There is a known issue with TwoPlus and All Items libraries listed below.
    * Pixelmatch has an issue where some items read incorrectly while using TwoPlus and All Images, such as Huge plated adamant salvage being read as Huge plated rune salvage. Send me a DM on discord if you run into other misreads with this configuration. 
3. Hybrid: A mix of the two. Pixelmatch runs first then ResembleJS. Great balance of speed and accuracy.
    * Recommended image collections: OrgList and OrgMinus.
    * You could use TwoPlus or All Images for more items to compare. It shouldn't make a big difference in accuracy, especially with how Hybrid works. 
    * When using Hybrid, TwoPlus and All Images works perfectly, but takes longer.
    * Hybrid precision can be adjusted using Hybrid Alg Precision setting in the settings menu, listed below.

### Reference Image Collection
1. All Items List: Complete, full list of reference images. Takes the longest to compare.
2. Two or more List: List of items, where items that appear in two or more tiers are compared with the clue tiers items. Takes the second longest to run.
3. Organized List: List of items where items are located in their respective tier. Best for a balance of speed and accuracy.
4. Organized Minus: Smallest list of items. OrgList but with less duplicates. Best for speed, but worst for accuracy due to lower variance.

### Miscellaneous Toggles
1. Reroll detection: Determines whether rerolls should be detected or not when capturing clues. When on, rerolls trigger a rollback of the previous reward and logs the new rewards. 
2. Lag Detection: Determines whether lag should be detected when scanning clues. When on, it will try to rescan it again. In the event that it does not capture everything due to lag, perform a manual rollback and try again.
3. Multi button prevention: Prevents the user from accidentally double-logging a clue by disabling the capture button when autocapture is on and when the plugin is trying to capture a clue.
4. Hybrid Alg Precision: Allows the user to adjust the precision of the Hybrid image recognition algorithm. The lower the value, the higher the precision. The lower the precision, the faster it runs, but the less accurate it could potentially be, and vice versa. Default value is 0.3, minimum value is 0.1, maximum value is 1.0. Setting this value higher or lower than this will be auto-capped.

## Potential and planned updates & Releases
* Better legacy interface support. I don't test with it much. Legacy interface can log clues and perform lag detection checks, but I do not have a reroll window detection set for legacy mode, and I would need to iron out any bugs or kinks that appear. Use at your own risk.
* Allowing the user to deposit or withdraw a reward or value into or out of LocalStorage directly in case of a misread.
* Rollback further than one.
* Allowing download of last clue reward captured.

## Special thanks
* Skillbert for creating Alt1 and providing the tools and libraries to create third-party applications.
* Dala/Daladen for not only prviding me with an insight into how the Summit Clue Logger worked to help write OpenLogger and for general web dev help, but also for providing all of the reference images for image comparison. Could not have done this project without those images.
* Athabastyx for the technical help and Javascript insight. This is my first JS/TS project and Atha helped a lot with helping me understand new functions, libraries, and how to optimize things better.
* All the people I've reached out to and have provided help regarding JS/TS and Alt1 plugin questions through Runeapps Discord's #development channel and DMs. 
* Everyone reaching out to report bugs and make suggestions.

## Additional info
* When scanning clues, do not obfuscate these spots on a casket open screen.
    * EOC rewards display: ![EOC rewards display](/dist/images/rewardsample.png "EOC Rewards")
    * Legacy rewards display: ![EOC rewards display](/dist/images/rewardsamplelegacy.png "Legacy Rewards")
    * EOC Trail Complete in the corner: ![EOC Trail Complete in the corner](/dist/images/TrailComplete.data.png "Trail Complete")
    * Legacy Trail Complete on the top of the screen: ![Legacy Trail Complete on the top of the screen](/dist/images/TrailCompleteLegacy.data.png "Trail Complete Legacy")
    * Top left corner of EOC loot window: ![Top left corner of EOC loot window](/dist/images/eoctopleft.data.png "EOC Top left")
    * Bottom left corner of EOC loot window: ![Bottom left corner of EOC loot window](/dist/images/eocbotleft.data.png "EOC Bottom left")
    * Exit button of EOC loot window: ![Exit button of EOC loot window](/dist/images/eocx.data.png "EOC Exit button")
    * Top left corner of Legacy loot window: ![Top left corner of Legacy loot window](/dist/images/legacytopleft.data.png "Legacy Top left")
    * Bottom left corner of Legacy loot window: ![Bottom left corner of Legacy loot window](/dist/images/legacybotleft.data.png "Legac Bottom left")
    * Exit button of Legacy loot window: ![Exit button of Legacy loot window](/dist/images/legacyx.data.png "Legacy Exit button")
    * EOC Current Reward Value INCLUDING NUMBERS: ![EOC Current Reward Value INCLUDING NUMBERS](/dist/images/RewardValue.data.png "EOC Current Reward Value")
    * Legacy Current Reward Value INCLUDING NUMBERS: ![Legacy Current Reward Value INCLUDING NUMBERS](/dist/images/RewardValueLegacy.data.png "Legacy Current Reward Value")
    * These words in the EOC reroll window: ![These words in the reroll window](/dist/images/rerollWindow.data.png "Reroll words")
    * The current value of rerolls remaining: ![The current value of rerolls remaining](/dist/images/rerollnumbers.png "Reroll numbers")
    * **Everything else is free game to hover over**<br><br>

* This plugin stores data using `localStorage` within Alt1, therefore it can remember all of the loot you have gotten between sessions unless it is deleted. To completely refresh it:
    * Select "Completely Reset OpenLogger" in the Clear Options Menu and select "Reset Everything" or:
    1. Right click 
    2. Inspect element
    3. Application tab
    4. Storage
    5. Local Storage
    6. right click the link
    7. Clear
