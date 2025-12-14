import getDBConnection from "../config/connection.js";

class update{
    static async updateUser(data, id){
        const { firstname, lastname, email, zip } = data;

        const con = await getDBConnection();

        const query = "UPDATE users SET firstname = ?, lastname = ?, email = ?, zip = ? WHERE id = ?";

        const [row] = con.query(query, [firstname, lastname, email, zip, id]);

        return row;
    }
}

export default update;