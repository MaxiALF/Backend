const selector = document.querySelector("#home");
selector.addEventListener("click", async () => {
  try {
    location.replace("/")
  } catch (error) {
    throw error
  } 
}); 