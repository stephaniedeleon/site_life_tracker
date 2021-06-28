import "./Home.css";
import hero from "../../images/hero.jpeg";


export default function Home() {

  return (
    <div className="Home">
      <div class="summary">
        <div class="text">
            <h1>LifeTracker</h1>
            <p>Helping you take back control of your world!</p>
        </div>
        <div class="media"><img src={hero} alt="a person with a fitbit" /></div>
      </div>
    </div>
  )
}