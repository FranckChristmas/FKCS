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
    console.log("🔍 context brut :", project.data.context);
    console.log("🔍 context brut :", project.data.stack);
    console.log("🔍 context brut :", project.data.responsibilities);

    const li = document.createElement("li");
    li.innerHTML = `<h3 class="variable-text highlight-date">${period}</h3>
            <span class="highlight-title">${client} - ${role} | ${sector}</span>
            <div class="highlight-description">
              <p class="highlight-context">${context}</p>
              <p class="highlight-stack">Stack & environment: ${stack}</p>
              <p class="highlight-description">Responsabilities : </br>   ${responsibilities}</p>
            </div>
      `;
    container.appendChild(li);
  });
}
