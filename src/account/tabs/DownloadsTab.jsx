import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '../AccountContext';

export default function DownloadsTab() {
  const { downloads, toggleEmptyDownloads } = useAccount();
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const handleDownload = (file) => {
    setDownloadSuccess(`Downloaded "${file}" successfully`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="text-left max-w-[950px] mx-auto py-4">
      {/* Dev / preview toggle for review */}
      <div className="flex justify-between items-center mb-4">
        {downloadSuccess && (
          <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded border border-emerald-200">
            ✓ {downloadSuccess}
          </div>
        )}
        <div className="ml-auto">
          <button
            onClick={toggleEmptyDownloads}
            className="text-xs text-[#707070] hover:text-black underline cursor-pointer bg-transparent border-0 p-0"
          >
            {downloads.length > 0 ? 'Show empty state view' : 'Restore sample downloads'}
          </button>
        </div>
      </div>

      {downloads.length === 0 ? (
        /* Empty State */
        <div className="border-t border-[#E5E5E5] pt-10 text-left">
          <div className="bg-[#F5F5F5] border-l-4 border-black px-6 py-4 mb-8 flex items-center justify-between">
            <span className="text-[15px] text-black">No downloads available yet.</span>
            <Link
              to="/shop"
              className="hidden sm:inline-block text-[13px] font-medium tracking-[1px] text-black underline hover:opacity-75 uppercase"
            >
              Shop now
            </Link>
          </div>
          <Link
            to="/shop"
            className="inline-block bg-black text-white text-[13px] font-medium tracking-[1px] uppercase px-8 py-3.5 rounded-xs hover:bg-neutral-800 transition-colors"
          >
            BROWSE PRODUCT
          </Link>
        </div>
      ) : (
        /* Downloads Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#D8D8D8]">
                <th className="py-4 text-[13px] font-normal tracking-[0.5px] text-[#707070] uppercase">
                  ORDER NUMBER
                </th>
                <th className="py-4 text-[13px] font-normal tracking-[0.5px] text-[#707070] uppercase">
                  DATE
                </th>
                <th className="py-4 text-[13px] font-normal tracking-[0.5px] text-[#707070] uppercase">
                  STATUS
                </th>
                <th className="py-4 text-[13px] font-normal tracking-[0.5px] text-[#707070] uppercase">
                  TOTAL
                </th>
                <th className="py-4 text-[13px] font-normal tracking-[0.5px] text-[#707070] uppercase text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEFEF]">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="py-5 text-[15px] font-normal text-black font-mono">
                    {item.id}
                  </td>
                  <td className="py-5 text-[15px] text-[#707070]">
                    {item.date}
                  </td>
                  <td className="py-5 text-[15px]">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                        item.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 text-[15px] text-[#707070]">
                    $ {item.total}
                  </td>
                  <td className="py-5 text-right whitespace-nowrap text-[14px]">
                    <span className="text-black font-normal">View Order</span>
                    <span className="mx-2 text-[#D8D8D8]">|</span>
                    <button
                      onClick={() => handleDownload(item.file)}
                      className="text-black hover:underline font-normal cursor-pointer bg-transparent border-0 p-0"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
