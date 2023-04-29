import {FriendComponent} from './FriendComponent';
import { useState, useEffect } from 'react';
import {getAllFriendsFromPod} from '../../helper/PodFriends';
//import "./FriendList.css"

export function FriendsList(props) {

    const {session,webId, setFriendsLoading} = props;
    const [friends, setFriends] = useState([]);

    useEffect(() => {
      const fetchFriends = async() => {
          setFriendsLoading(true);
          const result = await getAllFriendsFromPod(webId);
          setFriendsLoading(false);
          setFriends(result);
      }
      fetchFriends();
    }, []);

    return (
      <div className='friendListComponent'>
          <div data-testid= "nombreAmigoP" className='sideListFriends' id='pointsList' >
            {
              friends.map((item) => (
                <FriendComponent showFriendPoints={(points, webId, mapId) => {props.showFriendPoints(points, webId, mapId)}} friendURL={item.friendURL} friendName={item.friendName} setCurrentMapId={props.setCurrentMapId} session={session} key={item.friendURL}/>
              ))

            }
          </div>
      </div>
    );
  }

  export default FriendsList;