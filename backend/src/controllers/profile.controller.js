import User from '../models/user.model.js'; // Use default import if you exported default

const profileInformation = async (req, res) => {
    const userId = req.user;
    console.log("Profile information request received from user: ", userId);
    try {
        const user = await User.findById(userId).select("-password -__v");
        if (!user) {
            console.log("User not found with ID:", userId);
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }
        console.log("User profile information retrieved successfully:", user);
        return res.status(200).json({
            message: "User profile information retrieved successfully.",
            user: user,
            success: true
        });
    } catch (error) {
        console.log("Error in profileInformation controller:", error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};

export { profileInformation };