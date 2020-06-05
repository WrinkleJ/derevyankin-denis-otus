var express = require("express");
var router = express.Router();

const CourseModel = require("../db/mongoose").CourseModel;

router.get("/courses/:courseId/lessons/:lessonId", (req, res, next) => {
  const { courseId, lessonId } = req.params;
  return CourseModel.findById(courseId, (err, course) => {
    if (!err && course) {
      const lesson = course.lessons[lessonId];
      if (!lesson) {
        return next();
      }
      res.render("lesson", lesson.toObject());
    } else if (!course) {
      return next();
    } else {
      res.statusCode = 500;
      return res.send({ error: err.message });
    }
  });
});

router.get("/courses/:id", (req, res, next) => {
  const { id } = req.params;
  return CourseModel.findById(id, (err, course) => {
    if (!err && course) {
      res.render("course", { ...course.toObject(), id });
    } else {
      if (!course) {
        return next();
      } else {
        res.statusCode = 500;
        return res.send({ error: err.message });
      }
    }
  });
});

router.get("/courses", (req, res) => {
  CourseModel.find((err, courses) => {
    if (!err) {
      res.render("courses", { courses });
    } else {
      res.statusCode = 500;
      return res.send({ error: err.message });
    }
  });
});

module.exports = router;
