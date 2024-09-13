import React, { useState, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import apiService from "../../apiService";

/**
 * ManageLeaderboard component for displaying and managing the leaderboard.
 * 
 * This component fetches student leaderboard data based on the selected semester and year,
 * allows editing user details, and supports uploading CSV files.
 * 
 * @component
 * @example
 * return (
 *   <ManageLeaderboard />
 * );
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @state {Array} leaderboard - The list of users in the leaderboard.
 * @state {boolean} leaderboardDialog - Controls the visibility of the user details dialog.
 * @state {Object} user - The currently selected user for editing.
 * @state {Array} dialogContestData - The contest data associated with the selected user.
 * @state {boolean} submitted - Indicates if the form has been submitted.
 * @state {string|null} globalFilter - The global search filter for the leaderboard.
 * @state {string} selectedSemester - The currently selected semester (e.g., "ODD", "EVEN").
 * @state {number} selectedYear - The currently selected year.
 * @state {boolean} loading - Indicates if data is currently being loaded.
 * @state {string|null} error - Error message if fetching data fails.
 * 
 * @function fetchStudents - Fetches the leaderboard data from the API.
 * @function handleSemesterChange - Updates the selected semester and fetches students.
 * @function handleYearChange - Updates the selected year and fetches students.
 * @function hideDialog - Hides the user details dialog.
 * @function saveUser - Saves the user details to the API.
 * @function editUser - Prepares the selected user for editing in the dialog.
 * @function actionBodyTemplate - Renders the action buttons for each row in the leaderboard.
 * @function uploadCSV - Handles the CSV file upload.
 * @function leftToolbarTemplate - Renders the left toolbar with semester and year dropdowns.
 * @function rightToolbarTemplate - Renders the right toolbar with the CSV upload button.
 */
export default function ManageLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardDialog, setLeaderboardDialog] = useState(false);
  const [user, setUser] = useState({
    id: null,
    userName: "",
    profileImage: "",
    points: 0,
    chartData: {},
    batch: "",
  });
  const [dialogContestData, setDialogContestData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("ODD");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const toast = useRef(null);
  const dt = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(
        `/v1/leaderboard?sem=${selectedSemester}&year=${selectedYear}`
      );

      setLeaderboard(response || []);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching students.");
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch students",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedSemester, selectedYear]);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.value);
    fetchStudents();
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.value);
    fetchStudents();
  };

  const hideDialog = () => {
    setSubmitted(false);
    setLeaderboardDialog(false);
  };

  const saveUser = async () => {
    setSubmitted(true);
    if (user.userName.trim()) {
      let _user = { ...user };
      const isDuplicateContestName = dialogContestData.some(
        (contest, index) => {
          return (
            dialogContestData.findIndex(
              (c, i) => c.contestName === contest.contestName && i !== index
            ) !== -1
          );
        }
      );

      if (isDuplicateContestName) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Two contests cannot have the same name",
          life: 3000,
        });
        return;
      }

      const chartData = dialogContestData.reduce((acc, contest) => {
        acc[contest.contestName] = contest.points;
        return acc;
      }, {});

      _user.chartData = chartData;

      if (user.id) {
        try {
          const response = await apiService.put(
            `/v1/leaderboard/${user.id}`,
            JSON.stringify({
              sem: selectedSemester,
              year: selectedYear,
              chartData: chartData,
            })
          );

          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "User Updated",
            life: 3000,
          });
          fetchStudents();
        } catch (error) {
          console.error("Error:", error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to update user",
            life: 3000,
          });
        }
      }

      setLeaderboardDialog(false);
      setUser({
        id: null,
        userName: "",
        profileImage: "",
        points: 0,
        chartData: {},
        batch: "",
      });
      setDialogContestData([]);
    }
  };

  const editUser = (user) => {
    setUser({ ...user });
    const contestDataArray = Object.entries(user.chartData).map(
      ([name, points]) => ({
        contestName: name,
        points: points,
      })
    );
    setDialogContestData(contestDataArray);
    setLeaderboardDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editUser(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Leaderboard</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

  const leaderboardDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveUser} />
    </React.Fragment>
  );

  const userBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={rowData.userName}
          src={rowData.profileImage}
          width="32"
          style={{ verticalAlign: "middle", borderRadius: "50%" }}
        />
        <span>{rowData.userName}</span>
      </div>
    );
  };

  const uploadCSV = (event) => {
    toast.current.show({
      severity: "info",
      summary: "File Uploaded",
      detail: "CSV file uploaded successfully",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Dropdown
          value={selectedSemester}
          onChange={handleSemesterChange}
          options={["ODD", "EVEN"]}
          placeholder="Select Semester"
        />
        <Dropdown
          value={selectedYear}
          onChange={handleYearChange}
          options={Array.from(
            { length: new Date().getFullYear() - 2023 },
            (_, i) => 2024 + i
          )}
          placeholder="Select Year"
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <FileUpload
        mode="basic"
        accept=".csv"
        maxFileSize={1000000}
        label="Upload CSV"
        chooseLabel="Upload CSV"
        className="p-button-success"
        uploadHandler={uploadCSV}
      />
    );
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
        <div>
          <div className="card">
            <Toolbar
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            ></Toolbar>

            <DataTable
              ref={dt}
              value={leaderboard}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              globalFilter={globalFilter}
              header={header}
            >
              <Column
                header="User"
                body={userBodyTemplate}
                style={{ minWidth: "14rem" }}
              ></Column>
              <Column
                field="points"
                header="Semester Points"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="batch"
                header="Batch"
                sortable
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "8rem" }}
              ></Column>
            </DataTable>
          </div>

          <Dialog
            visible={leaderboardDialog}
            style={{ width: "32rem" }}
            header="User Details"
            modal
            className="p-fluid"
            footer={leaderboardDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="contestData">Contest Data</label>
              <div className="flex flex-column gap-2">
                {dialogContestData.map((contest, index) => (
                  <div key={index} className="flex gap-2">
                    <InputText
                      value={contest.contestName}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setDialogContestData((prevData) => {
                          const newData = [...prevData];
                          newData[index].contestName = newName;
                          return newData;
                        });
                      }}
                      placeholder="Contest Name"
                    />
                    <InputText
                      value={contest.points}
                      onChange={(e) => {
                        const newPoints = parseInt(e.target.value) || 0;
                        setDialogContestData((prevData) => {
                          const newData = [...prevData];
                          newData[index].points = newPoints;
                          return newData;
                        });
                      }}
                      placeholder="Points"
                      type="number"
                    />
                  </div>
                ))}
                <Button
                  label="Add Contest"
                  icon="pi pi-plus"
                  className="mt-2"
                  onClick={() => {
                    setDialogContestData((prevData) => [
                      ...prevData,
                      {
                        contestName: `Contest ${prevData.length + 1}`,
                        points: 0,
                      },
                    ]);
                  }}
                />
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
}
