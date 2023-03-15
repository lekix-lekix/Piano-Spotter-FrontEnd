import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import favouritesApi from "../../service/favourites.service";
import "./Profile.css";

const Profile = ({ noPopUp }) => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  noPopUp();

  const fetchFavouritesData = async () => {
    try {
      if (user) {
        const response = await favouritesApi.getFavourites(user._id);
        setFavourites(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await favouritesApi.deleteFav(id);
      fetchFavouritesData();
      return <p>Favourite deleted.</p>;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFavouritesData();
  }, [user]);

  if (!user) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Hello {user.username}!</h1>
      <h2>Your personal information :</h2>
      <p>E-mail: {user.email}</p>
      <Link>
        <p>Change e-mail ?</p>
      </Link>
      <Link>Change password ?</Link>
      <div>
        <h3>Pianos that you have added :</h3>
      </div>
      <div>
        <h3>Your favourite pianos :</h3>
        <div className="favCardContainer">
          {favourites.length &&
            favourites.map((fav) => {
              if (fav.pianoId)
                return (
                  <div key={fav._id} className="favCard">
                    <h2>{fav.name}</h2>
                    <h3>Location :</h3>
                    <p>Latitude: {fav.pianoId.location.coordinates[1]}</p>
                    <p>Longitude: {fav.pianoId.location.coordinates[0]}</p>
                    <button
                      style={{ color: "red" }}
                      onClick={() => handleDelete(fav._id)}
                    >
                      Delete
                    </button>
                    <button style={{ color: "orange" }}>Update</button>
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
