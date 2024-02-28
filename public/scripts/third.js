const send = document.querySelector("#google");
send.addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch('/api/sessions/google', opts);
    response = await response.json();
    if (response.statusCode === 200) {
      alert(response.message);
      response.session && location.replace("/");
    } else {
      const error = new Error("Error to loggin");
      throw error;
    }
  } catch (error) {
    alert(error.message);
  }
});
