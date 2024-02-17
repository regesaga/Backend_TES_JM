const { Pool } = require('pg');

// Konfigurasi koneksi database
const dbConfig = require ('../config/dbConfig');
const pool = new Pool(dbConfig);
// CRUD Controllers
const getAllEmployeeProfile = (request, response) => {
  pool.query('SELECT * FROM employee_profile ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


  


const getEmployeeProfileById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM employee_profile WHERE id = $1', [id], (error, results) => {
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

const createEmployeeProfile = (request, response) => {
    const { employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict } = request.body;
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
  
    if (!employee_id || !place_of_birth || !date_of_birth || !gender || is_married === undefined || !prof_pict) {
      response.status(400).send('All fields are required');
      return;
    }
  
    // Check if the employee_id already exists
    pool.query(
      'SELECT * FROM employee_profile WHERE employee_id = $1',
      [employee_id],
      (error, results) => {
        if (error) {
          console.error(error);
          response.status(500).send('Failed to check employee');
        } else {
          if (results.rows.length > 0) {
            response.status(409).send('Profile Employee already exists');
          } else {
            // Insert the employee profile into the database
            pool.query(
              'INSERT INTO employee_profile (employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
              [employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, createdBy, updatedBy, currentDate, currentDate],
              (error, results) => {
                if (error) {
                  console.error(error);
                  response.status(500).send('Failed to add employee');
                } else {
                  response.status(201).send(`Employee added with ID: ${results.rows[0].id}`);
                }
              }
            );
          }
        }
      }
    );
  };
  




const updateEmployeeProfile = (request, response) => {
  const id = parseInt(request.params.id);
  const { employee_id ,place_of_birth ,date_of_birth ,gender,is_married ,prof_pict } = request.body;
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
  if (!employee_id || !place_of_birth || !date_of_birth || !gender || is_married === undefined || !prof_pict) {
    response.status(400).send('All fields are required');
    return;
  }

  pool.query(
    'UPDATE employee_profile SET employee_id = $1, place_of_birth = $2, date_of_birth = $3, gender = $4, is_married = $5, prof_pict = $6, created_by = $7, updated_by = $8, created_at = $9, updated_at = $10 WHERE id = $11',
    [employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, createdBy, updatedBy, currentDate, currentDate, id],
    (error, results) => {
      if (error) {
        console.error('Error updating employee:', error);
        response.status(500).send('An error occurred while updating the employee Profile');
        return;
      }
      response.status(200).send(`Employee modified with ID: ${id}`);
    }
  );
};

const deleteEmployeeProfile = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM employee_profile WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Employee deleted with ID: ${id}`);
  });
};




module.exports = {
  getAllEmployeeProfile,
  getEmployeeProfileById,
  createEmployeeProfile,
  updateEmployeeProfile,
  deleteEmployeeProfile,
};

