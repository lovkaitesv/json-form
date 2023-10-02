import React, { useState } from 'react';

interface FormDataItem {
    default_value?: string | number | boolean;
    value?: string | number | boolean;
    validation?: string;
    min_value?: number;
    max_value?: number;
    options?: string[] | number[];
    type: 'text' | 'longtext' | 'dropdown' | 'number';
}

function DynamicForm() {
    const [formValues, setFormValues] = useState<{ [key: string]: string | number | boolean }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<FormDataItem[]>([]);
    const [submittedValues, setSubmittedValues] = useState<{ [key: string]: string | number | boolean } | null>(
        null
    );

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target?.result as string);
                    setFormData(jsonData);
                } catch (error) {
                    console.error('Invalid JSON file:', error);
                }
            };

            reader.readAsText(file);
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

    };

    const validateForm = () => {
        let isValid = true;

        formData.forEach((field, index) => {
            const { validation } = field;
            if (validation) {
                const value = formValues[`field${index}`] as string;
                const regex = new RegExp(validation);
                const isFieldValid = regex.test(value);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [`field${index}`]: isFieldValid ? '' : 'Validation Failed',
                }));
                if (!isFieldValid) {
                    isValid = false;
                }
            }
        });

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        setSubmittedValues({ ...formValues });
    };

    const renderField = (field: FormDataItem, index: number) => {
        switch (field.type) {
            case 'text':
            case 'longtext':
                return (
                    <textarea
                        key={index}
                        name={`field${index}`}
                        value={formValues[`field${index}`] as string}
                        onChange={(e) => handleChange(e)}
                    />
                );
            case 'number':
                return (
                    <input
                        key={index}
                        type="number"
                        name={`field${index}`}
                        value={formValues[`field${index}`] as string}
                        onChange={(e) => handleChange(e)}
                        min={field.min_value}
                        max={field.max_value}
                    />
                );
            case 'dropdown':
                return (
                    <select
                        key={index}
                        name={`field${index}`}
                        onChange={(e) => handleChange(e)}
                        value={formValues[`field${index}`] as string}
                    >
                        <option value="">Select an option</option>
                        {field.options?.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            default:
                return (
                    <input
                        key={index}
                        type="text"
                        name={`field${index}`}
                        value={formValues[`field${index}`] as string}
                        onChange={(e) => handleChange(e)}
                    />
                );
        }
    };

    return (
        <div className="container">
            <h1>Dynamic Form</h1>
            <input className="custom-file-input" type="file" accept=".json" onChange={handleFileUpload} />
            <form onSubmit={handleSubmit}>
                {formData.map((field, index) => (
                    <div key={index}>
                        <label>
                            {field.type === 'dropdown' ? 'Select ' : 'Enter '} {field.type}:
                        </label>
                        {renderField(field, index)}
                        {errors[`field${index}`] && <p className="error">{errors[`field${index}`]}</p>}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>

            {submittedValues && (
                <div className="submitted-values">
                    <h2>Submitted Values:</h2>
                    <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default DynamicForm;
