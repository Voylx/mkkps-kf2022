import mysqlConnect from "../../services/db";
function checkquery(obj) {
    if (typeof obj !== 'object') obj = {};
    if (!obj.username) { obj.missing = "username require"; return obj; }
    return obj;
}


export default async function handler(req, res) {
    const { username, missing } = checkquery(req.query)

    if (missing) { res.status(400).send({ message: missing }); return; }
    try {
        const db = await mysqlConnect();
        const sql = `SELECT id, UNIX_TIMESTAMP(Timestamp) as ts , from_user, to_user, amt FROM kf_txn WHERE from_user = ? OR to_user = ? ORDER BY ts DESC;`

        const [histories] = await db.query(sql, [username, username]);
        db.release()
        res.status(200).send([...histories]);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error", error: error.message || error })
    }
}


