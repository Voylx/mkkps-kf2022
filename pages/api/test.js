import mysqlConnect from "../../services/db";

export default async function handler(req, res) {
    try {
        const db = await mysqlConnect();
        const [users] = await db.query("SELECT * FROM kf_users ");
        db.release()
        res.status(200).send(users);


    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error });
    }

}
