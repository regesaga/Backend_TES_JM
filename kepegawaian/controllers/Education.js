const { Pool } = require('pg');

// Konfigurasi koneksi database
const dbConfig = require ('../config/dbConfig');
const pool = new Pool(dbConfig);

// CRUD Education
const getAllEducation = (request, response) => {
  pool.query('SELECT * FROM education ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getEducationById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM education WHERE id = $1', [id], (error, results) => {
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

const createEducation = (request, response) => {
  const { employee_id, name, level, description } = request.body;
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

   // Validate required fields
   if (!employee_id || !name || !level || !description) {
    response.status(400).send('All fields are required');
    return;
  }

  pool.query(
    'INSERT INTO education (employee_id, name, level, description, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [employee_id, name, level, description, createdBy, updatedBy, currentDate, currentDate],
    (error, results) => {
      if (error) {
        console.error(error);
        response.status(500).send('Failed to add Education');
      } else {
        response.status(201).send(`Education added with ID: ${results.rows[0].id}`);
      }
    }
  );
};




const updateEducation = (request, response) => {
  const id = parseInt(request.params.id);
  const { employee_id, name, level, description, created_by, updated_by, created_at, updated_at } = request.body;
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

   // Validate required fields
   if (!employee_id || !name || !level || !description) {
    response.status(400).send('All fields are required');
    return;
  }

  
  pool.query(
    'UPDATE education SET employee_id = $1, name = $2, level = $3, description = $4, created_by = $5, updated_by = $6, created_at = $7, updated_at = $8 WHERE id = $9',
    [employee_id, name, level, description, createdBy, updatedBy, currentDate, currentDate, id],
    (error, results) => {
      if (error) {
        console.error('Error updating Education:', error);
        response.status(500).send('An error occurred while updating the Education');
        return;
      }
      response.status(200).send(`Education modified with ID: ${id}`);
    }
  );
};
const deleteEducation = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM education WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Education deleted with ID: ${id}`);
  });
};




module.exports = {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
