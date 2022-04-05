# OpenLogger
## An open-source Alt1 Plugin designed for tracking clue rewards
#### Report bugs or questions message me 🙂 -> Discord: RedX1000#3655
#### RuneApps forum page: https://runeapps.org/forums/viewtopic.php?pid=4751#p4751

*NOTE: Legacy Interface is currently not working, as it does not read correctly* 


## Description
This application was created to provide players with a way to easily record their clue scrolls in bulk, or over the course of their clue runs.

## How to install
### Copy and paste this into your browser to install automatically
#### alt1://addapp/https://redx1000.github.io/OpenLogger/appconfig.json
### Or use direct link
#### https://redx1000.github.io/OpenLogger
#### To install with the direct link
1. Copy the direct link
2. Open Alt1 applications and open the browser
3. Paste link in URL bar and press enter
4. Click Add App on the top of the page
5. Accept permissions and click confirm

 ## How to use
 ### Capture Rewards
1. Open a reward casket (Easy, Medium, Hard, Elite, Master)
    * Make sure clue reward window is not obfuscated in order to get a correct reading.
2. Press the Capture button or press Alt+1 to record the clue interface.
3. Wait a bit, recording takes between 1 - 5 second depending on the tier of clue and the amount of rewards in the window.
4. Rewards appear in the OpenLogger Interface along with the value, and a dynamic display that updates when new rewards come in, along with the total and average value for the number of completed clues.

### Clear Database
* Clear Database will refresh the LocalStorage for that one tier.
* It does **NOT** have a confirm window, so be careful not to click it on accident (Will try to add one later).

### Export to CSV
* Export to CSV will create a CSV value of the LocalStorage and allow the user to download the file
* This will be useful for storing data long term or for crowdsourcing data

### Rollback
* Rollback will rewind to the last rewards logged by one clue.
* Maybe support for further rollbacks will be added later, but for now you only get one.

## Planned updates & Releases
* Legacy interface support
* Clear database confirmation (`confirm()` does not work in Alt1)
* Allowing the user to deposit or withdraw a reward or value into or out of LocalStorage directly in case of a misread.
* Image collection choice for icon recognition
* Algorithm choice for icon recognition
* Rollback further than one


## Additional info
This plugin stores data using `localStorage` within Alt1. To completely refresh it:
1. Right click 
2. Inspect element
3. Application tab
4. Storage
5. Local Storage
6. right click the link
7. Clear
