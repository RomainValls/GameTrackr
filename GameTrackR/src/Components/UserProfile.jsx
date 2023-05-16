import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import RealNavBar from "./RealNavBar";

import Carousel, { CarouselItem } from "./Carousel.jsx";

function UserProfile(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userToJS = JSON.parse(storedUser);
      props.setUser(userToJS);
    }
  }, []);

  function handleDisconnect() {
    localStorage.removeItem("user");
    props.setUser(null);
    props.setLikedGames([]);
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: "black", marginTop: "9rem" }}>
      <RealNavBar user={props.user} />
      <NavBar user={props.user?.userName} />
      {(props.user && props.likedGames) ||
      (props.user && props.playedGames) ||
      (props.user && props.likedGames) ? (
        props.likedGames.length === 0 ? (
          <div className="empty-user-profile">
            <h1>
              You don't like any game yet. Check out our{" "}
              <Link to="/game-list">
                <span className="link-to-gamelist">Game List</span>
              </Link>{" "}
              !
            </h1>
          </div>
        ) : (
          <div>
            {" "}
            <h1
              style={{
                backgroundColor: "rgb(48, 48, 48)",
                color: "white",
                textAlign: "center",
              }}
            >
              You've liked {props.likedGames.length} games !
            </h1>
            <Carousel>
              {props.likedGames.map((likedGame) => {
                const url = `/game-list/${likedGame.id}`;
                return (
                  <CarouselItem key={likedGame.id} className="carousel-item">
                    <Link
                      key={likedGame.slug}
                      to={url}
                      target="_blank"
                      className="carousel-image"
                    >
                      <div
                        className="carousel-image"
                        style={{
                          backgroundImage: `url(${likedGame.background_image})`,
                        }}
                      >
                        <p>{likedGame.name}</p>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </Carousel>
          </div>
        )
      ) : (
        <div className="login-or-signin">
          <div className="signin">
            <h2>You don't have an account yet ?</h2>
            <Link to="/sign-in" className="HomePage-UserProfile-button">
              <div>
                <h1>Sign in</h1>
              </div>
            </Link>
          </div>
          <div className="signin">
            <h2>You already have an account ?</h2>
            <Link to="/log-in" className="HomePage-UserProfile-button">
              <div>
                <h1>Log In</h1>
              </div>
            </Link>
          </div>
        </div>
      )}
      {props.user && props.playedGames ? (
        props.playedGames.length === 0 ? (
          <div className="empty-user-profile">
            <h1>
              You haven't played any game yet ? That can't be true ! Notify it
              in our{" "}
              <Link to="/game-list">
                <span className="link-to-gamelist">Game List</span>
              </Link>{" "}
              !
            </h1>
          </div>
        ) : (
          <div>
            <h1
              style={{
                backgroundColor: "rgb(48, 48, 48)",
                color: "white",
                textAlign: "center",
              }}
            >
              You've played {props.playedGames.length} games !
            </h1>
            <Carousel>
              {props.playedGames.map((playedGame) => {
                const url = `/game-list/${playedGame.id}`;
                return (
                  <CarouselItem key={playedGame.id} className="carousel-item">
                    <Link
                      key={playedGame.slug}
                      to={url}
                      target="_blank"
                      className="carousel-image"
                    >
                      <div
                        className="carousel-image"
                        style={{
                          backgroundImage: `url(${playedGame.background_image})`,
                        }}
                      >
                        <p>{playedGame.name}</p>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </Carousel>
          </div>
        )
      ) : (
        <></>
      )}
      {props.user && props.wishedGames ? (
        props.wishedGames.length === 0 ? (
          <div className="empty-user-profile">
            <h1>
              You don't wish for any game? Then, you have to check out our{" "}
              <Link to="/game-list">
                <span className="link-to-gamelist">Game List</span>
              </Link>{" "}
              !
            </h1>
          </div>
        ) : (
          <Carousel>
            <h1>You wish for {props.wishedGames.length} games !</h1>

            {props.wishedGames.map((wishedGame) => {
              const url = `/game-list/${wishedGame.id}`;
              return (
                <CarouselItem key={wishedGame.id} className="carousel-item">
                  <Link
                    key={wishedGame.slug}
                    to={url}
                    target="_blank"
                    className="carousel-image"
                  >
                    <div
                      className="carousel-image"
                      style={{
                        backgroundImage: `url(${wishedGame.background_image})`,
                      }}
                    >
                      <p>{wishedGame.name}</p>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </Carousel>
        )
      ) : (
        <></>
      )}
      <div className="disconnect-button-container">
        {props.user && (
          <button className="disconnect-button" onClick={handleDisconnect}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
