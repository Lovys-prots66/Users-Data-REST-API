import getDBConnection from "../config/connection.js";

class getUser{
    static async allUsers(){

        const con = await getDBConnection();
    
        const table = "users";

        const [rows] = await con.query("SELECT * FROM " + table);

        return rows;

    }

    // for now it's only getting by id
    static async getSingle(id){

        const con = await getDBConnection();

        const [row] = await con.query("SELECT * FROM users WHERE id = ?", [id]);

        return row[0] || null;
        
    }
}

export default getUser;