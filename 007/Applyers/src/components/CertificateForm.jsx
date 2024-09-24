import React, { useState } from 'react';

const CertificateForm = ({ onAddCertificate }) => {
    const [formData, setFormData] = useState({
        type: '',
        score: '',
        listening: '',
        speaking: '',
        reading: '',
        writing: ''
    });

    const [errors, setErrors] = useState({
        score: '',
        listening: '',
        speaking: '',
        reading: '',
        writing: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };


    const validateField = (fieldName, value) => {
        let errorMsg = '';
        switch (formData.type) {
            case 'IELTS':
                if (
                    fieldName === 'score' ||
                    fieldName === 'listening' ||
                    fieldName === 'speaking' ||
                    fieldName === 'reading' ||
                    fieldName === 'writing'
                ) {
                    if (value < 0 || value > 9) {
                        errorMsg = 'Please enter a score between 0 and 9.';
                    }
                }

                break;
            case 'TOEFL':
                if (fieldName === 'score') {
                    if (value < 0 || value > 120) {
                        errorMsg = 'Please enter a total score between 0 and 120.';
                    }
                } else if (value < 0 || value > 30) {
                    errorMsg = 'Please enter a score between 0 and 30 for each section.';
                }
                break;
            case 'Duolingo':
                if (fieldName === 'score') {
                    if (value % 5 !== 0) {
                        errorMsg = 'Please enter a multiple of 5.';
                    }
                }
                break;
            case 'PTE':
                if (
                    fieldName === 'score' ||
                    fieldName === 'listening' ||
                    fieldName === 'speaking' ||
                    fieldName === 'reading' ||
                    fieldName === 'writing'
                ) {
                    if (value < 0 || value > 90) {
                        errorMsg = 'Please enter a score between 0 and 9.';
                    }
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: errorMsg
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(errors).some(error => error);
        if (!hasErrors) {
            onAddCertificate(formData);
            setFormData({
                type: '',
                score: '',
                listening: '',
                speaking: '',
                reading: '',
                writing: ''
            });
            setErrors({
                score: '',
                listening: '',
                speaking: '',
                reading: '',
                writing: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select name="type" value={formData.type} onChange={handleChange} >
                <option value="">نوع مدرک</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="Duolingo">Duolingo</option>
                <option value="PTE">PTE</option>
            </select>

            
            <input
                
                name="score"
                value={formData.score}
                onChange={handleChange}
                disabled={!formData.type}
                className='first'
                placeholder='نمره کلی (Overall Score)'
            />
            {errors.score && <p style={{ color: 'red' }}>{errors.score}</p>}
          
            <div className='input-row'>
           
            <input
                type="number"
                name="listening"
                value={formData.listening}
                onChange={handleChange}
                disabled={!formData.type}
                placeholder='Listening Score'
            />
            {errors.listening && <p style={{ color: 'red' }}>{errors.listening}</p>}

            <input
                type="number"
                name="reading"
                value={formData.reading}
                onChange={handleChange}
                disabled={!formData.type}
                placeholder='Reading Score'
            />
            {errors.reading && <p style={{ color: 'red' }}>{errors.reading}</p>}

            </div>
            
           
           <div className='input-row'>
          
            <input
                type="number"
                name="speaking"
                value={formData.speaking}
                onChange={handleChange}
                disabled={!formData.type}
                placeholder='Speaking Score'
            />
            {errors.speaking && <p style={{ color: 'red' }}>{errors.speaking}</p>}

            
            <input
                type="number"
                name="writing"
                value={formData.writing}
                onChange={handleChange}
                disabled={!formData.type}
                placeholder='Writing Score'
            />
            {errors.writing && <p style={{ color: 'red' }}>{errors.writing}</p>}

           </div>
          
            <button type="submit" disabled={Object.values(errors).some(error => error)}>
                افزودن مدرک زبان
            </button>
        </form>
    );
};

export default CertificateForm;