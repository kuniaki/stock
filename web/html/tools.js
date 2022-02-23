"use strict";

function show(identifier) {
  const item = document.querySelector(identifier);
  if (item.classList.contains("hidden")) {
    item.classList.remove("hidden");
  }
  console.log(`...${identifier} added...`);
}

function hide(identifier) {
  const item = document.querySelector(identifier);
  if (!item.classList.contains("hidden")) {
    item.classList.add("hidden");
  }
  console.log(`...${identifier} added...`);
}
