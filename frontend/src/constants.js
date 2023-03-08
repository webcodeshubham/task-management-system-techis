

export const adminStatusOptions = [
    { key: 'active', value: 'Active' },
    { key: 'deleted', value: 'Deleted' }
];

export const adminRoleOptions = [
    { key: 'director', value: 'Director' },
    { key: 'manager', value: 'Manager' },
    { key: 'leader', value: 'Leader' },
    { key: 'member', value: 'Member' }
];

export const adminTeamOptions = [
    { key: 'director', value: 'Director' },
    { key: 'marketer', value: 'Marketer' },
    { key: 'engineer', value: 'Engineer' },
    { key: 'hr', value: 'HR' },
    { key: 'sales', value: 'Sales' },
    { key: 'admin', value: 'Admin' },
    { key: 'communication', value: 'Communication' },
];

export const adminBatchOptions = [
    {key: 'n/a', value: 'N/A'},
    {key: 'batch1', value: 'Batch1'},
    {key: 'batch2', value: 'Batch2'},
    {key: 'batch3', value: 'Batch3'},
    {key: 'batch4', value: 'Batch4'},
    {key: 'batch5', value: 'Batch5'},
    {key: 'batch6', value: 'Batch6'},
    {key: 'batch7', value: 'Batch7'},
    {key: 'batch8', value: 'Batch8'},
    {key: 'under_training', value: 'Under Training'}

];
export const adminShiftOptions = [
    {key: 'n/a', value: 'N/A'},
    {key: 'day', value: 'Day'},
    {key: 'night', value: 'Night'},
    {key: 'afternoon', value: "Afternoon"},

]

// Task
export const colorCode = {
    grey: '#566573',
    orange: '#ff4f00',
    brown: '#C28416',
    waterblue:'#d4f1f9',
    red: '#FF0E03',
    green: '#008000',
    blue: '#2616C2',
    yellow: '#FFFF00',
    purple:'#800080',
    default: '#ff4f00',
};

export const taskStatusOption = [
    { key: 'assigned', value: 'Assigned' },
    { key: 'onprogress', value: 'Onprogress' },
    { key: 'completed', value: 'Completed' },
    {key: 'delayed', value: 'Delayed'},
    {key: 'deleted' , value: 'Deleted'},
]

export const taskTypeOption = [
    { key: 'student_support', value: 'Student support' },
    { key: 'internal_support', value: 'Internal Support' }
];
export const taskStudentSupportOptions = [
    { key: 'hackerrank', value: 'Hackerrank' },
    { key: 'ec', value: 'EC' },
    { key: 'cohort', value: 'Cohort' },
    { key: 'pair_programming', value: 'Pair Programming' },
    { key: 'doubt', value: 'Doubt' },
    { key: 'quiz', value: 'Quiz' },
    { key: 'group_development', value: 'Group Development Project' },
    { key: 'self_development', value: 'Self Development Project' },
    { key: 'assignment_check', value: 'Assignment Check' },
    { key: 'resume', value: 'Resume' },
    { key: 'portfolio', value: 'Portfolio' },
    { key: 'job_support_assessment', value: 'Job Support Assessment' },
    { key: 'job_support_preperation', value: 'Job Support Preperation' },
    { key: 'missing_students', value: 'Missing Students' },
    { key: 'review', value: 'Review' },
    { key: 'kaggle_project', value: 'Kaggle Project' },
    { key: 'content_creation', value: 'Content creation' },
];
export const taskInternalSupportOptions = [
    { key: 'internal_hackerrank', value: 'Hackerrank/LeetCode' },
    { key: 'internal_quiz', value: 'Quiz' },
    { key: 'internal_group_development', value: 'Group Development' },
    { key: 'internal_self_development', value: 'Self Development' },
    { key: 'training', value: 'Training' },
    { key: 'internal_assignment_check', value: 'Assignment Check' },
    { key: 'missing_students', value: 'Missing Students' },
    { key: 'review', value: 'Review' },
    { key: 'client_project', value: 'Client Project' },
    { key: 'meeting', value: 'Meeting' },
    { key: 'job_support', value: 'Job Support' },
    { key: 'brainstorming', value: 'Brainstorming' },
    { key: 'beniten_team', value: 'Beniten Team' },
    { key: 'internal_task', value: 'Internal Task' },
    { key: 'internal_project', value: 'Internal Project' },
    { key: 'report', value: 'Report' },
    { key: 'self_study', value: 'Self Study' },
    { key: 'post_job_support', value: 'Post Job Support' },

];

