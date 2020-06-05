const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
const db = mongoose.connection;

db.on("error", function (err) {
  console.error(err.message);
});

db.once("open", function () {
  console.info("Connected to MongoDB!");
});

// Schemas

const Schema = mongoose.Schema;

const LessonSchema = {
  name: { type: String, required: true },
  description: { type: String },
  additionals: { type: [String] },
};

const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  lessons: { type: [LessonSchema] },
});

const CourseModel = mongoose.model("courses", CourseSchema);

// Add example data
CourseModel.findById("5ed78587e02e620ba0bad669", (err, course) => {
  if (!err && !course) {
    const course = new CourseModel({
      _id: "5ed78587e02e620ba0bad669",
      name: "Web-разработчик на Python",
      description:
        "Вы получите практический опыт и углубленные навыки бэкенд-разработки на Python и Django, а также освоите фронтенд-разработку с нуля на ReactJS и в Figma.",
      lessons: [
        {
          name: "Тема 1: Знакомство с курсом.",
          description:
            "Научимся правильно декомпозировать код, именовать переменные и функции, оценивать сложность кода и использовать статические анализаторы. ",
          additionals: ["приложение 1", "приложение 2"],
        },
        { name: "Тема 2: Модули, библиотеки, пакеты" },
        { name: "Тема 3: Введение в docker, docker-compose" },
      ],
    });

    course.save()
  }
});

module.exports = {
  CourseModel,
};
