import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Form } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";

const CompanyTable = () => {
  const [companyData, setCompanyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCompany, setSearchCompany] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setCompanyData(data))
      .catch((error) => console.log("Error Loading Data:", error));
  }, []);


  const filteredData = companyData.filter(
    (item) =>
      item.company_name.toLowerCase().includes(searchCompany.toLowerCase()) ||
      item.location.toLowerCase().includes(searchCompany.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchCompany]);

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-3">Company List</h4>

    
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Company Name or Location..."
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
        />
      </Form>

    
      <div className="table-responsive">
        <Table bordered hover responsive className="text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Industry Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              currentItems.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.company_name}</td>
                  <td>{c.location}</td>
                  <td>{c.email}</td>
                  <td>{c.industry_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-danger fw-semibold">
                   There is no such company or location
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {filteredData.length > 0 && (
        <PaginationComponent totalPages={totalPages}  currentPage={currentPage} onPageChange={handlePageChange}/>
      )}
    </div>
  );
};

export default CompanyTable;
