import "./App.css";
import companyData from "../data/Companies.json";
import guestData from "../data/Guests.json";
import messageData from "../data/Messages.json";

//First we will get the JSON Data Imported ✅
//Then we will set up a system to manipulate the data using buttons and selectors
//Then We will Deploy to Vercel
// We need to create an object to use to manipulate messages with the data in here.

function App() {
  console.log(companyData);
  console.log(companyData[0].id);
  return (
    <div className="App">
      <header className="App-header">Hotel Messaging App</header>
      <div>
        {companyData.map((company) => (
          <div key={company.id}>
            <p>{company.company}</p>
            <p>{company.city}</p>
            <p>{company.timezone}</p>
          </div>
        ))}
      </div>
      <div>
        {guestData.map((guest) => (
          <div key={guest.id}>
            <p>{guest.firstName}</p>
            <p>{guest.lastName}</p>
            <p>{guest.reservation.roomNumber}</p>
            <p>{guest.reservation.startTimestamp}</p>
            <p>{guest.reservation.endTimestamp}</p>
          </div>
        ))}
      </div>
      <div>
        {messageData.map((message) => (
          <div key={message.id}>
            <p>{message["company id"]}</p>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
