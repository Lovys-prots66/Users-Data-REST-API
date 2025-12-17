import getDBConnection from "../config/connection.js"

class remove{
    static async removeUser(id){

        const con = await getDBConnection();

        const query = "DELETE FROM users WHERE id = ?";

        const [row] = await con.query(query, [id]);

        return row;
    }
}

export default remove;