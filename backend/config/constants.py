
DATE_FORMAT = '%Y-%m-%d'
DATE_TIME_FORMAT = '%Y-%m-%d %H:%M:%S'

USER_STATUS = (
    ('active', 'Active'),
    ('deleted', 'Deleted')
)

USER_ROLE = (
    ('director', 'Director'),
    ('manager', 'Manager'),
    ('leader', 'Leader'),
    ('member', 'Member'),
    ('co-ordinator','Co-Ordinator')
)

USER_TEAM = (
    ('director', 'Director'),
    ('marketer', 'Marketer'),
    ('engineer', 'Engineer'),
    ('hr', 'HR'),
    ('sales', 'Sales'),
    ('admin', 'Admin'),
    ('communication','Communication')
)

USER_BATCH = (
    ('n/a', 'N/A'),
    ('batch1', 'Batch1'),
    ('batch2', 'Batch2'),
    ('batch3', 'Batch3'),
    ('batch4', 'Batch4'),
    ('batch5', 'Batch5'),
    ('batch6', 'Batch6'),
    ('batch7', 'Batch7'),
    ('batch8', 'Batch8'),
    ('under_training', 'Under Training')
)
USER_SHIFT =(
    ('n/a', 'N/A'),
    ('day', 'Day'),
    ('night','Night'),
    ('afternoon','Afternoon')
)

TARGET_STATUS = (
    ('started', 'Started'),
    ('working', 'Working'),
    ('delayed', 'Delayed'),
    ('failed', 'Failed'),
    ('achieved', 'Achieved'),
    ('deleted', 'Deleted')
)

TARGET_TYPE = (
    ('enrollment', 'Enrollment Target'),
    ('attendance', 'Attendance Target'),
    ('progress', 'Progress Target'),
    ('graduation', 'Graduation Target'),
    ('self_dev_project', 'Self Dev Project Target'),
    ('group_dev_project', 'Group Dev Project Target'),
    ('referral', 'Referral Program Target'),
    ('offer', 'Offer Target'),
)

TASK_STATUS = (
    ('assigned', 'assigned'),
    ('onprogress', 'onprogress'),
    ('completed', 'completed'),
    ('delayed', 'Delayed'),
    ('deleted' , 'Deleted'),
)

TASK_TYPE = (
    ('student_support', 'Student Support'),
    ('internal_support', 'Internal Support'),
)

TASK_SUPPORT_TYPE = (
(  'hackerrank',  'Hackerrank' ),
(  'ec',  'EC' ),
(  'cohort',  'Cohort' ),
(  'pair_programming',  'Pair Programming' ),
(  'doubt',  'Doubt' ),
(  'quiz',  'Quiz' ),
(  'group_development',  'Group Development Project' ),
(  'self_development',  'Self Development Project' ),
(  'assignment_check',  'Assignment Check' ),
(  'resume',  'Resume' ),
(  'portfolio',  'Portfolio' ),
(  'job_support_assessment',  'Job Support Assessment' ),
(  'job_support_preperation',  'Job Support Preperation' ),
(  'missing_students',  'Missing Students' ),
(  'review',  'Review' ),
(  'kaggle_project',  'Kaggle Project' ),
(  'content_creation',  'Content creation' ),
(  'internal_hackerrank',  'Hackerrank/LeetCode' ),
(  'internal_quiz',  'Quiz' ),
(  'internal_group_development',  'Group Development' ),
(  'internal_self_development',  'Self Development' ),
(  'training',  'Training' ),
(  'internal_assignment_check',  'Assignment Check' ),
(  'missing_students',  'Missing Students' ),
(  'review',  'Review' ),
(  'client_project',  'Client Project' ),
(  'meeting',  'Meeting' ),
(  'job_support',  'Job Support' ),
(  'brainstorming',  'Brainstorming' ),
(  'beniten_team',  'Beniten Team' ),
(  'internal_task',  'Internal Task' ),
(  'internal_project',  'Internal Project' ),
(  'report',  'Report' ),
(  'self_study', 'Self Study'),
(  'post_job_support', 'Post Job Support')
    
)

TASK_FEEDBACK = (
    ('yes', 'Yes'),
    ('no', 'No'),
)
COMMUNICATION_TYPE = (
    ('critical', 'Critical'),
    ('general', 'General'),
    ('error', 'Error')
    
)

LEAVE_TYPE = (
    ('n/a', 'N/A'),
    ('casual_leave', 'Casual Leave'),
    ('sick_leave', 'Sick Leave'),
    ('maternity_leave', 'Maternity Leave'),
    ('paternity_leave', 'Paternity Leave'),
    ('loss_of_pay_leave', 'Loss of Pay Leave'),
    ('emergency', 'Emergency Leave'),
)

LEAVE_STATUS = (
    ('n/a', 'N/A'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
    ('pending', 'Pending'),
    ('cancelled', 'Cancelled'),

)
APPLIED_TO = (
    ('saravana_kumar', 'Saravana Kumar'),
    ('rajeshwari', 'Rajeshwari'),
    ('viswanath', 'Viswanath'),
    ('shiva_ganesh', 'Shiva Ganesh'),
    ('anshu_kumar', 'Anshu Kumar'),
    ('aishwarya', 'Aishwarya Shetty'),
    ('sajid', 'Sajid Khurshid'),
    ('prasanna', 'Prasanna Akash'),
    ('jithin', 'Jithin Peter'),
    ('nitesh', 'Nitesh Tiwari')

)
