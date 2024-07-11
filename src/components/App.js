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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataSelected, setDataSelected] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    //Taking Data From Event, transfering to a form.
    const form = event.target;
    //Creating form variable to hold what was submitted.
    const formData = new FormData(form);
    //Creating an Object from the Form Data.
    const formJson = Object.fromEntries(formData.entries());
    //Set Variable For Data Selected This Will Be Relevant if this is expanded upon.
    setDataSelected(formJson);
    //Pass Data to Function to compile message
    messageGenerator(formJson);
  }

  const messageGenerator = (dataSelected) => {
    // console.log("Inside Message Generator:", dataSelected);
    //Unpack Data into simpler syntax to make it more useable. -1 is for 0 index
    let guest = guestData[dataSelected.guestId - 1];
    let company = companyData[dataSelected.companyId - 1];

    //Create Message Variable with available data.
    let messageObject = `TimeStamp Placeholder. Hello, ${guest.firstName} ${guest.lastName}, ${company.company} is excited for your stay. Room ${guest.reservation.roomNumber} is ready for you. Enjoy your stay and please do not hesitate to message us if you need anything.`;

    //Set useState for rendering to DOM
    setMessage(messageObject);
  };

  const messageReset = () => {
    setMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">Hotel Messaging App</header>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Guest:
            <select name="guestId" defaultValue="Guest">
              {guestData.map((guest) => (
                <option value={guest.id} key={guest.id}>
                  {guest.firstName} {guest.lastName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Company:
            <select name="companyId" defaultValue="Guest">
              {companyData.map((company) => (
                <option value={company.id} key={company.id}>
                  {company.company}
                </option>
              ))}
            </select>
          </label>
          <button type="reset" onClick={messageReset}>
            Reset
          </button>
          <button type="submit">Send</button>
        </form>
      </div>
      <div>
        <section>{message}</section>
      </div>
    </div>
  );
}

export default App;
