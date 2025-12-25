const textarea = document.getElementById("problem");
const saveBtn = document.getElementById("saveBtn");
const msg = document.getElementById("msg");
const list = document.getElementById("list");

let problems = JSON.parse(localStorage.getItem("problems")) || [];

function render() {
  list.innerHTML = "";
  problems.forEach((text, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${text} <button onclick="removeItem(${index})">❌</button>`;
    list.appendChild(li);
  });
}

saveBtn.addEventListener("click", () => {
  const value = textarea.value.trim();
  if (value === "") {
    msg.innerText = "❌ Kuch likhiye";
    return;
  }
  problems.push(value);
  localStorage.setItem("problems", JSON.stringify(problems));
  textarea.value = "";
  msg.innerText = "✅ Save ho gaya";
  render();
});

function removeItem(i) {
  problems.splice(i, 1);
  localStorage.setItem("problems", JSON.stringify(problems));
  render();
}

render();
