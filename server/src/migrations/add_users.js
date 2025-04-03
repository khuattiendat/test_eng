const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("../configs/connectDB");
const bcrypt = require("bcrypt");
connectDB().then(() => {
    const UserSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        phone: String,
        role: String,
    });

    const User = mongoose.model("User", UserSchema);

    async function runMigration() {
        try {
            await User.create([
                {
                    name: "admin", email: "khuattiendat2002@gmail.com",
                    password: bcrypt.hashSync("123456", 10),
                    phone: "0383878902", role: "admin"
                },
            ]);
            console.log("Migration completed successfully.");
        } catch (error) {
            console.error("Migration failed:", error);
        } finally {
            await mongoose.connection.close();
        }
    }

    runMigration();
});



