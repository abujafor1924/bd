import api from "./api";

// ==============================
// GET ALL MEDICAL RECORDS
// ==============================

export const getRecordDocuments = async () => {
  const response = await api.get(
    "/auth/record-documents/"
  );

  return response.data;
};


// ==============================
// GET SINGLE MEDICAL RECORD
// ==============================

export const getRecordDocument = async (id) => {
  const response = await api.get(
    `/auth/record-documents/${id}/`
  );

  return response.data;
};


// ==============================
// CREATE MEDICAL RECORD
// ==============================

export const createRecordDocument = async ({
  documents_type,
  document,
  document_details,
}) => {
  const formData = new FormData();

  formData.append("documents_type", documents_type);
  formData.append("document", document);
  formData.append("document_details", document_details);

  const response = await api.post(
    "/auth/record-documents/create/",
    formData
  );

  return response.data;
};


// ==============================
// UPDATE MEDICAL RECORD
// PATCH
// ==============================

export const updateRecordDocument = async ({
  id,
  documents_type,
  document_details,
  document,
}) => {
  const formData = new FormData();

  if (documents_type !== undefined) {
    formData.append(
      "documents_type",
      documents_type
    );
  }

  if (document_details !== undefined) {
    formData.append(
      "document_details",
      document_details
    );
  }

  // File optional
  if (document) {
    formData.append(
      "document",
      document
    );
  }

  const response = await api.patch(
    `/auth/record-documents/${id}/`,
    formData
  );

  return response.data;
};


// ==============================
// DELETE MEDICAL RECORD
// ==============================

export const deleteRecordDocument = async (id) => {
  const response = await api.delete(
    `/auth/record-documents/${id}/`
  );

  return response.data;
};