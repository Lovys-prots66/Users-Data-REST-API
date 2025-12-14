import getDBConnection from "../config/connection.js";

class update{
    static async updateUser(user){
        const { id, firstname, lastname, email, zip } = user;

        const con = await getDBConnection();

        const query = "UPDATE users SET id = ? , firstname = ?, lastname = ?, email = ?, zip = ?";

        const [row] = con.query(query, [id, firstname, lastname, email, zip]);

        return row;
    }
}

export default update;