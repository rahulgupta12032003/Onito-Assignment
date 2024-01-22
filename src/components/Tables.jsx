import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import { Grid } from '@mui/material';
// import 'datatables.net-dt/css/jquery.dataTables.css';

const Tables = ({ data }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    // Initialize DataTables
    $(tableRef.current).DataTable();

    // Don't forget to destroy the DataTable when the component unmounts
    return () => {
      $(tableRef.current).DataTable().destroy(true);
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>
                Sr No.
              </th>
              <th>Date</th>
              <th>Id Type</th>
              <th>ID Number</th>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Pin Code</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.length > 0 && data.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "UTC", // Assuming your date string is in UTC
                    }).format(new Date(elem.invoiceDate))}</td>
                    <td>{elem.idType}</td>
                    <td>{elem.issuedId}</td>
                    <td>{elem.name}</td>
                    <td>{elem.age}</td>
                    <td>{elem.sex}</td>
                    <td>{elem.mobile}</td>
                    <td>{elem.address}</td>
                    <td>{elem.city}</td>
                    <td>{elem.state}</td>
                    <td>{elem.country}</td>
                    <td>{elem.pincode}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Grid>
    </Grid>

  );
};

export default Tables;
