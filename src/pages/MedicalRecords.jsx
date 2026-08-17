import { useEffect, useState } from "react";

import {
  FileText,
  Eye,
  Download,
  Calendar,
  RefreshCw,
  Upload,
  Pencil,
  Trash2,
  X,
  Save,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getRecordDocuments,
  updateRecordDocument,
  deleteRecordDocument,
} from "../services/recordDocumentService";


function MedicalRecords() {
  // ==============================
  // RECORDS
  // ==============================

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");


  // ==============================
  // EDIT
  // ==============================

  const [editingRecord, setEditingRecord] = useState(null);

  const [documentsType, setDocumentsType] = useState("");

  const [documentDetails, setDocumentDetails] = useState("");

  const [document, setDocument] = useState(null);

  const [updateLoading, setUpdateLoading] = useState(false);


  // ==============================
  // DELETE
  // ==============================

  const [deletingId, setDeletingId] = useState(null);


  // ==============================
  // GET MEDICAL RECORDS
  // ==============================

  const fetchRecords = async () => {
    try {
      setLoading(true);

      setErrorMessage("");

      const data = await getRecordDocuments();

      console.log("Medical Records GET:", data);

      if (Array.isArray(data)) {
        setRecords(data);
      } else if (Array.isArray(data?.results)) {
        setRecords(data.results);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error("Get medical records error:", error);

      const backendError = error.response?.data;

      if (backendError?.detail) {
        setErrorMessage(backendError.detail);
      } else {
        setErrorMessage(
          "Failed to load medical records. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  // ==============================
  // LOAD RECORDS
  // ==============================

  useEffect(() => {
    fetchRecords();
  }, []);


  // ==============================
  // FILE URL
  // ==============================

  const getFileUrl = (document) => {
    if (!document) return "#";

    if (document.startsWith("http")) {
      return document;
    }

    return document;
  };


  // ==============================
  // FORMAT DATE
  // ==============================

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  // ==============================
  // OPEN EDIT MODAL
  // ==============================

  const handleEdit = (record) => {
    setEditingRecord(record);

    setDocumentsType(record.documents_type || "");

    setDocumentDetails(record.document_details || "");

    setDocument(null);

    setErrorMessage("");

    setSuccessMessage("");
  };


  // ==============================
  // CLOSE EDIT MODAL
  // ==============================

  const closeEditModal = () => {
    if (updateLoading) return;

    setEditingRecord(null);

    setDocumentsType("");

    setDocumentDetails("");

    setDocument(null);
  };


  // ==============================
  // FILE CHANGE
  // ==============================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setDocument(null);
      return;
    }

    setDocument(file);
  };


  // ==============================
  // PATCH / UPDATE
  // ==============================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingRecord) return;

    setErrorMessage("");

    setSuccessMessage("");


    // Validation

    if (!documentsType.trim()) {
      setErrorMessage("Please enter the document type.");
      return;
    }


    try {
      setUpdateLoading(true);

      await updateRecordDocument({
        id: editingRecord.id,
        documents_type: documentsType,
        document: document,
        document_details: documentDetails,
      });


      setSuccessMessage(
        "Medical record updated successfully."
      );


      // Close modal

      setEditingRecord(null);

      setDocumentsType("");

      setDocumentDetails("");

      setDocument(null);


      // Refresh records

      await fetchRecords();


      // Auto hide success message

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error(
        "Update medical record error:",
        error
      );

      const backendError = error.response?.data;


      if (backendError?.document) {
        setErrorMessage(
          Array.isArray(backendError.document)
            ? backendError.document[0]
            : backendError.document
        );
      } else if (backendError?.documents_type) {
        setErrorMessage(
          Array.isArray(backendError.documents_type)
            ? backendError.documents_type[0]
            : backendError.documents_type
        );
      } else if (backendError?.document_details) {
        setErrorMessage(
          Array.isArray(backendError.document_details)
            ? backendError.document_details[0]
            : backendError.document_details
        );
      } else if (backendError?.detail) {
        setErrorMessage(backendError.detail);
      } else {
        setErrorMessage(
          "Failed to update medical record. Please try again."
        );
      }
    } finally {
      setUpdateLoading(false);
    }
  };


  // ==============================
  // DELETE RECORD
  // ==============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medical record?"
    );

    if (!confirmed) return;


    try {
      setDeletingId(id);

      setErrorMessage("");

      setSuccessMessage("");


      await deleteRecordDocument(id);


      // Remove immediately from UI

      setRecords((prevRecords) =>
        prevRecords.filter(
          (record) => record.id !== id
        )
      );


      setSuccessMessage(
        "Medical record deleted successfully."
      );


      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error(
        "Delete medical record error:",
        error
      );

      const backendError = error.response?.data;


      if (backendError?.detail) {
        setErrorMessage(backendError.detail);
      } else {
        setErrorMessage(
          "Failed to delete medical record. Please try again."
        );
      }
    } finally {
      setDeletingId(null);
    }
  };


  return (
    <section className="pb-12">


      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#D9F7E8]
                px-4
                py-2
                text-sm
                font-semibold
                text-[#2F6FED]
              "
            >
              <FileText size={18} />

              Medical Records
            </div>


            <h1
              className="
                mt-5
                text-3xl
                font-extrabold
                text-[#212121]
                md:text-4xl
              "
            >
              My Medical Records
            </h1>


            <p
              className="
                mt-3
                max-w-2xl
                leading-7
                text-[#7A7A7A]
              "
            >
              View, update and manage your uploaded
              medical documents, reports, prescriptions,
              and healthcare files.
            </p>

          </div>


          {/* UPLOAD */}

          <Link
            to="/medical-record"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#2F6FED]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#245bd0]
            "
          >
            <Upload size={18} />

            Upload Record
          </Link>

        </div>

      </div>


      {/* ==============================
          SUCCESS MESSAGE
      ============================== */}

      {successMessage && (
        <div
          className="
            mb-6
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-green-200
            bg-green-50
            px-5
            py-4
            text-sm
            font-medium
            text-green-700
          "
        >
          <CheckCircle size={20} />

          <span>{successMessage}</span>
        </div>
      )}


      {/* ==============================
          ERROR
      ============================== */}

      {errorMessage && (
        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-sm
            font-medium
            text-red-600
          "
        >

          <div className="flex items-center gap-3">

            <AlertCircle size={20} />

            <span>{errorMessage}</span>

          </div>


          <button
            type="button"
            onClick={fetchRecords}
            className="
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-lg
              bg-white
              px-3
              py-2
              text-red-600
              shadow-sm
              transition
              hover:bg-red-100
            "
          >
            <RefreshCw size={15} />

            Retry
          </button>

        </div>
      )}


      {/* ==============================
          LOADING
      ============================== */}

      {loading ? (

        <div className="grid gap-5 md:grid-cols-2">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="
                h-56
                animate-pulse
                rounded-3xl
                bg-gray-200
              "
            />

          ))}

        </div>

      ) : records.length === 0 ? (

        /* ==============================
           EMPTY
        ============================== */

        <div
          className="
            rounded-3xl
            border
            border-[#EEEEEE]
            bg-white
            px-6
            py-16
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          "
        >

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <FileText size={30} />
          </div>


          <h2
            className="
              mt-5
              text-xl
              font-bold
              text-[#212121]
            "
          >
            No Medical Records
          </h2>


          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-6
              text-[#7A7A7A]
            "
          >
            You haven't uploaded any medical records
            yet. Upload your first medical document
            to keep it here.
          </p>


          <Link
            to="/medical-record"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#2F6FED]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#245bd0]
            "
          >
            <Upload size={18} />

            Upload Medical Record
          </Link>

        </div>

      ) : (

        /* ==============================
           RECORD LIST
        ============================== */

        <div className="grid gap-5 md:grid-cols-2">

          {records.map((record) => {

            const fileUrl = getFileUrl(
              record.document
            );


            return (
              <div
                key={record.id}
                className="
                  rounded-3xl
                  border
                  border-[#EEEEEE]
                  bg-white
                  p-6
                  shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                  transition
                  hover:-translate-y-1
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                "
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-center gap-4">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#D9F7E8]
                        text-[#2F6FED]
                      "
                    >
                      <FileText size={23} />
                    </div>


                    <div className="min-w-0">

                      <h2
                        className="
                          truncate
                          text-lg
                          font-bold
                          text-[#212121]
                        "
                      >
                        {record.documents_type ||
                          "Medical Document"}
                      </h2>


                      <div
                        className="
                          mt-1
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          text-[#7A7A7A]
                        "
                      >
                        <Calendar size={13} />

                        {formatDate(
                          record.uploaded_at
                        )}
                      </div>

                    </div>

                  </div>


                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-[#D9F7E8]
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-green-700
                    "
                  >
                    Uploaded
                  </span>

                </div>


                {/* DETAILS */}

                {record.document_details && (
                  <p
                    className="
                      mt-5
                      line-clamp-3
                      text-sm
                      leading-6
                      text-[#7A7A7A]
                    "
                  >
                    {record.document_details}
                  </p>
                )}


                {/* FILE NAME */}

                <div
                  className="
                    mt-5
                    truncate
                    rounded-xl
                    bg-[#F8FAFC]
                    px-4
                    py-3
                    text-xs
                    text-[#7A7A7A]
                  "
                >
                  {record.document
                    ? record.document
                        .split("/")
                        .pop()
                    : "No file"}
                </div>


                {/* ACTIONS */}

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-2
                    gap-3
                    border-t
                    border-[#EEEEEE]
                    pt-5
                  "
                >

                  {/* VIEW */}

                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-[#EEEEEE]
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-[#212121]
                      transition
                      hover:bg-[#D9F7E8]
                      hover:text-[#2F6FED]
                    "
                  >
                    <Eye size={17} />

                    View
                  </a>


                  {/* DOWNLOAD */}

                  <a
                    href={fileUrl}
                    download
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#2F6FED]
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-[#245bd0]
                    "
                  >
                    <Download size={17} />

                    Download
                  </a>


                  {/* EDIT */}

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(record)
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-[#EEEEEE]
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-[#212121]
                      transition
                      hover:border-[#2F6FED]
                      hover:bg-[#D9F7E8]
                      hover:text-[#2F6FED]
                    "
                  >
                    <Pencil size={17} />

                    Edit
                  </button>


                  {/* DELETE */}

                  <button
                    type="button"
                    disabled={
                      deletingId === record.id
                    }
                    onClick={() =>
                      handleDelete(record.id)
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-red-200
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-50
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <Trash2 size={17} />

                    {deletingId === record.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}


      {/* ==================================================
          EDIT MODAL
      ================================================== */}

      {editingRecord && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            py-6
            backdrop-blur-sm
          "
        >

          <div
            className="
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              bg-white
              p-6
              shadow-[0_20px_60px_rgba(0,0,0,0.20)]
              md:p-8
            "
          >

            {/* MODAL HEADER */}

            <div className="mb-7 flex items-start justify-between gap-4">

              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#D9F7E8]
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-[#2F6FED]
                  "
                >
                  <Pencil size={15} />

                  Edit Medical Record
                </div>


                <h2
                  className="
                    mt-4
                    text-2xl
                    font-extrabold
                    text-[#212121]
                  "
                >
                  Update Record
                </h2>

              </div>


              <button
                type="button"
                onClick={closeEditModal}
                disabled={updateLoading}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  text-[#7A7A7A]
                  transition
                  hover:bg-[#F2F2F2]
                  hover:text-[#212121]
                  disabled:opacity-50
                "
              >
                <X size={21} />
              </button>

            </div>


            {/* FORM */}

            <form onSubmit={handleUpdate}>

              {/* DOCUMENT TYPE */}

              <div className="mb-6">

                <label
                  htmlFor="editDocumentsType"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#212121]
                  "
                >
                  Document Type
                </label>


                <input
                  id="editDocumentsType"
                  type="text"
                  value={documentsType}
                  onChange={(e) =>
                    setDocumentsType(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Prescription, Blood Report, X-Ray"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-[#212121]
                    outline-none
                    transition
                    placeholder:text-[#7A7A7A]
                    focus:border-[#2F6FED]
                    focus:ring-2
                    focus:ring-[#2F6FED]/10
                  "
                />

              </div>


              {/* DOCUMENT DETAILS */}

              <div className="mb-6">

                <label
                  htmlFor="editDocumentDetails"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#212121]
                  "
                >
                  Document Details
                </label>


                <textarea
                  id="editDocumentDetails"
                  value={documentDetails}
                  onChange={(e) =>
                    setDocumentDetails(
                      e.target.value
                    )
                  }
                  placeholder="Add some details about this medical document..."
                  rows={5}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-[#212121]
                    outline-none
                    transition
                    placeholder:text-[#7A7A7A]
                    focus:border-[#2F6FED]
                    focus:ring-2
                    focus:ring-[#2F6FED]/10
                  "
                />

              </div>


              {/* CURRENT FILE */}

              <div className="mb-4">

                <p
                  className="
                    mb-2
                    text-sm
                    font-semibold
                    text-[#212121]
                  "
                >
                  Current Document
                </p>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-[#F8FAFC]
                    px-4
                    py-3
                    text-sm
                    text-[#7A7A7A]
                  "
                >
                  <FileText
                    size={18}
                    className="shrink-0 text-[#2F6FED]"
                  />

                  <span className="truncate">
                    {editingRecord.document
                      ? editingRecord.document
                          .split("/")
                          .pop()
                      : "No file"}
                  </span>
                </div>

              </div>


              {/* NEW FILE */}

              <div className="mb-8">

                <label
                  htmlFor="editDocument"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#212121]
                  "
                >
                  Replace Document
                  <span
                    className="
                      ml-2
                      text-xs
                      font-normal
                      text-[#7A7A7A]
                    "
                  >
                    Optional
                  </span>
                </label>


                <label
                  htmlFor="editDocument"
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-4
                    rounded-2xl
                    border-2
                    border-dashed
                    border-[#EEEEEE]
                    bg-[#F8FAFC]
                    px-5
                    py-5
                    transition
                    hover:border-[#2F6FED]
                    hover:bg-[#D9F7E8]/30
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <Upload size={22} />
                  </div>


                  <div className="min-w-0">

                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-[#212121]
                      "
                    >
                      {document
                        ? document.name
                        : "Click to replace the document"}
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#7A7A7A]
                      "
                    >
                      Leave empty to keep the current file.
                    </p>

                  </div>

                </label>


                <input
                  id="editDocument"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </div>


              {/* BUTTONS */}

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-3
                  sm:flex-row
                  sm:justify-end
                "
              >

                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={updateLoading}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-[#212121]
                    transition
                    hover:bg-[#F2F2F2]
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={updateLoading}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#2F6FED]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#245bd0]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  <Save size={18} />

                  {updateLoading
                    ? "Updating..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
}


export default MedicalRecords;