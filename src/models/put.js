import getDBConnection from "../config/connection.js";

class update{
    static async updateUser(data, id){
        const { first_name, last_name, email, zip } = data;

        const con = await getDBConnection();

        const query = "UPDATE users SET first_name = ?, last_name = ?, email = ?, zip = ? WHERE id = ?";

        const [row] = await con.query(query, [first_name, last_name, email, zip, id]);

        return row[0];
    }
}

export default update;