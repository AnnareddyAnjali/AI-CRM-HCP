import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import api from "../api/api";

import SearchBar from "../components/SearchBar";
import HCPForm from "../components/HCPForm";
import HCPTable from "../components/HCPTable";

function HCP() {
  const emptyForm = {
    name: "",
    hospital: "",
    speciality: "",
    city: "",
    email: "",
    phone: "",
  };

  const [hcps, setHcps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchHCPs();
  }, []);

  const fetchHCPs = async () => {
    try {
      const response = await api.get("/hcp/");
      setHcps(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await api.put(`/hcp/${editId}`, formData);
        alert("HCP Updated Successfully");
      } else {
        await api.post("/hcp/", formData);
        alert("HCP Added Successfully");
      }

      setFormData(emptyForm);
      setIsEditing(false);
      setEditId(null);

      fetchHCPs();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const editHCP = (hcp) => {
    setFormData({
      name: hcp.name,
      hospital: hcp.hospital,
      speciality: hcp.speciality,
      city: hcp.city,
      email: hcp.email,
      phone: hcp.phone,
    });

    setEditId(hcp.id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteHCP = async (id) => {
    if (!window.confirm("Delete this HCP?")) return;

    try {
      await api.delete(`/hcp/${id}`);
      alert("HCP Deleted Successfully");
      fetchHCPs();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredHCPs = hcps.filter((hcp) =>
    `${hcp.name} ${hcp.hospital} ${hcp.city}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" gutterBottom>
        Healthcare Professionals
      </Typography>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <HCPForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <HCPTable
        hcps={filteredHCPs}
        editHCP={editHCP}
        deleteHCP={deleteHCP}
      />

    </Container>
  );
}

export default HCP;