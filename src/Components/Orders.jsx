import { Fragment, useEffect, useState } from "react";
import { PaginationButton } from "./PaginationButton";
import { TableHeader } from "./TableHeader";
import { TableCell } from "./TableCell";
import { ProductUpdateModal } from "./ProductUpdateModal";
import { fetchOrders } from "../api/fetchOrders";
import { Searchbar } from "../Components/Searchbar";

export const Orders = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [noMoreOrders, setNoMoreOrders] = useState(false);
   const [nextClicked, setNextClicked] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedOrderId, setSelectedOrderId] = useState(null);
   const [searchText, setSearchText] = useState("");
   const perPage = 10;

   const apiParams = {
      perPage,
      currentPage,
      setLoading,
      setSuccess,
      setNoMoreOrders,
      setOrders,
      setError,
   }

   const openModal = (orderId) => {
     setSelectedOrderId(orderId);
     setIsModalOpen(true);
   };
 
   const closeModal = () => {
     setIsModalOpen(false);
   };
   
   useEffect(() => {
      fetchOrders(apiParams);
   }, [currentPage]);

   const handleSearch = () => {
      fetchOrders({...apiParams, searchText});
   }

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
                  <>
                     <div className="mb-5 flex justify-end mr-7">
                        <Searchbar
                           searchText={searchText}
                           setSearchText={setSearchText}
                        />
                        <button
                           className="ml-4 bg-[#605BFF] px-3 rounded-md text-sm text-white"
                           onClick={handleSearch}
                        >
                           Search
                        </button>
                     </div>
                     {
                        (nextClicked && noMoreOrders) || orders.length ? (
                           <div className='mr-7 p-4 bg-[#F5F5F5] rounded-lg'>
                              <div className="overflow-x-auto">
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
                                          <TableHeader extraClasses={'min-w-40'} >Action</TableHeader>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {
                                          orders.length ? (
                                             orders.map((order, index) => {
                                                return (
                                                   <Fragment key={index}>
                                                      <tr className='bg-white'>
                                                         <TableCell>{((currentPage - 1) * perPage) + index + 1}</TableCell>
                                                         <TableCell>{order.id}</TableCell>
                                                         <TableCell>{`${order.billing.first_name} ${order.billing.last_name}`}</TableCell>
                                                         <TableCell>{order.billing.email}</TableCell>
                                                         <TableCell>{order.date_created.substring(0, 10)}</TableCell>
                                                         <TableCell>{`${order.total} ${order.currency}`}</TableCell>
                                                         <TableCell>{order.status}</TableCell>
                                                         <TableCell>
                                                            <button
                                                               className="px-2 py-1 border border-[#605BFF] rounded-md hover:bg-[#605BFF] hover:text-white"
                                                               onClick={() => openModal(order.id)}
                                                            >
                                                               Update Count
                                                            </button>
                                                            {
                                                               isModalOpen && order.id === selectedOrderId && (
                                                                  <ProductUpdateModal
                                                                     onClose={closeModal}
                                                                     order={order}
                                                                     fetchOrderApiParams={apiParams}
                                                                  />
                                                               )
                                                            }
                                                         </TableCell>
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
                              </div>
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
                     }
                  </>
               ) : (
                  error && <p className="text-2xl">{error.message}</p>
               )
            )
         }
      </div>
   );
}