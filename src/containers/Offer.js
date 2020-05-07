import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatPrice, formatDate } from "../utils";

const Offer = () => {
  // init states & get params from url
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // call server request once
  useEffect(() => {
    // server request
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lbc-exo.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return loading ? (
    <p>chargement...</p>
  ) : (
    <>
      <main>
        <div className="offerContainer">
          <h1>{data.title}</h1>
          <span>{formatPrice(data.price)}</span>
          <span>{formatDate(data.created)}</span>
        </div>
        <div className="offerDescription">
          <h2>Description</h2>
          <p>{data.description}</p>
        </div>
      </main>
    </>
  );
};

export default Offer;
