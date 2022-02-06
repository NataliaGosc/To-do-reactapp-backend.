const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");

const TodosController = require("../controllers/todos");

// miejsce skladowania plikow ze zdjeciami

const storage = multer.diskStorage({
    destination: function  (req, file, cb) {
    cb(null,"./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(":","_").replace(":","_") + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 5*1024*1024},
    fileFilter: fileFilter
});


//wyciągam ruter
const router = express.Router();

//lista wszystkich przepisów
router.get("/", TodosController.todos_get_schowAll
);

//dodanie nowego przepisu
router.post("/", TodosController.todos_post_newTodo
);

//pokazanie przepisu o podanym id
router.get("/:day", TodosController.todos_get_by_id
);
// zmiana przepisu o podanym id
router.put("/:id", TodosController.todos_put_change
 );
//usuniecie przepisu 
router.delete("/:id", TodosController.todos_delete_removeTodoById 
 );

//  router.delete("/:todoId", checkAuth, TodosController.todos_delete_removeTodoById 
//  );

module.exports = router