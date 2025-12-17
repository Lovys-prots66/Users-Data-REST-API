import getDBConnection from "../config/connection.js";

class insert{
    static async addUser(user){

        const { id, first_name, last_name, email, zip } = user;

        const con = await getDBConnection();

        const query = "INSERT INTO users(id, first_name, last_name, email, zip) VALUES (?, ?, ?, ?, ?)";

        const [row] = await con.query(query, [id, first_name, last_name, email, zip]);

        return row[0];
    }
}

export default insert;