import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import getUsers from './api/getUsers';
import { getSortedCountries, getFlatCountriesList } from './utils/countries';
import User from './types/User';
import { sortUsersByRegistrationDate } from './utils/users';

enum GenderFilterOptions {
  All = "all",
  Female = "female",
  Male = "male"
}

function App() {
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState(new Map());
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [filter, setFilter] = useState<GenderFilterOptions>(GenderFilterOptions.All);

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await getUsers();
      setUsers(result);
    }

    fetchInitialData();
  }, [])

  useEffect(() => {
    const sortedCountries = getSortedCountries(users, 'desc');
    setCountries(sortedCountries);
  }, [users]);

  useEffect(() => {
    if (selectedCountry) {
      if (filter === GenderFilterOptions.All) {
        setSelectedUsers(countries.get(selectedCountry));
      } else {
        setSelectedUsers(countries.get(selectedCountry).filter((user: User) => user.gender === filter));
      }
    }
  }, [countries, filter, selectedCountry]);

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value as GenderFilterOptions);
  }

  return (
    <div className="App">

      <select value={filter} onChange={handleFilterChange}>
        <option value={GenderFilterOptions.All}>All</option>
        <option value={GenderFilterOptions.Female}>Female</option>
        <option value={GenderFilterOptions.Male}>Male</option>
      </select>

      { getFlatCountriesList(countries).map((country: string, i) => (
        <div style={{ color: '#fff'}} onClick={() => {
          const newSelection = sortUsersByRegistrationDate(countries.get(country));
          setSelectedUsers(newSelection);
          setSelectedCountry(country);
        }} key={`${country}-${i}`}>{country}</div>
      )) }

      { selectedUsers && (
        <div>
          { sortUsersByRegistrationDate(selectedUsers).map((user: User, i) => (
            <div key={`user-card-${i}`}>
              <div>{user.name.first} {user.name.last}</div>
              <div>{user.gender}</div>
              <div>{user.location.city}</div>
              <div>{user.location.state}</div>
              <div>{user.registered.date}</div>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
