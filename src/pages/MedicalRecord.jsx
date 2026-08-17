import { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  FileUp,
  ShieldCheck,
} from "lucide-react";

import { createRecordDocument } from "../services/recordDocumentService";

function MedicalRecord() {
  const [documentsType, setDocumentsType] = useState("");
  const [documentDetails, setDocumentDetails] = useState("");
  const [document, setDocument] = useState(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ==============================
  // FILE SELECT
  // ==============================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setDocument(null);
      return;
    }

    setDocument(file);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!documentsType.trim()) {
      setErrorMessage("Please enter the document type.");
      return;
    }

    if (!document) {
      setErrorMessage("Please select a medical document.");
      return;
    }

    try {
      setLoading(true);

      await createRecordDocument({
        documents_type: documentsType,
        document: document,
        document_details: documentDetails,
      });

      setSuccessMessage("Medical record uploaded successfully.");

      setDocumentsType("");
      setDocumentDetails("");
      setDocument(null);

      e.target.reset();
    } catch (error) {
      console.error("Upload medical record error:", error);

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
          "Failed to upload medical record. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-12">

      {/* ==============================
          PAGE HEADER
      ============================== */}

      <div className="mb-8">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#D9F7E8]
                bg-[#D9F7E8]
                px-4
                py-2
                text-sm
                font-semibold
                text-[#2F6FED]
              "
            >
              <FileText size={17} />
              Medical Records
            </div>

            {/* Heading */}

            <h1
              className="
                mt-5
                text-3xl
                font-extrabold
                tracking-tight
                text-[#212121]
                sm:text-4xl
                lg:text-[42px]
              "
            >
              Upload Medical Record
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-[#7A7A7A]
                sm:text-base
              "
            >
              Securely upload your medical documents, reports,
              prescriptions, and other healthcare files.
            </p>

          </div>

          {/* Security Badge */}

          <div
            className="
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-[#EEEEEE]
              bg-white
              px-4
              py-3
              shadow-[0_6px_20px_rgba(0,0,0,0.04)]
              lg:flex
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#D9F7E8]
                text-[#2F6FED]
              "
            >
              <ShieldCheck size={21} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#212121]">
                Secure Upload
              </p>

              <p className="text-xs text-[#7A7A7A]">
                Your documents are protected
              </p>
            </div>
          </div>

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
            items-start
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
            shadow-sm
          "
        >
          <CheckCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Upload successful
            </p>

            <p className="mt-1 font-normal text-green-600">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      {/* ==============================
          ERROR MESSAGE
      ============================== */}

      {errorMessage && (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-sm
            font-medium
            text-red-600
            shadow-sm
          "
        >
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Upload failed
            </p>

            <p className="mt-1 font-normal">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* ==============================
          MAIN FORM CARD
      ============================== */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-[#EEEEEE]
          bg-white
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        "
      >

        {/* Card Header */}

        <div
          className="
            border-b
            border-[#EEEEEE]
            bg-[#FAFCFB]
            px-6
            py-5
            md:px-8
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#D9F7E8]
                text-[#2F6FED]
              "
            >
              <FileUp size={21} />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#212121]">
                Medical Document Information
              </h2>

              <p className="mt-0.5 text-xs text-[#7A7A7A]">
                Add your document information and upload the file.
              </p>
            </div>

          </div>
        </div>

        {/* Form */}

        <div className="p-6 md:p-8">

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >

            {/* ==============================
                DOCUMENT TYPE
            ============================== */}

            <div className="mb-6">

              <label
                htmlFor="documentsType"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#212121]
                "
              >
                Document Type
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="documentsType"
                type="text"
                value={documentsType}
                onChange={(e) =>
                  setDocumentsType(e.target.value)
                }
                placeholder="e.g. Prescription, Blood Report, X-Ray"
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E5E7EB]
                  bg-white
                  px-4
                  py-3.5
                  text-sm
                  text-[#212121]
                  outline-none
                  transition
                  placeholder:text-[#A0A0A0]
                  hover:border-[#CBD5E1]
                  focus:border-[#2F6FED]
                  focus:ring-4
                  focus:ring-[#2F6FED]/10
                "
              />

            </div>

            {/* ==============================
                DOCUMENT DETAILS
            ============================== */}

            <div className="mb-6">

              <label
                htmlFor="documentDetails"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#212121]
                "
              >
                Document Details
                <span className="ml-1 text-xs font-normal text-[#7A7A7A]">
                  (Optional)
                </span>
              </label>

              <textarea
                id="documentDetails"
                value={documentDetails}
                onChange={(e) =>
                  setDocumentDetails(e.target.value)
                }
                placeholder="Add some details about this medical document..."
                rows={5}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#E5E7EB]
                  bg-white
                  px-4
                  py-3.5
                  text-sm
                  leading-6
                  text-[#212121]
                  outline-none
                  transition
                  placeholder:text-[#A0A0A0]
                  hover:border-[#CBD5E1]
                  focus:border-[#2F6FED]
                  focus:ring-4
                  focus:ring-[#2F6FED]/10
                "
              />

            </div>

            {/* ==============================
                FILE UPLOAD
            ============================== */}

            <div className="mb-8">

              <label
                htmlFor="document"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#212121]
                "
              >
                Medical Document
                <span className="ml-1 text-red-500">*</span>
              </label>

              <label
                htmlFor="document"
                className={`
                  group
                  flex
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  px-6
                  py-12
                  text-center
                  transition-all
                  duration-200

                  ${
                    document
                      ? "border-[#2F6FED] bg-[#D9F7E8]/30"
                      : "border-[#D9E0E7] bg-[#F8FAFC] hover:border-[#2F6FED] hover:bg-[#D9F7E8]/30"
                  }
                `}
              >

                {/* Upload Icon */}

                <div
                  className="
                    mb-4
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#D9F7E8]
                    text-[#2F6FED]
                    transition
                    duration-200
                    group-hover:scale-105
                  "
                >
                  {document ? (
                    <CheckCircle size={29} />
                  ) : (
                    <Upload size={29} />
                  )}
                </div>

                {/* File Name */}

                <p
                  className="
                    max-w-full
                    truncate
                    px-4
                    text-sm
                    font-semibold
                    text-[#212121]
                    sm:max-w-lg
                  "
                >
                  {document
                    ? document.name
                    : "Click to select your medical document"}
                </p>

                {/* Description */}

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-[#7A7A7A]
                  "
                >
                  {document
                    ? `${(document.size / 1024 / 1024).toFixed(2)} MB`
                    : "PDF, JPG, PNG, reports, prescriptions and other medical files"}
                </p>

                {!document && (
                  <span
                    className="
                      mt-5
                      rounded-lg
                      bg-white
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      text-[#2F6FED]
                      shadow-sm
                      ring-1
                      ring-[#EEEEEE]
                    "
                  >
                    Choose File
                  </span>
                )}

              </label>

              <input
                id="document"
                name="document"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />

            </div>

            {/* ==============================
                SUBMIT BUTTON
            ============================== */}

            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-[#2F6FED]
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_6px_18px_rgba(47,111,237,0.20)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#245bd0]
                hover:shadow-[0_8px_22px_rgba(47,111,237,0.25)]
                disabled:cursor-not-allowed
                disabled:translate-y-0
                disabled:opacity-60
              "
            >

              <Upload size={18} />

              {loading
                ? "Uploading..."
                : "Upload Medical Record"}

            </button>

            {/* Bottom note */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                text-center
                text-xs
                text-[#7A7A7A]
              "
            >
              <ShieldCheck size={14} />

              Your medical document will be securely uploaded
              to your account.
            </div>

          </form>

        </div>
      </div>

    </section>
  );
}

export default MedicalRecord;