export function renderProjects(projects) {
  const container = document.getElementById("accordion");
  container.innerHTML = ""; // Clear previous content

  projects.forEach((project) => {
    const period = project.data.period;
    const role = project.data.role;
    const client = project.data.client_name;
    const sector = project.data.sector;
    const context = Array.isArray(project.data.context)
      ? project.data.context.map((p) => p.text).join("<br>")
      : "";
    const responsibilities = Array.isArray(project.data.responsibilities)
      ? project.data.responsibilities.map((p) => p.text).join("<br>")
      : "";
    const stack = Array.isArray(project.data.stack)
      ? project.data.stack.map((p) => p.text).join("<br>")
      : "";

    const contextTitle = Array.isArray(project.data.context_title)
      ? project.data.context_title.map((p) => p.text).join("<br>")
      : "";

    const respoTitle = Array.isArray(project.data.respo_title)
      ? project.data.respo_title.map((p) => p.text).join("<br>")
      : "";

    const stackTitle = Array.isArray(project.data.stack_title)
      ? project.data.stack_title.map((p) => p.text).join("<br>")
      : "";

    console.log("📦 Données titres Prismic :", project.data);

    const li = document.createElement("li");
    li.innerHTML = `<h3 class="variable-text highlight-date">${period}</h3>
            <span class="highlight-title">${client} - ${role} | ${sector}</span>
            <div class="highlight-description">
              <p class="highlight-context">${contextTitle} ${context}</p>
              <p class="highlight-stack">${stackTitle} ${stack}</p>
              <p class="highlight-description">${respoTitle}  </br>   ${responsibilities}</p>
            </div>
      `;
    container.appendChild(li);
  });
}
