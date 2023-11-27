import moment from 'moment/moment.js';

function getMoment(date, format = "YYYY-MM-DD HH:mm:ss") {
  if (typeof date === "string") {
    const d = moment.utc(date, format);
    if (d && d.isValid()) {
      return d;
    }
  }
  return null;
}
function getLocalDateString(date, format = "LL") {
  const d = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
  if (d && d.isValid()) {
    return d.local().format(format);
  }
  return "";
}
function getFirstName(fullName) {
  return fullName.split(" ").slice(0, -1).join(" ");
}

export { getLocalDateString as a, getFirstName as b, getMoment as g };
//# sourceMappingURL=formatter-0cf2655f.mjs.map
