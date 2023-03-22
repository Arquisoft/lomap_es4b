import {MarkerComponent} from './MarkerComponent';
import { useState } from "react";
import {getAllPoints} from '../../helper/PodHelper';

export async function MarkersList(props) {

    const {session,webId} = props;


    const points = [
    ];
 

    return (
      <div>
        {
        await getAllPoints(session,webId)
        .then((points) => 
        {
            points.map((item) => (
                <MarkerComponent key={item.id} name={item.name} description={item.comment} />
              ))
        })

        }
      </div>
    );
  }

  export default MarkersList;

  // const getData = async () => {
  //   const response = await fetch('https://api.example.com/data');
  //   const data = await response.json();
  //   return data;
  // }
  
  // const filterData = async () => {
  //   const dataArray = await getData();
  //   const filteredArray = dataArray.filter(item => item.category === 'fruit');
  //   return filteredArray;
  // }
  
  // const fruitsArray = await filterData();
  // console.log(fruitsArray);