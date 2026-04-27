const parseReceipt = (text) => {
  const data = {
    store_name: null,
    date: null,
    total_amount: null,
    items: []
  };

  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  // ✅ Store name (first clean line)
  data.store_name = lines[0] || "Unknown";

  // ✅ STRICT DATE (only valid formats)
  const dateRegex = /\b(0[1-9]|1[0-2])[\/\-](0[1-9]|[12][0-9]|3[01])[\/\-](\d{2,4})\b/;
  const dateMatch = text.match(dateRegex);
  if (dateMatch) {
    data.date = dateMatch[0];
  }

  // 🔥 Fix OCR numbers (2262 → 22.62)
  const formatAmount = (num) => {
    if (!num) return null;
    if (!num.includes(".")) return (parseInt(num) / 100).toFixed(2);
    return num;
  };

  // ✅ TOTAL detection (very strict)
  for (let line of lines) {
    const lower = line.toLowerCase();

    if (
      lower.startsWith("total") || 
      lower.includes(" total ")
    ) {
      const match = line.match(/\d+\.?\d*/);
      if (match) {
        data.total_amount = formatAmount(match[0]);
        break;
      }
    }
  }

  // ❌ Ignore garbage lines
  const ignorePatterns = [
    /\d{6,}/,                 // long numbers (IDs)
    /(transaction|order|ref|auth|visa|aid|mid|payment)/i,
    /(address|ave|street|road|sc,|zip)/i,
  ];

  // ✅ Clean item extraction
  lines.forEach(line => {
    const lower = line.toLowerCase();

    // Skip unwanted lines
    if (ignorePatterns.some(p => p.test(line))) return;
    if (lower.includes("total") || lower.includes("subtotal")) return;

    // Match item with price
    const match = line.match(/^(\d+\s)?([a-zA-Z\s]+)\s+\$?(\d{2,}|\d+\.\d{2})$/);

    if (match) {
      const name = match[2].trim();

      // Skip very small/invalid names
      if (name.length < 4) return;

      data.items.push({
        name,
        price: formatAmount(match[3])
      });
    }
  });

  return data;
};

module.exports = { parseReceipt };