import User from "../types/User";

// Should use something like useMemo for these
export function listUsersByCountry(users: User[]): Map<string, User[]> {
  const countries: Map<string, User[]> = new Map([]);

  users.forEach((user) => {
    const country = user.location.country;
    const usersByCountry = countries.get(country);

    if (usersByCountry) {
      usersByCountry.push(user);
    } else {
      countries.set(country, [user]);
    }
  });

  return countries;
}

export function getSortedCountries(users: User[], sortType: "asc" | "desc") {
  const countries = listUsersByCountry(users);

  return new Map(
    [...countries.entries()].sort((a, b) => {
      if (sortType === "asc") {
        return a[1].length - b[1].length;
      } else {
        return b[1].length - a[1].length;
      }
    })
  );
}

export function getFlatCountriesList(countries: Map<string, User[]>) {
  const result = [];

  for (let key of countries.keys()) {
    result.push(key);
  }

  return result;
}
