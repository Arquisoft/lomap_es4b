export const PointStruct = {
    latitude:"",
    altitude:"",
    longitude:"",
    comment:""
};
  
export class CommentEntity{
    constructor(username, text) {
        this.username = username;
        this.text = text;
    }
}
export class Point{
    constructor(id, author, latitude, longitude, name, description, category, comments){
        this.id = id;
        this.author = author;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.description = description;
        this.category = category;
        this.comments = comments;
    }

}

export class Map{
    constructor(id, name, owner, description, points){
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.description = description;
        this.points = points;
    }
}

export class Comment{
    constructor(owner, text){
        this.owner = owner;
        this.text = text;
    }
}