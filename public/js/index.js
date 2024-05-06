let items = localStorage?.notes ? JSON.parse(localStorage?.notes) : [];

const container = document.querySelector("#notes");
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

new Sortable(container, {
  animation: 150,
  onEnd: function (evt) {
    const item = items[evt.oldIndex];
    if (item !== undefined) {
      items.splice(evt.oldIndex, 1);
      items.splice(evt.newIndex, 0, item);
      localStorage.setItem("notes", JSON.stringify(items));
    }
  },
  forceFallback: isFirefox
});

function clipboard(e) {
  if (navigator.clipboard) {
    Toastify({
      text: copiedMessage[currentLang] + " 🥳",
      gravity: "top",
      position: "center",
      className: "font-mono",
      style: {
        padding: ".5rem 1rem",
        background: "#fff",
        color: "#000",
        fontWeight: "500",
        borderRadius: ".35rem",
      },
    }).showToast();
    return navigator.clipboard.writeText(e.textContent);
  } else {
    console.error("Error al copiar texto.");
  }
}

function loadNotes(func) {
  const html = document.querySelector("#notes");
  html.innerHTML = "";
  const data = localStorage.notes? JSON.parse(localStorage.notes) : []

  if (data.length > 0) {
    for (const e of data) {
      const button = document.createElement("button");
      button.className = `flex ring ring-white/20 ring-1 cursor-pointer transition duration-200 hover:bg-white/10 active:scale-95 bg-white/5 text-white font-medium p-4 rounded-lg w-full h-48 overflow-hidden whitespace-break-spaces insetShadow ${func}`;
      button.textContent = e;
      button.setAttribute("onclick", `${func}(this)`);
      html.appendChild(button);
    }
  } else {
    const message = document.createElement("small");
    message.className = "text-white";
    message.textContent = "No notes around.";
    message.setAttribute("data-en", "No notes around");
    message.setAttribute("data-es", "No hay notas por aqui.");
    html.appendChild(message);
  }
}

function createNote(e) {
  if (e.note.value) {
    const data = localStorage.notes ? JSON.parse(localStorage.notes) : [];
    localStorage.notes = JSON.stringify([...data, e.note.value.trim()]);
    items = [...data, e.note.value.trim()];

    loadNotes("clipboard");
    loadDeleteMode(false);
    e.reset();

    Toastify({
      text: createMessage[currentLang] + " 🥳",
      gravity: "top",
      position: "center",
      className: "font-mono",
      style: {
        padding: ".5rem 1rem",
        background: "#fff",
        color: "#000",
        fontWeight: "500",
        borderRadius: ".35rem",
      },
    }).showToast();
  } else {
    Toastify({
      text: "⛔️ " + missingMessage[currentLang],
      gravity: "top",
      position: "center",
      className: "font-mono",
      style: {
        padding: ".5rem 1rem",
        background: "rgb(153,27,27)",
        color: "#fff",
        fontWeight: "500",
        borderRadius: ".35rem",
      },
    }).showToast();
  }
}

function loadDeleteMode(option) {
  if (option) {
    document.querySelector("#deleteOn").classList.add("hidden");
    document.querySelector("#deleteOff").classList.remove("hidden");
    loadNotes("deleteNote");
  } else {
    document.querySelector("#deleteOn").classList.remove("hidden");
    document.querySelector("#deleteOff").classList.add("hidden");
    loadNotes("clipboard");
  }
}

function deleteNote(e) {
  const data = localStorage.notes ? JSON.parse(localStorage.notes) : [];
  const filtered = data.filter((note) => note !== e.textContent);

  items = filtered;

  localStorage.notes = JSON.stringify(filtered);

  loadNotes("deleteNote");
}
