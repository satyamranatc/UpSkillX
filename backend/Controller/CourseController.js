let CourseController=  {
    getAllCourses(req, res) {
      let data = [
        { id: 1, name: "Course 1" },
        { id: 2, name: "Course 2" },
        { id: 3, name: "Course 3" },
      ];
      res.json(data);
    },
}

export default CourseController;
