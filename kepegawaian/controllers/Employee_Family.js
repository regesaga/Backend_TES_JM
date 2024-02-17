const { Pool } = require('pg');

// Konfigurasi koneksi database
const dbConfig = require ('../config/dbConfig');
const pool = new Pool(dbConfig);
// CRUD Controllers
const getAllEmployeeFamily = (request, response) => {
  pool.query('SELECT * FROM employee_family ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getEmployeeFamilyById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM employee_family WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


const setTimestamps = (req, res, next) => {
  const currentDate = new Date().toISOString();
  req.body.created_at = currentDate;
  req.body.updated_at = currentDate;
  next();
};

const createEmployeeFamily = (request, response) => {
  const { employee_id,name,identifier,job,place_of_birth,date_of_birth,religion,is_life,is_divorced,relation_status,} = request.body;
  const currentDate = new Date().toISOString();
  const userId = request.body.user_id; // Assuming the user ID is provided in the request body

  let createdBy;
  let updatedBy;

  // Check if the user ID is 1 (admin)
  if (userId === 1) {
    createdBy = 'admin';
    updatedBy = 'admin';
  } else {
    createdBy = 'employee';
    updatedBy = 'employee';
  }

   // Validation logic
   if (!employee_id || !name || !job || !place_of_birth || !date_of_birth || !religion || !is_life || !is_divorced || !relation_status) {
    response.status(400).send('All fields are required');
    return;
  }

  pool.query(
    'INSERT INTO employee_family (employee_id, name, identifier, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
    [employee_id, name, identifier, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, createdBy, updatedBy, currentDate, currentDate],
    (error, results) => {
      if (error) {
        console.error(error);
        response.status(500).send('Failed to add employee');
      } else {
        response.status(201).send(`Employee added with ID: ${results.rows[0].id}`);
      }
    }
  );
};




const updateEmployeeFamily = (request, response) => {
  const id = parseInt(request.params.id);
  const { employee_id,name,identifier,job,place_of_birth,date_of_birth,religion,is_life,is_divorced,relation_status} = request.body;
  const currentDate = new Date().toISOString();
  const userId = request.body.user_id; // Assuming the user ID is provided in the request body

  let createdBy;
  let updatedBy;

  // Check if the user ID is 1 (admin)
  if (userId === 1) {
    createdBy = 'admin';
    updatedBy = 'admin';
  } else {
    createdBy = 'employee';
    updatedBy = 'employee';
  }

   // Validation logic
   if (!employee_id || !name || !job || !place_of_birth || !date_of_birth || !religion || !is_life || !is_divorced || !relation_status) {
    response.status(400).send('All fields are required');
    return;
  }

  pool.query(
    'UPDATE employee_family SET employee_id = $1, name = $2, job = $3, place_of_birth = $4, date_of_birth = $5, religion = $6, is_life = $7, is_divorced = $8, relation_status = $9, created_by = $10, updated_by = $11, created_at = $12, updated_at = $13 WHERE id = $14',
    [employee_id, name, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, createdBy, updatedBy, currentDate, currentDate, id],
    (error, results) => {
      if (error) {
        console.error('Error updating employee:', error);
        response.status(500).send('An error occurred while updating the employee Family');
        return;
      }
      response.status(200).send(`Employee Family modified with ID: ${id}`);
    }
  );
};

const deleteEmployeeFamily = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM employee_family WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Employee Family deleted with ID: ${id}`);
  });
};




module.exports = {
  getAllEmployeeFamily,
  getEmployeeFamilyById,
  createEmployeeFamily,
  updateEmployeeFamily,
  deleteEmployeeFamily,
};