export const taskSessionFeedbackOption = [
    { key: 'yes', value: 'Yes' },
    { key: 'no', value: 'No' }
]
export const taskStatusColorOptions = [
    { key: 'assigned', value: colorCode.blue },
    { key: 'onprogress', value: colorCode.purple },
    { key: 'completed', value: colorCode.green },
    { key: 'delayed', value: colorCode.red },
];
//Target

export const targetStatusOption = [
    { key: 'started', value: 'Started' },
    { key: 'working', value: 'Working' },
    { key: 'delayed', value: 'Delayed' },
    { key: 'failed', value: 'Failed' },
    { key: 'achieved', value: 'Achieved' },
    { key: 'deleted', value: 'Deleted' },
]

export const targetTypeOption = [
    { key: 'enrollment', value: 'Enrollment Target' },
    { key: 'attendance', value: 'Attendance Target' },
    { key: 'progress', value: 'Progress Target' },
    { key: 'graduation', value: 'Graduation Target' },
    { key: 'self_dev_project', value: 'Self Dev Project Target' },
    { key: 'group_dev_project', value: 'Group Dev Project Target' },
    { key: 'referral', value: 'Referral Program Target' },
    { key: 'offer', value: 'Offer Target' },
]
export const targetStatusColorOptions = [
    { key: 'started', value: colorCode.green },
    { key: 'working', value: colorCode.blue },
    { key: 'delayed', value:colorCode.orange },
    { key: 'failed', value: colorCode.red},
    { key: 'achieved', value: colorCode.green},
];

export const scoreOption =[
    {key:'5', value:'5-Excellent'},
    {key:'4.5', value:'4.5-Very Good'},
    {key:'4', value:'4-Good'},
    {key:'3.5', value:'3.5-Average'},
    {key:'3', value:'3-Poor'},
    {key:'2.5', value:'2.5-Very Poor'},
];

export const errorScoreOptions =[
    {key:'0', value:'No Mistake'},
    {key:'1', value:'1 Mistake'},
    {key:'2', value:'2 Mistakes'},
    {key:'3', value:'3 Mistakes'},
    {key:'4', value:'4 Mistakes'},
    {key:'5', value:'5 Mistakes'}
];

export const communicationTypeOption = [
    { key: 'critical', value: 'Critical' },
    { key: 'general', value: 'General'},
    { key: 'error', value:'Error' }
];

export const leaveType = [
    { key: 'n/a', value: 'N/A' },
    { key: 'casual_leave', value: 'Casual Leave' },
    { key: 'sick_leave', value: 'Sick Leave' },
    { key: 'maternity_leave', value: 'Maternity Leave' },
    { key: 'paternity_leave' , value: 'Paternity Leave' },
    { key: 'loss_of_pay_leave' , value: 'Loss of Pay Leave' },
    { key: 'emergency' , value: 'Emergency Leave'}
]

export const leaveStatus = [
    { key: 'n/a', value: 'N/A' },
    { key: 'approved', value: 'Approved' },
    { key: 'rejected', value: 'Rejected' },
    { key: 'pending', value: 'Pending' },
    { key: 'cancelled' , value: 'Cancelled' }
]

export const leaveAppliedTo = [
    { key: 'saravana_kumar', value: 'Saravana Kumar' },
    { key: 'rajeshwari', value: 'Rajeshwari' },
    { key: 'viswanath', value: 'Viswanath' },
    { key: 'shiva_ganesh', value: 'Shiva Ganesh' },
    { key: 'anshu_kumar', value: 'Anshu Kumar' },
    { key: 'aishwarya', value: 'Aishwarya Shetty' },
    { key: 'sajid', value: 'Sajid Khurshid' },
    { key: 'prasanna', value: 'Prasanna Akash' },
    { key: 'jithin', value: 'Jithin Peter' },
    { key: 'nitesh', value: 'Nitesh Tiwari' }
]

