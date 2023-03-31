import imagen from '../../images/default-icon.png';
import {getImageFromPod,getAllPointsInCurrentMap} from '../../helper/PodHelper';
import { useState,useEffect} from "react";
import {getAllMaps, get} from '../../helper/PodHelper';

export function FriendComponent(props) {

  const { friendURL,friendName,webId,session} = props;
  const [selectedValue, setSelectedValue] = useState('');
  const [friendMaps, setFriendMaps] = useState([]);
  const [friendImage, setFriendImage] = useState('');


    useEffect(() => {
      const fetchFriendMapsAndImage = async() => {
        const result = await getAllMaps(session,friendURL);
        setFriendMaps(result);
        const image = await getImageFromPod(props.friendURL);
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
        console.log(selectedValue);
        getAllPointsInCurrentMap(session,friendURL).then((p)=>console.log(p));
      }
    
    };

    return (
      <div className="sideComponent">
        <header className='pointHeader'>
          <p className='name'>{friendName} </p>
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