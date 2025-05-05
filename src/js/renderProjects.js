export function renderProjects(projects) {
  const container = document.getElementById("accordion");
  container.innerHTML = ""; // Clear previous content

  projects.forEach((project) => {
    const period = project.data.period;
    const role = project.data.role;
    const client = project.data.client_name;
    const sector = project.data.sector;
    const contextTitle = renderRichText(project.data.context_title);
    const respoTitle = renderRichText(project.data.respo_title);
    const stackTitle = renderRichText(project.data.stack_title);
    const context = renderRichText(project.data.context);
    const responsibilities = renderRichText(project.data.responsibilities);
    const stack = renderRichText(project.data.stack);

    function renderRichText(blocks) {
      if (!Array.isArray(blocks)) return "";

      let html = "";
      let inList = false;

      blocks.forEach((block, index) => {
        const next = blocks[index + 1];

        if (block.type === "list-item") {
          if (!inList) {
            html += `<ul class="highlight-respo accordion-hidden">`;
            inList = true;
          }
          html += `<li class="highlight-respo accordion-hidden">${block.text}</li>`;
          if (next || next.type !== "list-item") {
            html += `</ul>`;
            inList = false;
          }
        } else {
          if (inList) {
            html += `</ul>`;
            inList = false;
          }

          if (block.type === "heading4") {
            html += `<h4 class="heading4-respo accordion-hidden">${block.text}</h4>`;
          } else if (block.type === "paragraph") {
            html += `<p class="highlight-respo">${block.text}</p>`;
          }
        }
      });
      return html;
    }

    console.log("📦 Données titres Prismic :", project.data);

    const li = document.createElement("li");
    li.classList.add("accordion-item");
    li.innerHTML = `<h3 class="variable-text highlight-date">${period}</h3>
            <span class="role accordion-hidden"> ${role}</span>
            <span class="highlight-title accordion-hidden">${client} | ${sector}</span>
            <div>
              <p class="highlight-context accordion-hidden">${contextTitle} ${context}</p>
              <div class="highlight-respo accordion-hidden">${respoTitle} ${responsibilities}</div>
              <p class="highlight-stack accordion-hidden">${stackTitle} ${stack}</p>
            </div>
      `;
    container.appendChild(li);
  });
}
