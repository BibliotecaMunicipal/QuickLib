import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "client",
        validate: {
          validator: function (value) {
            return value === "client" || value === "admin";
          },
          message: "Role must be client or admin"
        }
      },
      status: {
        type: Boolean,
        default: true,
      },
});

export default mongoose.model("User", userSchema);
