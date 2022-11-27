import mysqlConnect from '../../services/db';

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear().toString().slice(2);
    var month = a.getMonth() + 1;
    var date = a.getDate();

    var time = date + '/' + month + '/' + year;
    return time;
}

export default async function handler(req, res) {
    try {
        const db = await mysqlConnect();
        const sql = `SELECT id, UNIX_TIMESTAMP(Timestamp) as ts , from_user, to_user, amt FROM kf_txn  ORDER BY ts DESC;`;

        const [histories] = await db.query(sql);
        db.release();

        function groupByDay(arr) {
            return arr.reduce((prev, cur) => {
                cur.ts = timeConverter(cur.ts);

                if (!prev[cur.ts]) prev[cur.ts] = [];

                prev[cur.ts].push(cur);
                return prev;
            }, {});
        }
        function sumFromTo(arr) {
            `ถ้า A จ่ายให้ B หลายครั้งให้เอามารวมกัน`;
            return arr.reduce((prev, cur) => {
                if (!prev[cur.from_user]) prev[cur.from_user] = {};
                if (prev[cur.from_user] && !prev[cur.from_user][cur.to_user])
                    prev[cur.from_user][cur.to_user] = cur.amt;
                else prev[cur.from_user][cur.to_user] += cur.amt;

                return prev;
            }, {});
        }
        function sumGroupByDay(arr) {
            const group_by_day = groupByDay(arr);
            return Object.entries(group_by_day).reduce((prev, [day, v]) => {
                prev[day] = sumFromTo(v);
                return prev;
            }, {});
        }
        function calSummary(obj) {
            const temp = JSON.parse(JSON.stringify(obj));
            Object.entries(temp).forEach(([from, V]) => {
                Object.entries(V).forEach(([to, amt]) => {
                    let _do = true;
                    if (!temp[to]) _do = false;
                    else if (!temp[to][from]) _do = false;

                    if (_do) {
                        const f = temp[from][to];
                        const t = temp[to][from];

                        const total_amt = f - t;
                        if (total_amt > 0) {
                            temp[from][to] = Math.abs(total_amt);
                            delete temp[to][from];
                        } else if (total_amt < 0) {
                            delete temp[from][to];
                            temp[to][from] = Math.abs(total_amt);
                        } else {
                            delete temp[from][to];
                            delete temp[to][from];
                        }
                    }
                });
                if (!Object.keys(temp[from]).length) {
                    delete temp[from];
                }
            });
            return temp;
        }
        function calSummaryAll(arr) {
            const group_day_and_sum = sumGroupByDay(arr);

            return Object.entries(group_day_and_sum).reduce((prev, [k, v]) => {
                prev[k] = calSummary(v);

                return prev;
            }, {});
        }

        const summary_all = calSummaryAll(histories);

        res.status(200).send(summary_all);
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'Server Error',
            error: error.message || error,
        });
    }
}
