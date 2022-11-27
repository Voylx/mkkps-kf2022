import mysqlConnect from "../../services/db";
function checkbody(body) {
    if (typeof body !== 'object') body = {};
    if (!body.from_user) { body.missing = "from_user require"; return body; }
    if (!body.payto) { body.missing = "payto require"; return body; }
    if (!body.amt) { body.missing = "amt require"; return body; }
    return body;
}


export default async function handler(req, res) {
    const { method } = req;
    if (method !== "POST") {
        res.status(404).send({ message: `NOT FOUND PATH ${req.url} with method ${method}` }); return;
    }
    const { from_user, payto, amt, missing } = checkbody(req.body);
    if (missing) { res.status(400).send({ message: missing, body: req.body }); return; }
    try {
        const db = await mysqlConnect();

        const [dbresult] = await db.query("INSERT INTO kf_txn (from_user, to_user, amt) VALUES (?,?,?);", [from_user, payto, amt]);
        db.release()
        // if (!user) { res.status(404).send({ message: "user not found" }); return; }
        // if (user.password !== password) { res.status(400).send({ message: "password does not match" }); return; }
        res.status(200).send({ message: "Add TXN successful", dbresult });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error", error: error.message || error })
    }

}
