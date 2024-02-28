const selector = document.querySelector("#register");
selector.addEventListener("click", async () => {
  try {
    const data = {
      name: document.querySelector("#Name").value,
      photo: document.querySelector("#Photo").value,
      email: document.querySelector("#Email").value,
      password: document.querySelector("#Password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json();
    if (response.statusCode === 201){
      alert(response.message)
    } else {
      const error = new Error("complete the form please!")
      throw error
    }
  } catch (error) {
    alert(error.message);
  }
});
