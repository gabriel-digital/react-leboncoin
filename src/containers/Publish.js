import React, { useState } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import axios from "axios";

const Publish = ({ user, tokenFromCookie }) => {
  // init states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);
  const [urlOffer, setUrlOffer] = useState(false);

  const history = useHistory();

  // construct FormData object
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("picture", file);

  // on form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // check we ahve all the data needed
    if (!title || !description || !price || !file) {
      setError("Veuillez remplir tous les champs");
    } else {
      try {
        // send server request
        const response = await axios.post(
          "https://lbc-exo.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              Authorization: "Bearer " + tokenFromCookie,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // get server answer and update states
        setPublished(true);
        setUrlOffer(`/offer/${response.data._id}`);
      } catch (error) {
        setError(error.response.data.error.message);
      }
    }
  };
  return !tokenFromCookie ? (
    // no token ? get out !
    <Redirect
      to={{
        pathname: "/user/log_in",
        state: { from: history.location.pathname },
      }}
    />
  ) : (
    <main>
      <section className="publishcontainer">
        {published && (
          <span className="published">
            Ton annonce a bien été publiée&nbsp;! Retrouve la&nbsp;
            <Link to={urlOffer}>ici</Link>.
          </span>
        )}
        <h1>Déposer une annonce</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Titre de l'annonce *
            <input
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </label>
          <label>
            Texte de l'annonce *
            <textarea
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </label>
          <label>
            Prix (€) *
            <input
              type="number"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </label>
          <label>
            Photo *
            <input
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
          </label>
          <input type="submit" value="Valider" className="action" />
          {error && <span className="error">{error}</span>}
        </form>
      </section>
    </main>
  );
};

export default Publish;
