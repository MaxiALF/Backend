const socket = io();

socket.on("products", (data) => { 
  const prodData = data
    .map(
      (each) => `
    <div class="card bg-secondary m-3" style="width: 18rem;">
      <img src="${each.photo}" class="card-img-top" alt="Product Image" />
      <div class="card-body">
      <h5 class="card-title">${each.title}</h5>
      <p class="card-text">${each.price}</p>
        <a href="#" class="btn btn-success">Añadir al carro</a>
      </div>
    </div>`
    )
    .join("");
  document.querySelector("#products").innerHTML = prodData;
});

document.querySelector("#newProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const data = {};
  title && (data.title = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);
  socket.emit("new product", data);
});
