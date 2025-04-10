import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30, // optional, defaults to 60
      }),
    })
      .then((res) => res.json())
      .then((res) => Cookies.set("token", res.accessToken));
  }, []);

  const fetchData = () => {
    const token = Cookies.get("token");
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setUser(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#61dafb",
          border: "none",
          borderRadius: "5px",
          color: "#fff",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={fetchData}
      >
        Fetch Data
      </button>
      {user && <UserProfile user={user} />}
    </div>
  );
}

export default App;

export const UserProfile = ({ user }) => {
  return (
    <div style={styles.card}>
      <img src={user?.image} alt="Profile" style={styles.image} />
      <h2>{`${user?.firstName} ${user?.lastName}`}</h2>
      <p>
        <strong>Username:</strong> {user?.username}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Phone:</strong> {user?.phone}
      </p>
      <p>
        <strong>Address:</strong> {user?.address.address}, {user?.address.city},{" "}
        {user?.address.state}
      </p>
      <p>
        <strong>Company:</strong> {user?.company.name} - {user?.company.title}
      </p>
      <p>
        <strong>University:</strong> {user?.university}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
      <p>
        <strong>Hair:</strong> {user?.hair.color}, {user?.hair.type}
      </p>
      <p>
        <strong>Crypto:</strong> {user?.crypto.coin} Wallet -{" "}
        {user?.crypto.wallet}
      </p>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
  },
  image: {
    width: "128px",
    height: "128px",
    borderRadius: "50%",
    marginBottom: "15px",
  },
};
