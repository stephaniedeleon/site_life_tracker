import { formatDate } from "../../../utils/format";
import "./NutritionCard.css";


export default function NutritionCard({ key, nutrition }) {

  return (
    <div className="NutritionCard">
      <div className="card">
          <div class="title"><h3 className="name">{nutrition.name}</h3></div>
          <div className="details">
            <div className="quantity">
              <p className="valueName">Quantity</p>
              <p className="value">{nutrition.quantity}</p>
            </div>
            <div className="calories">
              <p className="valueName">Calories</p>
              <p className="value">{nutrition.calories}</p>
            </div>
          </div>
          <div className="extra_details">
            <p className="createdAt">{formatDate(nutrition.created_at)}</p>
            <p className="category">{nutrition.category}</p> 
          </div>
      </div>
    </div>
  );

}