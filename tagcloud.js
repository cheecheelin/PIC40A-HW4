
/* ******************************************************************************************************************************************
MAKING THE CLOUD
 **************************************************************************************************************************************** */

var tag=[]; var freq=[]; var theMax=0; var strArr;

function makeCloud(){
    //grab contents of textarea as a string of tags separated by spaces
    var str= document.getElementById("tags").value;

    //parse string into an array of tag strings (use split function)
    strArr = str.split(" ");

    //sort by lexicographic ordering (use sort function)
    strArr.sort();

    //create two arrays
        //unique tag array + corresponding frequency array (parallel array)
    //write helper function to keep track of maximum frequency for tags
     var counter=0;

    for (var i=0; i<strArr.length; i++){
        if (strArr[i]== strArr[i+1]) {
            counter++;}
        else{
            tag.push(strArr[i]);
            freq.push(counter);
            counter = 1;
        }
    }
    theMax= maxFreq(freq);

    //for debugging purposes
    //alert (tag.join());
    //alert (freq.join());
    //alert (theMax);

    //create div element containing all tags as span elements (use a helper function) //how do i get every tag and add as span obj?
    var newDiv= createNewDiv(tag);


    //use DOM to set css (a .1em solid silver border for div, blue background, silver foreground, and extra large serif font)
    newDiv.style.background= "blue";
    newDiv.style.border= "2px solid silver";
    //newDiv.style.msoForeground= "silver";
    newDiv.style.fontSize= "x-large";
    newDiv.style.fontFamily= "serif";
    newDiv.style.display=  "inline-block";
    newDiv.style.padding= "10px";




    //remove the div element belonging to tagcloud.html and replace it with new div, should be in the same position in the DOM tree as the old div was

    appendDiv(newDiv);




}

/* ******************************************************************************************************************************************
HELPER FUNCTIONS GO HERE
**************************************************************************************************************************************** */
//helper function to keep track of maximum frequency
function maxFreq(arr){
    for (var i=0; i<arr.length; i++){
        if (arr[i+1]>arr[i])
            var max= i+1;
    }
    return max;
}

function createNewDiv(arr){
    var newDiv= document.createElement("div");
    for (var i=0; i<arr.length; i++){
        var myFruitSpan= document.createElement("span");

        myFruitSpan.innerHTML= arr[i]+" ";
        myFruitSpan.setAttribute("onclick", "alert("+freq[i]+ ")");
        myFruitSpan.style.fontSize= sizeOfFruit(freq[i],theMax);

        newDiv.appendChild(myFruitSpan);
    }
    return newDiv;
}


function appendDiv(newDiv){
    var nodeToReplace= document.getElementsByTagName("div");
    nodeToReplace[0].parentNode.replaceChild(newDiv,nodeToReplace[0]);
}

//determine font size function
function sizeOfFruit(freq, max){
    var fruitSize= 20*(freq/max)+15;
    return fruitSize+"pt";
}





/* ******************************************************************************************************************************************
 FUNCTIONS THAT DEAL WITH COOKIES
 **************************************************************************************************************************************** */


function saveCloud(){

    var cloudContent=  document.getElementById("tags").value;
    document.cookie="my_cookie="+ cloudContent;
    expires="Fri, 1 Jan 2016 12:00:00 UTC; path=/";
    alert(document.cookie);
}

function loadCloud(){
    var findCookie= document.cookie.split("=")[1].split(";")[0];
    var bakeCookie= document.getElementById("tags");
    bakeCookie.value= findCookie;
}

function clearArea(){
    document.getElementById("tags").value= "";
}


