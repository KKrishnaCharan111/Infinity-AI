// =========================================================================
// DATA REPOSITORY: FET JAIN UNIVERSITY DIGITAL PORTAL (ECE HUB)
// =========================================================================

const studentList = [
  { sr: 1, usn: '25BTREC001', name: 'A PREETHAM', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 2, usn: '25BTREC002', name: 'AARTHI D', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 3, usn: '25BTREC003', name: 'AKSHATHA K', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 4, usn: '25BTREC004', name: 'ANUSRI N', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 5, usn: '25BTREC005', name: 'ASHISH CHOUDHARY', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 6, usn: '25BTREC006', name: 'ASHWANTH V', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 7, usn: '25BTREC007', name: 'CHENNUBOYANA GOVARDHAN', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 8, usn: '25BTREC008', name: 'CHINMAYA ROUL', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 9, usn: '25BTREC009', name: 'CHINMAYI V', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 10, usn: '25BTREC010', name: 'DAKSHITA S', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 11, usn: '25BTREC011', name: 'DANDU VENKATA GOVARDHAN REDDY', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 12, usn: '25BTREC012', name: 'DHIRAJ D V', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 13, usn: '25BTREC013', name: 'GANESH GANAPATI HEGDE', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 14, usn: '25BTREC014', name: 'GANIGA PUSHKAL', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 15, usn: '25BTREC015', name: 'HARSHAN V', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 16, usn: '25BTREC016', name: 'J SANTHOSH', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 17, usn: '25BTREC017', name: 'JAGANNATH E K', type: 'regular', remark: '', mentor: 'Dr. B Dharani' },
  { sr: 18, usn: '25BTREC018', name: 'JEEVITHESH V R', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 19, usn: '25BTREC019', name: 'KARTHIK Y', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 20, usn: '25BTREC020', name: 'KUMMUSANI KRISHNA CHARAN', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 21, usn: '25BTREC021', name: 'LINGESH B', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 22, usn: '25BTREC022', name: 'MALAPATI VARSHITH REDDY', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 23, usn: '25BTREC023', name: 'MAYANK M C', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 24, usn: '25BTREC024', name: 'MUKKARA PRIYATHAM RAMI REDDY', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 25, usn: '25BTREC025', name: 'MURAMREDDY VENKATA GANGA HRUSHIKESH REDDY', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 26, usn: '25BTREC026', name: 'N MADHAN', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 27, usn: '25BTREC027', name: 'NANDIPALLI VAMSI KRISHNA', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 28, usn: '25BTREC028', name: 'NARESH KUMAR M', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 29, usn: '25BTREC029', name: 'NITHIN M B', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 30, usn: '25BTREC030', name: 'NITHIN R', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 31, usn: '25BTREC031', name: 'POOLA SAI LAHARI', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 32, usn: '25BTREC032', name: 'PRAFULL P INDI', type: 'regular', remark: '', mentor: 'Mr. Hari Krishna Moorthy' },
  { sr: 33, usn: '25BTREC033', name: 'PRAJWAL H M', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 34, usn: '25BTREC034', name: 'PRITHVI RAJ', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 35, usn: '25BTREC035', name: 'REEVE STEPHEN', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 36, usn: '25BTREC036', name: 'S ABDUL HAMEED', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 37, usn: '25BTREC037', name: 'S DHANUSH BABU', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 38, usn: '25BTREC038', name: 'S GOUTHAM', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 39, usn: '25BTREC039', name: 'S ILAVENIL', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 40, usn: '25BTREC040', name: 'SATHYAJIT DINESH', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 41, usn: '25BTREC041', name: 'SHIVA DHARSAN R V', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 42, usn: '25BTREC042', name: 'SHUBHRA MOHANTY', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 43, usn: '25BTREC043', name: 'SOUMYA DESHMUKH', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 44, usn: '25BTREC044', name: 'SOUMYADEEP DAS', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 45, usn: '25BTREC045', name: 'SPOORTHI', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 46, usn: '25BTREC046', name: 'SRI RAM K G', type: 'tc', remark: 'TC Issued', mentor: 'Dr. Manjula T R' },
  { sr: 47, usn: '25BTREC047', name: 'THANESHGHA M', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 48, usn: '25BTREC048', name: 'THARUN T', type: 'regular', remark: '', mentor: 'Dr. Manjula T R' },
  { sr: 49, usn: '25BTREC049', name: 'THIMMIREDDY PUNEETH REDDY', type: 'regular', remark: '', mentor: 'Prof. Pramod R' },
  { sr: 50, usn: '25BTREC050', name: 'VAISHAK S', type: 'regular', remark: '', mentor: 'Prof. Pramod R' },
  { sr: 51, usn: '25BTREC051', name: 'VEERABOMMALA KHYATHI SAI', type: 'regular', remark: '', mentor: 'Prof. Pramod R' },
  { sr: 52, usn: '25BTREC052', name: 'VISHAAL MANI M', type: 'regular', remark: '', mentor: 'Prof. Pramod R' },
  { sr: 53, usn: '25BTREC053', name: 'YEDDULA NEHA REDDY', type: 'regular', remark: '', mentor: 'Prof. Pramod R' },
  { sr: 54, usn: '25BTREC054', name: 'GOKUL DEEPU K', type: 'regular', remark: '', mentor: 'Prof. Pramod R' },
  { sr: 55, usn: '25BTREC055', name: 'SHOMYA SNEHA CHOWDHURY', type: 'regular', remark: '', mentor: 'Prof. Pramod R' },
  { sr: 56, usn: 'JUUG26LBTECH10104', name: 'LIKHITH KUMAR K P', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 57, usn: 'JUUG26LBTECH11233', name: 'VAGGA GOWTHAM', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 58, usn: 'JUUG26LBTECH24837', name: 'K J HOMESH', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 59, usn: 'JUUG26LBTECH29648', name: 'G RAHITHYA', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 60, usn: 'JUUG26LBTECH13963', name: 'SHIVA RAJ', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 61, usn: 'JUUG26LBTECH12609', name: 'AASTHA SINGH', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 62, usn: 'JUUG26LBTECH14343', name: 'NAVEEN KUMAR M', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 63, usn: 'JUUG26LBTECH30627', name: 'CHINMAYA HAJERI', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 64, usn: 'JUUG26LBTECH20805', name: 'T VARSHIK', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' },
  { sr: 65, usn: 'JUUG26LBTECH17744', name: 'PIYUSH BHUSHAN', type: 'lateral', remark: 'Lateral Entry', mentor: 'Prof. Pramod R' }
];

const deanStudentAffairs = {
  name: 'Dr. Benaka Prasad',
  role: 'Deputy Dean of Student Affairs',
  initials: 'DS',
  phone: '919986982138',
  formattedPhone: '+91 99869 82138',
  scope: 'All Student Welfare, Grievances, Anti-Ragging & Campus Affairs'
};

const mentorList = [
  { name: 'Prof. Chethan G S', role: 'Class Teacher & Section Incharge', batchScope: 'Whole Class (ECE 3rd Sem)', email: 'gs.chethana@jainuniversity.ac.in', phone: '919164446170', formattedPhone: '+91 91644 46170', icon: 'fa-user-tie', themeColor: 'from-blue-600 to-indigo-600', badge: 'bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200' },
  { name: 'Dr. B Dharani', designation: 'Asst. Professor', role: 'Faculty Mentor', batchScope: 'Roll No 1 to 17 (A Preetham to Jagannath E K)', email: 'buddha.dharani@jainuniversity.ac.in', phone: '919160161822', formattedPhone: '+91 91601 61822', icon: 'fa-chalkboard-user', themeColor: 'from-amber-500 to-yellow-600', badge: 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200' },
  { name: 'Mr. Hari Krishna Moorthy', designation: 'Assistant Professor', role: 'Faculty Mentor', batchScope: 'Roll No 18 to 32 (Jeevithesh V R to Prafull P Indi)', email: 'hari.moorthy@jainuniversity.ac.in', phone: '919986768390', formattedPhone: '+91 99867 68390', icon: 'fa-lightbulb', themeColor: 'from-cyan-600 to-blue-600', badge: 'bg-cyan-50 text-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300 border-cyan-200' },
  { name: 'Dr. Manjula T R', designation: 'Associate Professor', role: 'Faculty Mentor', batchScope: 'Roll No 33 to 48 (Prajwal H M to Tharun T)', email: 'tr.manjula@jainuniversity.ac.in', phone: '917892142763', formattedPhone: '+91 78921 42763', icon: 'fa-user-graduate', themeColor: 'from-rose-500 to-pink-600', badge: 'bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200' },
  { name: 'Prof. Pramod R', designation: 'Assistant Professor', role: 'Faculty Mentor', batchScope: 'Roll No 49 to 65 & All Lateral Entry Students', email: 'pramodr@jainuniversity.ac.in', phone: '919739163955', formattedPhone: '+91 97391 63955', icon: 'fa-users-gear', themeColor: 'from-orange-500 to-amber-600', badge: 'bg-orange-50 text-orange-900 dark:bg-orange-950/50 dark:text-orange-300 border-orange-200' }
];

const facultyList = [
  { name: 'Prof. Chethan G S', role: 'Section Incharge', subject: 'Digital Logic Design (ESC 204)', email: 'gs.chethana@jainuniversity.ac.in', phone: '919164446170', formattedPhone: '+91 91644 46170', icon: 'fa-microchip' },
  { name: 'Dr. Buddha Dharani', role: 'Faculty', subject: 'Analog Electronics Circuits (ESC 202)', email: 'buddha.dharani@jainuniversity.ac.in', phone: '919160161822', formattedPhone: '+91 91601 61822', icon: 'fa-wave-square' },
  { name: 'Dr. Sunil Kumar', role: 'Faculty', subject: 'Signals and Systems (ESC 201)', email: 'sunil.kumar@jainuniversity.ac.in', phone: '918375955075', formattedPhone: '+91 83759 55075', icon: 'fa-chart-line' },
  { name: 'Prof. Ajeya Kashi', role: 'Faculty', subject: 'Statistical & Numerical Methods (BSC 202)', email: 'ajeya.kashi@jainuniversity.ac.in', phone: '917411776949', formattedPhone: '+91 74117 76949', icon: 'fa-calculator' },
  { name: 'Dr. Dasarathy', role: 'Faculty (HOD Civil)', subject: 'Environmental Science (BSC 201)', email: 'dasarathy@jainuniversity.ac.in', phone: '919840062899', formattedPhone: '+91 98400 62899', icon: 'fa-leaf' },
  { name: 'Prof. Hari Krishna Moorthy', role: 'Faculty', subject: 'Design Thinking (ESC 205)', email: 'hari.moorthy@jainuniversity.ac.in', phone: '919986768390', formattedPhone: '+91 99867 68390', icon: 'fa-lightbulb' },
  { name: 'Dr. Tamilvelan', role: 'Faculty', subject: 'Biology for Engineers (BSC 203)', email: 'tamilvelan@jainuniversity.ac.in', phone: '919629284534', formattedPhone: '+91 96292 84534', icon: 'fa-dna' },
  { name: 'Dr. Srinivas M', role: 'Faculty', subject: 'Sports and Yoga / UHV (HSMC 201)', email: 'srinivas.m@jainuniversity.ac.in', phone: '919880286653', formattedPhone: '+91 98802 86653', icon: 'fa-person-running' }
];

const notesList = [
  { code: 'ESC 204', title: 'Digital Logic Design', faculty: 'Prof. Chethan G S', link: 'https://drive.google.com/drive/folders/1aUI9xTFeM5XEn-ZYjH4_A1Y3xe9lOVG8?usp=drive_link', icon: 'fa-microchip', color: 'text-amber-500' },
  { code: 'ESC 202', title: 'Analog Electronics Circuits', faculty: 'Dr. Buddha Dharani', link: 'https://drive.google.com/drive/folders/1gUY51citev0PLt1GZvYmRnTt2qxU_C1T?usp=drive_link', icon: 'fa-wave-square', color: 'text-violet-500' },
  { code: 'BSC 203', title: 'Applied Biology', faculty: 'Dr. Tamilvelan', link: 'https://drive.google.com/drive/folders/1Nr7my2PCJgsfP1avisOrzVwHYT9c-Nif?usp=drive_link', icon: 'fa-dna', color: 'text-teal-500' },
  { code: 'ESC 205', title: 'Design Thinking', faculty: 'Prof. Hari Krishna Moorthy', link: 'https://drive.google.com/drive/folders/1mC-nwMUdXIhtEIduBMM9z1DuuGsGAW7u?usp=drive_link', icon: 'fa-lightbulb', color: 'text-yellow-500' },
  { code: 'BSC 201', title: 'Environmental Science', faculty: 'Dr. Dasarathy', link: 'https://drive.google.com/drive/folders/19suFBCio45OhnbdmrMoEScQK3ndeVblT?usp=drive_link', icon: 'fa-leaf', color: 'text-emerald-500' },
  { code: 'ESC 201', title: 'Signals and Systems', faculty: 'Dr. Sunil Kumar', link: 'https://drive.google.com/drive/folders/1JbKCXonZGk7zmqNn_SWFJDM5fk2K8OzO?usp=drive_link', icon: 'fa-chart-line', color: 'text-blue-500' },
  { code: 'HSMC 201', title: 'Sports and Yoga', faculty: 'Dr. Srinivas M', link: 'https://drive.google.com/drive/folders/1Cw_v5LUZ_EDjKBPpKRjyAIIDOUT5bfCE?usp=drive_link', icon: 'fa-person-running', color: 'text-sky-500' },
  { code: 'BSC 202', title: 'Statistical & Numerical Methods', faculty: 'Prof. Ajeya Kashi', link: 'https://drive.google.com/drive/folders/1nSwNYZUXR8kMsej-ebTtRZOZIUZObJya?usp=drive_link', icon: 'fa-calculator', color: 'text-purple-500' }
];

const timetableData = {
  Mon: [
    { period: '1 & 2', time: '8:45 - 10:45', title: 'Sports and Yoga', faculty: 'Dr. Srinivas M', type: 'Activity' },
    { period: 'Break', time: '10:45 - 11:00', title: 'Short Break', faculty: '', type: 'Break' },
    { period: '3', time: '11:00 - 12:00', title: 'Digital Logic Design', faculty: 'Prof. Chethan G S', type: 'Theory' },
    { period: '4', time: '12:00 - 1:00', title: 'Statistical & Numerical Methods', faculty: 'Prof. Ajeya Kashi', type: 'Theory' },
    { period: 'Lunch', time: '1:00 - 1:50', title: 'Lunch Break', faculty: '', type: 'Break' },
    { period: '5 & 6', time: '1:50 - 3:50', title: 'Digital Logic Design & Analog Electronics Circuits Lab', faculty: 'Prof. Chethan GS, Prof. Pramod R, Dr. Buddha Dharani, Dr. Eashwar S', type: 'Lab' }
  ],
  Tue: [
    { period: '1', time: '8:45 - 9:45', title: 'Statistical & Numerical Methods', faculty: 'Prof. Ajeya Kashi', type: 'Theory' },
    { period: '2', time: '9:45 - 10:45', title: 'Signals and Systems', faculty: 'Dr. Sunil Kumar', type: 'Theory' },
    { period: 'Break', time: '10:45 - 11:00', title: 'Short Break', faculty: '', type: 'Break' },
    { period: '3', time: '11:00 - 12:00', title: 'Digital Logic Design', faculty: 'Prof. Chethan G S', type: 'Theory' },
    { period: '4', time: '12:00 - 1:00', title: 'Analog Electronics Circuits', faculty: 'Dr. Buddha Dharani', type: 'Theory' },
    { period: 'Lunch', time: '1:00 - 1:50', title: 'Lunch Break', faculty: '', type: 'Break' },
    { period: '5 & 6', time: '1:50 - 3:50', title: 'Environment Science', faculty: 'Dr. Dasarathy', type: 'Core' }
  ],
  Wed: [
    { period: '1', time: '8:45 - 9:45', title: 'Analog Electronics Circuits', faculty: 'Dr. Buddha Dharani', type: 'Theory' },
    { period: '2', time: '9:45 - 10:45', title: 'Signals and Systems', faculty: 'Dr. Sunil Kumar', type: 'Theory' },
    { period: 'Break', time: '10:45 - 11:00', title: 'Short Break', faculty: '', type: 'Break' },
    { period: '3', time: '11:00 - 12:00', title: 'Signals and Systems', faculty: 'Dr. Sunil Kumar', type: 'Theory' },
    { period: '4', time: '12:00 - 1:00', title: 'Biology for Engineers', faculty: 'Dr. Tamilvelan', type: 'Theory' },
    { period: 'Lunch', time: '1:00 - 1:50', title: 'Lunch Break', faculty: '', type: 'Break' },
    { period: '5 & 6', time: '1:50 - 3:50', title: 'Digital Logic Design & Analog Electronics Circuits Lab', faculty: 'Prof. Chethan GS, Prof. Pramod R, Dr. Buddha Dharani, Dr. Eashwar S', type: 'Lab' }
  ],
  Thu: [
    { period: '1', time: '8:45 - 9:45', title: 'Statistical & Numerical Methods', faculty: 'Prof. Ajeya Kashi', type: 'Theory' },
    { period: '2', time: '9:45 - 10:45', title: 'Statistical & Numerical Methods', faculty: 'Prof. Ajeya Kashi', type: 'Theory' },
    { period: 'Break', time: '10:45 - 11:00', title: 'Short Break', faculty: '', type: 'Break' },
    { period: '3 & 4', time: '11:00 - 1:00', title: 'Design Thinking', faculty: 'Prof. Hari Krishna Moorthy', type: 'Workshop' },
    { period: 'Lunch', time: '1:00 - 1:50', title: 'Lunch Break', faculty: '', type: 'Break' },
    { period: '5', time: '1:50 - 2:50', title: 'Biology for Engineers', faculty: 'Dr. Tamilvelan', type: 'Theory' },
    { period: '6', time: '2:50 - 3:50', title: 'Library Reference', faculty: '-', type: 'Self Study' }
  ],
  Fri: [
    { period: '1', time: '8:45 - 9:45', title: 'Digital Logic Design', faculty: 'Prof. Chethan G S', type: 'Theory' },
    { period: '2', time: '9:45 - 10:45', title: 'Signals and Systems', faculty: 'Dr. Sunil Kumar', type: 'Theory' },
    { period: 'Break', time: '10:45 - 11:00', title: 'Short Break', faculty: '', type: 'Break' },
    { period: '3', time: '11:00 - 12:00', title: 'Analog Electronics Circuits', faculty: 'Dr. Buddha Dharani', type: 'Theory' },
    { period: '4', time: '12:00 - 1:00', title: 'Mentoring Session', faculty: 'Faculty Mentors', type: 'Mentoring' },
    { period: 'Lunch', time: '1:00 - 1:50', title: 'Lunch Break', faculty: '', type: 'Break' },
    { period: '5 & 6', time: '1:50 - 3:50', title: 'Placement Activities', faculty: 'Training Cell', type: 'Placement' }
  ],
  Sat: [
    { period: '1 & 2', time: '8:45 - 10:45', title: 'Foundation of Mathematics', faculty: 'Maths Faculty', type: 'Theory' },
    { period: '3 to 6', time: '11:00 - 3:50', title: 'Placement Activities / Extra Contact Hours', faculty: 'Department', type: 'Activity' }
  ]
};

const courseMatrixData = [
  // SEMESTER 3
  { sem: 3, no: 1, code: 'BSC 201', name: 'Environment Science', ltpe: '2-0-0-3', cr: 3, nh: 90, l: 30, t: 0, p: 0 },
  { sem: 3, no: 2, code: 'BSC 202', name: 'Mathematics-3 (PDE, Prob/Stat)', ltpe: '2-0-2-2', cr: 4, nh: 120, l: 30, t: 0, p: 30 },
  { sem: 3, no: 3, code: 'BSC 203', name: 'Biology for Engineers', ltpe: '3-0-0-0', cr: 3, nh: 60, l: 30, t: 0, p: 0 },
  { sem: 3, no: 4, code: 'ESC 201', name: 'Signals and Systems', ltpe: '2-0-2-0', cr: 3, nh: 75, l: 30, t: 0, p: 0 },
  { sem: 3, no: 5, code: 'ESC 202', name: 'Analog Electronics Circuits', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 3, no: 6, code: 'ESC 203', name: 'Analog Electronics Circuits Lab', ltpe: '0-0-2-0', cr: 1, nh: 30, l: 0, t: 0, p: 30 },
  { sem: 3, no: 7, code: 'ESC 204', name: 'Digital Logic Design', ltpe: '2-0-2-0', cr: 3, nh: 60, l: 30, t: 0, p: 30 },
  { sem: 3, no: 8, code: 'ESC 205', name: 'Design Thinking', ltpe: '0-0-4-1', cr: 2, nh: 90, l: 0, t: 0, p: 60 },
  { sem: 3, no: 9, code: 'HSMC201', name: 'Sports and Yoga', ltpe: '0-0-2-0', cr: 1, nh: 30, l: 0, t: 0, p: 30 },
  { sem: 3, no: 10, code: '-', name: 'Diploma Mathematics - 1', ltpe: '-', cr: 0, nh: 0, l: 0, t: 0, p: 0 },

  // SEMESTER 4
  { sem: 4, no: 1, code: 'PCC 201', name: 'Digital System Design using HDL', ltpe: '2-0-2-0', cr: 3, nh: 60, l: 30, t: 0, p: 30 },
  { sem: 4, no: 2, code: 'PCC 202', name: 'Microprocessors and Microcontrollers', ltpe: '3-0-2-0', cr: 4, nh: 75, l: 45, t: 0, p: 30 },
  { sem: 4, no: 3, code: 'PCC 203', name: 'Computer Architecture and Organization', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 4, no: 4, code: 'PCC 204', name: 'Analog and Digital Communication', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 4, no: 5, code: 'PCC 205', name: 'Analog and Digital Communication Lab', ltpe: '0-0-2-0', cr: 1, nh: 30, l: 0, t: 0, p: 30 },
  { sem: 4, no: 6, code: 'PCC 206', name: 'Electromagnetic Theory', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 4, no: 7, code: 'ESC 206', name: 'Engineering in Society', ltpe: '1-0-2-0', cr: 2, nh: 60, l: 15, t: 0, p: 30 },
  { sem: 4, no: 8, code: 'ESC 207', name: '3D Experience and Innovation Lab', ltpe: '0-0-2-2', cr: 2, nh: 75, l: 0, t: 0, p: 30 },
  { sem: 4, no: 9, code: '-', name: 'Diploma Mathematics - 2', ltpe: '-', cr: 0, nh: 0, l: 0, t: 0, p: 0 },

  // SEMESTER 5
  { sem: 5, no: 1, code: 'HSMC 301', name: 'Finance & Accounting', ltpe: '2-0-0-2', cr: 2, nh: 90, l: 30, t: 0, p: 0 },
  { sem: 5, no: 2, code: 'PCC 301', name: 'VLSI Design', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 5, no: 3, code: 'PCC 302', name: 'Digital Signal Processing', ltpe: '3-0-2-0', cr: 4, nh: 75, l: 45, t: 0, p: 30 },
  { sem: 5, no: 4, code: 'PCC 303', name: 'Level 2: Track Based Core Course-1', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 5, no: 5, code: 'PCC 304', name: 'Level 2: Track Based Core Course-2', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 5, no: 6, code: 'PCC 305', name: 'Level 2: Track Based Core Course-3', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 5, no: 7, code: 'PCC 306', name: 'IC Design & Simulation Lab', ltpe: '0-0-2-0', cr: 1, nh: 30, l: 0, t: 0, p: 30 },
  { sem: 5, no: 8, code: 'PCC 307', name: 'Research Methods and Design', ltpe: '1-0-2-0', cr: 2, nh: 60, l: 15, t: 0, p: 30 },
  { sem: 5, no: 9, code: 'INT-1', name: 'Internship-1', ltpe: '0-0-0-6', cr: 2, nh: 90, l: 0, t: 0, p: 0 },

  // SEMESTER 6
  { sem: 6, no: 1, code: 'PCC 308', name: 'Embedded System Design', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 6, no: 2, code: 'PCC 309', name: 'Embedded System and PCB Design Lab', ltpe: '0-0-2-0', cr: 1, nh: 30, l: 0, t: 0, p: 30 },
  { sem: 6, no: 3, code: 'PCC 310', name: 'Antennas and Wave Propagation', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 6, no: 4, code: 'PCC 311', name: 'Microwave and Antennas Lab', ltpe: '0-0-2-0', cr: 1, nh: 30, l: 0, t: 0, p: 30 },
  { sem: 6, no: 5, code: 'PEC 1', name: 'Professional Elective-1/Track Based Elective-1', ltpe: '2-0-0-3', cr: 3, nh: 75, l: 30, t: 0, p: 0 },
  { sem: 6, no: 6, code: 'PCC 312', name: 'Control Systems', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 6, no: 7, code: 'PCC 313', name: 'Level 2: Product Innovation & Entrepreneurship', ltpe: '1-0-2-3', cr: 3, nh: 90, l: 15, t: 0, p: 30 },
  { sem: 6, no: 8, code: 'HSMC 302', name: 'Grassroot innovation and engineering practice', ltpe: '1-0-2-0', cr: 2, nh: 60, l: 15, t: 0, p: 30 },
  { sem: 6, no: 9, code: 'PROJ 1', name: 'Engineering Project-1', ltpe: '0-0-4-0', cr: 2, nh: 60, l: 0, t: 0, p: 60 },

  // SEMESTER 7
  { sem: 7, no: 1, code: 'OEC 1', name: 'Open Elective-1', ltpe: '2-0-0-3', cr: 3, nh: 90, l: 30, t: 0, p: 0 },
  { sem: 7, no: 2, code: 'PEC 2', name: 'Professional Elective-2/Track Based Elective-2', ltpe: '2-0-0-3', cr: 3, nh: 75, l: 30, t: 0, p: 0 },
  { sem: 7, no: 3, code: 'PCC 401', name: 'Wireless Communication', ltpe: '3-0-0-0', cr: 3, nh: 45, l: 45, t: 0, p: 0 },
  { sem: 7, no: 4, code: 'PCC 402', name: 'Engineering Ethics & Professional Practice', ltpe: '3-0-0-3', cr: 4, nh: 120, l: 45, t: 0, p: 0 },
  { sem: 7, no: 5, code: 'PROJ 2', name: 'Engineering Project-2', ltpe: '0-0-8-0', cr: 4, nh: 120, l: 0, t: 0, p: 120 },
  { sem: 7, no: 6, code: 'INT 2', name: 'Internship-2', ltpe: '0-0-0-6', cr: 2, nh: 90, l: 0, t: 0, p: 0 },

  // SEMESTER 8
  { sem: 8, no: 1, code: 'PEC 3', name: 'Professional Elective-3/Track Based Elective-3', ltpe: '2-0-0-3', cr: 3, nh: 75, l: 30, t: 0, p: 0 },
  { sem: 8, no: 2, code: 'OEC 2', name: 'Open Elective-2', ltpe: '2-0-0-3', cr: 3, nh: 90, l: 30, t: 0, p: 0 },
  { sem: 8, no: 3, code: 'OEC 3', name: 'Open Elective-3', ltpe: '2-0-0-3', cr: 3, nh: 90, l: 30, t: 0, p: 0 },
  { sem: 8, no: 4, code: 'PROJ 3', name: 'Engineering Project-3 (Testing & Social outreach)', ltpe: '0-0-12-0', cr: 6, nh: 180, l: 0, t: 0, p: 180 }
];

const semesterOfficialTotals = {
  3: { cr: 23, nh: 600, l: 195, t: 0, p: 180 },
  4: { cr: 21, nh: 435, l: 225, t: 0, p: 150 },
  5: { cr: 24, nh: 525, l: 270, t: 0, p: 90 },
  6: { cr: 21, nh: 480, l: 195, t: 0, p: 180 },
  7: { cr: 19, nh: 540, l: 150, t: 0, p: 120 },
  8: { cr: 15, nh: 435, l: 90, t: 0, p: 180 }
};

const academicCalendarEvents = [
  { start: '2026-06-01', end: '2026-07-18', title: 'Summer Internship (5th & 7th Sem)', type: 'academic' },
  { start: '2026-06-26', end: '2026-06-26', title: 'Holiday: Last Day of Muharram', type: 'holiday' },
  { start: '2026-07-15', end: '2026-07-15', title: 'Course Matrix Finalization for All Semesters', type: 'academic' },
  { start: '2026-07-20', end: '2026-07-21', title: 'Induction & Commencement of Classes (Sem 3, 5, 7)', type: 'academic' },
  { start: '2026-08-03', end: '2026-08-03', title: 'TDPCL / Project Batch Finalization', type: 'academic' },
  { start: '2026-08-15', end: '2026-08-15', title: 'Holiday: Independence Day', type: 'holiday' },
  { start: '2026-08-21', end: '2026-08-21', title: 'Holiday: Varamahalakshmi Vrata', type: 'holiday' },
  { start: '2026-08-26', end: '2026-08-26', title: 'Holiday: Eid-Milad', type: 'holiday' },
  { start: '2026-09-07', end: '2026-09-12', title: 'Internal Test Week 1 (5th/7th UG & 3rd PG)', type: 'exam' },
  { start: '2026-09-11', end: '2026-09-12', title: 'JAIN Entrepreneurship Festival', type: 'academic' },
  { start: '2026-09-14', end: '2026-09-14', title: 'Holiday: Vinayaka Chaturthi', type: 'holiday' },
  { start: '2026-09-21', end: '2026-09-26', title: 'TDPCL / Project Review – 1 Week & PTM Week 1', type: 'academic' },
  { start: '2026-10-02', end: '2026-10-02', title: 'Holiday: Gandhi Jayanthi', type: 'holiday' },
  { start: '2026-10-10', end: '2026-10-10', title: 'Holiday: Mahalaya Amavasya', type: 'holiday' },
  { start: '2026-10-20', end: '2026-10-21', title: 'Holiday: Mahanavami & Vijayadashami', type: 'holiday' },
  { start: '2026-10-26', end: '2026-10-31', title: 'Internal Test Week 2 (5th/7th UG & 3rd PG)', type: 'exam' },
  { start: '2026-11-10', end: '2026-11-10', title: 'Holiday: Balipadyami', type: 'holiday' },
  { start: '2026-11-16', end: '2026-11-21', title: 'Parent-Teacher Meeting (PTM Week 2)', type: 'academic' },
  { start: '2026-11-27', end: '2026-11-27', title: 'Holiday: Kanakadasa Jayanti', type: 'holiday' },
  { start: '2026-11-28', end: '2026-11-28', title: 'Last Day of Instruction (UG/PG)', type: 'academic' },
  { start: '2026-12-04', end: '2026-12-04', title: 'Commencement of Semester End Examination (SEE)', type: 'exam' },
  { start: '2026-12-25', end: '2026-12-25', title: 'Holiday: Christmas', type: 'holiday' },
  { start: '2027-01-02', end: '2027-01-02', title: 'Commencement of Even Semester Classes', type: 'academic' }
];

const ATTENDANCE_SUBJECTS = [
  ['ESC 204', 'Digital Logic Design', 'Prof. Chethan G S'],
  ['ESC 202', 'Analog Electronics Circuits', 'Dr. Buddha Dharani'],
  ['ESC 201', 'Signals and Systems', 'Dr. Sunil Kumar'],
  ['BSC 202', 'Statistical & Numerical Methods', 'Prof. Ajeya Kashi'],
  ['BSC 201', 'Environmental Science', 'Dr. Dasarathy'],
  ['ESC 205', 'Design Thinking', 'Prof. Hari Krishna Moorthy'],
  ['BSC 203', 'Biology for Engineers', 'Dr. Tamilvelan'],
  ['HSMC201', 'Sports and Yoga', 'Dr. Srinivas M']
];

const AUTHORIZED_ANNOUNCEMENT_USNS = ['25BTREC020', '25BTREC09', '25BTREC009'];

const WEBSITE_THEME_NAMES = {
  blue: 'Electric Blue',
  emerald: 'Emerald Mint',
  purple: 'Cyberpunk Neon',
  sunset: 'Sunset Glow',
  ocean: 'Ocean Sapphire',
  rose: 'Rose Crimson'
};

const CAMPUS_STICKERS = [
  { id: 'stk_1', badge: '💯', text: '100% Attendance Gang', bg: 'from-emerald-500 to-teal-600' },
  { id: 'stk_2', badge: '📚', text: 'Notes Uploaded in Drive!', bg: 'from-blue-500 to-indigo-600' },
  { id: 'stk_3', badge: '☕', text: 'Need Chai Break 10m', bg: 'from-amber-500 to-orange-600' },
  { id: 'stk_4', badge: '🤫', text: 'Proxy Lagao Yaar!', bg: 'from-purple-500 to-pink-600' },
  { id: 'stk_5', badge: '⚡', text: 'Lab Viva Panic Mode!', bg: 'from-rose-500 to-red-600' },
  { id: 'stk_6', badge: '🖨️', text: 'Xerox Queue is Long!', bg: 'from-orange-500 to-amber-600' },
  { id: 'stk_7', badge: '🚨', text: 'HOD / Dean on Rounds!', bg: 'from-red-600 to-rose-700' },
  { id: 'stk_8', badge: '🎉', text: 'Semester End Party Vibe!', bg: 'from-cyan-500 to-blue-600' }
];

const CAMPUS_GIFS = [
  { title: 'Celebrate', url: 'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif' },
  { title: 'Study Mode', url: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif' },
  { title: 'Mind Blown', url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif' },
  { title: 'High Five', url: 'https://media.giphy.com/media/3oEjHV0z8S7WM4MwnK/giphy.gif' },
  { title: 'Calculations', url: 'https://media.giphy.com/media/WRQBXSCnEFJIuxktnw/giphy.gif' },
  { title: 'Thumbs Up', url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif' },
  { title: 'Victory', url: 'https://media.giphy.com/media/l4Ep3mmmj7Bw3adWw/giphy.gif' },
  { title: 'Coffee Time', url: 'https://media.giphy.com/media/hPTZgtzfRIB5Nfb5rL/giphy.gif' }
];

const CAMPUS_EMOJIS = [
  '👍', '🔥', '📚', '⚡', '🎓', '💯', '☕', '🤫',
  '✅', '🚨', '🚀', '🎉', '❤️', '👏', '😂', '😎',
  '🎯', '💻', '📝', '📖', '💡', '🏃', '🍕', '✨'
];

const SENDER_NAME_COLORS = [
  '#E11D48', '#7C3AED', '#2563EB', '#059669', '#D97706',
  '#DB2777', '#4F46E5', '#0D9488', '#EA580C', '#9333EA'
];
