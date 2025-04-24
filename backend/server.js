const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize bcrypt salt rounds
const SALT_ROUNDS = 10;

// Function to hash password
const hashPassword = (password) => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};

// Dummy user data with properly hashed passwords
const users = [
  {
    id: 1,
    name: 'Askar Zhumagaliyev',
    email: 'admin@example.com',
    password: hashPassword('admin123'),
    role: 'admin'
  },
  {
    id: 2,
    name: 'Yerlan Karin',
    email: 'yerlan.supervisor@example.com',
    password: hashPassword('supervisor123'),
    role: 'supervisor',
    employees: [3, 4],
    reports: [
      { id: 1, date: '2024-01-15', type: 'Performance Review', content: 'Team performance analysis for Q4 2023' },
      { id: 2, date: '2024-02-01', type: 'Goals Review', content: 'Department goals progress update' }
    ]
  },
  {
    id: 3,
    name: 'Aizhan Yessim',
    email: 'aizhan@example.com',
    password: hashPassword('employee123'),
    role: 'employee',
    supervisorId: 2,
    reports: [
      { id: 3, date: '2024-01-10', type: 'Monthly Report', content: 'Project milestones achieved in December' },
      { id: 4, date: '2024-02-05', type: 'Skills Assessment', content: 'Technical skills development progress' }
    ],
    goals: [
      { id: 1, type: 'Development', title: 'Learn React Advanced', deadline: '2024-06-30', progress: 60 },
      { id: 2, type: 'Performance', title: 'Improve Code Quality', deadline: '2024-03-31', progress: 75 }
    ]
  },
  {
    id: 4,
    name: 'Bolat Nurzhanov',
    email: 'bolat@example.com',
    password: hashPassword('employee123'),
    role: 'employee',
    supervisorId: 2,
    reports: [
      { id: 5, date: '2024-01-20', type: 'Project Report', content: 'Backend optimization results' },
      { id: 6, date: '2024-02-10', type: 'Performance Review', content: 'Q1 2024 objectives progress' }
    ],
    goals: [
      { id: 3, type: 'Project', title: 'API Documentation', deadline: '2024-04-15', progress: 40 },
      { id: 4, type: 'Team', title: 'Mentoring Junior Developers', deadline: '2024-05-31', progress: 80 }
    ]
  },
  {
    id: 5,
    name: 'Saule Tleubayeva',
    email: 'saule.supervisor@example.com',
    password: hashPassword('supervisor123'),
    role: 'supervisor',
    employees: [6, 7],
    reports: [
      { id: 7, date: '2024-01-25', type: 'Department Review', content: 'Frontend team performance analysis' },
      { id: 8, date: '2024-02-15', type: 'Resource Planning', content: 'Q2 2024 resource allocation plan' }
    ]
  },
  {
    id: 6,
    name: 'Chingiz Omarov',
    email: 'chingiz@example.com',
    password: hashPassword('employee123'),
    role: 'employee',
    supervisorId: 5,
    reports: [
      { id: 9, date: '2024-01-30', type: 'Weekly Report', content: 'UI component library progress' },
      { id: 10, date: '2024-02-20', type: 'Skills Update', content: 'Design system implementation learnings' }
    ],
    goals: [
      { id: 5, type: 'Design', title: 'UI/UX Certification', deadline: '2024-07-31', progress: 30 },
      { id: 6, type: 'Development', title: 'Component Library', deadline: '2024-04-30', progress: 65 }
    ]
  },
  {
    id: 7,
    name: 'Dana Zhunussova',
    email: 'dana@example.com',
    password: hashPassword('employee123'),
    role: 'employee',
    supervisorId: 5,
    reports: [
      { id: 11, date: '2024-02-01', type: 'Project Status', content: 'Mobile app development progress' },
      { id: 12, date: '2024-02-25', type: 'Training Report', content: 'React Native workshop summary' }
    ],
    goals: [
      { id: 7, type: 'Mobile', title: 'React Native Expertise', deadline: '2024-08-31', progress: 45 },
      { id: 8, type: 'Leadership', title: 'Team Lead Training', deadline: '2024-06-30', progress: 55 }
    ]
  }
];

// Helper function to get user's employees
const getUserEmployees = (userId) => {
  const user = users.find(u => u.id === userId);
  if (user && user.role === 'supervisor') {
    return users.filter(u => user.employees.includes(u.id));
  }
  return [];
};

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Verify password using bcrypt
  const isValidPassword = bcrypt.compareSync(password, user.password);
  
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    'your-secret-key',
    { expiresIn: '1h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user profile endpoint
app.get('/api/users/profile', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const response = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  if (user.role === 'supervisor') {
    response.employees = getUserEmployees(user.id);
  } else if (user.role === 'employee') {
    const supervisor = users.find(u => u.id === user.supervisorId);
    if (supervisor) {
      response.supervisor = {
        id: supervisor.id,
        name: supervisor.name,
        email: supervisor.email
      };
    }
  }

  res.json(response);
});

// Get team members (for supervisors)
app.get('/api/users/team', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user || user.role !== 'supervisor') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const employees = getUserEmployees(user.id);
  res.json(employees);
});

// Get organization structure (for admin)
app.get('/api/users/organization', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const organization = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    supervisorId: u.supervisorId,
    employees: u.role === 'supervisor' ? u.employees : undefined
  }));

  res.json(organization);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});