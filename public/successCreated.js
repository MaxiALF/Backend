const socket = io();

const newProduct = {};

Swal.fire({
  title: "Product created!",
  allowOutsideClick: false,
});
then((obj) => {
  products.create = obj.value;
  (document.querySelector("#newProduct").innerHTML = user.name),
    socket.emit("user", user);
});
