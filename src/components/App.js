import "./App.css";
import { useState } from "react";

import companyData from "../data/Companies.json";
import guestData from "../data/Guests.json";
import templateData from "../data/Messages.json";

import CompanySelector from "./CompanySelector/CompanySelector";
import GuestSelector from "./GuestSelector/GuestSelector";
import Header from "./Header/Header";
import MessageCompiler from "./MessageCompiler/MessageCompiler";
import MessageDisplay from "./MessageDisplay/MessageDisplay";
import NewTemplateGenerator from "./NewTemplateGenerator/NewTemplate";
import TemplateSelector from "./TemplateSelector/TemplateSelector";

function App() {
  //This useState holds the imports from the JSON Document.
  const [companies, setCompanies] = useState(companyData);
  const [guests, setGuests] = useState(guestData);
  const [templates, setTemplateData] = useState(templateData);

  //State for selections made by user:
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  //This function processes the time of day and returns Morning, Afternoon or Evening.
  const getTimeOfDay = () => {
    let timeOfDay = "";
    let currentHour = new Date().getHours();
    if (currentHour > 3 && currentHour < 12) {
      timeOfDay = "morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }
    return timeOfDay;
  };

  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  //Message holds user selections and displays on the bottom of the page.
  const [message, setMessage] = useState("");

  //This is the Select button function which captures the data from the selectors.
  const handleGuestSelection = (selectedGuest) => {
    setSelectedGuest(selectedGuest);
  };
  const handleCompanySelection = (selectedCompany) => {
    setSelectedCompany(selectedCompany);
  };
  const handleTemplateSelection = (selectedTemplate) => {
    setSelectedTemplate(selectedTemplate);
  };

  //Compile our Message Together with the Data from the JSON Documents, using the ID numbers of the data objects in that document.
  const messageGenerator = (dataSelected) => {
    // We Need the Time of Day, and are generating that with this function
    // Placing this function call here as it is not necessary to have Time in State until the message is generated.

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

    //Create Message Variable with available data.
    let messageOutput = `Good ${dataObject.messageTemplate.timeofDay} ${dataObject.guest.firstName} ${dataObject.guest.lastName}, 
    and welcome to ${dataObject.company.name}!
    Room ${guest.reservation.roomNumber} is ready for you. 
    ${dataObject.messageTemplate.message}`;

    //Set Message variable for rendering to DOM
    setMessage(messageOutput);
  };

  return (
    <div className="App">
      <Header />
      <NewTemplateGenerator />
      <GuestSelector guests={guests} onSelect={handleGuestSelection} />
      <CompanySelector
        companies={companies}
        onSelect={handleCompanySelection}
      />
      <TemplateSelector
        templates={templates}
        onSelect={handleTemplateSelection}
      />
      <MessageCompiler
        selectedGuest={selectedGuest}
        selectedCompany={selectedCompany}
        selectedTemplate={selectedTemplate}
        timeOfDay={timeOfDay}
        generateMessage={generateMessage}
      />
      <MessageDisplay message={message} />
    </div>
  );
}

export default App;
