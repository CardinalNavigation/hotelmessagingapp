import "./App.css";
import { useState } from "react";
import companyData from "../data/Companies.json";
import guestData from "../data/Guests.json";
import messageData from "../data/Messages.json";

//First we will get the JSON Data Imported ✅
//Then we will set up a system to manipulate the data using buttons and selectors
//Then We will Deploy to Vercel
// We need to create an object to use to manipulate messages with the data in here.

function App() {
  const [message, setMessage] = useState("");

  const messageObjectGenerator = () => {
    let messageObject = {
      hotel: "Claifornia",
      city: "Santa Barbara",
      timezone: "CT",
      firstName: "",
      lastName: "",
      roomNumber: "",
    };
    setMessage(messageObject);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">Hotel Messaging App</header>
        <div>
          <label>
            Guest:
            <select name="guestName" defaultValue="Guest">
              {guestData.map((guest) => (
                <option value={guest.id} key={guest.id}>
                  {guest.firstName} {guest.lastName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Company:
            <select name="guestName" defaultValue="Guest">
              {companyData.map((company) => (
                <option value={company.id} key={company.id}>
                  {company.company} , {company.city}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
