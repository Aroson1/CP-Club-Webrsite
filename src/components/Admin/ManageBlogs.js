import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import apiService from "../../apiService";

export default function ManageBlogs() {
  let emptyBlog = {
    id: "",
    title: "",
    image: "",
    content: "",
    date: "",
    tags: ["", "", ""],
    authorImage: "",
    authorName: "",
  };

  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogDialog, setBlogDialog] = useState(false);
  const [blog, setBlog] = useState(emptyBlog);
  const [editedBlog, setEditedBlog] = useState(emptyBlog);
  const [selectedBlogs, setSelectedBlogs] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/v1/blogs/admin/1");
      setBlogs(response);
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred. Please report to dev.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openNew = () => {
    setEditedBlog(emptyBlog);
    setSubmitted(false);
    setBlogDialog(true);
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
          disabled={!selectedBlogs || !selectedBlogs.length}
          onClick={() => confirmDeleteSelectedBlogs()}
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
    setEditedBlog(emptyBlog);
    setBlogDialog(false);
  };

  const saveBlog = async () => {
    setSubmitted(true);
    

    if (editedBlog.title.trim()) {
      const blogData = {
        title: editedBlog.title,
        image: editedBlog.image,
        authorImage: editedBlog.authorImage || "https://placeholder.co/32x32",
        authorName: editedBlog.authorName,
        date: editedBlog.date,
        comments: 0,
        views: 0,
        content: editedBlog.content,
        tags: editedBlog.tags,
      };
      if (
        !Object.entries(blogData).every(
          ([key, value]) => key === "tags" || (value !== "" && value !== null)
        )
      ) {
        return;
      }

      let toastMessage;
      let toastDetail;

      try {
        let response;
        if (editedBlog.id) {
          response = await apiService.put(
            `/v1/blogs/${editedBlog.id}`,
            blogData
          );
          toastMessage = "success";
          toastDetail = "Blog Updated";
        } else {
          response = await apiService.post("/v1/blogs", blogData);
          toastMessage = "success";
          toastDetail = "Blog Created";
        }

        const updatedBlog = response;

        if (updatedBlog.id) {
          const index = findIndexById(updatedBlog.id);
          let _blogs = [...blogs];
          if (index !== -1) {
            _blogs[index] = updatedBlog;
          } else {
            _blogs.push(updatedBlog);
          }
          setBlogs(_blogs);
        }

        toast.current.show({
          severity: toastMessage,
          summary: "Successful",
          detail: toastDetail,
          life: 3000,
        });
      } catch (err) {
        console.error(err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "An error occurred. Please report to dev.",
          life: 3000,
        });
      } finally {
        setBlogDialog(false);
        setBlog(emptyBlog);
        setEditedBlog(emptyBlog);
      }
    }
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.image}
        alt={rowData.title}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const authorTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={rowData.authorName}
          src={rowData.authorImage || "https://placeholder.co/32x32"}
          width="32"
        />
        <span>{rowData.authorName}</span>
      </div>
    );
  };

  const fetchBlogContent = async (id) => {
    try {
      const response = await apiService.get("/v1/blogs/content/" + id);
      return response.content;
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred. Please report to dev.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
    const blogContent = "Error fetching content";
    return blogContent;
  };

  const editBlog = async (blog) => {
    const fullContent = await fetchBlogContent(blog.id);
    setEditedBlog({ ...blog, content: fullContent });
    setBlogDialog(true);
  };

  const confirmDeleteBlog = (blog) => {
    setConfirmDeleteDialog(true);
    setSelectedBlogs([blog]);
  };

  const deleteSelectedBlogs = async () => {
    try {
      for (const blog of selectedBlogs) {
        await apiService.delete(`/v1/blogs/${blog.id}`);
      }

      let _blogs = blogs.filter((val) => !selectedBlogs.includes(val));
      setBlogs(_blogs);

      setSelectedBlogs(null);

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Blogs Deleted",
        life: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred while deleting blogs. Please report to dev.",
        life: 3000,
      });
    } finally {
      setConfirmDeleteDialog(false);
    }
  };

  const confirmDeleteSelectedBlogs = () => {
    confirmDialog({
      message: "Are you sure you want to delete the selected blogs?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: deleteSelectedBlogs,
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editBlog(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Blogs</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

  const blogDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveBlog} />
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
          value={blogs}
          selection={selectedBlogs}
          onSelectionChange={(e) => setSelectedBlogs(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="title"
            header="Title"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            header="Image"
            body={imageBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="authorName"
            header="Author"
            body={authorTemplate}
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="date"
            header="Date"
            sortable
            style={{ minWidth: "10rem" }}
            body={(rowData) => new Date(rowData.date).toLocaleDateString()}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={blogDialog}
        style={{ width: "32rem" }}
        header="Blog Details"
        modal
        className="p-fluid"
        footer={blogDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={editedBlog.title}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, title: e.target.value })
            }
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !editedBlog.title,
            })}
          />
          {submitted && !editedBlog.title && (
            <small className="p-error">Title is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="image">Image URL</label>
          <InputText
            id="image"
            value={editedBlog.image}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, image: e.target.value })
            }
            required
            className={classNames({
              "p-invalid": submitted && !editedBlog.image,
            })}
          />
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <InputTextarea
            id="content"
            value={editedBlog.content}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, content: e.target.value })
            }
            rows={3}
            cols={20}
            required
            className={classNames({
              "p-invalid": submitted && !editedBlog.content,
            })}
          />
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <Calendar
            id="date"
            value={editedBlog.date ? new Date(editedBlog.date) : null}
            onChange={(e) =>
              setEditedBlog({
                ...editedBlog,
                date: e.value ? e.value.toISOString().split("T")[0] : "",
              })
            }
            dateFormat="yy-mm-dd"
            showIcon
            required
            className={classNames({
              "p-invalid": submitted && !editedBlog.date,
            })}
          />
        </div>

        <div className="field">
          <label htmlFor="tags">Tags</label>
          <div className="flex gap-2">
            {editedBlog.tags.map((tag, index) => (
              <InputText
                key={index}
                value={tag}
                onChange={(e) => {
                  const newTags = [...editedBlog.tags];
                  newTags[index] = e.target.value;
                  setEditedBlog({ ...editedBlog, tags: newTags });
                }}
                placeholder={`Tag ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="author">Author</label>
          <div className="flex align-items-center gap-2">
            <img
              alt={editedBlog.authorName}
              src={editedBlog.authorImage || "https://placeholder.co/32x32"}
              width="32"
            />
            <InputText
              id="authorName"
              value={editedBlog.authorName}
              onChange={(e) =>
                setEditedBlog({
                  ...editedBlog,
                  authorName: e.target.value,
                })
              }
              placeholder="Author Name"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
