function CompanySelector({ companies, onSelect }) {

    return (
        <div>
            {/* Company Selection */}
            <label>
                Company:
                <select onChange={(e) => onSelect(companies[e.target.value])}>
                    {companies.map((company) => (
                        <option value={company.id} key={company.id}>
                            {company.company}
                        </option>
                    ))}
                </select>
            </label>

        </div>
    )
}

export default CompanySelector