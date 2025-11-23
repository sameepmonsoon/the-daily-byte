export default function TableLoaderPage() {
  return (
    <div className="space-y-6">
      <div className="mx-auto w-full">
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  <div className="bg-primary/10 h-4 w-[50px] animate-pulse rounded-md"></div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  <div className="bg-primary/10 h-4 w-[150px] animate-pulse rounded-md"></div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  <div className="bg-primary/10 h-4 w-[150px] animate-pulse rounded-md"></div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  <div className="bg-primary/10 h-4 w-[150px] animate-pulse rounded-md"></div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  <div className="bg-primary/10 h-4 w-[150px] animate-pulse rounded-md"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {Array.from({ length: 8 }, (_, idx) => (
                <tr className="hover:bg-primary/10/50 cursor-pointer" key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-primary/10 h-4 w-[50px] animate-pulse rounded-md"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-primary/10 h-4 w-[200px] animate-pulse rounded-md"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-primary/10 h-4 w-[250px] animate-pulse rounded-md"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-primary/10 h-4 w-[100px] animate-pulse rounded-md"></div>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="bg-primary/10 h-4 w-[100px] animate-pulse rounded-md"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
