export const PointStruct = {
    latitude:"",
    altitude:"",
    longitude:"",
    comment:""
};
  

class Point{
    constructor(latitude, altitude, longitude, comment){
        this.latitude = latitude;
        this.altitude = altitude;
        this.longitude = longitude;
        this.comment = comment;
    }

}