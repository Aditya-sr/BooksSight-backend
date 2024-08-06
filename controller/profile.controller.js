const db = require("../model");
const Profile = db.Profile;
const jwt = require("jsonwebtoken");
// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    // Validate request body
    const { first_name, last_name, email, profession, bio } = req.body;
    if (!first_name || !last_name || !email) {
      return res.status(400).send({ message: "All fields are required" });
    }
    console.log("Recieved Data", req.body);

    // Create profile objecty
    const profile = {
      first_name,
      last_name,
      email,
      profession,
      bio,
      profilePic: req.file ? req.file.path : null,
    };

    const newProfile = await Profile.create(profile);
    console.log("New profile created:", newProfile);

    res.status(201).send(newProfile);
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating profile:", error);
    res
      .status(500)
      .send({
        message:
          error.message || "Some error occurred while creating the profile.",
      });
  }
};
