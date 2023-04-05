export const PointStruct = {
    latitude:"",
    altitude:"",
    longitude:"",
    comment:""
};

export const Category = [{text:"Restaurante",category:"restaurant"},{text:"Monumento",category:"monument"}, 
                        {text:"Hospital",category:"hospital"}];
  
export class CommentEntity{
    constructor(username, text) {
        this.username = username;
        this.text = text;
    }
}
export class Point{
    constructor(id, author, latitude, longitude, name, description, category, comments, reviewScores){
        this.id = id;
        this.author = author;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.description = description;
        this.category = category;
        this.comments = comments;
        this.reviewScores = reviewScores;
    }

}

export class Map{
    constructor(id, name, owner, locations){
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.locations = locations;
    }
}

export class Comment{
    constructor(author, comment, date){
        this.author = author;
        this.comment = comment;
        this.date = date;
    }
}

export class ReviewScore{
    constructor(author, score, date){
        this.author = author;
        this.score = score;
        this.date = date;
    }
}