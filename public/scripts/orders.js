document.addEventListener("DOMContentLoaded", () => {
  const selectors = document.querySelectorAll(".btnDelete");
  selectors.forEach((each) =>
    each.addEventListener("click", async (event) => {
      try {
        const url = "/api/orders/" + event.target.id;
        const opts = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        let response = await fetch(url, opts);
        response = await response.json();
        if (response.statusCode === 200) {
          swal.fire({
            title: "SUCCESS",
            text: "Product deleted",
            icon: "success",
          })
          .then(() => {
            location.reload() });
        }
      } catch (error) {
        throw error
      }
    })
  );

  document.querySelectorAll(".increment").forEach(button => {
    button.addEventListener("click", async (event) => {
      const productId = getProductIdFromButton(event.target.id);
      const quantityElement = document.querySelector(`#quantity_${productId}`);
      let currentQuantity = parseInt(quantityElement.textContent);
      currentQuantity++;
      quantityElement.textContent = currentQuantity;
      await updateQuantity(productId, currentQuantity); 
    });
  });

  document.querySelectorAll(".decrement").forEach(button => {
    button.addEventListener("click", async (event) => {
      const productId = getProductIdFromButton(event.target.id);
      const quantityElement = document.querySelector(`#quantity_${productId}`);
      let currentQuantity = parseInt(quantityElement.textContent);
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityElement.textContent = currentQuantity;
        await updateQuantity(productId, currentQuantity);
      }
    });
  });

  document.querySelector("#confirm").addEventListener("click", async () => {
    try {
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch("/api/payments/checkout", opts);
      response = await response.json();
      location.replace(response);
    } catch(error) {
      throw error;
    }
  });

  function getProductIdFromButton(buttonId) {
    return buttonId.split("_")[1]; 
  }

  async function updateQuantity(productId, newQuantity) {
    try {
      const url = "/api/orders/" + productId;
      const opts = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      };
      let response = await fetch(url, opts);
      response = await response.json();
    } catch (error) {
      throw error
    }
  }
});
