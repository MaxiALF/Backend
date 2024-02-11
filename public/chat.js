const socket = io();

const user = {};

Swal.fire({
  title: "type your name",
  input: "text",
  inputValidator: (name) => !name && "type your name",
  allowOutsideClick: false,
}).then((obj) => {
  user.name = obj.value;
  (document.querySelector("#name").innerHTML = user.name),
    socket.emit("user", user);
});

const newChat = document.querySelector("#text");
newChat.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    socket.emit("new chat", { name: user.name, message: newChat.value });
    newChat.value = "";
  }
});

socket.on("all", (data) => {
  data = data
    .map(
      (each) =>
        `<p class="text-dark"><span class="fw-bolder">${each.name}:</span> ${each.message}<p>`
    )
    .join("");
  document.querySelector("#chats").innerHTML = data;
}); 