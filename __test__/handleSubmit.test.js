import { handleSubmit } from "../src/client/js/formHandler"
import { tsModuleBlock } from "@babel/types";
import { setupTests } from "./setupTests";

const EventEmitter = require('events');

describe("Testing the submit functionality", () => {

    //jest.mock('postData');
    global.alert = jest.fn();

    // initialise an event, and assign your own preventDefault
    const event = new EventEmitter("submit");
    Object.assign(event, { preventDefault: jest.fn() });

    //document.getElementById('input')
    // Set up our document body


    test('works with postData', async () => {

        // Set up our document body
        // document.getElementById('input')
        document.body.innerHTML =
            '<div>' +
            '  <div id="input">http://url.com</div>' +
            '</div>';

        await expect(() => {
            handleSubmit(event)
        })
            .not.toThrow();

    });

    test('throws error if there is no input field in html', async () => {

        // set up body so it doesn't contain the element with id input
        document.body.innerHTML =
            '<div>' +
            '  <div id="wrong">http://url.com</div>' +
            '</div>';

        await expect(() => {
            handleSubmit(event)
        })
            .toThrow();
    });

    test('no error even when url check fails', async () => {

        document.body.innerHTML =
            '<div>' +
            '  <div id="input">not-a-valid-url</div>' +
            '</div>';

        await expect(() => {
            handleSubmit(event)
        })
            .not.toThrow();
    });

    jest.clearAllMocks()


});