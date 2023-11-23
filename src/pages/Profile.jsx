import * as React from "react";
import Button from "@mui/material/Button";
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "../components/Clock";
import "./Modal.css";

const Profile = ({ userDetails, posts }) => {
  const [countries, setCountries] = useState([]);
  const [timeSelected, setTimeSelected] = useState("");
  const [clock, setClock] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(false);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const getCountries = async () => {
    const country = await fetch("https://worldtimeapi.org/api/timezone");
    const responseCountries = await country.json();
    setCountries(responseCountries);
  };

  const getTime = async (selected) => {
    const Time = await fetch(
      `https://worldtimeapi.org/api/timezone/${selected}`
    );
    const responseTime = await Time.json();
    let runningTime = await responseTime.datetime.slice(0, -6);
    const calculatedTime = new Date(runningTime).toLocaleTimeString("en-GB");
    setTimeSelected(calculatedTime);
    setClock(true);
  };

  const handleCountry = (event) => {
    let countryValue = countries.filter((selected) => {
      if (event.target.value === selected) {
        return getTime(selected);
      }
    });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handlePostClick = (title, body) => {
    setPostTitle(title);
    setPostBody(body);
    setModal(true);
  };
  const navigate = useNavigate();

  return (
    <div style={{ alignItems: "center", justifyContent: "space-between" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: "0",
          backgroundColor: "Scrollbar",
          padding: "1rem",
        }}
      >
        <Button variant="contained" onClick={() => navigate("/")}>
          Back
        </Button>
        <select onChange={handleCountry} defaultValue={"De"}>
          <option value="De" disabled hidden>
            Country Dropdown
          </option>
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        {clock ? <Clock time={timeSelected} /> : null}
      </div>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "60%",
          margin: "auto",
        }}
      >
        <div
          style={{ justifyContent: "center", display: "flex", padding: "1rem" }}
        >
          Profile Page
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            gridGap: "1rem",
          }}
        >
          {userDetails[0] ? (
            <Card
              sx={{
                backgroundColor: "lightblue",
                position: "relative",
                marginInline: "-20%",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 14,
                    textAlign: "left",
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <div>
                    <span>{"Name: " + userDetails[0]?.name}</span>
                    <div>
                      <span>{" Username: " + userDetails[0]?.username}</span>
                      <div>
                        <span>
                          {" CatchPhrase: " +
                            userDetails[0]?.company.catchPhrase}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {" Address: " +
                      userDetails[0]?.address.street +
                      ", " +
                      userDetails[0]?.address.city +
                      ", " +
                      userDetails[0]?.address.zipcode}
                    <div>
                      <span>{" Email: " + userDetails[0]?.email}</span>
                      <div>
                        <span>
                          {" Phone: " +
                            userDetails[0]?.phone.split(/\s(.+)/)[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          ) : null}
          <div
            style={{
              display: "grid",
              gridGap: "1rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            {posts?.map((post, index) => (
              <Card
                key={index}
                onClick={() => handlePostClick(post.title, post.body)}
                sx={{
                  display: "flex",
                  textAlign: "left",
                  backgroundColor: "rgb(247, 247, 136)",
                  borderRadius: "10px",
                  minHeight: "100px",
                  flexDirection: "column",
                  whiteSpace: "pre-wrap",
                }}
              >
                <CardContent>
                  <Typography>
                    {post?.title.length > 10
                      ? post?.title.slice(0, 10) + "..."
                      : post?.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {post?.body.length > 50
                      ? post?.body.slice(0, 50) + "..."
                      : post?.body}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
          {modal && (
            <>
              <button onClick={toggleModal} className="btn-modal">
                Open
              </button>
              {modal && (
                <div className="modal">
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                    <h2>{postTitle}</h2>
                    <p>{postBody}</p>
                    <button className="close-modal" onClick={toggleModal}>
                      CLOSE
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
