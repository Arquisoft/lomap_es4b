import {FriendComponent} from './FriendComponent';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {getAllFriendsFromPod} from '../../helper/PodFriends';
//import "./FriendList.css"

export function FriendsList(props) {

    const {session,webId} = props;
    const [friends, setFriends] = useState([]);

    useEffect(() => {
      const fetchFriends = async() => {
        const result = await getAllFriendsFromPod(webId);
        setFriends(result);
      }
      fetchFriends();
    }, []);

    return (
      <ScrollArea.Root className="ScrollAreaRootFriends">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div data-testid= "nombreAmigoP" className='sideListFriends' id='pointsList' >
            {
              friends.map((item) => (
                <FriendComponent showFriendPoints={(points, webId, mapId) => {props.showFriendPoints(points, webId, mapId)}} friendURL={item.friendURL} friendName={item.friendName} setCurrentMapId={props.setCurrentMapId} webId={webId} session={session} key={item.friendURL}/>
              ))

            }
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    );
  }

  export default FriendsList;