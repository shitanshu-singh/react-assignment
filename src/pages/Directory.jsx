import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Directory = ({
  setSentPosts,
  setSentUserDetails,
}) => {
  const [usersData, setUsersData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const usersResponse = await users.json();
    setUsersData(usersResponse);
    const postsResponse = await posts.json();
    setPostsData(postsResponse);
  };
  const handleCard = (id) => {
    setSentPosts(postsData.filter((post) => post.userId === id));
    setSentUserDetails(usersData.filter((userData) => userData.id === id));
    navigate("/profile");
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ justifyContent: "center", padding: "1rem" }}>
      Directory
      <div
        style={{
          padding: "1rem",
          justifyContent: "center",
          display: "grid",
          gridGap: "1rem",
        }}
      >
        {usersData.map((user, index) => {
          if (user.id === index + 1)
            return (
              <Card
                sx={{ minWidth: 275 }}
                key={index}
                onClick={() => handleCard(user.id)}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: 14,
                      justifyContent: "space-between",
                      display: "flex",
                      minWidth: "300px",
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <span>{"Name: " + user.name}</span>

                    <span>
                      {" Posts: " +
                        postsData.filter((post) => user.id === post.userId)
                          .length}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            );
        })}
      </div>
    </div>
  );
};

export default Directory;
