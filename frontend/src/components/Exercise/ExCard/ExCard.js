import { formatDate } from "../../../utils/format";
import "./ExCard.css";


export default function ExCard({ key, exercise }) {

  return (
    <div className="ExCard">
      <div className="card">
          <div class="title"><h3 className="name">{exercise.name}</h3></div>
          <div className="details">
            <div className="duration">
              <p className="valueName">Duration</p>
              <p className="value">{exercise.duration}</p>
            </div>
            <div className="intensity">
              <p className="valueName">Intensity</p>
              <p className="value">{exercise.intensity}</p>
            </div>
          </div>
          <div className="extra_details">
            <p className="createdAt">{formatDate(exercise.created_at)}</p>
            <p className="category">{exercise.category}</p> 
          </div>
      </div>
    </div>
  );

}