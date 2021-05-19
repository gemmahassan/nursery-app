// sets up axios
// if the API is being called from Heroku, use the Heroku URL
// otherwise use locahost
// this isn't relevant as the database does not work with Heroku
import axios from "axios";

export default axios.create({
  baseURL: window.location.hostname.includes("herokuapp")
    ? "https://msc-nursery-server.herokuapp.com/"
    : "http://localhost:8080/",
  headers: {
    "Content-type": "application/JSON",
  },
});
