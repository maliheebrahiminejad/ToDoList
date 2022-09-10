// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filters");
// Get the modal
const modal = document.querySelector("#myModal");
const modalDiv = document.querySelector(".modalcontent");
// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// event lisitener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);

todoFilter.addEventListener("click", showCategory);
// show todo saved in localstorage
document.addEventListener("DOMContentLoaded", getLocalStorage);
// function

function addTodo(e) {
  // prevent refresh
  e.preventDefault();
  // error handeling
  try {
    // check input
    if (todoInput.value.length === 0) {
      throw "Please enter the task.";
    }
    // prevent insert repeat task
    if (searchInstorage(todoInput.value)) throw "It is repetitive task.";
    // add todoDiv to dom
    // 1. create todoDiv and assign class todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // 2.set todoDiv
    todoDiv.innerHTML = `<li>${todoInput.value}</li><span><i class="fa-solid fa-check-square"></i></span><span><i class="fa-solid fa-trash-can"></i></span>`;

    // 3.add to dom
    todoList.appendChild(todoDiv);
    // 4.add to storage
    addToStorage(todoInput.value);
    // 4.reset input
    todoInput.value = "";
  } catch (error) {
    modal.style.display = "block";
    const pTag = document.createElement("p");
    pTag.innerHTML = `<p>${error}</p>`;
    modalDiv.appendChild(pTag);
  }
}
function checkRemove(e) {
  //  todoInput.value=e.target.textContent;
  // check input
  const selectIcon = [...e.target.classList];
  //  console.log(selectIcon);
  // Array [ "fa-solid", "fa-check-square" , "fa-edit"]
  const item = e.target;

  // console.log(item.parentElement.parentElement);
  // <div class="todo">
  const todo = item.parentElement.parentElement;

  if (selectIcon[1] === "fa-trash-can") {
    removeLocalStorage(todo);
    todo.remove();
  } else if (selectIcon[1] === "fa-check-square") {
    todo.classList.toggle("completed");
  }
}

function showCategory(e) {
  //  هرچیزی که قسمت اچ تی ام ال داخل یو ال باشه نشون میده کدهایی که کامنت میزاریم فضا های خالی همه را پاک کردم
  const todos = [...todoList.childNodes];
  // NodeList [ div.todo.completed , div.todo] => if 2 todo added
  // 0: <div class="todo completed">
  // 0: <div class="todo ">
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      //   تو تایع قبل اگر روی ایکن چک کلیک میکردیم یه کلاس کامل شده به اپن دایو اضافه میشد حالا بر اساس اون سرچ می کنیم
      case "completed":
        if (todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
    }
  });
}
// هر موقع داخل دام ذخیره کردیم داخل حافظه محلی هم ذخیره کنیم برای حذف هم همین باشه
// همه چی تو حافظه محلی به صورت رشته ذخیره میشه و فقط تو مثال ما محتوای ال ای ذخیره میشه
// موقع حذف ان داوی که انتخاب کردیم و گزینه دلت را براش زدم محتوای ال ای اون را با کل حافظه
//  چک می کنیم و از داخل حافظه اون را \پاک می کنیم روش فیلتر میزنیم ارایه بدون اون را ذخیره می کنیم
function addToStorage(item) {
  let savedStorage = localStorage.getItem("value")
    ? JSON.parse(localStorage.getItem("value"))
    : [];
  savedStorage.push(item);
  localStorage.setItem("value", JSON.stringify(savedStorage));
}
// show storage => refresh
function getLocalStorage() {
  const savedStorage = localStorage.getItem("value")
    ? JSON.parse(localStorage.getItem("value"))
    : [];
  savedStorage.forEach((element) => {
    // console.log(element);
    // 1.create todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // 2.set todoDiv
    todoDiv.innerHTML = `<li>${element}</li><span><i class="fa-solid fa-check-square"></i></span><span><i class="fa-solid fa-trash-can"></i></span>`;

    // 3.add to dom
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  const todoText = todo.childNodes[0].innerHTML;
  let savedStorage = localStorage.getItem("value")
    ? JSON.parse(localStorage.getItem("value"))
    : [];
  const filtersTodos = savedStorage.filter((t) => t !== todoText);
  localStorage.setItem("value", JSON.stringify(filtersTodos));
}

function searchInstorage(searchItem) {
  let savedStorage = localStorage.getItem("value")
    ? JSON.parse(localStorage.getItem("value"))
    : [];
  return savedStorage.includes(searchItem);
}
// modal
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  modalDiv.removeChild(modalDiv.lastChild);
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalDiv.removeChild(modalDiv.lastChild);
  }
};
