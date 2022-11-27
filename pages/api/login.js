import mysqlConnect from "../../services/db";
function checkbody(body) {
    if (typeof body !== 'object') body = {};
    if (!body.username) { body.missing = "username require"; return body; }
    if (!body.password) { body.missing = "password require"; return body; }
    return body;
}


export default async function handler(req, res) {
    const { method } = req;
    if (method !== "POST") {
        res.status(404).send({ message: `NOT FOUND PATH ${req.url} with method ${method}` }); return;
    }
    const { username, password, missing } = checkbody(req.body);
    if (missing) { res.status(400).send({ message: missing }); return; }
    try {
        const db = await mysqlConnect();

        const [[user]] = await db.query("SELECT * FROM kf_users where username = ?", username);
        db.release()
        if (!user) { res.status(404).send({ message: "user not found" }); return; }
        if (user.password !== password) { res.status(400).send({ message: "password does not match" }); return; }
        res.status(200).send({ message: "login successful", user: { userName: username, userID: user.user_id } });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error", error: error.message || error })
    }

}
