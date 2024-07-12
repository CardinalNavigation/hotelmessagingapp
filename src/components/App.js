import "./App.css";
import { useState } from "react";
import companyData from "../data/Companies.json";
import guestData from "../data/Guests.json";
import messageData from "../data/Messages.json";

// First we will get the JSON Data Imported ✅
// Then we will set up a system to manipulate the data using buttons and selectors ✅
// We need to create an object to use to manipulate messages with the data in here. ✅
// Then We will Deploy to Vercel

function App() {
  const [message, setMessage] = useState("");
  const [currentHour, setcurrentHour] = useState(0);
  const [dataSelected, setDataSelected] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    //Taking Data From Event, transfering to a form.
    const form = event.target;
    //Creating form variable to hold what was submitted.
    const formData = new FormData(form);
    //Creating an Object from the Form Data.
    const formObject = Object.fromEntries(formData.entries());

    //Set Variable For Data Selected This Will Be Relevant if functionality is expanded.
    // setDataSelected(formJson);

    //Pass Data to Function to compile message
    messageGenerator(formObject);
  }

  const messageGenerator = (dataSelected) => {
    // We Need the Time of Day, and are generating that with this function
    let timeofDay = getTimeOfDay();

    // console.log("Inside Message Generator:", dataSelected);
    console.log("Time of Day:", timeofDay);

    //Unpack Data into simpler syntax to make it more useable. -1 is for 0 index
    let guest = guestData[dataSelected.guestId - 1];
    let company = companyData[dataSelected.companyId - 1];

    //Create Message Variable with available data.
    let messageObject = `Good ${timeofDay}, ${guest.firstName} ${guest.lastName}. ${company.company} is excited for your stay. Room ${guest.reservation.roomNumber} is ready for you. Enjoy your stay and please do not hesitate to message us if you need anything.`;

    //Set useState for rendering to DOM
    setMessage(messageObject);
  };

  //This function processes the time of day and returns Morning, Afternoon or Goodnight.
  const getTimeOfDay = () => {
    // Convert Current date into hours.
    let currentHour = new Date().getHours();

    // Set variable for what time of the day it is "Mornign, Afternoon, Evening"
    let timeOfDay = "";

    //My logic here is that this a greeting, and a hotel service desk employee seeing a client face to face
    //would not say good evening to someone after 3:00am, most likely they would switch to good morning at that point.
    if (currentHour > 3 && currentHour < 12) {
      timeOfDay = "morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }

    return timeOfDay;
  };

  //Resets Selected Template Message when the Reset Button is pressed.
  const messageReset = () => {
    setMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">Hotel Messaging App</header>
      <div className="FormDiv">
        <form className="Form" onSubmit={handleSubmit}>
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
          <button type="submit">Generate</button>
        </form>
      </div>
      <div>
        <section>{message}</section>
      </div>
    </div>
  );
}

export default App;
