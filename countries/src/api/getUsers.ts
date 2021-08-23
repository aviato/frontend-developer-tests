export default async function getUsers(numberOfResults: number = 100) {
  try {
    const res = await fetch(
      `https://randomuser.me/api/?results=${numberOfResults}`
    );
    const json = await res.json();
    return json.results;
  } catch (e) {
    console.trace(e);
  }
}
