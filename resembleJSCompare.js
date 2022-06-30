// Focus on this later.
//import compareImages from "resemblejs/compareImages"
//config.entry("worker", "dist/resembleJSCompare.js");

onmessage = function (e){
    console.log("Message received from main:", e[0])
    console.log("Message received from main:", e[1])
    var percent = 0
    compareImages(e[0], e[1], { output: {}, ignore: "less" }).then(data => {
        percent = data.rawMisMatchPercentage;
        postMessage(percent);
        //this.close();
    })
}