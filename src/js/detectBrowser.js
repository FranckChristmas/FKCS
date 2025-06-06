export function detectBrowser() {
  console.log("Détection du navigateur en cours...");
  const userAgent = navigator.userAgent;
  const html = document.documentElement;

  if (
    /Safari/.test(userAgent) &&
    !/Chrome/.test(userAgent) &&
    !/Chromium/.test(userAgent)
  ) {
    html.classList.add("safari");
    console.log("Safari détecté");
  }
}
