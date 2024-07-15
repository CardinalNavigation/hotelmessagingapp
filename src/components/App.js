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

  // console.log(selectedCompany);
  // console.log(selectedGuest);
  // console.log(selectedTemplate);

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
  const [message, setMessage] = useState(null);
  // console.log(message);

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

  const compileMessage = (message) => {
    setMessage(message);
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
        compileMessage={compileMessage}
      />
      <MessageDisplay message={message} />
    </div>
  );
}

export default App;
