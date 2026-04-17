function createNode(name, value, level = 0) {
  const li = document.createElement("li");

  if (Array.isArray(value)) {
    const filesUl = document.createElement("ul");
    filesUl.classList.add("submenu");
    filesUl.style.display = "none";

    const folderHeader = document.createElement("div");
    folderHeader.textContent = name;
    folderHeader.classList.add("folder-header");
    folderHeader.style.paddingLeft = `${level * 14}px`;

    folderHeader.addEventListener("click", () => {
      const isOpen = filesUl.style.display === "block";
      filesUl.style.display = isOpen ? "none" : "block";
      folderHeader.classList.toggle("open", !isOpen);
    });

    value.forEach(item => {
      const fileLi = document.createElement("li");
      fileLi.textContent = item.title;
      fileLi.classList.add("nav-item");
      fileLi.style.paddingLeft = `${(level + 1) * 14}px`;

      fileLi.addEventListener("click", (event) => {
        event.stopPropagation();

        if (activeItem) activeItem.classList.remove("active");
        fileLi.classList.add("active");
        activeItem = fileLi;

        viewer.src = "./" + item.file;
      });

      filesUl.appendChild(fileLi);
    });

    li.appendChild(folderHeader);
    li.appendChild(filesUl);
  } 
  else if (typeof value === "object" && value !== null) {
    const folderHeader = document.createElement("div");
    folderHeader.textContent = name;
    folderHeader.classList.add("folder-header");
    folderHeader.style.paddingLeft = `${level * 14}px`;

    const subUl = document.createElement("ul");
    subUl.classList.add("submenu");
    subUl.style.display = "none";

    folderHeader.addEventListener("click", () => {
      const isOpen = subUl.style.display === "block";
      subUl.style.display = isOpen ? "none" : "block";
      folderHeader.classList.toggle("open", !isOpen);
    });

    Object.keys(value).forEach(childKey => {
      subUl.appendChild(createNode(childKey, value[childKey], level + 1));
    });

    li.appendChild(folderHeader);
    li.appendChild(subUl);
  }

  return li;
}
