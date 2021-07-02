import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

  return (
    <div className="Home">

      <div className="tiles">
        <Link to="/exercise" className="tile" >
            <img src="http://codepath-lifetracker.surge.sh/static/media/icons-workout-48.4f4cdb05.svg" alt="workout icon" />
            <p>Fitness</p>
        </Link>
        <Link to="/nutrition" className="tile">
            <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-porridge-100.132d2715.svg" alt="porridge icon" />
            <p>Food</p>
        </Link>
      </div>

      <div className="hero">
        <img src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg" alt="a fitbit" />
        <h1>LifeTracker</h1>
        <p>Helping you take back control of your world!</p>
      </div>

      <div className="tiles">
        <Link to="/sleep" className="tile">
            <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-resting-100.81067336.svg" alt="person on a lazy boy icon" />
            <p>Rest</p>
        </Link>
        <Link to="/activity" className="tile">
            <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-planner-100.997ca54c.svg" alt="calendar icon" />
            <p>Planner</p>
        </Link>
      </div>

    </div>
  )
}