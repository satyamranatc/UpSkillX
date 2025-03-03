import Course from "../Models/Course.js"

let CourseController=  {
    getAllCourses(req, res) {

      try
      {
        let data = Course.find({});
        res.json({
          data: data,
          message: "All courses fetched successfully"
        });
      }
      catch(err)
      {
        res.status(500).json({message: err.message});
        return;
      }
     
      
    },

    getAllCourses(req, res) {
      try
      {
        let data = Course.findById(req.params.cid);
        res.json({
          data: data,
          message: "Course fetched successfully"
        });
      }
      catch(err)
      {
        res.status(500).json({message: err.message});
        return;
      }
    },
   async createCourse(req, res) {
      try
      {
        let course = new Course(req.body);
        await course.save();
        res.json({
          data: course,
          message: "Course created successfully"
        });
      }
      catch(err)
      {
        res.status(500).json({message: err.message});
        return;
      }
    },
    async updateCourse(req, res) {
      try
      {
        let course = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
        res.json({
          data: course,
          message: "Course updated successfully"
        });
      }
      catch(err)
      {
        res.status(500).json({message: err.message});
        return;
      }
    },
    async deleteCourse(req, res) {
      try
      {
        let course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
        res.json({
          data: course,
          message: "Course deleted successfully"
        });
      }
      catch(err)
      {
        res.status(500).json({message: err.message});
        return;
      }
    }
}

export default CourseController;
