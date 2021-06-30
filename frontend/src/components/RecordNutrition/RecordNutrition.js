import { useState } from "react";
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient";
import { PageHeader } from "components";
import "./RecordNutrition.css";


export default function RecordNutrition({ addNutrition }) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        name: "",
        category: "",
        quantity: "",
        calories: ""
    });


    const handleOnInputChange = (event) => {
          
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    
    
    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));
    
        const { data, error } = await apiClient.recordNutrition({ 
            name: form.name,
            category: form.category,
            quantity: form.quantity,
            calories: form.calories
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addNutrition(data);
            navigate("/nutrition");
        } 

        setIsLoading(false);
    }


    return (
        <div className="RecordNutrition">
            <PageHeader sectionName="Nutrition"/>
            <div className="card">
                <h2>Record Nutrition</h2>
                {/* shows error at the top of the form */}
                {errors.form && <span className="error">{errors.form}</span>}
                <br/>

                <div className='form'>

                    <div className='input-field'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' placeholder='Nutrition name' value={form.name} onChange={handleOnInputChange} />
                    </div>

                    <div className='input-field'>
                        <label htmlFor='category'>Category</label>
                        <input type='text' name='category' placeholder='Nutrition category' value={form.category} onChange={handleOnInputChange} />
                    </div>

                    <div className="split-input-field">
                        <div className="input-field">
                            <label htmlFor='quantity'>Quantity</label>
                            <input type="number" name="quantity" placeholder="1" min="1" value={form.quantity} onChange={handleOnInputChange} />
                        </div>

                        <div className="input-field">
                            <label htmlFor='calories'>Calories</label>
                            <input type="number" name="calories" placeholder="1" min="1" value={form.calories} onChange={handleOnInputChange} />
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