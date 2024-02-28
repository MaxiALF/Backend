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
      alert(response.message);
      location.replace("/");
    } else {
      const error = new Error("title, price & stock are required")
      throw error
    }
  } catch (error) {
    alert(error.message);
  } 
});