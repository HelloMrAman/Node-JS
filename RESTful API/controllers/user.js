const User = require("../models/user")

async function handleGetAllUsers (req, res) {
    try {
        const users = await User.find({}); // Fetch all users from MongoDB
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

async function handlegetUserById (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
        return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

async function handleUpdateUserById (req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedUser) {
          return res.status(404).json({ msg: "User not found" });
        }
        res.json({ msg: "User updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

async function handleDeleteUserById (req, res){
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
          return res.status(404).json({ msg: "User not found" });
        }
        res.json({ msg: "User deleted successfully", data: deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

async function handleCreateNewUser (req, res) {
    const { first_name, last_name, email, job_title, gender } = req.body;
    
    if (!first_name || !last_name || !email || !job_title || !gender) {
        return res.status(400).json({ msg: "All fields are required." });
    }
    
    try {
        const newUser = await User.create({
        firstName: first_name,
        lastName: last_name,
        email: email,
        jobTitle: job_title,
        gender: gender,
        });
        res.status(201).json({ msg: "success", data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === 11000) {
        return res.status(400).json({ msg: "Email already exists" });
        }
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


module.exports = {
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById, 
    handleDeleteUserById,
    handleCreateNewUser,
}