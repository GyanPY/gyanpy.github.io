async function loadNav() {
  try {
    const res = await fetch('data/nav.json');
    const data = await res.json();

    const nav = document.getElementById("nav");
    const viewer = document.getElementById("viewer");

    nav.innerHTML = "";
    let activeItem = null;

    function createNode(name, value, level = 0) {
      const li = document.createElement("li");

      if (Array.isArray(value)) {
        const filesUl = document.createElement("ul");
        filesUl.classList.add("submenu");
        filesUl.style.display = "none";

        const folderHeader = document.createElement("div");
        folderHeader.textContent = "📁 " + name;
        folderHeader.classList.add("folder-header");
        folderHeader.style.paddingLeft = `${level * 16}px`;

        folderHeader.addEventListener("click", () => {
          filesUl.style.display =
            filesUl.style.display === "none" ? "block" : "none";
        });

        value.forEach(item => {
          const fileLi = document.createElement("li");
          fileLi.textContent = "📄 " + item.title;
          fileLi.classList.add("nav-item");
          fileLi.style.paddingLeft = `${(level + 1) * 16}px`;

          fileLi.addEventListener("click", (event) => {
            event.stopPropagation();

            if (activeItem) activeItem.classList.remove("active");
            fileLi.classList.add("active");
            activeItem = fileLi;

            const path = "./" + item.file;
            console.log("Loading:", path);
            viewer.src = path;
          });

          filesUl.appendChild(fileLi);
        });

        li.appendChild(folderHeader);
        li.appendChild(filesUl);
      } else if (typeof value === "object" && value !== null) {
        const folderHeader = document.createElement("div");
        folderHeader.textContent = "📁 " + name;
        folderHeader.classList.add("folder-header");
        folderHeader.style.paddingLeft = `${level * 16}px`;

        const subUl = document.createElement("ul");
        subUl.classList.add("submenu");
        subUl.style.display = "none";

        folderHeader.addEventListener("click", () => {
          subUl.style.display =
            subUl.style.display === "none" ? "block" : "none";
        });

        Object.keys(value).forEach(childKey => {
          subUl.appendChild(createNode(childKey, value[childKey], level + 1));
        });

        li.appendChild(folderHeader);
        li.appendChild(subUl);
      }

      return li;
    }

    Object.keys(data).forEach(section => {
      const sectionHeader = document.createElement("li");
      sectionHeader.textContent = "📂 " + section;
      sectionHeader.classList.add("section-header");
      nav.appendChild(sectionHeader);

      const sectionData = data[section];
      Object.keys(sectionData).forEach(key => {
        nav.appendChild(createNode(key, sectionData[key], 1));
      });
    });

    // default load first file
    const firstSection = Object.keys(data)[0];
    const firstSectionData = data[firstSection];
    const firstKey = Object.keys(firstSectionData)[0];
    const firstValue = firstSectionData[firstKey];

    if (Array.isArray(firstValue)) {
      viewer.src = "./" + firstValue[0].file;
    } else {
      const firstNestedKey = Object.keys(firstValue)[0];
      const firstFile = firstValue[firstNestedKey][0];
      viewer.src = "./" + firstFile.file;
    }

  } catch (err) {
    console.error("Error loading nav:", err);
  }
}

loadNav();
