// 可以在前面加个;保证打包的时候跟前面语句连在一起
(function () {
  var myName = "gly";
})();
// 1、这样可不暴露上面的变量
// console.log(myName);

// 2、闭包导出变量

var res = (function () {
  var myName = "gly";
  return myName;
})();

console.log(res);
