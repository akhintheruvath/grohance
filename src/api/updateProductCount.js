import { toast } from 'react-toastify';
import { WooCommerce } from "../utils/axios-utils";
import { fetchOrders } from "./fetchOrders";

export const updateProductCount = async (setLoading, order, products, orderTotal, fetchOrderApiParams) => {
   try {
      setLoading(true);
      const response = await WooCommerce.put(`/wp-json/wc/v3/orders/${order.id}`, {
         line_items: products,
         total: orderTotal,
      });

      if(response.status === 200) {
         await fetchOrders(fetchOrderApiParams);
         toast.success(
            response.statusText ? response.statusText : "Updated Successfully"
         );
      }
   } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong. Please try again.");
   } finally {
      setLoading(false);
   }
}