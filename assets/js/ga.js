export var ga = function () {
  (ga.q = ga.q || []).push(arguments);
};

window.ga = window.ga || ga;
ga.l = +new Date();

export const GA_ID = 'UA-9710641-1';
ga('create', GA_ID, 'auto');

