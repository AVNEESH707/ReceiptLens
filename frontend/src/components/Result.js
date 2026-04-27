import React from "react";

const Result = ({ result }) => {
  if (!result) return null;

  const { data, confidence, raw_text } = result;

  return (
    <div className="mt-6 border-t pt-6">

      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Analysis Result
      </h2>

      {confidence < 50 && (
        <p className="text-red-500 text-sm mb-3">
          Low confidence. Try a clearer image.
        </p>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <p><span className="font-medium">Store:</span> {data?.store_name || "—"}</p>
        <p><span className="font-medium">Date:</span> {data?.date || "—"}</p>
        <p><span className="font-medium">Total:</span> ₹{data?.total_amount || "—"}</p>
        <p><span className="font-medium">Confidence:</span> {confidence.toFixed(2)}%</p>
      </div>

      {/* Items Table */}
      {data?.items?.length > 0 && (
        <div className="mb-4">
          <p className="font-medium mb-2">Items</p>
          <div className="border rounded-md overflow-hidden">
            {data.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between px-4 py-2 border-b last:border-none text-sm"
              >
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw Text */}
      {raw_text && (
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">
            Raw OCR Text
          </p>
          <div className="bg-gray-100 p-3 rounded-md text-xs overflow-auto max-h-40">
            {raw_text}
          </div>
        </div>
      )}

    </div>
  );
};

export default Result;