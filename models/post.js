import getDBConnection from "../config/connection.js";

class insert{
    static async addUser(user){

        const { id, firstname, lastname, email, zip } = user;

        const con = await getDBConnection();

        const query = "INSERT INTO users(id, firstname, lastname, email, zip) VALUES (?, ?, ?, ?, ?)";

        const [row] = con.query(query, [id, firstname, lastname, email, zip]);

        return row;
    }
}

export default insert;