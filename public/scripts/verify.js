const selector = document.querySelector("#verify");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      verifiedCode: document.querySelector("#verifiedCode").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/verify", opts);
    response = await response.json();
    if (response.statusCode === 200) {
      swal.fire({
        title: "User verified!!!",
        icon: "success"
      }).then(() => {
        window.location.href = "/auth/login";
      });
    } else {
      const error = new Error()
      throw error
    }
  } catch (error) {
    swal.fire({
      title: "ERROR",
      text: "Invalid verified!",
      icon: "error"
    });
  } 
}); 