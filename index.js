let button = document.querySelector("#button");
let value = document.querySelector("input");
let container = document.querySelector(".container");
let child = document.querySelector(".child");
let options = document.getElementById("options");
let menu = document.querySelector(".menu");
let markAll = document.querySelector("#markAll");
let delAll = document.querySelector("#delAll");
let delDone = document.querySelector("#delDone");
let listItemContaier = document.getElementById("listItemContaier");
const message = document.querySelector(".message");

//creating a localstorge if the user is runnig the site for the first time
if (!localStorage.getItem("todolist")) {
  let todolistarray = [];
  localStorage.setItem("todolist", JSON.stringify(todolistarray));
}
let array = JSON.parse(localStorage.getItem("todolist"));

//this button creates a list element based on the input value
button.addEventListener("click", function (e) {
  e.preventDefault();
  if (value.value !== "") {
    //adding values to the array and storing in localStorage
    array.unshift(value.value);
    localStorage.setItem("todolist", JSON.stringify(array));

    //creating a div element with a list class and appending it to a list element
    let content = document.createElement("div");
    content.classList.add("content");
    content.textContent = value.value;
    let list = document.createElement("div");
    list.append(content);

    //creating a div that contains the delete and done buttons
    let operations = document.createElement("div");
    operations.classList.add("operations");
    list.append(operations);

    //creating a delete btn for the listitems
    let del = document.createElement("a");
    del.classList.add("delbtn");
    del.innerHTML = "Delete";
    operations.append(del);

    //creating a done btn for the listitems
    let done = document.createElement("a");
    done.innerHTML = "Done";
    done.classList.add("donebtn");
    operations.append(done);

    list.classList.add("list");

    //adding the new element at the beginning
    listItemContaier.insertBefore(list, listItemContaier.firstElementChild);

    //reset the value of the input to empty
    value.value = "";

    //creating event listeners for the delete and done buttons
    del.addEventListener("click", function () {
      del.parentElement.parentElement.style.display = "none";
      let delvalue = array.indexOf(del.parentElement.previousSibling.innerText);
      array.splice(delvalue, 1);
      localStorage.setItem("todolist", JSON.stringify(array));
    });

    //creating event listeners for the done button
    done.addEventListener("click", function () {
      done.parentElement.previousSibling.classList.add("done");
      done.parentElement.parentElement.classList.add("doneParent");
      if (done.parentElement.previousSibling.innerText.slice(-2) !== "??") {
        let donelist = done.parentElement.previousSibling.innerText;
        let index = array.indexOf(donelist);
        let markdone = donelist + "??";
        array[index] = markdone;
      } else {
      }
      localStorage.setItem("todolist", JSON.stringify(array));
    });

    //accessing the firstElementChild of the listItemContainer
    let childe = listItemContaier.firstElementChild;
  } else {
    alert("input field must not be empty");
  }
});

//for showing and hiding the options menu
options.addEventListener("click", function () {
  if (!menu.classList.contains("none")) {
    menu.classList.add("none");
  } else {
    menu.classList.remove("none");
  }
});

//for setting a list to done
markAll.addEventListener("click", function () {
  let list = document.querySelectorAll(".list");
  //using a for loop to get the items from the array
  for (let i of list) {
    if (!i.classList.contains("doneParent")) {
      i.classList.add("doneParent");
    }
  }
  let content = document.querySelectorAll(".list .content");
  for (let y of content) {
    y.classList.add("done");

    //checking if the text contains ??
    if (y.innerText.slice(-2) !== "??") {
      let donelist = y.innerText;
      let index = array.indexOf(donelist);
      let markdone = donelist + "??";
      array[index] = markdone;
    } else {
    }
  }
  console.log(array);
  localStorage.setItem("todolist", JSON.stringify(array));
});

//for deleting all the list in the Dom and the LocalStorage
delAll.addEventListener("click", function () {
  let list = document.querySelectorAll(".list");
  for (let i of list) {
    i.style.display = "none";
  }
  let array = [];
  localStorage.setItem("todolist", JSON.stringify(array));
});

//for deleting the list that has been marked done
delDone.addEventListener("click", function () {
  let list = document.querySelectorAll(".list");
  for (let i of list) {
    if (
      i.classList.contains("doneParent") ||
      i.getAttribute("id") == "doneParent"
    ) {
      i.style.display = "none";
      let index = array.indexOf(i.firstElementChild.innerText);
      array.splice(index, 1);
      localStorage.setItem("todolist", JSON.stringify(array));
    }
  }
});

//using a for loop to take all items from the localstorage to display when the page loads
window.addEventListener("load", function () {
  this.setTimeout(function () {
    message.style.display = "none";
  }, 4000);
  console.log(array);
  for (let i of array) {
    let content = document.createElement("div");
    content.classList.add("content");
    if (i.slice(-2) !== "??") {
      content.textContent = i;
    } else {
      content.textContent = i.replace(i.slice(-2), "");
    }
    let list = document.createElement("div");
    list.append(content);

    let operations = document.createElement("div");
    operations.classList.add("operations");
    list.append(operations);

    let del = document.createElement("a");

    del.classList.add("delbtn");
    del.innerHTML = "Delete";
    operations.append(del);

    let done = document.createElement("a");

    done.innerHTML = "Done";
    done.classList.add("donebtn");
    operations.append(done);

    list.classList.add("list");
    child.appendChild(list);

    if (i.slice(-2) == "??") {
      i.replace(i.slice(-2), "");
      content.setAttribute("id", "done");
      list.setAttribute("id", "doneParent");
    }

    del.addEventListener("click", function () {
      del.parentElement.parentElement.style.display = "none";
      let delvalue = array.indexOf(del.parentElement.previousSibling.innerText);
      array.splice(delvalue, 1);
      localStorage.setItem("todolist", JSON.stringify(array));
    });

    done.addEventListener("click", function () {
      done.parentElement.previousSibling.classList.add("done");
      done.parentElement.parentElement.classList.add("doneParent");
      if (done.parentElement.previousSibling.innerText.slice(-2) !== "??") {
        let donelist = done.parentElement.previousSibling.innerText;
        let index = array.indexOf(donelist);
        let markdone = donelist + "??";
        array[index] = markdone;
      }
      localStorage.setItem("todolist", JSON.stringify(array));
    });
  }
});

//hides the options menu when any side apart from the option button is clicked
window.addEventListener("click", function (e) {
  if (e.target.getAttribute("id") == "options") {
  } else {
    menu.classList.add("none");
  }
});
