export const PointStruct = {
    latitude:"",
    altitude:"",
    longitude:"",
    comment:""
};

export const Category = [{text:"Restaurante",category:"restaurant"},{text:"Monumento",category:"monument"}, 
                        {text:"Hospital",category:"hospital"}, {text:"Club de deportes", category: "sportsClub"},
                        {text: "Parque", category: "park"}, {text: "Otro", category: "other"},
                        {text: "Policia", category: "policeStation"}, {text: "Bar", category: "bar"},
                        {text: "Tienda", category: "shop"}, {text: "Supermercado", category: "supermarket"},
                        {text: "Hotel", category: "hotel"}, {text: "Cine", category: "cinema"},
                        {text: "Institucion Academica", category: "academicInstitution"}, {text: "Institucion publica", category: "publicInstitution"},
                        {text: "Museo", category: "museum"}, {text: "Paisaje", category: "landscape"},
                        {text: "Centro de Transporte", category: "transportCenter"}, {text: "Ocio", category: "entertainment"}
                        ];
  
export class CommentEntity{
    constructor(username, text) {
        this.username = username;
        this.text = text;
    }
}
export class Point{
    constructor(id, author, latitude, longitude, name, description, category, date, comments, reviewScores, pictures){
        this.id = id;
        this.author = author;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.description = description;
        this.category = category;
        this.date = date;
        this.comments = comments;
        this.reviewScores = reviewScores;
        this.pictures = pictures;
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

export class Picture{
    constructor(author, pictureURL){
        this.author = author;
        this.pictureURL = pictureURL;
    }
}