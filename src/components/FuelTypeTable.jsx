function CompanySalesTable({ data }) {
  return (
    <div className="max-h-[325px] overflow-y-auto border-none">
      <div className="min-w-full">
        <table className="w-full mx-auto border-collapse text-md mb-3">
          <thead className="sticky top-0 bg-[#efefeff7]">
            <tr>
              <th className="border border-[#ccc] px-2 py-1">Fuel Type</th>
              <th className="border border-[#ccc] px-2 py-1">Number of Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td className="border border-[#ccc] px-2 py-1">{entry.fuel}</td>
                <td className="border border-[#ccc] px-2 py-1">{entry.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanySalesTable;
