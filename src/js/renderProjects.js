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
    const responsibilities = project.data.responsibilities || [];
    const stack = Array.isArray(project.data.stack)
      ? project.data.stack.map((p) => p.text).join("<br>")
      : "";
    console.log("🔍 context brut :", project.data.context);
    console.log("🔍 context brut :", project.data.stack);

    const li = document.createElement("li");
    li.innerHTML = `<h3 class="variable-text highlight-date">${period}</h3>
            <span class="highlight-title">${client} - ${role} | ${sector}</span>
            <div class="highlight-description">
              <p class="highlight-context"><strong>Contexte:</strong><br>${context}</p>
              <p class="highlight-stack">Stack: ${stack}</p>
              <p class="highlight-description">Responsabilités:</p>
              <ul>
                ${responsibilities
                  .map((item) => `<li> - ${item.responsibility}</li>`)
                  .join("")}
              </ul>
            </div>
      `;
    container.appendChild(li);
  });
}
