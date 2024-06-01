import { Fragment, useEffect, useState } from "react";
import { WooCommerce } from "../utils/axios-utils";
import { PaginationButton } from "./PaginationButton";
import { TableHeader } from "./TableHeader";
import { TableCell } from "./TableCell";

export const Orders = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [noMoreOrders, setNoMoreOrders] = useState(false);
   const [nextClicked, setNextClicked] = useState(false);
   const perPage = 10;

   async function fetchOrders() {
      try {
         setLoading(true);
         const response = await WooCommerce.get("/wp-json/wc/v3/orders", {
            params: {
               per_page: perPage,
               page: currentPage,
            },
         });

         if(response.status === 200) {
            setSuccess(true);
            if(response.data.length < 10) {
               setNoMoreOrders(true);
            } else setNoMoreOrders(false);
         }
         setOrders(response.data);
      } catch (err) {
         setError(err);
         setSuccess(false);
      } finally {
         setLoading(false);
      }
   }
   
   useEffect(() => {
      fetchOrders();
   }, [currentPage]);

   const handlePrevButtonClick = () => {
      setNextClicked(false);
      if(currentPage >= 2) setCurrentPage(currentPage => currentPage - 1);
   }

   const handleNextButtonClick = () => {
      if(!noMoreOrders) {
         setNextClicked(true);
         setCurrentPage(currentPage => currentPage + 1);
      }
   }

   return (
      <div className="mt-6">
         {
            loading ? (
               <p className="text-xl">Loading Data...</p>
            ) : (
               success ? (
                  (nextClicked && noMoreOrders) || orders.length ? (
                     <div className='mr-7 p-4 bg-[#F5F5F5] rounded-lg overflow-x-auto'>
                        <table className='w-full bg-[#F5F5F5]'>
                           <thead>
                              <tr>
                                 <TableHeader extraClasses={'min-w-14'} >#</TableHeader>
                                 <TableHeader extraClasses={'min-w-24'} >Order ID</TableHeader>
                                 <TableHeader extraClasses={'min-w-32'} >Customer Name</TableHeader>
                                 <TableHeader extraClasses={'min-w-32'} >Customer Email</TableHeader>
                                 <TableHeader extraClasses={'min-w-32'} >Order Date</TableHeader>
                                 <TableHeader extraClasses={'min-w-32'} >Total Amount</TableHeader>
                                 <TableHeader extraClasses={'min-w-32'} >Order Status</TableHeader>
                              </tr>
                           </thead>
                           <tbody>
                              {
                                 orders.length ? (
                                    orders.map((obj, index) => {
                                       return (
                                          <Fragment key={index}>
                                             <tr className='bg-white'>
                                                <TableCell extraClasses={'rounded-l-lg'} >{((currentPage - 1) * perPage) + index + 1}</TableCell>
                                                <TableCell>{obj.id}</TableCell>
                                                <TableCell>{`${obj.billing.first_name} ${obj.billing.last_name}`}</TableCell>
                                                <TableCell>{obj.billing.email}</TableCell>
                                                <TableCell>{obj.date_created.substring(0, 10)}</TableCell>
                                                <TableCell>{`${obj.total} ${obj.currency}`}</TableCell>
                                                <TableCell extraClasses={'rounded-r-lg'} >{obj.status}</TableCell>
                                             </tr>
                                          </Fragment>
                                       );
                                    })
                                 ) : (
                                    <tr>
                                       <td colSpan="6" className="text-center py-8">
                                          No more orders available. Click on "Prev" to go back to previous page.
                                          {/* As the API is not giving total number of orders in the response
                                             we are not able to know which is the last page with documents present.
                                             That's why this text is showing */}
                                       </td>
                                    </tr>
                                 )
                              }
                           </tbody>
                        </table>
                        <div className="flex justify-between mt-3">
                           <PaginationButton
                              disabled={currentPage === 1}
                              handleClick={handlePrevButtonClick}
                           >
                              &lt;- Prev
                           </PaginationButton>
                           <PaginationButton
                              disabled={noMoreOrders}
                              handleClick={handleNextButtonClick}
                           >
                              Next -&gt;
                           </PaginationButton>
                        </div>
                     </div>
                  ) : (
                     <p className="text-xl">No Orders Found</p>
                  )
               ) : (
                  error && <p className="text-2xl">{error.message}</p>
               )
            )
         }
      </div>
   );
}