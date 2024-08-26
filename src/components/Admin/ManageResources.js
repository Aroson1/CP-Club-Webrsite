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

export default function ManageResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resourceDialog, setResourceDialog] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [selectedResources, setSelectedResources] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/resources");
      setResources(response);
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch resources. Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditingResource({ id: null, resourceTitle: "", listOfResources: [] });
    setSubmitted(false);
    setResourceDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setResourceDialog(false);
    setEditingResource(null);
  };

  const saveResource = async () => {
    setSubmitted(true);

    if (editingResource.resourceTitle.trim()) {
      const allResourcesHaveTitle = editingResource.listOfResources.every(
        (resource) => resource.title.trim() !== ""
      );

      if (!allResourcesHaveTitle) {
        return;
      }
      try {
        let response;
        if (editingResource.id) {
          response = await apiService.put(
            `/v1/resources/${editingResource.id}`,
            {
              resourceTitle: editingResource.resourceTitle,
              listOfResources: editingResource.listOfResources,
            }
          );
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Resource Updated",
            life: 3000,
          });
        } else {
          response = await apiService.post("/v1/resources", {
            resourceTitle: editingResource.resourceTitle,
            listOfResources: editingResource.listOfResources,
          });
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Resource Created",
            life: 3000,
          });
        }

        await fetchResources();
        setResourceDialog(false);
        setEditingResource(null);
      } catch (err) {
        console.error(err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to save resource. Please try again.",
          life: 3000,
        });
      }
    }
  };

  const editResource = (resource) => {
    setEditingResource({ ...resource });
    setResourceDialog(true);
  };

  const confirmDeleteSelectedResources = () => {
    confirmDialog({
      message: "Are you sure you want to delete the selected resources?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: deleteSelectedResources,
    });
  };

  const deleteSelectedResources = async () => {
    try {
      for (const resource of selectedResources) {
        await apiService.delete(`/v1/resources/${resource.id}`);
      }
      await fetchResources();
      setSelectedResources(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Resources Deleted",
        life: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete resources. Please try again.",
        life: 3000,
      });
    }
    setConfirmDeleteDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const updateEditingResource = (field, value) => {
    setEditingResource((prev) => ({ ...prev, [field]: value }));
  };

  const updateResourceItem = (index, field, value) => {
    setEditingResource((prev) => {
      const newResources = [...prev.listOfResources];
      newResources[index] = { ...newResources[index], [field]: value };
      return { ...prev, listOfResources: newResources };
    });
  };

  const addResourceItem = () => {
    setEditingResource((prev) => ({
      ...prev,
      listOfResources: [...prev.listOfResources, { link: "", title: "" }],
    }));
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editResource(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Resources</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

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
          disabled={!selectedResources || !selectedResources.length}
          onClick={() => confirmDeleteSelectedResources()}
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

  const resourceDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveResource} />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={confirmDeleteDialog}
        onHide={() => setConfirmDeleteDialog(false)}
      />
      <div className="card">
        <Toolbar
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={resources}
          selection={selectedResources}
          onSelectionChange={(e) => setSelectedResources(e.value)}
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
            field="resourceTitle"
            header="Resource Title"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            header="Number of Resources"
            body={(rowData) => rowData.listOfResources.length}
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="updatedAt"
            header="Last Updated"
            sortable
            style={{ minWidth: "12rem" }}
            body={(rowData) => new Date(rowData.updatedAt).toLocaleDateString()}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={resourceDialog}
        style={{ width: "32rem" }}
        header="Resource Details"
        modal
        className="p-fluid"
        footer={resourceDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="resourceTitle">Resource Title</label>
          <InputText
            id="resourceTitle"
            value={editingResource?.resourceTitle || ""}
            onChange={(e) =>
              updateEditingResource("resourceTitle", e.target.value)
            }
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !editingResource?.resourceTitle,
            })}
          />
          {submitted && !editingResource?.resourceTitle && (
            <small className="p-error">Resource Title is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="listOfResources">Resources</label>
          <div className="flex flex-column gap-2">
            {editingResource?.listOfResources.map((res, index) => (
              <div key={index} className="flex gap-2">
                <InputText
                  value={res.title}
                  onChange={(e) =>
                    updateResourceItem(index, "title", e.target.value)
                  }
                  required
                  className={classNames({
                    "p-invalid": submitted && !res.title,
                  })}
                  placeholder="Title"
                />
                <InputText
                  value={res.link}
                  onChange={(e) =>
                    updateResourceItem(index, "link", e.target.value)
                  }
                  // required
                  // className={classNames({
                  //   "p-invalid": submitted && !res.link,
                  // })}
                  placeholder="Link"
                />
              </div>
            ))}
            <Button
              label="Add Resource"
              icon="pi pi-plus"
              className="mt-2"
              onClick={addResourceItem}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
