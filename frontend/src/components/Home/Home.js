import "./Home.css";
import hero from "images/hero.jpeg";


export default function Home() {

  return (
    <div className="Home">
      <div className="summary">
        <div className="text">
            <h1>LifeTracker</h1>
            <p>Helping you take back control of your world!</p>
        </div>
        <div className="media"><img src={hero} alt="a person with a fitbit" /></div>
      </div>
    </div>
  )
}