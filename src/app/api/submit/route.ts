// pages/api/submit.js
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const response = await fetch("http://localhost:5001/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: req.body.prompt,
                    img: req.body.img,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                res.status(200).json({ result: data.result });
            } else {
                res.status(response.status).json({ error: data.error });
            }
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
