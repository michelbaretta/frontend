import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/OrderActions";
import LoadingBox from "../components/Loading";
import MessageBox from "../components/Message";
import { ORDER_DELETE_RESET } from "../constants/OrderConstants";

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  const dispatch = useDispatch();
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm("Do you want to delete this order?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div>
      <div>
        <h1>Orders</h1>
        {loadingDelete && <LoadingBox />}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
