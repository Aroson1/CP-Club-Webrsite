import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import apiService from "../../apiService";

export default function ManageEvents() {
  let emptyEvent = {
    id: null,
    blogId: "",
    title: "",
    date: null,
    imageUrl: "",
  };

  const [events, setEvents] = useState([]);
  const [eventDialog, setEventDialog] = useState(false);
  const [event, setEvent] = useState(emptyEvent);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/events");
      setEvents(response);
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch events. Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEvent(emptyEvent);
    setEditingEvent({});
    setSubmitted(false);
    setEventDialog(true);
  };

  const editEvent = (event) => {
    setEvent({ ...event, date: new Date(event.date) });
    setEditingEvent({ ...event, date: new Date(event.date) });
    setEventDialog(true);
  };

  const confirmDeleteSelectedEvents = () => {
    confirmDialog({
      message: "Are you sure you want to delete the selected events?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: deleteSelectedEvents,
    });
  };

  const deleteSelectedEvents = async () => {
    try {
      for (const event of selectedEvents) {
        await apiService.delete(`/v1/events/${event.id}`);
      }
      await fetchEvents();
      setSelectedEvents(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Events Deleted",
        life: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete events. Please try again.",
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
          disabled={!selectedEvents || !selectedEvents.length}
          onClick={() => confirmDeleteSelectedEvents()}
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
    setEventDialog(false);
    setEditingEvent(null);
  };

  const saveEvent = async () => {
    setSubmitted(true);

    const eventToSave = editingEvent || event;

    if (eventToSave.title?.trim() && eventToSave.blogId?.trim()) {
      try {
        let response;
        if (eventToSave.id) {
          response = await apiService.put(`/v1/events/${eventToSave.id}`, {
            blogId: parseInt(eventToSave.blogId),
            title: eventToSave.title,
            date: eventToSave.date,
            imageUrl: eventToSave.imageUrl,
          });

          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Event Updated",
            life: 3000,
          });
        } else {
          response = await apiService.post("/v1/events", {
            blogId: parseInt(eventToSave.blogId),
            title: eventToSave.title,
            date: eventToSave.date,
            imageUrl: eventToSave.imageUrl,
          });

          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Event Created",
            life: 3000,
          });
        }
        await fetchEvents();
        setEventDialog(false);
        setEvent(emptyEvent);
        setEditingEvent(null);
      } catch (err) {
        console.error(err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to save event. Please try again.",
          life: 3000,
        });
      }
    }
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.imageUrl}
        alt={rowData.title}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const blogIdTemplate = (rowData) => {
    return (
      <a
        href={`${window.location.origin}/blog-details?id=${rowData.blogId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {rowData.blogId}
      </a>
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
          onClick={() => editEvent(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Events</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

  const eventDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveEvent} />
    </React.Fragment>
  );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _event = { ...editingEvent };
    _event[`${name}`] = val;
    setEditingEvent(_event);
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
          value={events}
          selection={selectedEvents}
          onSelectionChange={(e) => setSelectedEvents(e.value)}
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
            field="title"
            header="Title"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            header="Blog ID"
            body={blogIdTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="date"
            header="Date"
            sortable
            style={{ minWidth: "10rem" }}
            body={(rowData) => new Date(rowData.date).toLocaleDateString()}
          ></Column>
          <Column
            header="Image"
            body={imageBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={eventDialog}
        style={{ width: "32rem" }}
        header="Event Details"
        modal
        className="p-fluid"
        footer={eventDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="blogId">Blog ID</label>
          <InputText
            id="blogId"
            value={editingEvent ? editingEvent.blogId : event.blogId}
            onChange={(e) => onInputChange(e, "blogId")}
            required
            className={classNames({
              "p-invalid":
                submitted &&
                !(editingEvent ? editingEvent.blogId : event.blogId),
            })}
          />
          {submitted &&
            !(editingEvent ? editingEvent.blogId : event.blogId) && (
              <small className="p-error">Blog ID is required.</small>
            )}
        </div>

        <div className="field">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={editingEvent ? editingEvent.title : event.title}
            onChange={(e) => onInputChange(e, "title")}
            required
            className={classNames({
              "p-invalid":
                submitted && !(editingEvent ? editingEvent.title : event.title),
            })}
          />
          {submitted && !(editingEvent ? editingEvent.title : event.title) && (
            <small className="p-error">Title is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <Calendar
            id="date"
            value={editingEvent ? editingEvent.date : event.date}
            onChange={(e) => onInputChange(e, "date")}
            dateFormat="yy-mm-dd"
            showIcon
          />
        </div>

        <div className="field">
          <label htmlFor="imageUrl">Image URL</label>
          <InputText
            id="imageUrl"
            value={editingEvent ? editingEvent.imageUrl : event.imageUrl}
            onChange={(e) => onInputChange(e, "imageUrl")}
          />
        </div>
      </Dialog>
    </div>
  );
}
