import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Card, Button, Image } from "react-bootstrap";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import TopNavbar from "../TopNavbar/TopNavbar";
import { Link } from "react-router-dom";
import Loader from "../../Container/Loading/LoaderSmall";
import { useAtom } from "jotai";
import { totalProduct } from "../../Atom/Atom";
import { RenderHost } from "../../API/Api";

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState("");
  const [loader, setLoader] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCartedProduct, setTotalCartedProduct] = useAtom(totalProduct);
  const [CGST, setCGST] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [payable, setPayable] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`${RenderHost}/getCart/${userId}`);
      const cartData = response.data.cart;
      const products = cartData.products;

      setCartItems(products);
      setCartId(cartData._id);

      const total = products.reduce(
        (acc, product) => acc + product.productId.product_price * product.quantity,
        0
      );
      const calculatedCGST = (total * 4.5) / 100;
      const calculatedSGST = (total * 4.5) / 100;

      setTotalPrice(total);
      setCGST(calculatedCGST);
      setSGST(calculatedSGST);
      setPayable(total + calculatedCGST + calculatedSGST);
      setTotalCartedProduct(products.length);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    } finally {
      setLoader(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await axios.post(`${RenderHost}/addItemToCart`, {
        userId,
        productId,
        quantity,
      });
      fetchUserData();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const deleteCartItem = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${RenderHost}/removeCartProduct/${cartId}/${productId}`)
          .then(() => fetchUserData())
          .catch((err) => console.error(err));

        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const CartItem = ({ item }) => (
    <div className="d-flex align-items-center mb-4 border-bottom pb-3">
      <Link to={`/product/${item.productId._id}`} className="text-decoration-none">
        <Image
          src={item.productId.product_img[0]}
          alt={item.productId.product_name}
          rounded
          width="120"
        />
      </Link>
      <div className="flex-grow-1 ms-3">
        <h6 className="mb-1">{item.productId.product_name}</h6>
        <p className="mb-1">Price: ₹{item.productId.product_price}</p>
        <p className="mb-1">Quantity: {item.quantity}</p>
        <div className="d-flex align-items-center">
          <Button
            variant="light"
            size="sm"
            onClick={() => updateCartItem(item.productId._id, -1)}
            disabled={item.quantity <= 1}
          >
            <HiMinusSm />
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            variant="light"
            size="sm"
            onClick={() => updateCartItem(item.productId._id, 1)}
            disabled={item.quantity >= 10}
          >
            <HiPlusSm />
          </Button>
        </div>
      </div>
      <Button
        variant="danger"
        className="ms-3"
        onClick={() => deleteCartItem(item.productId._id)}
      >
        <MdDelete />
      </Button>
    </div>

  );

  return (
    <>
      <TopNavbar />
      <Container className="py-5" style={{ minHeight: "80vh" }}>
        {
          loader ? <Loader /> : (
            <Row>
              <Col
                lg={8}
                className="border-end border"
                style={{ overflowY: 'scroll', maxHeight: '550px' }}
              >                <h3 className="text-center mb-4">Total Cart : {totalCartedProduct}</h3>
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </Col>
              <Col lg={4} className="border">
                <h3 className="text-center mb-4">Order Summary</h3>
                <Card className="border border-end border-1">
                  <Card.Body>
                    <div className="border-bottom pb-3 mb-3">
                      <p>Total Price: ₹{totalPrice}</p>
                      <p>CGST (4.5%): ₹{CGST}</p>
                      <p>SGST (4.5%): ₹{SGST}</p>
                    </div>
                    <h5>Total Payable: ₹{payable}</h5>
                    <div className="text-center mt-4">
                      {/* <Link to="/">
                        <Button variant="secondary" className="me-2">
                          Continue Shopping
                        </Button>
                      </Link> */}
                      <Link to="/Payment">
                        <Button variant="primary" size="lg" >Pay Now</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>

              </Col>
            </Row>
          )
        }
      </Container>
    </>
  );
}
