const API_ENDPOINT = "https://fkcs.cdn.prismic.io/api/v2";

export async function fetchProjects() {
  const response = await fetch(
    `${API_ENDPOINT}/documents/search?ref=master&type=project`
  );
  const data = await response.json();
  return data.results;
}
