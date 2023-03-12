class Comments{
    lista;
    constructor() {
        this.lista = new Array();
    }
    Comments(username){
        return <Card>
            <Comment username = {"a"}  comment = {"hola"}>
            </Comment>
            <Comment username = {"uo281835"}  comment = {"hola"}>
            </Comment>
            <Comment username = {"aaa"}  comment = {"hola"}>
            </Comment>
        </Card>;
    }

    registerComment(username,comment){
        lista.push(new Comment(username, comment));
    }
}