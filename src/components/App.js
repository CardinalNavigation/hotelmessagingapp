import "./App.css";
import { useState } from "react";
import companyData from "../data/Companies.json";
import guestData from "../data/Guests.json";
import messageData from "../data/Messages.json";

function App() {
  //Message holds user selections and displays on the bottom of the page.
  const [message, setMessage] = useState("");
  //Data is available if the code needs to be extended.
  const [data, setData] = useState(null);

  //This useState holds the imports from the JSON Document.
  //If an API was added to this app this is where that data could be held for display.
  const [companies, setCompanies] = useState(companyData);
  const [guests, setGuests] = useState(guestData);
  const [templates, setTemplateData] = useState(messageData);

  //This is the Select button function which captures the data from the selectors.
  const handleSelection = (event) => {
    event.preventDefault();
    //Taking Data From Event, transfering to a form.
    const form = event.target;
    //Creating form variable to hold what was submitted.
    const formData = new FormData(form);
    //Creating an Object from the Form Data.
    const dataSelected = Object.fromEntries(formData.entries());
    //Pass Data to Function to compile message
    messageGenerator(dataSelected);
  };

  //Compile our Message Together with the Data from the JSON Documents, using the ID numbers of the data objects in that document.
  const messageGenerator = (dataSelected) => {
    // We Need the Time of Day, and are generating that with this function
    // Placing this function call here as it is not necessary to have Time in State until the message is generated.
    let timeofDay = getTimeOfDay();

    //Define Data Objects from Selection into simpler syntax to make it more useable. -1 is for 0 index.
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
    //This is more useful in the future if we want to do other things with this.
    setData(dataObject);

    //Create Message Variable with available data.
    let messageOutput = `Good ${dataObject.messageTemplate.timeofDay}, ${dataObject.guest.firstName} ${dataObject.guest.lastName}. 
    And welcome to ${dataObject.company.name}.
    Room ${guest.reservation.roomNumber} is ready for you. 
    ${dataObject.messageTemplate.message}`;

    //Set Message variable for rendering to DOM
    setMessage(messageOutput);
  };

  //This function processes the time of day and returns Morning, Afternoon or Evening.
  const getTimeOfDay = () => {
    // Convert Current date into hours.
    let currentHour = new Date().getHours();

    // Create variable for what time of the day it is "Morning, Afternoon, or Evening"
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

    //Return this data to our message generator above
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

    //If there is nothing entered into the new template, the button does not work
    if (newTemplate.templateinput === "") {
      return;
    } else {
      const newId = templates.length + 1;
      const newTemplateObject = {
        id: newId,
        message: newTemplate.templateinput,
      };

      //Destructures current array, and adds new item to the end of the array.
      setTemplateData((currentTemplates) => [
        ...currentTemplates,
        newTemplateObject,
      ]);
    }
  };

  //Resets selected template message when the reset button is pressed.
  const messageReset = () => {
    setMessage("");
    setData(null);
  };

  return (
    <div className="App">
      {/* Display Header */}
      <header className="App-header">Hotel Messaging App</header>

      {/* Section to add to Templates */}
      <div>
        <section>Input New Templates:</section>
        <form onSubmit={addNewTemplate}>
          <label>
            <input name="templateinput"></input>
          </label>
          <button type="submit">Add to Templates</button>
        </form>
      </div>

      {/* Begin Selection Form */}
      <div className="FormDiv">
        <section>Select Guest To Reach:</section>
        <form className="Form" onSubmit={handleSelection}>
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
            Company:
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
            Message:
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

      {/* Template Message Display */}
      <div>
        <section>Your Message:</section>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default App;
