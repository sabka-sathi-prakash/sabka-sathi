const textarea = document.getElementById("problem");
const saveBtn = document.getElementById("saveBtn");
const msg = document.getElementById("msg");
const list = document.getElementById("list");

let problems = JSON.parse(localStorage.getItem("problems")) || [];

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString(); // date + time
}

function render() {
  list.innerHTML = "";
  problems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${item.text}</strong><br>
        <small>🕒 ${formatDate(item.time)}</small>
      </div>
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

saveBtn.addEventListener("click", () => {
  const value = textarea.value.trim();
  if (value === "") {
    msg.innerText = "❌ Kuch likhiye";
    return;
  }

  problems.push({
    text: value,
    time: Date.now()
  });

  localStorage.setItem("problems", JSON.stringify(problems));
  textarea.value = "";
  msg.innerText = "✅ Save ho gaya (Date & Time ke sath)";
  render();
});

function removeItem(i) {
  problems.splice(i, 1);
  localStorage.setItem("problems", JSON.stringify(problems));
  render();
}

render();
