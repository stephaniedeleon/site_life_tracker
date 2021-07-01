import { useState } from "react";
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient";
import { PageHeader } from "components";
import moment from "moment";
import "./LogSleep.css";


export default function LogSleep({ addSleep }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        startTime: "",
        endTime: "",
    });


    const handleOnInputChange = (event) => {
          
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }
    
    
    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        //hours
        const rawHours = moment(new Date(form.endTime)).diff(moment(new Date(form.startTime)), "hours", true);
        const hours = Math.round(rawHours);

        const { data, error } = await apiClient.logSleep({ 
            startTime: form.startTime,
            endTime: form.endTime,
            hours: hours
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addSleep(data);
            navigate("/sleep");
        } 

        setIsLoading(false);
    }


    return (
        <div className="LogSleep">
            <PageHeader sectionName="Sleep"/>
            <div className="card">
                <h2>Add Sleep</h2>
                {/* shows error at the top of the form */}
                {errors.form && <span className="error">{errors.form}</span>}
                <br/>

                <div className='form'>

                    <div className='input-field'>
                        <label htmlFor='startTime'>Start Time</label>
                        <input type='datetime-local' name='startTime' placeholder='mm/dd/yyyy, --:-- --' value={form.startTime} onChange={handleOnInputChange} />
                    </div>

                    <div className='input-field'>
                        <label htmlFor='endTime'>End Time</label>
                        <input type='datetime-local' name='endTime' placeholder='mm/dd/yyyy, --:-- --' value={form.endTime} onChange={handleOnInputChange} />
                    </div>

                    <button className='save-btn' disabled={isLoading} onClick={handleOnSubmit}>
                        {isLoading ? "Loading..." : "Save"}
                    </button>

                </div>
            </div>
        </div>
    );
}