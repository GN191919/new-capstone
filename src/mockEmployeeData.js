// Shared mock employee data and utility functions

let mockEmployees = [
    {
        id: 1,
        name: 'John Smith',
        title: 'Senior Developer',
        department: 'Engineering',
        status: 'Active',
        hasOverdueReports: false,
        goalProgress: 75,
        lastCheckIn: '2023-10-15T10:30:00',
        nextDueDate: '2023-11-15T23:59:59'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        title: 'Product Manager',
        department: 'Product',
        status: 'On Vacation',
        hasOverdueReports: false,
        goalProgress: 60,
        lastCheckIn: '2023-10-10T14:45:00',
        nextDueDate: '2023-11-10T23:59:59'
    },
    {
        id: 3,
        name: 'Michael Chen',
        title: 'UX Designer',
        department: 'Design',
        status: 'Overdue',
        hasOverdueReports: true,
        goalProgress: 30,
        lastCheckIn: '2023-09-20T09:15:00',
        nextDueDate: '2023-10-20T23:59:59'
    },
    {
        id: 4,
        name: 'Emily Rodriguez',
        title: 'QA Engineer',
        department: 'Quality Assurance',
        status: 'Active',
        hasOverdueReports: false,
        goalProgress: 90,
        lastCheckIn: '2023-10-18T16:30:00',
        nextDueDate: '2023-11-18T23:59:59'
    },
    {
        id: 5,
        name: 'David Kim',
        title: 'Frontend Developer',
        department: 'Engineering',
        status: 'Active',
        hasOverdueReports: false,
        goalProgress: 45,
        lastCheckIn: '2023-10-12T11:00:00',
        nextDueDate: '2023-11-12T23:59:59'
    },
    {
        id: 6,
        name: 'Lisa Wang',
        title: 'Backend Developer',
        department: 'Engineering',
        status: 'Active',
        hasOverdueReports: true,
        goalProgress: 55,
        lastCheckIn: '2023-10-14T13:20:00',
        nextDueDate: '2023-11-14T23:59:59'
    }
];

export function getMockEmployees() {
    return mockEmployees;
}

export function addMockEmployee(employee) {
    const newId = mockEmployees.length > 0 ? Math.max(...mockEmployees.map(e => e.id)) + 1 : 1;
    mockEmployees.push({
        id: newId,
        name: `${employee.firstName} ${employee.lastName}`,
        title: employee.title,
        department: employee.department,
        status: 'Active',
        hasOverdueReports: false,
        goalProgress: 0,
        lastCheckIn: new Date().toISOString(),
        nextDueDate: ''
    });
}