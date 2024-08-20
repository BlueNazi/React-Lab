// dom nodes
const btn = document.querySelector("button");
const input = document.querySelector("input");
const root = document.getElementById("root");

// model
const STUDENTS = [];

// functions
function addStudent() {
  const studentObj = {
    name: input.value,
  };
  STUDENTS.push(studentObj);
  render(STUDENTS);
  input.value = "";
}

function handleDelete(index) {
  STUDENTS.splice(index, 1);
  render(STUDENTS);
}

function editHandler(index) {
  const editBtn = document.querySelectorAll(".edit")[index];

  if (editBtn.textContent === "edit") {
    editBtn.textContent = 'done';
    input.value = STUDENTS[index].name;
  } else {
    const updatedStudent = { name: input.value };
    STUDENTS.splice(index, 1, updatedStudent);
    editBtn.textContent = 'edit';
    input.value = "";
    render(STUDENTS);
  }
}

// view
function render(list) {
  const template = list.map((item, index) => {
    return `<li>
              <span>${item.name}</span>
              <button onclick="handleDelete(${index})">Delete</button>
              <button class='edit' onclick="editHandler(${index})">edit</button>
            </li>`;
  });
  root.innerHTML = template.join("");
}

// events
btn.addEventListener("click", addStudent);
render(STUDENTS);
