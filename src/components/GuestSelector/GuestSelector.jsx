function GuestSelector({ guests, onSelect }) {

    return (
        <div>
            <section>Select Guest To Reach:</section>
            <label>
                Guest:
                <select onChange={(e) => onSelect(guests[e.target.value])}>
                    {guests.map((guest) => (
                        <option value={guest.id} key={guest.id}>
                            {guest.firstName} {guest.lastName}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default GuestSelector