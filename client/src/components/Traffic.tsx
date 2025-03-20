/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// TypeScript interface for traffic incident data
interface TrafficIncident {
  id: string;
  description: string;
  severity: string;
  location: string;
  timestamp: string;
}

const TrafficIncident: React.FC = () => {
  // State to store traffic incidents
  const [incidents, setIncidents] = useState<TrafficIncident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch traffic incidents when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5037/api/traffic-incidents') // Call your backend server here
      .then((response) => {
        setIncidents(response.data); // Assuming the server response contains the incidents array
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch traffic incidents');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Traffic Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <div>
              <strong>Description:</strong> {incident.description}
            </div>
            <div>
              <strong>Severity:</strong> {incident.severity}
            </div>
            <div>
              <strong>Location:</strong> {incident.location}
            </div>
            <div>
              <strong>Timestamp:</strong> {incident.timestamp}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficIncident;*/


import React, { useState } from "react";
import axios from "axios";

interface TrafficIncident {
  description: string;
  severity: string;
  location: string;
  timestamp: string;
}

const TrafficIncidentComponent = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [trafficIncidents, setTrafficIncidents] = useState<TrafficIncident[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrafficData = async () => {
    if (!searchQuery) {
      setError("Please enter a city, address, or country.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch coordinates from OpenWeatherMap API
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=2eae3e4efd68112d3a7dc08749d5747d`
      );

      if (!geoResponse.data.coord) {
        setError("Location not found.");
        setLoading(false);
        return;
      }

      const { lon, lat } = geoResponse.data.coord;

      // Fetch traffic incidents using the coordinates from the server
      const response = await axios.get(
        `http://localhost:8000/api/traffic-incidents?lat=${lat}&lng=${lon}`
      );

      const incidents: TrafficIncident[] = response.data.Situations || [];

      setTrafficIncidents(incidents);
    } catch (err) {
      console.error("Error fetching traffic:", err);
      setError("Failed to fetch traffic incidents.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Traffic Incidents</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter city, address, or country"
        style={styles.input}
      />
      <button onClick={fetchTrafficData} style={styles.button}>
        {loading ? "Loading..." : "Fetch Traffic Data"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.incidentList}>
        {loading ? (
          <p>Loading incidents...</p>
        ) : trafficIncidents.length > 0 ? (
          trafficIncidents.map((incident, index) => (
            <div key={index} style={styles.incidentItem}>
              <h3>{incident.description}</h3>
              <p>
                <strong>Severity:</strong> {incident.severity}
              </p>
              <p>
                <strong>Location:</strong> {incident.location}
              </p>
              <p>
                <strong>Time:</strong> {incident.timestamp}
              </p>
            </div>
          ))
        ) : (
          <p>No traffic incidents found for this location.</p>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { textAlign: "center", padding: "20px", maxWidth: "800px", margin: "0 auto" },
  input: { padding: "10px", fontSize: "16px", marginRight: "10px", width: "300px" },
  button: { padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" },
  error: { color: "red", marginTop: "10px" },
  incidentList: { marginTop: "20px" },
  incidentItem: { background: "#f9f9f9", padding: "15px", borderRadius: "5px", marginBottom: "10px" },
};

export default TrafficIncidentComponent;
