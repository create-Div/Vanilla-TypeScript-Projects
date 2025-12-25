// utils.ts
function pluralize(value, singular) {
  return value === 1 ? `${value} ${singular}` : `${value} ${singular}s`;
}

// index.ts
var dateInputEl = document.querySelector('[type="date"]');
var ageResultEl = document.querySelector("p");
var today = Temporal.Now.plainDateISO();
dateInputEl.max = today.toString();
function getBirthDate() {
  return dateInputEl.value;
}
function setAgeResult(years, months, days) {
  const parts = [];
  if (years > 0)
    parts.push(pluralize(years, "year"));
  if (months > 0)
    parts.push(pluralize(months, "month"));
  if (days > 0 || parts.length === 0)
    parts.push(pluralize(days, "day"));
  ageResultEl.textContent = `${parts.join(", ")} old.`;
}
function calculateAge() {
  const birthDateValue = getBirthDate();
  if (!birthDateValue)
    return;
  const birthDate = Temporal.PlainDate.from(birthDateValue);
  const today2 = Temporal.Now.plainDateISO();
  const { years, months, days } = birthDate.until(today2, {
    largestUnit: "years"
  });
  setAgeResult(years, months, days);
}
dateInputEl.addEventListener("change", calculateAge);
