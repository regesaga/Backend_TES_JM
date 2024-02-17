const { Pool } = require('pg');

// Konfigurasi koneksi database
const dbConfig = require ('../config/dbConfig');
const pool = new Pool(dbConfig);
// CRUD Controllers

const getOneEmployee = (request, response) => {
  const id = parseInt(request.params.id);

  // Query to get the employee's information
  pool.query(
    'SELECT * FROM employees WHERE id = $1',
    [id],
    (error, employeeResults) => {
      if (error) {
        console.error('Error retrieving employee:', error);
        response.status(500).send('An error occurred while retrieving employee');
        return;
      }

      if (employeeResults.rows.length === 0) {
        response.status(404).send('Employee not found');
        return;
      }

      const employee = employeeResults.rows[0];

      // Query to get the employee's profile
      pool.query(
        'SELECT * FROM employee_profile WHERE employee_id = $1',
        [id],
        (error, profileResults) => {
          if (error) {
            console.error('Error retrieving profile:', error);
            response.status(500).send('An error occurred while retrieving profile');
            return;
          }

          const profile = profileResults.rows[0];

          // Query to get the employee's family
          pool.query(
            'SELECT * FROM employee_family WHERE employee_id = $1',
            [id],
            (error, familyResults) => {
              if (error) {
                console.error('Error retrieving family:', error);
                response.status(500).send('An error occurred while retrieving family');
                return;
              }

              const family = familyResults.rows;

              // Query to get the employee's education
              pool.query(
                'SELECT * FROM education WHERE employee_id = $1',
                [id],
                (error, educationResults) => {
                  if (error) {
                    console.error('Error retrieving education:', error);
                    response.status(500).send('An error occurred while retrieving education');
                    return;
                  }

                  const education = educationResults.rows;

                  // Combine all the information into a single object
                  const employeeWithRelations = {
                    employee,
                    profile,
                    family,
                    education,
                  };

                  response.status(200).json(employeeWithRelations);
                }
              );
            }
          );
        }
      );
    }
  );
};


const getEmployeeData = async (request, response) => {
  try {
    const employeesQuery = 'SELECT * FROM employees';
    const profileQuery = 'SELECT * FROM employee_profile';
    const familyQuery = 'SELECT * FROM employee_family';
    const educationQuery = 'SELECT * FROM education';

    const employeesResult = await pool.query(employeesQuery);
    const profileResult = await pool.query(profileQuery);
    const familyResult = await pool.query(familyQuery);
    const educationResult = await pool.query(educationQuery);

    const employees = employeesResult.rows;
    const profiles = profileResult.rows;
    const families = familyResult.rows;
    const educations = educationResult.rows;

    const employeeData = employees.map(employee => {
      const profile = profiles.filter(profile => profile.employee_id === employee.id);
      const family = families.filter(family => family.employee_id === employee.id);
      const education = educations.filter(education => education.employee_id === employee.id);

      return {
        employee,
        profile,
        family,
        education
      };
    });

    response.status(200).json(employeeData);
  } catch (error) {
    console.error('Error retrieving employee data:', error);
    response.status(500).send('An error occurred while retrieving employee data');
  }
};



const getAllEmployess = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getEmployeeById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM employees WHERE id = $1', [id], (error, results) => {
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

const createEmployee = (request, response) => {
  const { nik, name, is_active, start_date, end_date } = request.body;
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

  // Validate input
  if (!nik || !name || !start_date) {
    response.status(400).send('Missing required fields');
    return;
  }

  // Validate nik (should be numeric)
  if (!/^\d+$/.test(nik)) {
    response.status(400).send('Invalid nik Use Numeric');
    return;
  }

  pool.query(
    'INSERT INTO employees (nik, name, is_active, start_date, end_date, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [nik, name, is_active, start_date, end_date, createdBy, updatedBy, currentDate, currentDate],
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





const updateEmployee = (request, response) => {
  const id = parseInt(request.params.id);
  const { nik, name, is_active, start_date, end_date, created_by, updated_by, created_at, updated_at } = request.body;
  const currentDate = new Date().toISOString();
  const userId = request.body.user_id; // Mengasumsikan ID pengguna disediakan dalam body permintaan

  let createdBy;
  let updatedBy;

  // Periksa apakah ID pengguna adalah 1 (admin)
  if (userId === 1) {
    createdBy = 'admin';
    updatedBy = 'admin';
  } else {
    createdBy = 'employee';
    updatedBy = 'employee';
  }

  // Validasi input
  if (!nik || !name || !is_active || !start_date || !end_date) {
    response.status(400).send('Semua kolom harus diisi');
    return;
  }

  if (!/^\d+$/.test(nik)) {
    response.status(400).send('Invalid nik Use Numeric');
    return;
  }


  // Melakukan kueri UPDATE ke database
  pool.query(
    'UPDATE employees SET nik = $1, name = $2, is_active = $3, start_date = $4, end_date = $5, created_by = $6, updated_by = $7, created_at = $8, updated_at = $9 WHERE id = $10',
    [nik, name, is_active, start_date, end_date, createdBy, updatedBy, currentDate, currentDate, id],
    (error, results) => {
      if (error) {
        console.error('Error updating employee:', error);
        response.status(500).send('Terjadi kesalahan saat memperbarui karyawan');
        return;
      }
      response.status(200).send(`Karyawan berhasil diperbarui dengan ID: ${id}`);
    }
  );
};


const deleteEmployee = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Employee deleted with ID: ${id}`);
  });
};




module.exports = {
  getAllEmployess,
  getEmployeeById,
  getEmployeeData,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee,
};

