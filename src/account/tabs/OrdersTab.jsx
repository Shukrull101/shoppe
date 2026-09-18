import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '../AccountContext';

export default function OrdersTab() {
  const { orders, toggleEmptyOrders } = useAccount();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="text-left max-w-[950px] mx-auto py-4">
      {/* Dev / preview toggle for review */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleEmptyOrders}
          className="text-xs text-[#707070] hover:text-black underline cursor-pointer bg-transparent border-0 p-0"
        >
          {orders.length > 0 ? 'Show empty state view' : 'Restore sample orders'}
        </button>
      </div>

      {orders.length === 0 ? (
        /* Empty State */
        <div className="border-t border-[#E5E5E5] pt-10 text-left">
          <div className="bg-[#F5F5F5] border-l-4 border-black px-6 py-4 mb-8 flex items-center justify-between">
            <span className="text-[15px] text-black">No order has been made yet.</span>
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
        /* Orders Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="py-5 text-[15px] font-normal text-black font-mono">
                    {order.id}
                  </td>
                  <td className="py-5 text-[15px] text-[#707070]">
                    {order.date}
                  </td>
                  <td className="py-5 text-[15px]">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : order.status === 'Processing'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 text-[15px] text-[#707070]">
                    $ {order.total}
                  </td>
                  <td className="py-5 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-[14px] font-normal text-black hover:underline cursor-pointer bg-transparent border-0 p-0"
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white max-w-[540px] w-full rounded-xs shadow-2xl p-6 sm:p-8 relative">
            <div className="flex justify-between items-start border-b border-[#E5E5E5] pb-4 mb-6">
              <div>
                <h3 className="text-[20px] font-medium text-black">
                  Order Details
                </h3>
                <p className="text-[13px] text-[#707070] mt-1">
                  Order #{selectedOrder.id} • {selectedOrder.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#707070] hover:text-black text-2xl leading-none cursor-pointer bg-transparent border-0"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm py-1 border-b border-[#F0F0F0]">
                <span className="text-[#707070]">Status</span>
                <span className="font-medium text-black">{selectedOrder.status}</span>
              </div>

              <div className="py-2">
                <span className="text-xs uppercase tracking-wider text-[#707070] block mb-3 font-medium">
                  Items Purchased
                </span>
                <div className="space-y-2">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[14px]">
                        <span className="text-black">
                          {item.name} <span className="text-[#707070]">× {item.qty}</span>
                        </span>
                        <span className="font-medium text-black">
                          ${item.price * item.qty}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-[#707070]">Standard jewelry bundle</div>
                  )}
                </div>
              </div>

              <div className="flex justify-between text-sm pt-3 border-t border-[#E5E5E5]">
                <span className="font-medium text-black">Total</span>
                <span className="text-[17px] font-semibold text-black">
                  ${selectedOrder.total}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-black text-white text-[13px] font-medium tracking-[1px] uppercase px-6 py-2.5 rounded-xs hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
