//navigation.js

function createHeaderFooter() {
  var h1 = document.createElement("h1");
  var header = document.createElement("header");
  var footer = document.createElement("footer");
  var nav = document.createElement("nav");
  var ul = document.createElement("ul");
  var li;

  h1.innerHTML = "Microgrid Development in Lawrence KS";
  header.appendChild(h1);
  li = getli("electricPowerHistory.html", "Electric Power History");
  ul.appendChild(li);
  li = getli("lawrenceHydropower.html", "Lawrence Hydropower");
  ul.appendChild(li);
  li = getli("index.html", "<strong>Area Description</strong>");
  ul.appendChild(li);
  li = getli("microgridPossibilities.html", "Microgrid Possibilities");
  ul.appendChild(li);
  li = getli("typicalProperty.html", "Typical Property");
  ul.appendChild(li);
  li = getli("localEnergy.html", "Local Energy");
  ul.appendChild(li);
  li = getli("collectorPerformance.html", "Collector Performance");
  ul.appendChild(li);
  li = getli("services.html", "Electric Power Services");
  ul.appendChild(li);
  li = getli("#", "Downtown Properties");
  ul.appendChild(li);
  li = getli("#", "Solar Shadowing");
  ul.appendChild(li);
  nav.appendChild(ul);
  header.appendChild(nav);
  document.body.insertBefore(header, document.body.childNodes[0]);

  nav = document.createElement("nav");    // for another nav element
  ul = document.createElement("ul");      // for another unordered list
  li = getli("#", "Top");
  ul.appendChild(li);
  li = getli("index.html", "Home");
  ul.appendChild(li);
  nav.appendChild(ul);
  footer.appendChild(nav);
  document.body.appendChild(footer);
} // end createHeaderFooter

function getli(ref, label) {
  var li = document.createElement("li");
  var a = document.createElement("a");

  a.setAttribute("href", ref);
  a.innerHTML = label;
  li.appendChild(a);  // insert a into li
  return li;
} // end getli