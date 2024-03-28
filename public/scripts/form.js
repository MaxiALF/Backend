const selector = document.querySelector("#newProduct");
selector.addEventListener("click", async () => {
  try {
    const data = {
      title: document.querySelector("#title").value,
      photo: document.querySelector("#photo").value,
      price: document.querySelector("#price").value,
      stock: document.querySelector("#stock").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/products", opts);
    response = await response.json();
    if (response.statusCode === 201) {
      swal.fire({
        title: "Product created!",
        icon: "success"
      }).then(() => {
        window.location.href = "/";
      });
    } else {
      const error = new Error()
      throw error
    }
  } catch (error) {
    swal.fire({
      title: "ERROR",
      text: "title, price & stock are required",
      icon: "error"
    });;
  } 
});