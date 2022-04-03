# OpenLogger
## An open-source Alt1 Plugin designed for tracking clue rewards
#### Report bugs or questions message me 🙂 -> Discord: RedX1000#3655

*NOTE: Legacy Interface is currently not working, as it does not read correctly* 

## Description
This application was created to provide players with a way to easily record their clue scrolls in bulk, or over the course of their clue runs.

## How to install
### Copy and paste this into your browser to install automatically
#### alt1://addapp/https://redx1000.github.io/OpenLogger/appconfig.json
### Or use direct link
#### https://redx1000.github.io/OpenLogger
#### To install with the direct link
1. Copy the link
2. Open the browser in Alt1
3. Paste link in the browser and go to page
4. Click Add App
5. Accept permissions and add it

 ## How to use
 ### Capture Rewards
1. Open a clue scroll
    * Make sure clue reward window is not obfuscated in order to get a correct reading.
2. Press the Capture button or press Alt+1 to record the clue interface.
3. Wait a bit, recording take between 2 - 5 second depending on the tier of clue and the amount of rewards in the window.
4. Rewards appear in the OpenLogger Interface along with the value, and a dynamic display that updates when new rewards come in, along with the total and average value for the number of completed clues.

### Clear Database
* Clear Database will refresh the LocalStorage for that one tier.
* It does **NOT** have a confirm window, so be careful not to click it on accident (Will try to add one later).

### Export to CSV
* Not working yet, but it is supposed to return a string value of all of the rewards in LocalStorage for data management purposes for the user.

### Self Insert Into DB
* Not working yet, but it is supposed to allow the user to deposit a reward or value into LocalStorage directly in case of a misread.

## Additional info
This plugin stores data using `localStorage` within Alt1. To completely refresh it:
1. Right click 
2. Inspect element
3. Application tab
4. Storage
5. Local Storage
6. right click the link
7. Clear
