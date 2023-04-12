import homeCSS from "./css/home.module.scss";
import { Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div className={homeCSS.pageContainer}>
      <div className={homeCSS.welcomeUser}>
        <span className={homeCSS.message}>center</span>
      </div>
      <div className={homeCSS.optionsContainer}>
        <div className={homeCSS.options}>
          <span className={`${homeCSS.topLeft}`}>
            <Button size="lg">Good Yes</Button>
          </span>
          <span className={`${homeCSS.topRight}`}>
            <Button size="lg">Good No</Button>
          </span>
          <span className={`${homeCSS.bottomLeft}`}>
            <Button variant="warning" size="lg">
              Bad Yes
            </Button>
          </span>
          <span className={`${homeCSS.bottomRight}`}>
            <Button variant="warning" size="lg">
              Bad No
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
