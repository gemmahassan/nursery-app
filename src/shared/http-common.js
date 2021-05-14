import axios from "axios";

export default axios.create({
  baseURL: window.location.hostname.includes("herokuapp")
    ? "https://msc-nursery-server.herokuapp.com/"
    : "http://localhost:8080/",
  headers: {
    "Content-type": "application/JSON",
  },
});
