document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/sessions/", { method: "POST" })
    .then((res) => res.json())
    .then((res) => {
      if (res.statusCode === 200) {
        document.querySelector(".addToCart").classList.remove("d-none");
      }
    });
});

const selector = document.querySelector(".addToCart");
selector.addEventListener("click", async (event) => {
  try {
    const data = { product_id: event.target.id };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/orders", opts);
    response = await response.json();
    if (response.statusCode === 201){
      swal
      .fire({
        title: "Added product!",
        icon: "success",
      })
      .then(() => {
        window.location.href = "/orders";
      });
    }
  } catch (error) {
    throw error
  }  
});
