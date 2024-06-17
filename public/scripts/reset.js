const selector = document.querySelector("#Send");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#emailReset").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/password", opts);
    response = await response.json();
    if (response.statusCode === 200){
        swal.fire({
          title: "SUCCESS",
          text: "Information Send it succesfully!",
          icon: "success",
        })
        .then(() => {
          window.location.href = "/"});
    } else {
      swal.fire({
        title: "ERROR",
        text: "Complete all fields",
        icon: "error",
      });
    }
  } catch (error) {
    throw error
  }
});
