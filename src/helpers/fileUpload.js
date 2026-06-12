export const FACHADA_ACCEPT = ".png,.jpg,.jpeg";
export const FACHADA_ACCEPT_CUSTOM = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  ".png",
  ".jpg",
  ".jpeg",
];

export const DOCUMENTO_ACCEPT = ".pdf";
export const DOCUMENTO_ACCEPT_CUSTOM = ["application/pdf", ".pdf"];

export const FACHADA_HELPER_TEXT = "Formatos permitidos: .png, .jpg, .jpeg";
export const DOCUMENTO_HELPER_TEXT = "Formato permitido: .pdf";
export const TAMANHO_MAXIMO_UPLOAD = "Tamanho máximo: 5 MB";

const normalizeAcceptedFileTypes = (acceptedFileTypes = []) => {
  if (Array.isArray(acceptedFileTypes)) {
    return acceptedFileTypes.map((fileType) => fileType.toLowerCase());
  }

  return acceptedFileTypes
    .split(",")
    .map((fileType) => fileType.trim().toLowerCase())
    .filter(Boolean);
};

const getFileExtension = (fileName = "") => {
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex < 0) {
    return "";
  }

  return fileName.slice(lastDotIndex).toLowerCase();
};

export const isAcceptedFile = (file, acceptedFileTypes = []) => {
  const normalizedAcceptedFileTypes = normalizeAcceptedFileTypes(
    acceptedFileTypes
  );

  if (!file || normalizedAcceptedFileTypes.length === 0) {
    return true;
  }

  const mimeType = (file.type || "").toLowerCase();
  const fileExtension = getFileExtension(file.name);

  return normalizedAcceptedFileTypes.some(
    (acceptedFileType) =>
      acceptedFileType === mimeType || acceptedFileType === fileExtension
  );
};