export default async function getUsers(numberOfResults: number = 100): Promise<any> {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${numberOfResults}`);
    return await res.json();
  } catch (e) {
    console.trace(e);
  }
}
