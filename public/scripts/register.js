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
    if (response.statusCode === 201) {
      swal
        .fire({
          title: "User registered!!",
          icon: "success",
        })
        .then(() => {
          window.location.href = "/auth/login";
        });
    } else {
      const error = new Error();
      throw error;
    }
  } catch (error) {
    swal.fire({
      title: "ERROR",
      text: "Complete the form please",
      icon: "error",
    });
  }
});
