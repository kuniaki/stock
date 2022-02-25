"use strict";

function show(identifier) {
  const item = document.querySelectorAll(identifier);
  for (const i of item) {
    if (!i.classList.contains("hidden")) {
      i.classList.remove("hidden");
    }
  }
  console.log(`...${identifier} is added...`);
}

function hide(identifier) {
  const item = document.querySelectorAll(identifier);
  for (const i of item) {
    if (!i.classList.contains("hidden")) {
      i.classList.add("hidden");
    }
  }
  console.log(`...${identifier} is hidden...`);
}
