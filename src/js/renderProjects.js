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
    // const responsibilities = renderRichText(project.data.responsibilities);
    const stack = renderRichText(project.data.stack);

    // const context = Array.isArray(project.data.context)
    //   ? project.data.context.map((p) => p.text).join("<br>")
    //   : "";
    const responsibilities = Array.isArray(project.data.responsibilities)
      ? project.data.responsibilities.map((p) => p.text).join("<br>")
      : "";
    // const stack = Array.isArray(project.data.stack)
    //   ? project.data.stack.map((p) => p.text).join("<br>")
    //   : "";

    function renderRichText(blocks) {
      if (!Array.isArray(blocks)) return "";
      return blocks
        .map((block) => {
          if (block.type === "heading4")
            return `<h4 class="heading4-description">${block.text}</h4>`;
          if (block.type === "paragraph")
            return `<p class="highlight-description">${block.text}</p>`;
          if (block.type === "list-item") return `<li>${block.text}</li>`;
        })
        .join("");
    }

    console.log("📦 Données titres Prismic :", project.data);

    const li = document.createElement("li");
    li.innerHTML = `<h3 class="variable-text highlight-date">${period}</h3>
            <span class="highlight-title role"> ${role}</span>
            <span class="highlight-title">${client} | ${sector}</span>
            <div class="highlight-description">
              <p class="highlight-context">${contextTitle} ${context}</p>
              <p class="highlight-stack">${stackTitle} ${stack}</p>
              <p class="highlight-description">${respoTitle}  </br>   ${responsibilities}</p>
            </div>
      `;
    container.appendChild(li);
  });
}
