import pordefecto from '../../images/default-user.jpg';
import {getImageFromPod} from '../../helper/PodHelper';
import React from "react";
import { useState,useEffect} from "react";
import {getAllMaps,getAllPointsInCurrentMap} from '../../helper/PodMaps';
import {ListLoadingItem} from "../loadingComponents/ListLoadingItem";
import ContentLoader from "react-content-loader";

export function FriendComponent(props) {

  const { friendURL,friendName,session} = props;
  const [selectedValue, setSelectedValue] = useState('');
  const [friendMaps, setFriendMaps] = React.useState([]);
  const [friendImage, setFriendImage] = useState('');
  const [mapLoading, setMapLoading] = useState(false);
  const [friendImageLoading, setFriendImageLoading] = useState(false);
  const [friendMapsLoading, setFriendMapsLoading] = useState(false);


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

    return (
      <div className="sideComponentFriend">
        <header className='pointHeaderFriend'>
          <p data-testid= "nombreAmigoParrafo" className='nameFriend'>{friendName} </p>
        </header>
        <div className="comboAndImage">
            {friendImageLoading ?
                (
                    <ContentLoader
                        speed={2}
                        width={"4em"}
                        height={"4em"}
                        viewBox="0 0 4em 4em"
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
            {friendMapsLoading ?
                (
                    <ContentLoader
                        speed={2}
                        width={"13em"}
                        height={"3em"}
                        viewBox="0 0 13em 3em"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        {...props}
                    >
                        <rect x="0" y="0" rx="3" ry="3" width="13em" height="3em" />
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

            <button data-testid= "botonFriendComponent" onClick={handleClick} disabled={friendMapsLoading}>
                {mapLoading && <ListLoadingItem/>}
                {mapLoading ? <span>Cargando</span> : <span>Cargar Mapa</span>}
            </button>
        </div>
        {/* </div> */}
      </div>
    );
  }

export default FriendComponent;