// This js file handles node creation and attachment.
// by Chris Vought
// for CIS213's class project

// This file was never meant to be minified and therefore uses long names (i.e. jQuery() instead of $()).
// Additionally, variables and functions are always declared before they are used and anonymous functions are kept to a minimum.
// This is all meant for pure readability.

// Dependencies:
// JQuery 1.12.4 or above


// The UL is hard coded into the HTML document and does not need to be created.
// All other LI nodes are to be created by this file.

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

// The date/time stamp meant to be applied to the JSON/array when the stop button is pressed.
function DTstampJSON(){
    return new Date().toDateString() + "  " + new Date().toLocaleTimeString();
}

// Adds the new node as second to the last since the last is the carousel.
function attachToUL(nodeIn) {
    var element_dieUL = document.getElementById("dieUL");
    element_dieUL.appendChild(nodeIn);
    
    
    
    console.log("attachToUL - finished");
}

// Meant to build a roll's LI node similar to the following example.
// <li class="dieLI list-group-item"><span class="badge">2</span><img class="dieListImg" src="img/Die_4_face.svg" alt="1"><h3>4</h3></li>
function buildRollLiNode(currentCount){
    // Convienience variable
    var rollCount = rollTrack.length - 1;

    console.log("buildRollLiNode - begin");
    
    // Create all nodes one at a time.
    // LI node - creation
    var LInode = document.createElement("li");
    LInode.setAttribute("class","dieLI list-group-item");
    
    // LI > span node - creation
    var spanNode = document.createElement("span");
    spanNode.textContent = rollCount;
    spanNode.setAttribute("class","badge");
    
    // LI > img node - creation
    var imgNode  = document.createElement("img");
    imgNode.setAttribute("class","dieListImg");
    imgNode.setAttribute("src","img/Die_" + currentCount + "_face.svg");
    imgNode.setAttribute("alt",currentCount);
    
    // LI > H3 node - creation
    var h3Node  = document.createElement("h3");
    h3Node.textContent = currentCount;
    
    console.log("buildRollLiNode - nodes created");
    
    // Attach all nodes from the bottom up.
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
    document.getElementById("totalHeading").innerHTML = totalNow;
}

// Append a single roll's LI to the document.
function rollNow(){
    rollCurrent = Math.round(Math.random() * 5 + 1);
    rollTrack.push(rollCurrent);
    
    rollTotal += rollCurrent;
    displayTotal(rollTotal);
    
    buildRollLiNode(rollCurrent);
}

// Stop timer and append stop li to list of rolls.
function stopNow(){
    clearInterval(timing);
    timing = false;
    rollTrack.push("Stopped " + DTstampJSON());
    
    buildStopLiNode();
}

// Meant to build a roll's LI node similar to the following example.
//      <li class="dieLI list-group-item"><span class="badge">x</span><img class="dieListImg" src="img/pauseBars_steelBlue.svg" alt="x"><h3>1:19:39 AM&nbsp;&nbsp;&nbsp;&nbsp;Sun Oct 02 2016</h3></li>
function buildStopLiNode(){
    console.log("buildStopLiNode - begin");
    // Create all nodes one at a time.
    // LI node - creation
    var LInode = document.createElement("li");
    LInode.setAttribute("class","dieLI list-group-item");
    
    // LI > span node
    var spanNode = document.createElement("span");
    LInode.appendChild(spanNode);    
    spanNode.textContent = "x";
    spanNode.setAttribute("class","badge");
    
    // LI > img node - creation
    var imgNode  = document.createElement("img");
    LInode.appendChild(imgNode);
    imgNode.setAttribute("class","dieListImg");
    imgNode.setAttribute("src",STOP_SVG);
    imgNode.setAttribute("alt","stopped");
    
    // LI > H3 node - creation
    var h3Node  = document.createElement("h3");
    LInode.appendChild(h3Node);
    console.log("buildStopLiNode - appended child nodes");
    h3Node.textContent = DTstampHTML();
    
    console.log("buildStopLiNode - created node");
    
    
    attachToUL(LInode);
}

// Automatically roll on a 5 second timer.
function startRolling(){
    timing = setInterval(rollNow, ROLLTIME);
}

// Toggles on/off state of automatic rolls when #originLI is clicked.
function toggleAutoRoll(){
    if(timing == undefined || false){
        startRolling();
    }else{
        clearInterval(timing);
        stopNow();
        timing = false;
    }
}

// Reset counter to 0.
function resetTotal() {
    rollTotal = 0;
    displayTotal(rollTotal);
}

function scrollToBottom(element){}
