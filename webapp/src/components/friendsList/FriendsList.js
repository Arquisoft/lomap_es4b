import {FriendComponent} from './FriendComponent';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {getAllFriendsFromPod} from '../../helper/PodHelper';
import "./FriendList.css"

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
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div className='sideList' id='pointsList' >
            {
              friends.map((item) => (
                <FriendComponent friendURL={item.friendURL} friendName={item.friendName} webId={webId} session={session} key={item.friendURL}/>
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