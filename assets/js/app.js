async function loadNav() {
  const res = await fetch('data/nav.json');
  const data = await res.json();

  const nav = document.getElementById("nav");
  const viewer = document.getElementById("viewer");

  Object.keys(data).forEach(section => {
    const li = document.createElement("li");
    li.innerText = "📁 " + section;

    const subUl = document.createElement("ul");
    subUl.classList.add("submenu");

    data[section].forEach(item => {
      const subLi = document.createElement("li");
      subLi.innerText = item.title;

      subLi.onclick = () => {
        viewer.src = item.file;
      };

      subUl.appendChild(subLi);
    });

    li.appendChild(subUl);
    nav.appendChild(li);
  });

  // default load
  const firstSection = Object.keys(data)[0];
  if (firstSection) {
    viewer.src = data[firstSection][0].file;
  }
}

loadNav();
