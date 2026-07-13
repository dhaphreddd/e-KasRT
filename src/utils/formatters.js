// Format number to Rupiah currency (e.g. Rp 150.000)
export function formatRupiah(value) {
  if (value === null || value === undefined) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

// Format Firestore Timestamp to Indonesian readable date string (e.g. 12 Juli 2026)
export function formatDate(timestamp) {
  if (!timestamp) return "-";
  
  // Handle Javascript Date object or Firebase Timestamp object
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  
  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

// Format date to ISO date input value (YYYY-MM-DD)
export function formatDateInput(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  if (isNaN(date.getTime())) return "";
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
