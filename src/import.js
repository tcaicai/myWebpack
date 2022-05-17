function getComponent() {
  /* webpackChunkName: lodash, webpackPrefetch: true */
  return import("lodash").then(({ default: _ }) => {
    const div = document.createElement("div");
    div.innerHTML = _.join(["眼睛", "鼻子", "嘴"], "--");
    return div;
  });
}

getComponent().then((el) => {
  document.body.appendChild(el);
});
