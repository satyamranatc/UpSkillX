import Enrolled from "../Models/Enrolled.js";

const EnrolledController = {
    async getEnrolls(req, res) {
        try {
            let { uid } = req.params;
            console.log("Fetching enrollments for user:", uid);

            let allEnrolls = await Enrolled.find({ userId: uid })
                .populate("userId courseId"); // Populating user and course details

            console.log(allEnrolls);
            return res.json(allEnrolls);
        } catch (error) {
            console.error("Error fetching enrollments:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    },

    async createEnroll(req, res) {
        try {
            let { userId, courseId } = req.body;
            console.log("New enrollment request:", userId, courseId);

            // Prevent duplicate enrollments
            let existingEnroll = await Enrolled.findOne({ userId, courseId });
            if (existingEnroll) {
                return res.status(400).json({ message: "User already enrolled in this course" });
            }

            let newEnroll = new Enrolled({
                userId,
                courseId
            });

            await newEnroll.save();
            res.status(201).json({ message: "Enrollment successful" });

        } catch (error) {
            console.error("Error creating enrollment:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    }
};

export default EnrolledController;
