import { WooCommerce } from "../utils/axios-utils";

export const fetchOrders = async ({perPage, currentPage, setLoading, setSuccess, setNoMoreOrders, setOrders, setError}) => {
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