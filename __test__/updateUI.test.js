import { updateUI } from "../src/client/js/updateUI"

describe("Testing updateUI", () => {

    /*input - For a valid sentiment JSON Object containing all fields
    expected output - UI Is updated without error
    assert the result.*/
    test(' for valid Sentiment Response', async () => {
        // Input and Mocks
        const validJSON = {
            'status': {
                'code': 0
            },
            'score_tag': 'P',
            'agreement': 'AGREEMENT',
            'subjectivity': 'OBJECTIVE',
            'irony': 'IRONIC'
        };

        // Set up our document body
        document.body.innerHTML =
            '<div>' +
            '  <div id="score_tag">http://url.com</div>' +
            '  <div id="agreement">http://url.com</div>' +
            '  <div id="subjectivity">http://url.com</div>' +
            '  <div id="irony">http://url.com</div>' +
            '</div>';

        //Output: Check if the 
        //await expect(updateUI(validJSON)).resolves;
        await updateUI(validJSON);
        expect(document.getElementById('score_tag').innerHTML).toEqual(' Sentiment: The polarity found is positive');
    });

        /*input - For a valid sentiment JSON Object containing all fields
    expected output - UI Is updated without error
    assert the result.*/
    test(' for missing irony Sentiment Response', async () => {
        // Input and Mocks
        const JSONmissingIrony = {
            'status': {
                'code': 0
            },
            'score_tag': 'P',
            'agreement': 'AGREEMENT',
            'subjectivity': 'OBJECTIVE',
        };

        // Set up our document body
        document.body.innerHTML =
            '<div>' +
            '  <div id="score_tag">http://url.com</div>' +
            '  <div id="agreement">http://url.com</div>' +
            '  <div id="subjectivity">http://url.com</div>' +
            '  <div id="irony">http://url.com</div>' +
            '</div>';

        //Output: Check if an error is thrown
        await expect(() => {
            updateUI(JSONmissingIrony)
        })
            .not.toThrow();

            expect(document.getElementById('score_tag').innerHTML).toEqual(' Sentiment: The polarity found is positive');
            expect(document.getElementById('irony').innerHTML).toEqual('http://url.com');

    });

});