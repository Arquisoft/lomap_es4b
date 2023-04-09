import pordefecto from '../../images/default-user.jpg';
import {getImageFromPod} from '../../helper/PodHelper';
import { useState,useEffect} from "react";
import {getAllMaps,getAllPointsInCurrentMap} from '../../helper/PodMaps';

export function FriendComponent(props) {

  const { friendURL,friendName,webId,session} = props;
  const [selectedValue, setSelectedValue] = useState('');
  const [friendMaps, setFriendMaps] = useState([]);
  const [friendImage, setFriendImage] = useState('');


    useEffect(() => {
      const fetchFriendMapsAndImage = async() => {
        const result = await getAllMaps(session,friendURL);
        setFriendMaps(result);
        let image = await getImageFromPod(props.friendURL);
        if(image == 'NoImage'){
          image = pordefecto;
        }
        setFriendImage(image);
      }
      fetchFriendMapsAndImage();
    }, []);

/*     let imagen = "";
    getImageFromPod(props.friendURL).then((image)=>imagen=image);  */

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const handleClick = () => {
      if(selectedValue != ''){
        getAllPointsInCurrentMap(session,friendURL,selectedValue).then((points)=>{
            props.showFriendPoints(points, friendURL, selectedValue);
            }
        );
      }
    
    };

    return (
      <div className="sideComponentFriend">
        <header className='pointHeaderFriend'>
          <p className='nameFriend'>{friendName} </p>
        </header>
        <div className="comboAndImage">
            <img src={friendImage} alt="Imagen del usuario"/>
            <select value={selectedValue} onChange={handleChange}>
            <option value="">Selecciona un Mapa</option>
                {friendMaps.map((friendMap) => (
                  <option key={friendMap.id} value={friendMap.id}>
                    {friendMap.name}
                  </option>
                ))}
            </select>
            <button onClick={handleClick}>Cargar Mapa</button>
        </div>
        {/* </div> */}
      </div>
    );
  }

export default FriendComponent;