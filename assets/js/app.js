async function loadNav() {
  try {
    const res = await fetch('data/nav.json');
    const data = await res.json();

    const nav = document.getElementById("nav");
    const viewer = document.getElementById("viewer");

    nav.innerHTML = "";

    let activeItem = null;

    Object.keys(data).forEach(section => {
      // SECTION HEADER (Concepts / Interview)
      const sectionHeader = document.createElement("li");
      sectionHeader.textContent = "📂 " + section;
      sectionHeader.classList.add("section-header");

      nav.appendChild(sectionHeader);

      const categories = data[section];

      Object.keys(categories).forEach(category => {
        // CATEGORY (Kafka, Cassandra)
        const categoryLi = document.createElement("li");
        categoryLi.textContent = "📁 " + category;
        categoryLi.classList.add("category");

        const subUl = document.createElement("ul");
        subUl.classList.add("submenu");

        categories[category].forEach(item => {
          const subLi = document.createElement("li");
          subLi.textContent = item.title;
          subLi.classList.add("nav-item");

          subLi.onclick = () => {
            // active highlight
            if (activeItem) activeItem.classList.remove("active");
            subLi.classList.add("active");
            activeItem = subLi;

            // load page
            const path = "./" + item.file;
            console.log("Loading:", path);
            viewer.src = path;
          };

          subUl.appendChild(subLi);
        });

        categoryLi.appendChild(subUl);
        nav.appendChild(categoryLi);
      });
    });

    // DEFAULT LOAD
    const firstSection = Object.keys(data)[0];
    const firstCategory = Object.keys(data[firstSection])[0];
    const firstItem = data[firstSection][firstCategory][0];

    viewer.src = "./" + firstItem.file;

  } catch (err) {
    console.error("Error loading nav:", err);
  }
}

loadNav();
