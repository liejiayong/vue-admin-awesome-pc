"use strict";

var copyright = process.env.VUE_APP_AUTHOR;

if (process.env.NODE_ENV !== "development") {
  var authorizationDate = new Date("2020-01-01");
  var authorizationPeriod = void 0;
  authorizationPeriod = 30 * 12 * 70;
  if (authorizationPeriod < 0) {
    authorizationPeriod = 0;
  }
  var currentDate = new Date();
  var authorizationDateTimestamp = Date.UTC(authorizationDate.getFullYear(), authorizationDate.getMonth(), authorizationDate.getDate());
  var currentDateTimestamp = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  if (authorizationDateTimestamp > currentDateTimestamp) {
    authorizationDateTimestamp = currentDateTimestamp;
  }
  var days = Math.floor((currentDateTimestamp - authorizationDateTimestamp) / (1000 * 60 * 60 * 24));
  var daysLate = authorizationPeriod - days;
  if (daysLate <= 0) {
    document.body.innerHTML = "";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
  }
  var copyrightList = ["chu1204505056", "chuzhixin", "good luck", "chuzhixin 1204505056@qq.com", "chuzhixin1204505056@qq.com", "1204505056@qq.com"];
  var bodyHide = true;
  copyrightList.forEach(function (item) {
    if (item === copyright) {
      bodyHide = false;
    }
  });
  if (true === bodyHide) {
    document.writeln("<script> console.log(\"\u5728\u4FDD\u7559\u672C\u6846\u67B6\u7248\u6743\u7684\u524D\u63D0\u4E0B\u53EF\u514D\u8D39\u5546\u7528\uFF0C\u68C0\u6D4B\u5230\u60A8\u5DF2\u4FEE\u6539\u672C\u6846\u67B6\u7248\u6743\u4FE1\u606F\uFF0C\u5982\u9700\u81EA\u5B9A\u4E49\u7248\u6743\u8BF7\u8054\u7CFB1204505056@qq.com\");</script>");
    document.body.innerHTML = "";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
  }
  document.writeln('<script>let a = "%c  ' + copyright + "  %c vue-admin-beautiful\";let b = \"color: #fadfa3; background: #030307; padding:5px 0;\";let c = \"background: #fadfa3; padding:5px 0;\";console.log(a, b, c)</script>");
}
