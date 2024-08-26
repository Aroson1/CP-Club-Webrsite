import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { Chart } from "primereact/chart";
import { Toast } from "primereact/toast";
import apiService from "../../apiService";

export default function LeaderboardPage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [students, setStudents] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    points: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    batch: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [selectedSemester, setSelectedSemester] = useState(
    currentMonth >= 8 && currentMonth <= 12 ? "ODD" : "EVEN"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(
        `/v1/leaderboard?sem=${selectedSemester}&year=${selectedYear}`
      );

      setStudents(response || []);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching students.");
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.value);
    fetchStudents();
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.value);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedSemester, selectedYear]);

  useEffect(() => {
    if (error && toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  }, [error]);

  const getSeverity = (batch) => {
    const year = batch % 4;
    switch (year) {
      case 0:
        return "success";
      case 1:
        return "info";
      case 2:
        return "warning";
      case 3:
        return "danger";
      default:
        return null;
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    const yearOptions = Array.from(
      { length: currentYear - 2023 },
      (_, i) => 2024 + i
    );

    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <div className="flex gap-2">
          <Dropdown
            value={selectedSemester}
            options={["ODD", "EVEN"]}
            onChange={handleSemesterChange}
            placeholder="Select Semester"
            className="p-column-filter"
          />
          <Dropdown
            value={selectedYear}
            options={yearOptions}
            onChange={handleYearChange}
            placeholder="Select Year"
            className="p-column-filter"
          />
        </div>

        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Name Search"
          />
        </IconField>
      </div>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={rowData.userName}
          src={rowData.profileImage}
          width="32"
        />
        <span>{rowData.userName}</span>
      </div>
    );
  };

  const batchBodyTemplate = (rowData) => {
    return <Tag value={rowData.batch} severity={getSeverity(rowData.batch)} />;
  };

  const batchFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={[2021, 2022, 2023, 2024]}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={(option) => (
          <Tag value={option} severity={getSeverity(option)} />
        )}
        placeholder="Select Batch"
        className="p-column-filter"
        showClear
      />
    );
  };

  const header = renderHeader();

  const onRowSelect = (event) => {
    const student = event.data;
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: Object.keys(student.chartData),
      datasets: [
        {
          data: Object.values(student.chartData),
          backgroundColor: [
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--teal-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--purple-400"),
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--pink-400"),
            documentStyle.getPropertyValue("--teal-400"),
          ],
        },
      ],
    };

    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
    setSelectedStudent(student);
    setVisible(true);
  };

  return (
    <div>
      <Toast ref={toast} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="d-flex justify-content-center align-items-center w-100">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <DataTable
            value={students}
            paginator
            stripedRows
            resizableColumns
            showGridlines
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="id"
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={["name", "points", "batch"]}
            emptyMessage="No students found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            selectionMode="single"
            onRowSelect={onRowSelect}
          >
            <Column
              field="name"
              header="Name"
              sortable
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "14rem" }}
              body={nameBodyTemplate}
            />
            <Column
              field="points"
              header="Semester Points"
              sortable
              filterField="points"
              style={{ minWidth: "14rem" }}
              filter
              dataType="numeric"
              filterElement={(options) => (
                <InputNumber
                  value={options.value}
                  onChange={(e) =>
                    options.filterCallback(e.value, options.index)
                  }
                  mode="decimal"
                  minFractionDigits={0}
                />
              )}
            />
            <Column
              field="batch"
              header="Batch"
              sortable
              filterField="batch"
              dataType="numeric"
              style={{ minWidth: "14rem" }}
              body={batchBodyTemplate}
              filter
              filterElement={batchFilterTemplate}
            />
          </DataTable>

          <Dialog
            header="Points Breakdown"
            visible={visible}
            onHide={() => setVisible(false)}
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          >
            {selectedStudent && (
              <>
                <div className="flex justify-content-center">
                  <Chart
                    type="doughnut"
                    data={chartData}
                    options={chartOptions}
                    className="w-full md:w-30rem"
                  />
                </div>
                <p className="m-0">
                  Total Points:{" "}
                  {chartData.datasets[0].data.reduce((a, b) => a + b, 0)}
                </p>
              </>
            )}
          </Dialog>
        </>
      )}
    </div>
  );
}
