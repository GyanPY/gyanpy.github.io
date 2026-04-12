async function loadContent() {
  const res = await fetch('data/content.json');
  const data = await res.json();

  const conceptList = document.getElementById("conceptList");
  const interviewList = document.getElementById("interviewList");

  function render(list, items) {
    list.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.file}" target="_blank">${item.title}</a>`;
      list.appendChild(li);
    });
  }

  render(conceptList, data.concepts);
  render(interviewList, data.interview);

  // Search
  document.getElementById("searchBox").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();

    render(conceptList, data.concepts.filter(i => i.title.toLowerCase().includes(q)));
    render(interviewList, data.interview.filter(i => i.title.toLowerCase().includes(q)));
  });
}

loadContent();
