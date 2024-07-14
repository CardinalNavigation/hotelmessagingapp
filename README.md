# Hotel Messaging App

### Goal : Create a Hotel Service Desk Messaging Template Generator

## Code:

The code is deployed here:

The code can be found at https://github.com/CardinalNavigation/hotelmessagingapp

## To Run

1. `git clone git@github.com:CardinalNavigation/hotelmessagingapp.git `
2. `npm install` - To Install Dependencies
3. `npm start` - To Initialze the project in your browser.
4. If npm start does not automatically open your browser browser you can view locally at [LocalHost 3000](http://localhost:3000)

## Design Decisions:

Programming Language:

- Javascript is my strongest language.
- Easy to whip something into a webrowser that users can touch.

Library Used:

- I went with React because I wanted to create a quick prototype and be able to quickly see what I am creating and iterate upon that.
- It is something easy to create that a user can pick up and manipulate without much effort.
- React also makes manipulating the data which was provided from the JSON files very easy as you can see the immediate results of code changes displayed on the DOM.

On Data :

- I debated whether I wanted to capture the state of each of the selectors individually but decided that I would focus on capturing the information as a whole with the select button and have that generate a data object.
- If I was working with an API I may have made differnet decisions about how the data is brought in locally to the file, as it was I imported the data and felt that was sufficient for the task here.

## Things which could be improved with more time input:

- Split code off into seperate modules rather than keeping it all in /src/App.js.
- Pass through for more readable code and to more neatly separate responsibilities between functions.
- The code be more extensible. There are some ways in which it is written that may need some attention if this was to be expanded upon further. Specifically, in the message generator function is creating our data object once selections are made. It may be useful to have a template object or class written above any of our helper functions.
- If there is an area for improvement for me it is gaining knowledge about object-oriented programming design. I have done some self study on this topic and would be excited to learn more.
- Write my own CSS - What I have was Generated from Claude 3.5.
- Getting some tests written to ensure functions are working as intended. -This is an area of interest for me.

### ToDos:

1. Have some sort of structure or object for working with template messages that have placeholders/variables (i.e. firstName, lastName, roomNumber, etc.) embedded in them ✅
2. Load in message template information from a JSON file that you will have had created. Structure the file however you see fit ✅
3. Load in guest and company information from the JSON files that we have provided ✅
4. Support a greeting variable that will change based on the time of day (e.g. "Good morning" / "Good afternoon" / "Good evening") ✅
5. Allow the user to specify which guest and which company should be used to populate template messages. ✅
6. Allow the user to either select one of the message templates that was loaded in from the JSON file or to enter in a new message template ✅
7. Generate a final message output that is a result of populating the specified variables of the message template with the correct values from the other data ✅

### Matt's ToDo's:

8. Look through Code one more time and make small edits, do not change large portions.
9. Look through line for line and explain in small detail decisions made in the ReadMe
