import "./App.css";
import { useState } from "react";
import companyData from "../data/Companies.json";
import guestData from "../data/Guests.json";
import messageData from "../data/Messages.json";

function App() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const [companies, setCompanies] = useState(companyData);
  const [guests, setGuests] = useState(guestData);
  const [templates, setTemplateData] = useState(messageData);

  function handleTemplateSelection(event) {
    event.preventDefault();
    //Taking Data From Event, transfering to a form.
    const form = event.target;
    //Creating form variable to hold what was submitted.
    const formData = new FormData(form);
    //Creating an Object from the Form Data.
    const dataSelected = Object.fromEntries(formData.entries());
    //Pass Data to Function to compile message
    messageGenerator(dataSelected);
  }

  const messageGenerator = (dataSelected) => {
    // We Need the Time of Day, and are generating that with this function
    let timeofDay = getTimeOfDay();

    //Unpack Data into simpler syntax to make it more useable. -1 is for 0 index
    let guest = guests[dataSelected.guestId - 1];
    let company = companies[dataSelected.companyId - 1];
    let template = templates[dataSelected.templateId - 1];

    //Generate message object template for future Use:
    let dataObject = {
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

    //Set Data Object for the page.
    setData(dataObject);

    //Create Message Variable with available data.
    let messageOutput = `Good ${dataObject.messageTemplate.timeofDay}, ${dataObject.guest.firstName} ${dataObject.guest.lastName}. 
    And welcome to ${dataObject.company.name}.
    Room ${guest.reservation.roomNumber} is ready for you. 
    ${dataObject.messageTemplate.message}`;

    //Set Message variable for rendering to DOM
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

  //Below Function Allows Users To Add New Templates
  const addNewTemplate = (event) => {
    event.preventDefault();
    //Taking Data From Event, transfering to a form.
    const form = event.target;
    //Creating form variable to hold what was submitted.
    const formData = new FormData(form);
    //Creating an Object from the Form Data.
    const newTemplate = Object.fromEntries(formData.entries());
    const newId = templates.length + 1;
    const newTemplateObject = {
      id: newId,
      message: newTemplate.templateinput,
    };

    setTemplateData((currentTemplates) => [
      ...currentTemplates,
      newTemplateObject,
    ]);
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

      {/* Place to add to Templates */}
      <div>
        <section>Input New Templates:</section>
        <form onSubmit={addNewTemplate}>
          <label>
            <input
              name="templateinput"
              defaultValue="Enter New Template Here"
            ></input>
          </label>
          <button type="submit">Add to Templates</button>
        </form>
      </div>

      {/* Begin Selection Form */}
      <div className="FormDiv">
        <form className="Form" onSubmit={handleTemplateSelection}>
          {/* Guest Selection */}
          <label>
            Guest:
            <select name="guestId" defaultValue="Guest">
              {guests.map((guest) => (
                <option value={guest.id} key={guest.id}>
                  {guest.firstName} {guest.lastName}
                </option>
              ))}
            </select>
          </label>

          {/* Company Selection */}
          <label>
            Companies:
            <select name="companyId" defaultValue="Guest">
              {companies.map((company) => (
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
              {templates.map((template) => (
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

      {/* Selection Display. If Data Object is empty (like on page-load or reset) no display */}
      {data && (
        <div>
          <div>Selections:</div>
          <section>Guest:</section>
          <p>
            {data.guest.firstName} {data.guest.lastName}
          </p>
          <section>Company:</section>
          <p>{data.company.name}</p>
          <section>Message Template:</section>
          <p>{data.messageTemplate.message}</p>
        </div>
      )}

      {/* Template Message Display */}
      <div>
        <section>{message}</section>
      </div>
    </div>
  );
}

export default App;
