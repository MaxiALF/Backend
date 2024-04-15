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
            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "Signout!!",
            }).then(() => {
              window.location.href = "/";
            });
            localStorage.removeItem("token");
          }
        } catch (error) {
          alert(error);
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
