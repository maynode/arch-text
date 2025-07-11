import ArchText from "../src/core";

const init = () => {
  const text = "Hello World! This is a test!";
  const app = document.querySelector("#app");
  app!.innerHTML = `<div id="wrapper">${text}</div>`;

  new ArchText("#wrapper", {
    radius: 100,
    dir: 1,
    rotate: true,
    reverse: false,
  });
};

init();
