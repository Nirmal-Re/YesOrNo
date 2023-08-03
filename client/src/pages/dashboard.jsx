import homeCSS from "./css/home.module.scss";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { resolvePath } from "react-router-dom";

export default function Dashboard() {
  const [decision, setDecision] = useState();

  const sendData = () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/decisionMade`;
    const data = { decision };
    axios
      .post(URL, data, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (decision) {
      sendData();
    }
  }, [decision]);

  return (
    <div className={homeCSS.pageContainer}>
      <div className={homeCSS.welcomeUser}>
        <span className={homeCSS.message}>center</span>
      </div>
      <div className={homeCSS.optionsContainer}>
        <div className={homeCSS.options}>
          <span className={`${homeCSS.topLeft}`}>
            <Button
              size="lg"
              value="GY"
              onClick={(e) => setDecision(e.target.value)}
            >
              Good Yes
            </Button>
          </span>
          <span className={`${homeCSS.topRight}`}>
            <Button
              size="lg"
              value="GN"
              onClick={(e) => setDecision(e.target.value)}
            >
              Good No
            </Button>
          </span>
          <span className={`${homeCSS.bottomLeft}`}>
            <Button
              variant="warning"
              size="lg"
              value="BY"
              onClick={(e) => setDecision(e.target.value)}
            >
              Bad Yes
            </Button>
          </span>
          <span className={`${homeCSS.bottomRight}`}>
            <Button
              variant="warning"
              size="lg"
              alue="BN"
              onClick={(e) => setDecision(e.target.value)}
            >
              Bad No
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
