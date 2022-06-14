import React, { useState } from 'react';
import Nav from '../components/Nav';
import PatientSearchBar from '../components/PatientSearchBar';
import Box from '@mui/material/Box';

function Home() {
  const data = [
    'Paris',
    'London',
    'New York',
    'Tokyo',
    'Berlin',
    'Buenos Aires',
    'Cairo',
    'Canberra',
    'Rio de Janeiro',
    'Dublin'
  ];
  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dataFiltered = filterData(searchQuery, data);

  const today = new Date();
  const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return (
    <div>
      <Nav />
      <Box>
        <div className="flex flex-row">
          <div>
            <h2 className="text-lg mb-3">Receptionist Name</h2>
            <p>Date: {date}</p>
            <p>time: {time}</p>
          </div>
          <div>
            <PatientSearchBar setIsSearching={setIsSearching} setSearchQuery={setSearchQuery} />
          </div>
        </div>
        <div style={{ padding: 3 }}>
          {data && isSearching
            ? dataFiltered.map((d) => (
                <div
                  className="text"
                  style={{
                    padding: 5,
                    justifyContent: 'normal',
                    fontSize: 20,
                    color: 'blue',
                    margin: 1,
                    width: '250px',
                    BorderColor: 'green',
                    borderWidth: '10px'
                  }}
                  key={d.id}>
                  {d}
                </div>
              ))
            : null}
        </div>
      </Box>
    </div>
  );
}

export default Home;
