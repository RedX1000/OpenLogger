# OpenLogger
### An open-source Alt1 Plugin designed for tracking clue rewards.
#### Report bugs or questions, message me 🙂 -> Discord: RedX1000#3655
#### RuneApps forum page: https://runeapps.org/forums/viewtopic.php?id=1442

* *NOTE: This project is currently in maintenance mode as it is feature complete. There are some plans for new features but they are not a priority for now. If something breaks due to RuneScape updates or if there are bugs, message me on Discord.*

* *NOTE: Legacy Interface mode works, but I don't test with it often, so use at your own risk, and report any crashes and bugs.* <br>

* *NOTE: When reporting a crash, please take a screenshot of the loot window and clue capture history send it to me. Use Windows Key + Shift + S, Lightshot, or Gyazo to take the screenshot to avoid distortion.*
<br><br>

### Table of Contents
* [Description](#description)
* [How to install](#how-to-install)
* [Instructions on how to use](#instructions-on-how-to-use)
    * [Selecting clue tier](#selecting-clue-tier)
    * [Capture Rewards](#capture-rewards)
    * [AutoCapture](#autocapture)
    * [Export to CSV](#export-to-csv)
    * [History (Rollback)](#history-rollback)
    * [Insert](#insert)
    * [Clear Options menu](#clear-options-menu)
    * [Toggleable loot tabs](#toggleable-loot-tabs)
* [Settings](#settings) 
    * [Image Searching Algorithm](#image-searching-algorithm)
    * [Reference Image Collection](#reference-image-collection)
    * [Miscellaneous Toggles](#miscellaneous-toggles)
* [Additional Information](#additional-information)
    * [Treasure trail log can disable OpenLogger](#treasure-trail-log-can-be-open-during-casket-openings-but-it-cannot-be-above-or-more-to-the-right-of-the-casket-window-otherwise-it-will-not-scan)
    * [Things to avoid accidentally covering when scanning](#when-scanning-clues-do-not-cover-these-spots-on-a-casket-open-screen)
    * [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value)
    * [Accessing `localStorage`](#this-plugin-stores-data-using-localstorage-within-alt1-therefore-it-can-remember-all-of-the-loot-you-have-gotten-between-sessions-unless-it-is-cleared-to-access-it)
    * [OpenLogger is flexy!](#openlogger-can-be-stretched-out-widthwise-to-display-more-of-the-loot-in-its-display-as-the-top-is-flexy)
    * [Potential or planned updates](#potential-or-planned-updates)
    * [Special thanks](#special-thanks) <br><br>

### Description
This application was created to provide players with a way to easily record their clue scroll rewards in bulk, or over the course of their clue runs, and to allow users to share their clue data with others. <br><br>

__OpenLogger works out of the box, so you don't have to adjust any settings if you don't want to.__ Select the tier of clue you're opening and manually capture or press the lock to autocapture clue rewards to begin logging! <br><br>

### How to install
 Copy and paste this link in your browser to install OpenLogger to Alt1 automatically <br>
`alt1://addapp/https://redx1000.github.io/OpenLogger/appconfig.json` <br>

 Or use direct link <br>
 https://redx1000.github.io/OpenLogger <br><br>
To install with the direct link
1. Copy the direct link.
2. Open Alt1 applications and open the browser.
3. Paste link in URL bar and press enter.
4. Click Add App on the top of the page.
5. Accept permissions and click confirm. <br><br>

![OpenLogger Tall](/Readme%20Images/OpenLogger%20Tall.png "OpenLogger Tall") <br><br>



# Instructions on how to use

### Selecting Clue Tier
* By selecting one of the radio buttons corresponding to the clue tier you're opening, it will tune OpenLogger to that specific tier.
* By default, Easy is selected, but OpenLogger remembers the last selected tier.
* There is only support for Easy, Medium, Hard, Elite, and Master tiers of clues.
* OpenLogger currently does not support Sandy clues, CS Week clues, or Oyster rewards.
* List of things affected by changing the clue tier:
    1. Capture rewards image library
    2. Rewards display
    3. Clear Options Menu clearing current tier
    4. History display of captured clues
    5. Insert menu <br><br>

### Capture Rewards
1. Select the tier of clue you're opening with the radio buttons in the top-left corner of the window (Easy, Medium, Hard, Elite, Master).
2. Open a reward casket (Easy, Medium, Hard, Elite, Master).
    * Make sure clue reward window is not covered in order to get a correct reading; list of things to not obfuscate at [Additional Information](#additional-information) and [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).
3. Press the Capture button, press Alt+1, or enable Autocapture to record the clue reward interface.
4. Wait a bit, recording can be less than 600ms or over 5 seconds seconds depending on the tier of clue, the amount of rewards in the window, the image searching algorithmn used, and the image collection library used (Some users experience longer times than usual. Tweak with the settings or DM me if this happens).
5. Rewards appear in the OpenLogger interface with the value, and a dynamic display that updates when new rewards come in, the total number of clues logged, and the total and average value for the number of completed clues. Captured clues are also saved within the [history](#history-rollback) for review and deletion. <br><br>

### Autocapture
* Clues can be autocaptured by clicking on the lock (Closed == On, Open == Off).
* This is turned off by default. Click the lock to enable it.
* When opening settings or Clear Options Menu buttons, autocapture is automatically disabled.
* **Be careful to not cover details in the clue window**, specifically "Current Reward Value: X" coins, "Reroll Reward ( X )", and the clue rewards. There is code in place to help avoid this for values, but it can happen if 2 values from the left are left uncovered. If this happens for items, perform a [rollback](#history-rollback).
* List of things to not hover over below at [Additional Information](#additional-information) and [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).
* Easy way to fix a misread is to disable autocapture, rolling it backand recapturing it. 
* If some items are not reading correctly when capturing, it is most likely caused by icons loading in. Check to see if [lag detection](#miscellaneous-toggles) settings are on in the OpenLogger [settings](#settings) and manually roll it back. The clue should be automatically recaptured.
* If OpenLogger reads the incorrect items displayed on screen, roll it back and try again. If it reads incorrectly again adjust your [image searching algorithm](#image-searching-algorithm) and [reference image library](#reference-image-collection) settings and try again. Feel free to reach out to my DMs on Discord for any questions on this.
* In the event of a multi-capture from not obfuscating the value or if, pause Autocapture, perform a rollback, and open the next casket, then re-enable autocapture.
* In the rare event that the value of the new clue is equivalent to the value of the previous clue, disable Autocapture and manually capture the reward. <br><br>

### Export to CSV
* Export to CSV will create a comma separated value file of the your clue rewards and clue history from `localStorage` and allows the user to download the file.
* This will be useful for storing data long term or for crowdsourcing data, i.e. A clan clue scroll opening event.<br>
![CSV Example](/Readme%20Images/CSV%20demo.png "CSV Example") <br>
![CSV Example](/Readme%20Images/CSV%20History%20demo.png "CSV History Example; Open image to see details") <br><br>

### History (Rollback)
* History will open a menu that displays every captured clue of the currently selected type that can be rolled back and deleted.
* By default, History will the display the last 25 items you've captured. This can be adjusted in the [Settings](#settings) under History Display Limit. 
* Rollbacks performed in History will remove the given items quantities, the currently selected clues' value, and its counter.
* When you click "Delete", verification buttons "Yes" and "No" will appear in it's place. Upon clicking yes, the given entry will be deleted from `localStorage` and the display will update to reflect this. If the deleted entry is the first in the list, the recently captured rewards display will clear itself. Clicking "No" will revert the button back to "Delete".<br>
* These displayed clues persist between sessions, so clues can be rolled back from `localStorage` at any time.
* This is great if you accidentally scan a clue twice, trigger a multi-capture, or if OpenLogger incorrectly identifies an item or value (Ways to mitigate multi-capture from value obfuscation jump to [Avoiding menus causing multi-capturing](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).) <br>
![History Example](/Readme%20Images/HistorySample.png "History Example") <br><br>

### Insert
* Insert allows users to directly manipulate `localStorage` by allowing users to add or subtract items by manually creating a new entry to be inserted into the database.
* To remove items from `localStorage`, make the value and quantities of items negative before inserting.
* The list of items avaible to be adjusted is determined by the currently selected clue tier.
* The Fetch GE button uses the Runescape Wiki's APIs for pulling the current price of the selected items and autofills the clue value based on the item prices and quantity.
* Entries inserted into `localStorage` are marked in the History menu with a <span style="color:red; font-size: 11px; font-family: trajan-pro-3;">[C]</span> which means "Custom".
* To insert items into `localStorage`:
    * Select the items you want to enter into the database.
    * Set the quantity of items you are trying to add.
    * Set the value manually or by selecting the "Fetch GE" button.
    * Click confirm and review the verification page.
    * Click confirm to add it into `localStorage`. <br><br>

### Clear Options Menu
* Clear Options Menu has multiple choices that determine the scope of how much you want to delete from the database of items.
* There are confirm windows for each option except Refresh page.
1. Reset Settings: Sets settings back to default settings. Default settings are marked with an asterisk or in hover-over text.
2. Clear currently selected tier: Clears the database of quantities, values, and clue counts from the currently selected tier.
3. Clear all items from database: Clears the database of quantities, values, and clue counts from all tiers, Easy to Master.
4. Completely reset OpenLogger: Nuclear option, **COMPLETELY** resets OpenLoggers settings and database. This is a recommended last option for troubleshooting. A value within `localStorage` may or may not change between updates (I try not to), and if it turns out that it breaks it, give this a try, otherwise reach out to me on Discord and we'll chat about it 🙂. 
5. Refresh page: Refreshes the plugin webpage, does not delete anything.  <br><br>

### Toggleable loot tabs
* Click on the loot tab title to hide the loot, and click it again to show the loot.
* Hidden tabs will be strikethroughed, and the space below it will be hidden.
* Hovering over it will give a tooltip on whether you can hide or show the loot. <br><br>

## Settings
* Settings allow for user choice of Algorithm for icon recognition, list of reference images used for icon recognition, and for miscellaneous settings toggles.
* Hover over the corresponding buttons title to learn more about what it does. <br><br>

### Image Searching Algorithm
1. ResembleJS: Image recognition library using [`ResembleJS`](https://github.com/rsmbl/Resemble.js) that compares entire images and returns a percentage value. It is slow, but it is very accurate. 
    * Recommended image collections: OrgList or OrgMinus, for best speed results.
2. Pixelmatch: Image recognition library using [`Pixelmatch`](https://github.com/mapbox/pixelmatch) that compares images pixel by pixel for and returns a percentage value. It is very fast, but can be less accurate than ResembleJS.
    * Recommended image collections: OrgList or OrgMinus, but you can use any library with good speed. There is a known issue with TwoPlus and All Items libraries listed below.
    * Pixelmatch has an issue where some items read incorrectly while using TwoPlus and All Images, i.e. Huge plated adamant salvage being read as Huge plated rune salvage (hardcode patched). If this happens, try using Hybrid or ResembleJS or s end me a DM on discord if you run into other misreads with this configuration. 
3. Hybrid: A mix of the two. Pixelmatch runs first then ResembleJS. Great balance of speed and accuracy. Enabled by default.
    * Recommended image collections: OrgList and OrgMinus.
    * You could use TwoPlus or All Images for more items to compare. It shouldn't make a big difference in accuracy, especially with how Hybrid works. 
    * When using Hybrid, TwoPlus and All Images works perfectly, but takes longer.
    * Hybrid precision can be adjusted using Hybrid Alg Precision setting in the settings menu, listed below. <br><br>

### Reference Image Collection
1. All Items List: Complete, full list of reference images. Takes the longest to compare.
2. Two or more List: List of items, where items that appear in two or more tiers are compared with the clue tiers items. Takes the second longest to run.
3. Organized List: List of items where items are located in their respective tier. Best for a balance of speed and accuracy. Enabled by default.
4. Organized Minus: Smallest list of items. OrgList but with less duplicates. Best for speed, but worst for accuracy due to lower variance. <br><br>

### Miscellaneous Toggles
1. Reroll Detection: Determines whether rerolls should be detected or not when capturing clues. When on, rerolls trigger a rollback of the previous reward and logs the new rewards. 
2. Lag Detection: Determines whether lag should be detected when scanning clues. When on, it will try to rescan it again. In the event that it does not capture everything due to lag, perform a rollback and try again.
3. Multi button prevention: Prevents the user from accidentally multi-logging a clue by disabling the capture button when autocapture is on and when the plugin is trying to capture a clue.
4. No Menu Highlighter: Displays a box where the user should prevent menus appearing at all costs while AutoCapture is on. A menu appearing in this area could potentially cause a double capture, but it is rollback-able. More information on how to avoid a multi-capture, [click here](#avoiding-menus-causing-multi-capturing-a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value).
5. Hybrid Alg Precision: Allows the user to adjust the precision of the Hybrid image recognition algorithm.
    * The lower the value, the higher the precision. The higher the precision, the faster it runs, but the less accurate it could potentially be, and vice versa. 
    * Default value is 0.3, minimum value is 0.1, maximum value is 1.0. Setting this value higher or lower than this will be auto-capped.
6. History Display Limit: Limits the number of latest clues displayed within the History menu. Default value is 25, minimum value is 0. <br><br>

# Additional information
* ### Treasure trail log can be open during casket openings but it cannot be above or more to the right of the casket window, otherwise it <i><b>will not</b></i> scan.
    * This <i><b>is not</b></i> an okay placement of the log window: <br>![Bad log display](/Readme%20Images/bad%20log%20placement.png "Bad log placement")
    * This <i><b>is</b></i> an okay placement of the log window: <br>![Correct lo display](/Readme%20Images/good%20log%20placement.png "Good log placement")

* ### When scanning clues, do not cover these spots on a casket open screen.
    * EOC rewards display: <br>![EOC rewards display](/Readme%20Images/rewardsample.png "EOC Rewards")
    * Legacy rewards display: <br>![EOC rewards display](/Readme%20Images/rewardsamplelegacy.png "Legacy Rewards")
    * EOC Trail Complete in the corner:&nbsp;&nbsp; ![EOC Trail Complete in the corner](/dist/images/TrailComplete.data.png "Trail Complete")
    * Legacy Trail Complete on the top of the screen:&nbsp;&nbsp; ![Legacy Trail Complete on the top of the screen](/dist/images/TrailCompleteLegacy.data.png "Trail Complete Legacy")
    * Top left corner of EOC loot window:&nbsp;&nbsp; ![Top left corner of EOC loot window](/dist/images/eoctopleft.data.png "EOC Top left")
    * Bottom left corner of EOC loot window:&nbsp;&nbsp; ![Bottom left corner of EOC loot window](/dist/images/eocbotleft.data.png "EOC Bottom left")
    * Exit button of EOC loot window:&nbsp;&nbsp; ![Exit button of EOC loot window](/dist/images/eocx.data.png "EOC Exit button")
    * Top left corner of Legacy loot window:&nbsp;&nbsp; ![Top left corner of Legacy loot window](/dist/images/legacytopleft.data.png "Legacy Top left")
    * Bottom left corner of Legacy loot window:&nbsp;&nbsp; ![Bottom left corner of Legacy loot window](/dist/images/legacybotleft.data.png "Legacy Bottom left")
    * Exit button of Legacy loot window:&nbsp;&nbsp; ![Exit button of Legacy loot window](/dist/images/legacyx.data.png "Legacy Exit button")
    * EOC Current Reward Value <u><b><i>[INCLUDING NUMBERS](#a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value)</i></b></u>:&nbsp;&nbsp; ![EOC Current Reward Value INCLUDING NUMBERS](/dist/images/RewardValue.data.png "EOC Current Reward Value")
    * Legacy Current Reward Value <u><b><i>[INCLUDING NUMBERS](#a-few-tips-on-where-to-avoid-having-menus-appearing-over-the-value)</i></b></u>:&nbsp;&nbsp; ![Legacy Current Reward Value INCLUDING NUMBERS](/dist/images/RewardValueLegacy.data.png "Legacy Current Reward Value")
    * These words in the EOC reroll window:&nbsp;&nbsp; ![These words in the reroll window](/dist/images/rerollWindow.data.png "Reroll words")
    * The current value of rerolls remaining:&nbsp;&nbsp; ![The current value of rerolls remaining](/Readme%20Images/rerollnumbers.png "Reroll numbers")
    * **Everything else is free game to cover. More details below about preventing multi-capturing over the value** <br><br>

* ### Avoiding menus causing multi-capturing: A few tips on where to avoid having menus appearing over the value
    * It IS **_NOT_** safe to have a menu pop up if covering ONLY the value itself. OpenLogger WILL capture if you cover up the value such that ONLY the value is covered up like this:<br>![Menu covering only the value](/Readme%20Images/menu%20screen1.png "Menu covering only value")

    * It **_IS_** safe to hover over or right click items as long as the menu resulting from it can cover the "Current Reward Value" text, but try to avoid it. A few examples of safe menus:<br>
    ![Hover-over menu covering both value and 'Current Reward Value'"](/Readme%20Images/menu%20screen2.png "Hover-over menu covering both value and 'Current Reward Value'")<br>
    ![Right click menu covering only the 'Current Reward Value'"](/Readme%20Images/menu%20screen3.png "Right click menu covering only 'Current Reward Value'")
    * In the event that a capture is auto-triggered due to this, roll it back in the [History menu](#history-rollback) <br><br>

* ### This plugin stores data using `localStorage` within Alt1, therefore it can remember all of the loot you have gotten between sessions unless it is cleared. To access it:

    1. Right click the plugin anywhere <br>
    2. Click "Inspect element" <br>
    3. Click the "Application" tab <br>
    4. On the left-hand side, under "Storage", click "Local Storage" <br>
    5. Click the link under "Local Storage" <br>
        - To Clear `localStorage` completely it can be done in one of two ways: <br>   
            1. Select "Completely Reset OpenLogger" in the Clear Options Menu and select       "Reset Everything" (Easiest best choice). <br>
            2. Right click the link under Local Storage and select "Clear". <br><br>

* ### OpenLogger can be stretched out widthwise to display more of the loot in its display, as the top is flexy, and if you compress the bottom, you can have a minimal box for only seeing scanned items: 
    ![OpenLogger Tall Top](/Readme%20Images/OpenLogger%20Tall%20Top.png "OpenLogger Tall Top") <br>
    ![OpenLogger Wide Top](/Readme%20Images/OpenLogger%20Wide%20Top.png "OpenLogger Wide") <br>
    ![OpenLogger Wide](/Readme%20Images/OpenLogger%20Wide.png "OpenLogger Wide") <br><br>

### Potential or planned updates
* Better legacy interface support; I don't test with it much. Legacy interface can log clues and perform lag detection checks, but I do not have a reroll window detection set for legacy mode, and I would need to iron out any bugs or kinks that appear. Use at your own risk.
* Allowing download of last clue reward captured. <br><br>

### Special thanks
* Skillbert, for creating Alt1 and providing the tools and libraries to create third-party applications.
* Dala/Daladen, for not only providing me with an insight into how the Summit Clue Logger worked to help write OpenLogger and for general web dev help, but also for providing all of the reference images for image comparison. Could not have done this project without those images.
* Athabastyx, for the technical help and Javascript insight. This is my first JS/TS project and Atha helped a lot with helping me understand new functions, libraries, and how to optimize things better.
* All the people I've reached out to and have provided help regarding JS/TS and Alt1 plugin questions through the [Runeapps Discord channel](https://discord.com/invite/G3SbcS8) and DMs. 
* The [Clue Chaser Discord channel](https://discord.gg/cluechasers) for the near-endless amounts of clue reward screenshots to test on.
* Everyone reaching out to report bugs and make suggestions. <br><br>
