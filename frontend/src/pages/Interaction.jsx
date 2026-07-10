import { useEffect, useState } from "react";
import api from "../api/api";

function Interaction() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await api.get("/interaction/");
      setInteractions(response.data);
    } catch (error) {
         console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interactions</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>HCP ID</th>
            <th>Date</th>
            <th>Type</th>
            <th>Summary</th>
            <th>Sentiment</th>
            <th>Follow Up</th>
          </tr>
        </thead>

        <tbody>
          {interactions.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.hcp_id}</td>
              <td>{item.date}</td>
              <td>{item.interaction_type}</td>
              <td>{item.summary}</td>
              <td>{item.sentiment}</td>
              <td>{item.follow_up}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Interaction;