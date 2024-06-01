import { Fragment, useEffect, useState } from "react";
import { TableCell } from "./TableCell";
import { TableHeader } from "./TableHeader";
import { updateProductCount } from "../api/updateProductCount";

export const ProductUpdateModal = ({ onClose, order, fetchOrderApiParams }) => {
   const [products, setProducts] = useState(order.line_items);
   const [orderTotal, setOrderTotal] = useState(0);
   const [error, setError] = useState(null);

   useEffect(() => {
      setOrderTotal(products.reduce((sum, product) => {
         return sum + (product.price * product.quantity) + parseFloat(product.total_tax);
      }, 0));
   }, [products]);

   const updateProductQuantity = (product, increment = true) => {
      setProducts(products => {
         return products.map((obj) => {
            const quantity = increment ? obj.quantity + 1 : Math.max(obj.quantity - 1, 1);
            if(obj.id === product.id) {
               return {
                  ...obj,
                  quantity: quantity,
                  subtotal: parseFloat(quantity * obj.price).toFixed(2),
                  total: parseFloat((quantity * obj.price) + parseFloat(obj.total_tax)).toFixed(2),
                  parent_name: "string", // error was showing like "parent_name" is not string
               };
            }
            return {
               ...obj,
               parent_name: "string", // error was showing like "parent_name" is not string
            };
         });
      });
   };

   const handleReduceCount = (product) => {
      updateProductQuantity(product, false); // passing increment as false
   };

   const handleIncreaseCount = (product) => {
      updateProductQuantity(product, true); // passing increment as true
   };

   const saveAndClose = async () => {
      updateProductCount(fetchOrderApiParams.setLoading, order, products, orderTotal, setError, fetchOrderApiParams);
      onClose();
   }

   const handleClickOutside = (e) => {
      if (e.target.className.includes('modal-overlay')) {
         onClose();
      }
   };

   return (
      <div
         className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
         onClick={handleClickOutside}
      >
         <div className="bg-white p-6 rounded shadow-lg relative max-w-md mx-auto min-w-96">
            <h2 className="text-xl font-bold mb-4">Update Product Count</h2>
            <div className="mb-4">
               <table className="w-full border">
                  <thead>
                     <tr>
                        <TableHeader extraClasses='py-5 px-2'>Product Name</TableHeader>
                        <TableHeader extraClasses='py-5 px-3'>Quantity</TableHeader>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        products.map((product, i) => {
                           return (
                              <Fragment key={i}>
                                 <tr>
                                    <TableCell extraClasses={'border-t-4'}>{product.name}</TableCell>
                                    <TableCell extraClasses={'border-t-4'}>
                                       <div className="flex justify-between w-14 mr-2">
                                          <button
                                             className="border border-[#605BFF] px-2 rounded text-base hover:bg-[#605BFF] hover:text-white"
                                             onClick={() => handleReduceCount(product)}
                                          >
                                             -
                                          </button>
                                          <span className="mx-2 text-base">{product.quantity}</span>
                                          <button
                                             className="border border-[#605BFF] px-2 rounded hover:bg-[#605BFF] hover:text-white"
                                             onClick={() => handleIncreaseCount(product)}
                                          >
                                             +
                                          </button>
                                       </div>
                                    </TableCell>
                                 </tr>
                              </Fragment>
                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
            <div className="text-center text-base font-medium mb-4">
               Order total: {orderTotal} {order.currency}
            </div>
            <div className="flex justify-between">
               <button
                  onClick={onClose}
                  className="px-4 py-2 text-white rounded-md bg-[#605BFF]"
               >
                  Close
               </button>
               <button
                  onClick={saveAndClose}
                  className="px-4 py-2 text-white rounded-md bg-[#605BFF]"
               >
                  Save and Close
               </button>
            </div>
         </div>
      </div>
   );
};