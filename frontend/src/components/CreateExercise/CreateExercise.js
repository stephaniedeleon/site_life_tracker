import { useState } from "react";
import { useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient";
import "./CreateExercise.css";


export default function CreateExercise() { //{ setAppState })

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        name: "",
        category: "",
        duration: "",
        intensity: ""
    });


    const handleOnInputChange = (event) => {
          
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    
    
    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));
    
        const { error } = await apiClient.createExercise({ 
            name: form.name,
            category: form.category,
            duration: form.duration,
            intensity: form.intensity
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else if (!form.name || !form.category) {
            setErrors((e) => ({ ...e, form: "Please complete all required fields." }));
        } else if (form.duration <= 0 || form.intensity <= 0) {
            setErrors((e) => ({ ...e, form: "Number fields should be greater than 0." }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            navigate("/exercise");
        } 

        setIsLoading(false);
    }


    return (
        <div className="CreateExercise">
            <div className="card">
                <h2>Add Exercise</h2>
                {/* shows error at the top of the form */}
                {errors.form && <span className="error">{errors.form}</span>}
                <br/>

                <div className='form'>

                    <div className='input-field'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' placeholder='Exercise name' value={form.name} onChange={handleOnInputChange} />
                    </div>

                    <div className='input-field'>
                        <label htmlFor='category'>Category</label>
                        <input type='text' name='category' placeholder='Exercise category' value={form.category} onChange={handleOnInputChange} />
                    </div>

                    <div className="split-input-field">
                        <div className="input-field">
                            <label htmlFor='duration'>Duration (min)</label>
                            <input type="number" name="duration" placeholder="1" min="1" value={form.duration} onChange={handleOnInputChange} />
                        </div>

                        <div className="input-field">
                            <label htmlFor='intensity'>Intensity (1-10)</label>
                            <input type="number" name="intensity" placeholder="1" min="1" max="10" value={form.intensity} onChange={handleOnInputChange} />
                        </div>
                    </div>

                    <button className='save-btn' disabled={isLoading} onClick={handleOnSubmit}>
                        {isLoading ? "Loading..." : "Save"}
                    </button>

                </div>
            </div>
        </div>
    );
}