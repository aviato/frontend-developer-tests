import React, { useEffect, useState } from "react";
import getUsers from "./api/getUsers";
import { getSortedCountries, getFlatCountriesList } from "./utils/countries";
import User from "./types/User";
import { sortUsersByRegistrationDate } from "./utils/users";
import {
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import UserCard from './components/UserCard';

enum GenderFilterOptions {
  All = "all",
  Female = "female",
  Male = "male",
}

function App() {
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState(new Map());
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filter, setFilter] = useState<GenderFilterOptions>(
    GenderFilterOptions.All
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await getUsers();
      setUsers(result);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const sortedCountries = getSortedCountries(users, "desc");
    setCountries(sortedCountries);
  }, [users]);

  useEffect(() => {
    if (selectedCountry) {
      if (filter === GenderFilterOptions.All) {
        setSelectedUsers(countries.get(selectedCountry));
      } else {
        setSelectedUsers(
          countries
            .get(selectedCountry)
            .filter((user: User) => user.gender === filter)
        );
      }
    }
  }, [countries, filter, selectedCountry]);

  function handleFilterChange(
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) {
    if (e.target && e.target.value) {
      setFilter(e.target.value as GenderFilterOptions);
    }
  }

  return (
    <Grid>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">StackPath Countries Challenge</Typography>
        </Toolbar>
      </AppBar>

      <Container className="App">
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <FormControl style={{ minWidth: "120px", marginTop: "8px" }}>
              <InputLabel>Filter by Gender:</InputLabel>
              <Select value={filter} onChange={handleFilterChange}>
                <MenuItem value={GenderFilterOptions.All}>All</MenuItem>
                <MenuItem value={GenderFilterOptions.Female}>Female</MenuItem>
                <MenuItem value={GenderFilterOptions.Male}>Male</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={6}>
              <Typography variant="h4">
                Select a country to get started!
              </Typography>
              <FormControl style={{ width: "100%", margin: "20px 0 40px 0" }}>
                <InputLabel>Select a Country</InputLabel>
                <Select
                  value={selectedCountry}
                  onChange={(
                    e: React.ChangeEvent<{
                      name?: string | undefined;
                      value: unknown;
                    }>
                  ) => {
                    const newSelection = sortUsersByRegistrationDate(
                      countries.get(e.target.value)
                    );
                    setSelectedUsers(newSelection);
                    setSelectedCountry(e.target.value as string);
                  }}
                >
                  {getFlatCountriesList(countries).map((country: string, i) => (
                    <MenuItem value={country}>
                      {country} ({countries.get(country).length})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {selectedUsers && (
            <Grid container spacing={1}>
              {sortUsersByRegistrationDate(selectedUsers).map(
                (user: User, i) => (
                  <Grid item key={`user-card-${i}`}>
                    <UserCard user={user} />
                  </Grid>
                )
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </Grid>
  );
}

export default App;
