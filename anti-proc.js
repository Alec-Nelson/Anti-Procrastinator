
function clickHandler(e){
  setTimeout(addText, 1);
}
function clickClearHandler(e){
  setTimeout(clearList, 1);
}

// global string for cookie list will be stored in
var listCookie = "ListItemsCookie";

//Loads array of list items from cookie
//pushes new list item to array
//adds new list item to internal html
//saves array new string into same cookie
function addText()
{
  var json_str = getCookie(listCookie);
  var array = JSON.parse(json_str);
	var word = document.getElementById('inputText').value;
  if (word == ''){
    return;
  }
  document.getElementById('inputText').value = "";
  if (!Array.isArray(array))
  {
    // alert("It is creating new array");
   var array = [];
  }
  array.push(word);
  // alert("Length of array is: " + array.length);
  var element = document.getElementById("list");
  element.innerHTML = "";
  for (i = 0; i < array.length; i++)
  {
    var newItem = document.createElement("li");
    var newBox = document.createElement("input");
    newBox.type = "checkbox";
    var node = document.createTextNode(array[i]);
    newItem.appendChild(newBox);
    newItem.appendChild(node);
    element.appendChild(newItem);
    (function(newItem, newBox) {newBox.addEventListener("change", function()
                  {checkBox(newItem, newBox)});
                }
    )(newItem, newBox);
  }
  var json_str = JSON.stringify(array);
  setCookie(listCookie, json_str);
}

//loads List on Extension start up
//
function retrieveList()
{
  var json_str = getCookie(listCookie);
  var array = JSON.parse(json_str);
  if (!Array.isArray(array))
  {
    alert("It is creating new array");
    var array = [];
  }
   var element = document.getElementById("list");
   var index = 0;
   var newItem;
  for (i = 0; i < array.length; i++)
  {
    var newItem = document.createElement("li");
    var newBox = document.createElement("input");
    newBox.type = "checkbox";
    var node = document.createTextNode(array[i]);
    newItem.appendChild(newBox);
    newItem.appendChild(node);
    element.appendChild(newItem);
    //closure so function executes now and local variable is passed
    //each list item has a event listener with its own node
    (function(newItem, newBox) {newBox.addEventListener("change", function()
                  {checkBox(newItem, newBox)});
                }
    )(newItem, newBox);
  }
}

//Clear's List of all entries
//saves empty array into cookie
function clearList()
{
  var element = document.getElementById("list");
  element.innerHTML = "";
  setCookie(listCookie, "[]");
}

//executes whenever a checkBox
//is checked
function checkBox(listItem, listBox){

  // alert(listItem.textContent + " is checked: " + listBox.checked);
  if (listBox.checked)
  {
    listItem.style.color = "grey";
    listItem.style.textDecoration = "line-through";
    var json_str = getCookie(listCookie);
    var array = JSON.parse(json_str);
    array.splice(array.indexOf(listItem.textContent), 1);
    var json_str = JSON.stringify(array);
    setCookie(listCookie, json_str);
  }
  else {
    listItem.style.color = "darkblue";
    listItem.style.textDecoration = "";

  }

}

//Sets Cookie String
//cname- String name of cookie
//cvalue- new String to be saved in cookie
function setCookie(cname, cvalue) {
    var d = new Date();
    document.cookie = cname + "=" + cvalue + ";";
}


//Retrieves String saved in cookie
//cname- name of cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//jquery on popup load
//takes li html elements draggable
// reorganized with jquery library
$( function() {
  $("#list").sortable();
  $("#list").disableSelection();
  $("#list").on( "sortupdate", function( event, ui ) {
    //Event triggered on drag end
    var json_str = getCookie(listCookie);
    var array = JSON.parse(json_str);
    var tempArray =  document.getElementsByTagName("li");
    //retrieves list in html and updates array in cookie
    for (var i = 0; i < array.length; i++)
    {
      array[i] = tempArray[i].textContent;
    }
    var json_str = JSON.stringify(array);
    setCookie(listCookie, json_str);
  } );
  // $("#checkbox").change(function() {
  //   alert("checked");
  //     var $this = $(this);
  //     //$this will contain a reference to the checkbox
  //     if ($this.is(':checked')) {
  //         alert("checked");
  //     } else {
  //         // the checkbox was unchecked
  //         alert("unchecked");
  //     }
  // });

});
// } );





//On Extension Window load, attatches all Event Listeners
//Loads Current List
//Sets Enter key as Enter button and delete key as clear
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("clearButton").addEventListener("click", clearList);
  document.querySelector('button').addEventListener('click', addText);
  document.addEventListener("load", retrieveList());
 document.getElementById("inputText").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { clickHandler(); }
    else if(e.keyCode == 46) {clickClearHandler(); }
}, false);
});
