import { useState, useEffect } from 'react';
import './CountryFlagDisplay.css';

function CountryFlagDisplay() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setCountries(data);
        } catch (error) {
          setError(error.message);
          console.error('API Error:', error); // Log error to console
        }
      };    
      fetchData();
  }, []);

  return (
    <div>
      <h1>Country Flag Display</h1>
      {error && <p>Error: {error}</p>}
      <div className="country-list">
        {countries.map(country => (
          <div key={country.cca3} className="country-item">
            <img src={country.flags.svg} alt={country.name.common} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryFlagDisplay;
