import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../utils/urls";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`, // check here --------<<<<<<
            },
          });
          const data = await order_res.json();
          setOrders(data);
        } catch (err) {
          setOrders([]);
        }
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);
  return { orders, loading };
};

export default function Account() {
  const { user, logoutUser, getToken } = useContext(AuthContext);
  const { orders, loading } = useOrders(user, getToken);

  console.log("Account.render ");
  if (!user) {
    return (
      <div>
        <p>Please login or register</p>
        <Link href="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Account Page</title>
        <meta
          name="description"
          content="The account page, view your orders and logout"
        />
      </Head>
      <h2>Account Page</h2>
      <h3>Your Orders</h3>
      {loading && <p>Loading your orders...</p>}
      {orders.map((order) => (
        <div key={order.id}>
          {new Date(order.created_at).toLocaleDateString("en-EN")}
          {order.product.name} ${order.total} {order.status}
        </div>
      ))}
      <hr />
      <p>Logged in as: {user.email}</p>
      <a href="#" onClick={logoutUser}>
        Logout
      </a>
    </div>
  );
}
