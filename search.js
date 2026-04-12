async function loadNav() {
  try {
    const res = await fetch('data/nav.json');
    const data = await res.json();

    const nav = document.getElementById("nav");
    const viewer = document.getElementById("viewer");

    nav.innerHTML = "";

    Object.keys(data).forEach(section => {
      // Section title (Kafka, MySQL...)
      const sectionLi = document.createElement("li");
      sectionLi.textContent = "📁 " + section;

      const subUl = document.createElement("ul");
      subUl.classList.add("submenu");

      data[section].forEach(item => {
        const subLi = document.createElement("li");
        subLi.textContent = item.title;

        subLi.onclick = () => {
          const path = "./" + item.file;
          console.log("Loading:", path);
          viewer.src = path;
        };

        subUl.appendChild(subLi);
      });

      sectionLi.appendChild(subUl);
      nav.appendChild(sectionLi);
    });

    // Default load (first item)
    const firstSection = Object.keys(data)[0];
    if (firstSection && data[firstSection].length > 0) {
      viewer.src = "./" + data[firstSection][0].file;
    }

  } catch (err) {
    console.error("Error loading nav:", err);
  }
}

loadNav();
