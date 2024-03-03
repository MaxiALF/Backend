fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    if (res.statusCode === 200) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#btnReg"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#btnLog"));
      document.querySelector("#btnOut").addEventListener("click", async () => {
        try {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          if (response.statusCode === 200) {
            alert("Logged out!");
            localStorage.removeItem("token");
            location.replace("/");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#btnForm"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#btnOrder"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#btnOut"));
    }
    if (res.response?.role === 0) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#btnForm"));
    } else if (res.response?.role === 1) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#btnOrder"));
    }
  });
