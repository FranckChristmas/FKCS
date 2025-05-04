const API_ENDPOINT = "https://fkcs.cdn.prismic.io/api/v2";

export async function fetchProjects() {
  try {
    const apiRes = await fetch(API_ENDPOINT);
    const apiData = await apiRes.json();
    const masterRef = apiData.refs.find((ref) => ref.id === "master").ref;
    const response = await fetch(
      `${API_ENDPOINT}/documents/search?ref=${masterRef}&type=project`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    console.log("📦 Données API Prismic :", apiData, masterRef);

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
