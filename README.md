# dicexxtesting
This project hosts a simplistic die roller with a counter. The counter tracks the total of your rolls since initialization or last reset.
Controls on the left include single roll, reset counter, and start 5 second interval auto rolls. 

## What is it?
The pages are static with the logic written in javascript. The approach was to create/modify/access what was needed as nodes. For instance, when modifying text, the text of a node was first accessed and then that node was modified accordingly. This is to ensure the correct child node is always specifically selected with no mishaps. 

## How to use it
There are 2 ways at the moment.
1. Visit the live github hosting at https://countorlak.github.io/dicexxtesting/
2. Download the repository and open the top level index file manually.

## Deprecated functions?
Nothing is deprecated. The toJSON functions do not work yet. These functions were meant to be used as a lead-in to other features such as saving to disk and possibly even collaboration later on. They will be left until they are used and are not deprecated.

## A little history
Primarily written in HTML5 and JavaScript this was originally written as a class project for Web Client Scripting. Since that time I've had the fortune of playing some board games with friends and thought it would be nice to have some simple tools available at all times. I'm hoping this will lead to a variety of branching projects in the future and I'll continue making them so long as they get use.
