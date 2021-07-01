import { formatTime, formatSleepDate } from "utils/format";
import "./SleepCard.css";


export default function SleepCard({ key, sleep }) {

  return (
    <div className="SleepCard">
      <div className="card">
          <div className="title"><h3 className="date">{formatSleepDate(sleep.end_time)}</h3></div>
          <div className="details">
            <div className="startTime">
              <p className="valueName">Start Time</p>
              <p className="value">{formatTime(sleep.start_time)}</p>
            </div>
            <div className="endTime">
              <p className="valueName">End Time</p>
              <p className="value">{formatTime(sleep.end_time)}</p>
            </div>
          </div>
          <div className="extra_details">
            <p className="hours">{sleep.hours} hours</p>
          </div>
      </div>
    </div>
  );

}