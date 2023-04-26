import { render } from "@testing-library/react";
import GeneralView from "./GeneralView";


test('check that the general view of a point form renders propertly', async () => {

    const {getByTestId} = await render(<GeneralView point={{id:'000',description:'Description Test',}} mapId={'1'} isOwner={true} marker={[]} 
                                                    map={[]} webId={"https://uo281997.inrupt.net/profile/card#me"} session={[]} updatePictures={()=>{}}
                                                    pictures={[]}/>);

    expect(getByTestId("generalViewContainer")).toBeInTheDocument();
});

test('check that the general view buttons can be clicked', async () => {

    // const {getByTestId} = await render(<GeneralView point={{id:'000',description:'Description Test',}} mapId={'1'} isOwner={true} marker={[]} 
    //                                                 map={[]} webId={"https://uo281997.inrupt.net/profile/card#me"} session={[]} updatePictures={()=>{}}
    //                                                 pictures={[{pictureUrl:'urlfalsa'}]}/>);

    // getByTestId("deleteGeneralView").click();  
});