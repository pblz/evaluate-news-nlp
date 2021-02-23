import { postData } from "../src/client/js/postData"



describe("Testing the post functionality", () => {


    test('works ', async () => {

    
        await expect(() => {
            postData()
        })
            .not.toThrow();

    });
});
