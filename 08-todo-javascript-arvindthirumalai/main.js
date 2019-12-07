var apikey = "568839-c48ca3-37fc80-e05415-8b5254";
console.log(apikey);
document.getElementById("addtask").addEventListener("click", AddTask);
document.addEventListener("keydown", AddTask);
listallToDos();
function listallToDos()
{
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://cse204.work/todos", true);
  xhttp.setRequestHeader("x-api-key", apikey);
  xhttp.send();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    {
      document.getElementById("todolist").innerHTML = "";
      var ToDosArray = JSON.parse(this.responseText);
      console.log(ToDosArray);
      for(var i = 0; i < ToDosArray.length; i++)
      {
        var todotask = document.createElement("p");
        todotask.innerText = ToDosArray[i].text;
        todotask.setAttribute("id", ToDosArray[i].id);
        if(ToDosArray[i].completed === true)
        {
          todotask.className = "completed";
        }
        else
        {
          console.log("inside else statement");
          todotask.className = "notcompleted";
          console.log(todotask.className);
        }

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";
        deleteButton.className = "delbutton";
        deleteButton.setAttribute("id", ToDosArray[i].id);

        var checkbox = document.createElement("button");
        checkbox.innerHTML = "Complete";
        checkbox.setAttribute("id", ToDosArray[i].id);
        checkbox.setAttribute("class", "checkbox1");

        var tododiv = document.createElement("div");
        tododiv.className = "div";
        tododiv.append(todotask);
        tododiv.append(deleteButton);
        tododiv.append(checkbox);

        var linebreak = document.createElement("br");
        var hrbreak = document.createElement("hr");
        tododiv.append(linebreak);
        tododiv.append(hrbreak);

        document.getElementById("todolist").append(tododiv);
        deleteButton.addEventListener("click", remove);
        var bool = ToDosArray[i].completed;
        checkbox.addEventListener("click", complete);

      }
    }
}
console.log("completedlistallToDosMethod");
}
function AddTask()
{
  if(event.target.id == "addtask" || event.keyCode == 13)
  {
  if(document.getElementById("todotask").value != null && document.getElementById("todotask").value != "")
  {
    var newText = document.getElementById("todotask").value;
    var data = {
      text: newText
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", apikey);
    xhttp.send(JSON.stringify(data));
    xhttp.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status == 200)
      {
        listallToDos();
      }
    }
  }
  document.getElementById("todotask").value = "";
}
}
function remove()
{
  var id = event.target.getAttribute("id");
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "https://cse204.work/todos/" + id, true);
  xhttp.setRequestHeader("x-api-key", apikey);
  xhttp.send();
  xhttp.onreadystatechange = function()
  {
  if(this.readyState == 4 && this.status == 200)
  {
    console.log("readystate == 4 and status == 200");
    listallToDos();
  }
  else if (this.readyState == 4)
  {
    console.log(this.responseText);
  }
  }
}
function complete()
{
  var id = event.target.getAttribute("id");
  console.log(id);
  var xhttp = new XMLHttpRequest();
  var todo;
  xhttp.open("GET", "https://cse204.work/todos/" + id, true);
  xhttp.setRequestHeader("Content-Type","application/json");
  xhttp.setRequestHeader("x-api-key", apikey);
  xhttp.send();
  xhttp.onreadystatechange = function()
  {
    if(this.readyState == 4 && this.status == 200)
    {
      todo = JSON.parse(this.responseText);
      console.log(todo.completed);
      var data = {
        completed: !(todo.completed)
      }
      console.log(data);
      complete2(id, data, todo);
    }
    else if (this.readyState == 4)
    {
      console.log(this.responseText);
    }
  }
}
function complete2(id, data, todo)
{
  var xhttp2 = new XMLHttpRequest();
  xhttp2.open("PUT", "https://cse204.work/todos/" + id, true);
  xhttp2.setRequestHeader("Content-Type","application/json");
  xhttp2.setRequestHeader("x-api-key", apikey);
  xhttp2.send(JSON.stringify(data));
  xhttp2.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    {
      console.log("insideifstatement2");
      console.log(todo.completed);
      listallToDos();
    }
    else if (this.readyState == 4)
    {
      console.log(this.responseText);
    }
  }
}
