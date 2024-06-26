const params = new URLSearchParams(location.search);
const selector = document.querySelector("#text");
selector.value = params.get("title");
document.querySelector("#search").addEventListener("click", async () => {
  try {
    const text = selector.value;
    location.search = "title=" + text;
  } catch (error) {
    throw error
  }
});
