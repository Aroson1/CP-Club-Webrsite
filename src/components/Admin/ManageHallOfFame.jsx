import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import apiService from "../../apiService";

/**
 * ManageHallOfFame component for managing Hall of Fame members.
 *
 * This component allows users to view, add, edit, and delete members of the Hall of Fame.
 * It includes functionalities for searching, exporting data, and displaying member details in a dialog.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Usage
 * <ManageHallOfFame />
 *
 * @typedef {Object} Member
 * @property {number|null} id - The unique identifier for the member.
 * @property {string} name - The name of the member.
 * @property {string} image - The URL of the member's image.
 * @property {string} title - The title or position of the member.
 * @property {string} description - A brief description of the member.
 *
 * @function fetchMembers - Fetches the list of members from the API.
 * @function openNew - Opens the dialog to add a new member.
 * @function editMember - Opens the dialog to edit an existing member.
 * @function confirmDeleteSelectedMembers - Confirms the deletion of selected members.
 * @function deleteSelectedMembers - Deletes the selected members from the API.
 * @function exportCSV - Exports the member data as a CSV file.
 * @function hideDialog - Hides the member dialog.
 * @function saveMember - Saves the new or edited member to the API.
 * @function personBodyTemplate - Renders the member's name and image in the data table.
 * @function actionBodyTemplate - Renders action buttons for editing members in the data table.
 * @function onInputChange - Handles input changes for member fields.
 */
export default function ManageHallOfFame() {
  let emptyMember = {
    id: null,
    name: "",
    image: "",
    title: "",
    description: "",
  };

  const [members, setMembers] = useState([]);
  const [memberDialog, setMemberDialog] = useState(false);
  const [member, setMember] = useState(emptyMember);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/hallOfFame");
      setMembers(response);
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch Hall of Fame members. Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setMember(emptyMember);
    setEditingMember({});
    setSubmitted(false);
    setMemberDialog(true);
  };

  const editMember = (member) => {
    setMember({ ...member });
    setEditingMember({ ...member });
    setMemberDialog(true);
  };

  const confirmDeleteSelectedMembers = () => {
    confirmDialog({
      message: "Are you sure you want to delete the selected members?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: deleteSelectedMembers,
    });
  };

  const deleteSelectedMembers = async () => {
    try {
      for (const member of selectedMembers) {
        await apiService.delete(`/v1/hallOfFame/${member.id}`);
      }
      await fetchMembers();
      setSelectedMembers(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Members Deleted",
        life: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete members. Please try again.",
        life: 3000,
      });
    }
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          disabled={!selectedMembers || !selectedMembers.length}
          onClick={() => confirmDeleteSelectedMembers()}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const hideDialog = () => {
    setSubmitted(false);
    setMemberDialog(false);
    setEditingMember(null);
  };

  const saveMember = async () => {
    setSubmitted(true);

    const memberToSave = editingMember || member;

    if (memberToSave.name?.trim() && memberToSave.title?.trim()) {
      try {
        let response;
        if (memberToSave.id) {
          response = await apiService.put(
            `/v1/hallOfFame/${memberToSave.id}`,
            memberToSave
          );

          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Member Updated",
            life: 3000,
          });
        } else {
          response = await apiService.post("/v1/hallOfFame", memberToSave);

          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Member Created",
            life: 3000,
          });
        }
        await fetchMembers();
        setMemberDialog(false);
        setMember(emptyMember);
        setEditingMember(null);
      } catch (err) {
        console.error(err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to save member. Please try again.",
          life: 3000,
        });
      }
    }
  };

  const personBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          src={rowData.image}
          alt={rowData.name}
          className="shadow-2 border-round"
          style={{ width: "32px" }}
        />
        <span>{rowData.name}</span>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editMember(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Hall of Fame</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

  const memberDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveMember} />
    </React.Fragment>
  );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _member = { ...editingMember };
    _member[`${name}`] = val;
    setEditingMember(_member);
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card">
        <Toolbar
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={members}
          selection={selectedMembers}
          onSelectionChange={(e) => setSelectedMembers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter}
          header={header}
          loading={loading}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            header="Person"
            body={personBodyTemplate}
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="title"
            header="Title"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="updatedAt"
            header="Last Modified"
            sortable
            style={{ minWidth: "10rem" }}
            body={(rowData) => new Date(rowData.updatedAt).toLocaleString()}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={memberDialog}
        style={{ width: "32rem" }}
        header="Member Details"
        modal
        className="p-fluid"
        footer={memberDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={editingMember ? editingMember.name : member.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            className={classNames({
              "p-invalid":
                submitted &&
                !(editingMember ? editingMember.name : member.name),
            })}
          />
          {submitted && !(editingMember ? editingMember.name : member.name) && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="image">Image URL</label>
          <InputText
            id="image"
            value={editingMember ? editingMember.image : member.image}
            onChange={(e) => onInputChange(e, "image")}
          />
        </div>

        <div className="field">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={editingMember ? editingMember.title : member.title}
            onChange={(e) => onInputChange(e, "title")}
            required
            placeholder="Student, Researcher at AIMS"
            className={classNames({
              "p-invalid":
                submitted &&
                !(editingMember ? editingMember.title : member.title),
            })}
          />
          {submitted &&
            !(editingMember ? editingMember.title : member.title) && (
              <small className="p-error">Title is required.</small>
            )}
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <InputText
            id="description"
            value={
              editingMember ? editingMember.description : member.description
            }
            onChange={(e) => onInputChange(e, "description")}
          />
        </div>
      </Dialog>
    </div>
  );
}
