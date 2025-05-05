export function renderAbout(about) {
  const container = document.querySelector(".about-me");

  if (!about) {
    container.innerHTML = "<p>not available..</p>";
    return;
  }

  const imageUrl = about?.data?.profile_picture?.url || "";
  const imageAlt = about?.data?.profile_picture?.alt || "profil picture";

  const title = about.data.my_name?.[0]?.text || "About Me";

  let aboutText = "";
  if (Array.isArray(about.data.about_text)) {
    aboutText = about.data.about_text
      .map((block) => {
        if (block.type === "paragraph" || block.type === "preformatted") {
          return `<p>${block.text}</p>`;
        } else if (block.type === "heading4") {
          return `<h4>${block.text}</h4>`;
        } else if (block.type === "list-item") {
          return `<li>${block.text}</li>`;
        }
        return "";
      })
      .join("");
  }

  container.innerHTML = `
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="${imageAlt}" class="about-image" />`
          : ""
      }
      <h2 class="about-title">${title}</h2>
      <div class="about-description">${aboutText}</div>
    </div>
  `;
  console.log("📦 Données API Prismic AboutMe :", about.data);
}
