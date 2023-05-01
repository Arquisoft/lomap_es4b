import pordefecto from '../../images/default-user.jpg';
import {getImageFromPod} from '../../helper/PodHelper';
import React from "react";
import { useState,useEffect} from "react";
import {getAllMaps,getAllPointsInCurrentMap} from '../../helper/PodMaps';
import {ListLoadingItem} from "../loadingComponents/ListLoadingItem";
import ContentLoader from "react-content-loader";
import {deleteFriend,friendsAclPermission,deleteFriendPermission} from "../../helper/PodFriends";

export function FriendComponent(props) {

  const { friendURL,friendName,session,setFriends,friendsList} = props;
  const [selectedValue, setSelectedValue] = useState('');
  const [friendMaps, setFriendMaps] = React.useState([]);
  const [friendImage, setFriendImage] = useState('');
  const [mapLoading, setMapLoading] = useState(false);
  const [friendImageLoading, setFriendImageLoading] = useState(false);
  const [friendMapsLoading, setFriendMapsLoading] = useState(false);
  const [friendDeleting, setfriendDeleting] = useState(false);



    useEffect(() => {
      const fetchFriendMapsAndImage = async() => {
          setFriendMapsLoading(true);
          setFriendImageLoading(true);
          const result = await getAllMaps(session,friendURL);
          setFriendMaps(result);
          setFriendMapsLoading(false);
          console.log(props.friendURL);
          let image = await getImageFromPod(props.friendURL);
          if(image == 'NoImage'){
              image = pordefecto;
          }
          setFriendImage(image);
          setFriendImageLoading(false);
      }
      fetchFriendMapsAndImage();
    }, []);


    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const handleClick = () => {
      if(selectedValue != ''){
            setMapLoading(true);
            getAllPointsInCurrentMap(session,friendURL,selectedValue).then((points)=>{
                props.showFriendPoints(points, friendURL, selectedValue);
                props.setCurrentMapId(selectedValue);
                setMapLoading(false);
            }
        );
      }
    
    };

    const handleClickDelete = () => {
        setfriendDeleting(true);
        deleteFriend(session.info.webId, session, friendURL).then(
          ()=>{
              setFriends(friendsList.filter(url => url !== friendURL));
              console.log(friendsList);
              deleteFriendPermission(session.info.webId, session,friendURL);
              //friendsAclPermission(session.info.webId, session);
          }
          );
    
    };

    return (
      <div className="sideComponentFriend">
        <header className='pointHeaderFriend'>
          <p data-testid= "nombreAmigoParrafo" className='nameFriend'>{friendName} </p>
        </header>
        <div className="friendProfile">
        <div className="comboAndImage">
            {friendImageLoading ?
                (
                    <ContentLoader
                        speed={2}
                        width={"4.37em"}
                        height={"4.37em"}
                        viewBox="0 0 4.37em 4.37em"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        {...props}
                    >
                        <circle cx="2em" cy="2em" r="2em" />
                    </ContentLoader>
                )
                :
                (<img src={friendImage} alt="Imagen del usuario"/>)
            }
            </div>
            <div className="comboAndButton">
            {friendMapsLoading ?
                (
                    <ContentLoader
                        speed={2}
                        width={"12em"}
                        height={"2em"}
                        viewBox="0 0 12em 2em"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        {...props}
                    >
                        <rect x="0" y="0" rx="3" ry="3" width="12em" height="2em" />
                    </ContentLoader>
                )
                :
                (<select data-testid= "selectFriendComponent" value={selectedValue} onChange={handleChange}>
                    <option value="">Selecciona un Mapa</option>
                    {friendMaps.map((friendMap) => (
                        <option key={friendMap.id} value={friendMap.id}>
                            {friendMap.name}
                        </option>
                    ))}
                </select>)
            }
            
            <div className="buttons">
                <button data-testid= "botonFriendComponent" onClick={handleClick} disabled={friendMapsLoading}>
                    {mapLoading && <ListLoadingItem/>}
                    {mapLoading ? <span>Cargando</span> : <span>Cargar Mapa</span>}
                </button>

                <button className="deleteButton" data-testid= "botonDeleteFriendComponent" onClick={handleClickDelete} disabled={friendMapsLoading}>
                    {friendDeleting && <ListLoadingItem/>}
                    {friendDeleting ? <span>Eliminando</span> : <span>Eliminar Amigo</span>}
                </button>
            </div>
        </div>
        </div>
      </div>
    );
  }

export default FriendComponent;