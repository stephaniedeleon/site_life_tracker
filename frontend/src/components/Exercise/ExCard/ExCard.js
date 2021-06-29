import "./ExCard.css";


export default function ExCard({ key, exercise }) {

  return (
    <div className="ExCard">
        <br/>
        <div className="info">
            <p className="name">{exercise.name}</p>
            <p className="duration">{exercise.duration}</p>
        </div>
    </div>
  );

}