document.querySelector("#btnOut").addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("api/sessions/signout", opts);
    response = await response.json();
    if (response.statusCode === 200) {
      alert(response.message);
      localStorage.removeItem("token");
      // location.replace("/");
    } else {
      const error = new Error("Already out!")
      throw error
    }
  } catch (error) {
    console.log(error);
    alert(error.message)
  }
});
