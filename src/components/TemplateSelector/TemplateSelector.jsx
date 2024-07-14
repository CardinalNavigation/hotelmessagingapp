function TemplateSelector({ templates, onSelect }) {

    return (
        <div>
            {/* Template Message Selection */}
            <label>
                Message:
                <select onChange={(e) => onSelect(templates[e.target.value])}>
                    {templates.map((template) => (
                        <option value={template.id} key={template.id}>
                            {template.message}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default TemplateSelector