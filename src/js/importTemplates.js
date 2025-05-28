export async function importSocialsLinks(targetSelector) {
  try {
    const res = await fetch(
      new URL("../html/components/social-links.html", import.meta.url)
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    console.log("👉 Contenu reçu par fetch:", html);
    const container = document.querySelector(targetSelector);
    if (container) container.innerHTML = html;
    console.log(`Social links imported into ${targetSelector}`);
  } catch (error) {
    console.error("Error importing social links:", error);
  }
}
