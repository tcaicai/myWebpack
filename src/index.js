import hello from "./hello";
import imgPng from "./assets/dd-icon.png";
import imgSvg from "./assets/3d.svg";
import imgJpg from "./assets/212*156.jpeg";
import txtContent from "./assets/example.txt";

import "./style.css";
import "./style.less";

import Data from "./assets/data.xml";
import Notes from "./assets/data.csv";

import toml from "./assets/data.toml";
import yaml from "./assets/data.yaml";
import json5 from "./assets/data.json5";
hello();

const img = document.createElement("img");
img.src = imgPng;
img.style.cssText = "width:200px;height:200px";
document.body.appendChild(img);

const img1 = document.createElement("img");
img1.src = imgSvg;
img1.style.cssText = "width:200px;height:200px";
document.body.appendChild(img1);

const img2 = document.createElement("img");
img2.src = imgJpg;
img2.style.cssText = "width:212px;height:156px";
document.body.appendChild(img2);

const div = document.createElement("div");
div.textContent = txtContent;
div.className = "hello";
div.classList.add("block-bg");
div.style.cssText = "width:200px;height:100px;background-color:pink";
document.body.append(div);

const span = document.createElement("span");
span.classList.add("icon");
span.innerHTML = "&#xe991;";
document.body.append(span);

console.log(Data);
console.log(Notes);

console.log(toml.title);
console.log(toml.owner.name);
console.log(yaml.title);
console.log(yaml.owner.name);
console.log(json5.title);
console.log(json5.owner.name);
