
function CommentBox(username){
    return <Card>
        <h2 id={"titulo"}>Introduzca su comentario:</h2>
        <label labelfor = "Comments">Caja de comentarios</label>
            <input id = "Comments "type={<textarea name="" id="" cols="30" rows="10"></textarea>}/>
        <Button variant="contained" color="primary">
            Submit
        </Button>

</Card>;
}