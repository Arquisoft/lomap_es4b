export const PointStruct = {
    latitude:"",
    altitude:"",
    longitude:"",
    comment:""
};
  

export class Point{
    constructor(id, autor, latitude, longitude, name, category, comment){
        this.id = id;
        this.autor = autor;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.comment = comment;
        this.category = category;
        /* this.points = points; */
    }

}