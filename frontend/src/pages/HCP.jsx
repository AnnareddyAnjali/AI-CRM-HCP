import { useEffect, useState } from "react";
import api from "../api/api";

function HCP() {
  const [hcps, setHcps] = useState([]);

  useEffect(() => {
    const fetchHCPs = async () => {
      try {
        const response = await api.get("/hcp/");
        setHcps(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHCPs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Healthcare Professionals</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hospital</th>
            <th>Speciality</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {hcps.map((hcp) => (
            <tr key={hcp.id}>
              <td>{hcp.id}</td>
              <td>{hcp.name}</td>
              <td>{hcp.hospital}</td>
              <td>{hcp.speciality}</td>
              <td>{hcp.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HCP;