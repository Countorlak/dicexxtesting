// This js file handles node creation and attachment for dice rolls onto a page.
// by Chris Vought

// Additionally, variables and functions are always declared before they are used and anonymous functions are kept to a minimum.
// Note that this file is never meant to be minified.
// It is meant to be meat-bag human readable.

// Dependencies:
// JQuery 1.12.4 or above (site uses 3.5.1 for bootstrap)


// The UL for rolls is hard coded into the HTML document and does not need to be created.
// All other LI nodes for die rolls are to be created by this file.

var rollCurrent;
var TAG_BR = "<br/>";
var TAG_HR = "<hr/>";
var rollTrack = ["Start"]; // Tracks all output for JSON.
var rollTotal = 0;
var timing; // Timer from rollNow() needs global scope. 
var ROLLTIME = 5000;
// These "constants" are purely relative to the document.
var ORIGIN_LI = document.getElementById("originLI");
var PAUSE_SVG = "img/pauseBars_steelBlue.svg";
var STOP_SVG = "img/pauseBars_steelBlue.svg";


// The date/time stamp meant to be applied to the document when the stop button is pressed.
function DTstampHTML(){
    return new Date().toDateString() + "\n" + new Date().toLocaleTimeString();
}

// WIP feature
// The date/time stamp meant to be applied to the JSON/array when the stop button is pressed.
function DTstampJSON(){
    return new Date().toDateString() + "  " + new Date().toLocaleTimeString();
}

// Adds the new node as last node.
function attachToUL(nodeIn) {
    var element_dieUL = document.getElementById("dieUL");
    element_dieUL.appendChild(nodeIn);
    
    console.log("attachToUL - finished");
}

// This function builds a roll's LI node that's similar to the following example:
// <li class="dieLI list-group-item"><span class="badge">2</span><img class="dieListImg" src="img/Die_4_face.svg" alt="1"><h3>4</h3></li>
function buildRollLiNode(currentCount){
    // Convenience variable
    var rollCount = rollTrack.length - 1;

    console.log("buildRollLiNode - begin");
    
    // Create all nodes one at a time.
    // LI node - creation
    var LInode = document.createElement("li");
    LInode.setAttribute("class","dieLI list-group-item");
    
    // LI > span node - creation
    var spanNode = document.createElement("span");
    spanNode.textContent = rollCount;
    spanNode.setAttribute("class","badge badge-pill badge-dark");
    
    // LI > img node - creation
    var imgNode  = document.createElement("img");
    imgNode.setAttribute("class","dieListImg");
    imgNode.setAttribute("src","img/Die_" + currentCount + "_face.svg");
    imgNode.setAttribute("alt",currentCount);
    
    // LI > H3 node - creation
    var h3Node  = document.createElement("h3");
    h3Node.setAttribute("class","rollText");
    h3Node.textContent = currentCount;
    
    console.log("buildRollLiNode - nodes created");
    
    // Attach all nodes from the top down.
    // LI > span node - append
    LInode.appendChild(spanNode);
    // LI > img node - append
    LInode.appendChild(imgNode);
    // LI > H3 node - append
    LInode.appendChild(h3Node);
    
    console.log("buildRollLiNode - child nodes attached");
    
    
    attachToUL(LInode);
}

// Display running total.
function displayTotal(totalNow) {
    document.getElementById("totalHeading").textContent = totalNow;
}

function scrollToBottom() {	
	$.scrollTo(Number.MAX_SAFE_INTEGER, 0);
}

function scrollToTop(){
    // Safari - scroll to top.
    document.body.scrollTop = 0;
    // Scroll to top on all other browsers.
    document.documentElement.scrollTop = 0;
}

// Generate roll, add to total, add corresponding <li> node to <ul>.
function rollNow(){
    rollCurrent = Math.round(Math.random() * 5 + 1);
    rollTrack.push(rollCurrent);
    
    rollTotal += rollCurrent;
    displayTotal(rollTotal);
    
    buildRollLiNode(rollCurrent);
	scrollToBottom();
}

// Stop timer and append stop <li> to list of rolls.
function stopNow(){
    clearInterval(timing);
    timing = false;
    rollTrack.push("Stopped " + DTstampJSON());
    
    buildStopLiNode();
	scrollToBottom();
}

// This function builds a roll's LI node that's similar to the following example:
// <li class="dieLI list-group-item"><span class="badge">x</span><img class="dieListImg" src="img/pauseBars_steelBlue.svg" alt="x"><h3>1:19:39 AM&nbsp;&nbsp;&nbsp;&nbsp;Sun Oct 02 2016</h3></li>
function buildStopLiNode(){
    console.log("buildStopLiNode - begin");
    // Create all nodes one at a time.
    // LI node - creation
    var LInode = document.createElement("li");
    LInode.setAttribute("class","dieLI list-group-item");
    
    // LI > span node - creation
    var spanNode = document.createElement("span");
    LInode.appendChild(spanNode);   
    spanNode.textContent = rollCount;
    spanNode.setAttribute("class","badge badge-pill badge-dark");
    
    // LI > img node - creation
    var imgNode  = document.createElement("img");
    LInode.appendChild(imgNode);
    imgNode.setAttribute("class","dieListImg");
    imgNode.setAttribute("src",STOP_SVG);
    imgNode.setAttribute("alt","stopped");
    
    // LI > H3 node - creation
    var h3Node  = document.createElement("h3");
    LInode.appendChild(h3Node);
    h3Node.setAttribute("class","rollText");
    console.log("buildStopLiNode - appended child nodes");
    h3Node.textContent = DTstampHTML();
    
    console.log("buildStopLiNode - created node");
    
    
    attachToUL(LInode);
}

// Automatically roll on a 5 second timer. 'Cuz why not?
function startRolling(){
    timing = setInterval(rollNow, ROLLTIME);
}

// Obsolete: duplicates function of play button without user knowing anything. Horrible design.
// Toggles on/off state of automatic rolls when #originLI is clicked.
// function toggleAutoRoll(){
    // if(timing == undefined || false){
        // startRolling();
    // }else{
        // clearInterval(timing);
        // stopNow();
        // timing = false;
    // }
// }

// Reset counter to 0.
function resetTotal() {
    rollTotal = 0;
    displayTotal(rollTotal);
}
