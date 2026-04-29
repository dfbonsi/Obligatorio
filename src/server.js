import "dotenv/config";
import app from "./app.js";

const puerto = process.env.PORT || 3001;
app.listen(puerto, () => console.log("Escuchando en puerto:", puerto));
