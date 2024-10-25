// importar la base de datos
import ConnectToDB from "./models/Database.js";
// importar modelo pokemon
import { PokemonModel } from "./models/PokemonModel.js";

// Conectar a la base de datos
const database = new ConnectToDB()



const userId = window.location.search.slice(4)
const userFile = await database.getFile(userId)
const cart = userFile["cart"]
const balance = userFile["balance"]