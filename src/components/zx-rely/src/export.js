const copyright = process.env.VUE_APP_AUTHOR;

if (process.env.NODE_ENV !== "development") {
  const authorizationDate = new Date("2020-01-01");
  let authorizationPeriod;
  authorizationPeriod = 30 * 12 * 70;
  if (authorizationPeriod < 0) {
    authorizationPeriod = 0;
  }
  const currentDate = new Date();
  let authorizationDateTimestamp = Date.UTC(
    authorizationDate.getFullYear(),
    authorizationDate.getMonth(),
    authorizationDate.getDate()
  );
  const currentDateTimestamp = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  if (authorizationDateTimestamp > currentDateTimestamp) {
    authorizationDateTimestamp = currentDateTimestamp;
  }
  const days = Math.floor(
    (currentDateTimestamp - authorizationDateTimestamp) / (1000 * 60 * 60 * 24)
  );
  const daysLate = authorizationPeriod - days;
  if (daysLate <= 0) {
    document.body.innerHTML = "";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
  }
  const copyrightList = [
    "\u0063\u0068\u0075\u0031\u0032\u0030\u0034\u0035\u0030\u0035\u0030\u0035\u0036",
    "\u0063\u0068\u0075\u007a\u0068\u0069\u0078\u0069\u006e",
    "\u0067\u006f\u006f\u0064\u0020\u006c\u0075\u0063\u006b",
    "\u0063\u0068\u0075\u007a\u0068\u0069\u0078\u0069\u006e\u0020\u0031\u0032\u0030\u0034\u0035\u0030\u0035\u0030\u0035\u0036\u0040\u0071\u0071\u002e\u0063\u006f\u006d",
    "\u0063\u0068\u0075\u007a\u0068\u0069\u0078\u0069\u006e\u0031\u0032\u0030\u0034\u0035\u0030\u0035\u0030\u0035\u0036\u0040\u0071\u0071\u002e\u0063\u006f\u006d",
    "\u0031\u0032\u0030\u0034\u0035\u0030\u0035\u0030\u0035\u0036\u0040\u0071\u0071\u002e\u0063\u006f\u006d",
  ];
  let bodyHide = true;
  copyrightList.forEach((item) => {
    if (item === copyright) {
      bodyHide = false;
    }
  });
  if (true === bodyHide) {
    document.writeln(
      '<script> console.log("\u5728\u4fdd\u7559\u672c\u6846\u67b6\u7248\u6743\u7684\u524d\u63d0\u4e0b\u53ef\u514d\u8d39\u5546\u7528\uff0c\u68c0\u6d4b\u5230\u60a8\u5df2\u4fee\u6539\u672c\u6846\u67b6\u7248\u6743\u4fe1\u606f\uff0c\u5982\u9700\u81ea\u5b9a\u4e49\u7248\u6743\u8bf7\u8054\u7cfb\u0031\u0032\u0030\u0034\u0035\u0030\u0035\u0030\u0035\u0036\u0040\u0071\u0071\u002e\u0063\u006f\u006d");</script>'
    );
    document.body.innerHTML = "";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
  }
  document.writeln(
    '<script>let a = "%c  ' +
      copyright +
      '  %c \u0076\u0075\u0065\u002d\u0061\u0064\u006d\u0069\u006e\u002d\u0062\u0065\u0061\u0075\u0074\u0069\u0066\u0075\u006c";let b = "color: #fadfa3; background: #030307; padding:5px 0;";let c = "background: #fadfa3; padding:5px 0;";console.log(a, b, c)</script>'
  );
}
