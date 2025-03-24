 let popup = document.getElementById("popup");
 let submitted = document.getElementById("submitted")

 function openPopup() {
    popup.classList.add("open-popup");
 }
 function closePopup() {
    popup.classList.remove("open-popup");
 }

 function openSubmit() {
    submitted.classList.add("open-submit")
 }
 function closeSubmit() {
    submitted.classList.remove("open-submit")
 }



const notes = document.getElementById("notes-popup");
  
function openNotes() {
  notes.classList.add("open-notes")
}
function closeNotes() {
  notes.classList.remove("open-notes")
}


 



const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");


const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}

const addOrUpdateTask = () => {
   if(!titleInput.value.trim()){
    alert("Please provide a title");
    return;
  }
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer()
  reset()
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, title, date }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Note:</strong> ${title}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
        `)
    }
);
};



const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
}

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;


  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");  
}

const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

if (taskData.length) {
  updateTaskContainer();
}

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    // Load saved states
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === "true") {
            checkbox.checked = true;
        }
        
        // Save state on change
        checkbox.addEventListener("change", function () {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });
});



const checkcounter = document.getElementById("checkcounter");
const checkboxes = document.querySelectorAll(".food-checkbox");

function updateCounter() {
    let checkedCount = document.querySelectorAll(".food-checkbox:checked").length;
    checkcounter.innerHTML = `Foods Checked: ${checkedCount}/38`;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateCounter);
});







