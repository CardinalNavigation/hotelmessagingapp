import "./App.css";
import { useState } from "react";
import companyData from "../data/Companies.json";
import guestData from "../data/Guests.json";
import messageData from "../data/Messages.json";

// First we will get the JSON Data Imported ✅
// Then we will set up a system to manipulate the data using buttons and selectors ✅
// We need to create an object to use to manipulate messages with the data in here.

function App() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [currentHour, setcurrentHour] = useState(0);
  const [generatedData, setGeneratedData] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    //Taking Data From Event, transfering to a form.
    const form = event.target;
    //Creating form variable to hold what was submitted.
    const formData = new FormData(form);
    //Creating an Object from the Form Data.
    const formObject = Object.fromEntries(formData.entries());

    //Set Variable For Data Selected This Will Be Relevant if functionality is expanded.
    setGeneratedData(formObject);

    //Pass Data to Function to compile message
    messageGenerator(formObject);
  }

  const messageGenerator = (dataSelected) => {
    // We Need the Time of Day, and are generating that with this function
    let timeofDay = getTimeOfDay();
    console.log(dataSelected);
    //Unpack Data into simpler syntax to make it more useable. -1 is for 0 index
    let guest = guestData[dataSelected.guestId - 1];
    let company = companyData[dataSelected.companyId - 1];
    let template = messageData[dataSelected.templateId - 1];
    console.log(template);
    console.log(guest);

    //Generate Object Template for Future Use:
    let messageObject = {
      guest: {
        firstName: guest.firstName,
        lastName: guest.lastName,
        roomNumber: guest.reservation.roomNumber,
        checkIn: guest.reservation.startTimestamp,
        checkOut: guest.reservation.endTimestamp,
      },
      company: {
        name: company.company,
        city: company.city,
        timezone: company.timezone,
      },
      messageTemplate: {
        timeofDay: timeofDay,
        message: template.message,
      },
    };

    setData(messageObject);

    //Create Message Variable with available data.
    let messageOutput = `Good 
    ${messageObject.messageTemplate.timeofDay}, 
    ${messageObject.guest.firstName}
    ${messageObject.guest.lastName}. 
    Room ${guest.reservation.roomNumber} is ready for you. 
    ${messageObject.company.name} is honored to be your preferred stay. 
    ${messageObject.messageTemplate.message}`;

    //Set useState for rendering to DOM
    setMessage(messageOutput);
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
    setData(null);
  };

  return (
    <div className="App">
      {/* Display Header */}
      <header className="App-header">Hotel Messaging App</header>

      {/* Begin Selection Form */}
      <div className="FormDiv">
        <form className="Form" onSubmit={handleSubmit}>
          {/* Guest Selection */}
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

          {/* Company Selection */}
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

          {/* Template Message Selection */}
          <label>
            Message Template:
            <select name="templateId" defaultValue={"Template"}>
              {messageData.map((template) => (
                <option value={template.id} key={template.id}>
                  {template.message}
                </option>
              ))}
            </select>
          </label>

          {/* Reset Resets the Whole Selection including the display below */}
          <button type="reset" onClick={messageReset}>
            Reset
          </button>
          <button type="submit">Select</button>
        </form>
      </div>

      {/* Selection Display. If Data Object is empty (like on page-load) no display */}
      {data && (
        <div>
          <section>Guest:</section>
          <p>
            {data.guest.firstName} {data.guest.lastName}
          </p>
          <section>Company:</section>
          <p>{data.company.name}</p>
        </div>
      )}

      {/* Template Message Selected */}
      <div>
        <section>{message}</section>
      </div>
    </div>
  );
}

export default App;
