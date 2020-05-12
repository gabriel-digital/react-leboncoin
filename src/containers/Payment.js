import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation, Redirect } from "react-router-dom";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = ({ tokenFromCookie, userFromCookie }) => {
  const token = tokenFromCookie;
  const username = userFromCookie;
  const location = useLocation();

  let { img, title, price, productId } = location.state;
  return !token ? (
    // no token ? get out !
    <Redirect
      to={{
        pathname: "user/log_in",
        state: { from: `offer/${productId}` },
      }}
    />
  ) : (
    <div className="container result payment">
      <main>
        <section>
          <span>
            <strong>Acheter en ligne</strong>
          </span>
          <div className="offerContainer">
            <img src={img} alt={title} />
            <div className="offerInfo">
              <h1>{title}</h1>
              <span>{price}&nbsp;€</span>
              <span>
                <strong>Vos coordonnées bancaires</strong>
              </span>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  username={username}
                  price={price}
                  title={title}
                  productId={productId}
                />
              </Elements>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Payment;
