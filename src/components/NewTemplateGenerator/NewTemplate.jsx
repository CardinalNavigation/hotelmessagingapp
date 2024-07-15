import { useState } from "react";

function NewTemplateGenerator({ templates }) {

    // Below Function Allows Users To Add New Templates
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
            // setTemplateData((currentTemplates) => [
            //     ...currentTemplates,
            //     newTemplateObject,
            // ]);
        }
    };


    return (
        <div>
            <section>Input New Templates:</section>
            <form onSubmit={addNewTemplate}>
                <label>
                    <input name="templateinput"></input>
                </label>
                <button type="submit">Add to Templates</button>
            </form>
        </div>
    )
}

export default NewTemplateGenerator