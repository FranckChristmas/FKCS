const API_ENDPOINT = "https://fkcs.cdn.prismic.io/api/v2";

// ----------------- Projects from Prismic ------------------
export async function fetchProjects() {
  try {
    const apiRes = await fetch(API_ENDPOINT); // call the API
    const apiData = await apiRes.json(); // convert to JSON
    const masterRef = apiData.refs.find((ref) => ref.id === "master").ref;
    const response = await fetch(
      `${API_ENDPOINT}/documents/search?ref=${masterRef}&q=[[at(document.type,"projects")]]`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    console.log("📦 Données API Prismic Projects :", apiData, masterRef);

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// ----------------- About Me from Prismic ------------------

export async function fetchAboutMe() {
  try {
    const apiRes = await fetch(API_ENDPOINT); // call the API
    const apiData = await apiRes.json(); // convert to JSON
    const masterRef = apiData.refs.find((ref) => ref.id === "master").ref;
    const response = await fetch(
      `${API_ENDPOINT}/documents/search?ref=${masterRef}&type=about`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch about me");
    }
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error("Error fetching about me:", error);
    return null;
  }
}
