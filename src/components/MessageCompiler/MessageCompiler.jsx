import { useEffect } from "react";

function MessageCompiler({ selectedGuest, selectedCompany, selectedTemplate, timeOfDay, compileMessage }) {

    useEffect(() => {
        if (selectedGuest && selectedCompany && selectedTemplate) {
            const messageOutput = messageGenerator(selectedGuest, selectedCompany, selectedTemplate, timeOfDay);
            compileMessage(messageOutput)
        }
    }, [selectedGuest, selectedCompany, selectedTemplate, timeOfDay, compileMessage])

    const messageGenerator = (selectedGuest, selectedCompany, selectedTemplate, timeOfDay) => {
        let guest = selectedGuest
        let company = selectedCompany
        let template = selectedTemplate
        let timeofDay = timeOfDay

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

        // Create Message Variable with available data.
        let messageOutput = `Good ${dataObject.messageTemplate.timeofDay} ${dataObject.guest.firstName} ${dataObject.guest.lastName}, 
        and welcome to ${dataObject.company.name}!
        Room ${guest.reservation.roomNumber} is ready for you. 
        ${dataObject.messageTemplate.message}`;

        //Set Message variable for rendering to DOM
        return messageOutput
    };

    return null
}

export default MessageCompiler