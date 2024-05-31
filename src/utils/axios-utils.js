import axios from 'axios';

const token = btoa(`${process.env.REACT_APP_CONSUMER_KEY}:${process.env.REACT_APP_CONSUMER_SECRET}`);

export const WooCommerce = axios.create({
   baseURL: "https://ecommercedemo.backb.in/",
   headers: {
      Authorization: `Basic ${token}`,
   },
});