import { WooCommerce } from "../utils/axios-utils";
import { fetchOrders } from "./fetchOrders";

export const updateProductCount = async (setLoading, order, products, orderTotal, setError, fetchOrderApiParams) => {
   try {
      setLoading(true);
      const response = await WooCommerce.put(`/wp-json/wc/v3/orders/${order.id}`, {
         line_items: products,
         total: orderTotal,
      });

      if(response.status === 200) {
         await fetchOrders(fetchOrderApiParams);
      }
   } catch (err) {
      setError(err);
   } finally {
      setLoading(false);
   }
}