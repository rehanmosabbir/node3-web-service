const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const messageOneEl = document.querySelector("#message-1");
const messageTwoEl = document.querySelector("#message-2");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputEl.value;
  messageOneEl.textContent = "Loading....";
  messageTwoEl.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      inputEl.value = "";
      if (data.error) {
        messageOneEl.textContent = `${data.error}`;
        messageTwoEl.textContent = "";
      } else {
        messageOneEl.textContent = `Location : ${data.location}`;
        messageTwoEl.textContent = `Current Temperature : ${data.currentTemp}°C`;
      }
    });
  });
});
