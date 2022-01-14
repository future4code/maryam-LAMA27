import { app } from "./controller/app";
import { BandController } from "./controller/BandController";
import { UserController } from "./controller/UserController";

app.get("/", (req, res) => {
    res.send("Olá mundo")
})

const userController = new UserController()
const bandController = new BandController()

app.post("/signup", userController.signup)
app.post("/login", userController.login)
app.post("/register", bandController.createBand)
app.get("/band/:id",  bandController.bandById)