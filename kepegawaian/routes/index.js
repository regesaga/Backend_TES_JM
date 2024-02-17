var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

const dbConfig = require ('../config/dbConfig');
const pool = new Pool(dbConfig);
const employeeController = require('../controllers/Employee');
const employeeProfileController = require('../controllers/Employee_Profile');
const employeeFamilyController = require('../controllers/Employee_Family');
const educationController = require('../controllers/Education');

/* GET home page. */ 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Employees Router */
router.get('/api/employee/detail/:id', employeeController.getOneEmployee);
router.get('/api/employee/detail', employeeController.getEmployeeData);
router.get('/api/employees', employeeController.getAllEmployess);
router.get('/api/employee/:id', employeeController.getEmployeeById);
router.post('/api/employee/create', employeeController.createEmployee);
router.put('/api/employee/:id', employeeController.updateEmployee);
router.delete('/api/employee/:id', employeeController.deleteEmployee);

/* Employee_ProfileRouter */
router.get('/api/employeeProfile', employeeProfileController.getAllEmployeeProfile);
router.get('/api/employeeProfile/:id', employeeProfileController.getEmployeeProfileById);
router.post('/api/employeeProfile/create', employeeProfileController.createEmployeeProfile);
router.put('/api/employeeProfile/:id', employeeProfileController.updateEmployeeProfile);
router.delete('/api/employeeProfile/:id', employeeProfileController.deleteEmployeeProfile);


/* Employee_Family Router */
router.get('/api/employeeFamily', employeeFamilyController.getAllEmployeeFamily);
router.get('/api/employeeFamily/:id', employeeFamilyController.getEmployeeFamilyById);
router.post('/api/employeeFamily/create', employeeFamilyController.createEmployeeFamily);
router.put('/api/employeeFamily/:id', employeeFamilyController.updateEmployeeFamily);
router.delete('/api/employeeFamily/:id', employeeFamilyController.deleteEmployeeFamily);


/* Education Router */
router.get('/api/educations', educationController.getAllEducation);
router.get('/api/education/:id', educationController.getEducationById);
router.post('/api/education/create', educationController.createEducation);
router.put('/api/education/:id', educationController.updateEducation);
router.delete('/api/education/:id', educationController.deleteEducation);




router.get('/report', async (req, res) => {
  const sqlQuery = `
    SELECT 
      employees.id AS employee_id,
      employees.nik,
      employees.name,
      employees.is_active,
      employee_profile.gender,
      CONCAT(DATE_PART('year', AGE(employee_profile.date_of_birth)), ' Years Old') AS age,
      education.name AS school_name,
      education.level,
      COALESCE(
        (
          SELECT STRING_AGG(relation_count, ', dan ')
          FROM (
            SELECT CONCAT(COUNT(employee_family.id), ' ', employee_family.relation_status) AS relation_count
            FROM employee_family
            WHERE employee_family.employee_id = employees.id
            GROUP BY employee_family.relation_status
          ) AS subquery
        ),
        '-'
      ) AS family_data
    FROM 
      employees
      JOIN education ON education.employee_id = employees.id
      LEFT JOIN employee_profile ON employee_profile.employee_id = employees.id;
  `;

  try {
    // Mengeksekusi query SQL
    const { rows } = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;