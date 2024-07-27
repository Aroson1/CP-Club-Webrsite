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

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    profileImage: "profile1.png",
    points: 120,
    batch: 2021,
    chartData: [100, 20],
  },
  {
    id: 2,
    name: "Jane Smith",
    profileImage: "profile2.png",
    points: 110,
    batch: 2022,
    chartData: [60, 50],
  },
  {
    id: 3,
    name: "Alice Johnson",
    profileImage: "profile3.png",
    points: 130,
    batch: 2023,
    chartData: [70, 60],
  },
  {
    id: 4,
    name: "Bob Brown",
    profileImage: "profile4.png",
    points: 90,
    batch: 2024,
    chartData: [40, 50],
  },
  {
    id: 5,
    name: "Charlie Green",
    profileImage: "profile5.png",
    points: 150,
    batch: 2021,
    chartData: [80, 70],
  },
  {
    id: 6,
    name: "Diana Blue",
    profileImage: "profile6.png",
    points: 85,
    batch: 2022,
    chartData: [50, 35],
  },
  // Add more sample data as needed
];

export default function LeaderboardPage() {
  const [students, setStudents] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const toast = useRef(null);
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
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  useEffect(() => {
    setStudents(sampleData);
  }, []);

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
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Leaderboard</h4>

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
          alt={rowData.name}
          src={`https://placeholder.co/32x32`}
          width="32"
        />
        <span>{rowData.name}</span>
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
      labels: ["VC 1", "VC 2"],
      datasets: [
        {
          data: student.chartData,
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
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
          filterElement={(options) => (
            <InputNumber
              value={options.value}
              onChange={(e) => options.filterCallback(e.value, options.index)}
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
    </div>
  );
}
