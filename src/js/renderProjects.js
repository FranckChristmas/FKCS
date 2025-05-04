export function renderProjects(projects) {
  const container = document.getElementById("accordion");
  container.innerHTML = ""; // Clear previous content

  projects.forEach((project) => {
    const period = project.data.period;
    const role = project.data.role;
    const client = project.data.client_name;
    const sector = project.data.sector;
    const context = project.data.context;
    const responsibilities = project.data.responsability;
    const stack = project.data.stack;

    const li = document.createElement("li");
    li.innerHTML = `<h3 class="variable-text highlight-date">${period}</h3>
            <span class="highlight-title">${client} - ${role} | ${sector}</span>
            <div class="highlight-description">
              <p class="highlight-context">Contexte: ${context}</p>
              <p class="highlight-stack">Stack: ${stack}</p>
              <p class="highlight-responsability">Responsabilités:</p>
              <ul>
                ${responsibilities
                  .map((item) => `<li> - ${item.responsability}</li>`)
                  .join("")}
              </ul>
            </div>
      `;
    container.appendChild(li);
  });
}
