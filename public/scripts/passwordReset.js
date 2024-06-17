const selector = document.querySelector("#SendUp");
selector.addEventListener("click", async () => {
  try {
    const token = window.location.pathname.split('/').pop();
    const data = {
      password: document.querySelector("#passwordReset").value,
      email: document.querySelector("#emailReset").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch(`/api/sessions/reset/${token}`, opts);
    response = await response.json();
    if (response.statusCode === 200){
      swal.fire({
        title: "SUCCESS",
        text: "Password changed successfuly!",
        icon: "success",
      })
      .then(() => {
        window.location.href = "/auth/login"});
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
