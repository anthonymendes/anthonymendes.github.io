// Javascript to check if a selection of mathematics courses satisfies the major.
// Author: Tony Mendes (aamendes@calpoly.edu)

// I still need to implement the 'at most 1 course below 3000 level' condition

const courses = {
    'CSC 1001/1002': {title: 'Fundamentals of Computer Science', units: 4},
    'CSC 2001': {title: 'Data Structures', units: 4},
    'CSC 2600': {title: 'Computing with Data', units: 4},
    'CSC 3449': {title: "Algorithms and Complexity", units: 4},
    'CSC 3665': {title: "Introduction to Database Management Systems", units: 4},
    'DATA 4610': {title: "Machine Learning I", units: 4},
    'DATA 4620': {title: "Machine Learning II", units: 4},
    'ECON 3030': {title: "Intermediate Microeconomics", units: 4},
    'ECON 4010': {title: "Mathematical Economics", units: 3},
    'ECON 4012': {title: "Probability Models for Economic Decisions", units: 3},
    'ENGR 2211': {title: "Introduction to Mechanics", units: 4},
    'MATH 1151': {title: 'Linear Algebra', units: 3},
    'MATH 1261': {title: 'Calculus I', units: 4},
    'MATH 1262': {title: 'Calculus II', units: 4},
    'MATH 2001': {title: 'Mathematics Orientation', units: 1},
    'MATH 2031': {title: 'Introduction to Abstract Mathematics', units: 3},
    'MATH 2263': {title: 'Calculus III', units: 3},
    'MATH 2343': {title: 'Differential Equations', units: 3},
    'MATH 3011': {title: 'History of Mathematics', units: 3},
    'MATH 3051': {title: 'Combinatorics I', units: 3},
    'MATH 3055': {title: 'Graph Theory', units: 3},
    'MATH 3111': {title: 'Number Theory', units: 3},
    'MATH 3152': {title: 'Advanced Linear Algebra', units: 4},
    'MATH 3301': {title: 'Complex Analysis', units: 3},
    'MATH 3351': {title: 'Differential Equations', units: 3},
    'MATH 3511': {title: 'Euclidean Geometry', units: 3},
    'MATH 3622': {title: 'Mathematics of Data Science', units: 3},
    'MATH 3651': {title: 'Introduction to Numerical Analysis', units: 3},
    'MATH 3681': {title: 'Mathematical Programming', units: 3},
    'MATH 3971': {title: 'Technology in Mathematics Education', units : 3},
    'MATH 4052': {title: 'Combinatorics II', units: 3},
    'MATH 4201': {title: 'Abstract Algebra I', units: 4},
    'MATH 4202': {title: 'Abstract Algebra II', units: 3},
    'MATH 4264': {title: 'Real Analysis I', units: 4},
    'MATH 4265': {title: 'Real Analysis II', units: 4},
    'MATH 4342': {title: 'Dynamical Systems', units: 3},
    'MATH 4352': {title: 'Partial Differential Equations', units: 3},
    'MATH 4461/4462': {title: 'Senior Project I/II', units: 3},
    'MATH 4463': {title: 'Senior Project Seminar', units: 3},
    'MATH 4464': {title: 'Senior Project Applied Seminar', units: 3},
    'MATH 4512': {title: 'Non-Euclidean Geometry', units: 3},
    'MATH 4531': {title: 'Differential Geometry', units: 3},
    'MATH 4541': {title: 'Topology I', units: 3},
    'MATH 4652': {title: 'Numerical Differential Equations', units: 3},
    'MATH 4653': {title: 'Numerical Optimization', units: 3},
    'MATH 4911': {title: 'Game Theory', units: 3},
    'MATH 4972': {title: 'Advanced Mathematics for Teaching', units : 3},
    'MATH 4981': {title: 'Advanced Topics in Mathematics', units: 3},
    'MATH 4982': {title: 'Advanced Topics in Applied Mathematics', units: 3},
    'MATH 5053': {title: 'Discrete Mathematics', units: 3},
    'MATH 5203': {title: 'Algebra I', units: 3},
    'MATH 5204': {title: 'Algebra II', units: 3},
    'MATH 5266': {title: 'Real Analysis', units: 3},
    'MATH 5302': {title: 'Applied Complex Analysis', units: 3},
    'MATH 5371': {title: 'Methods of Applied Mathematics', units: 3},
    'MATH 5542': {title: 'Topology II', units: 3},
    'MATH 5651': {title: 'Numerical Analysis', units: 3},
    'ME 3302': {title: "Thermodynamics", units: 3},
    'ME 3318': {title: "Mechanical Vibrations", units: 4},
    'ME 3341': {title: "Fluid Mechanics", units: 3},
    'PHYS 1141': {title: 'General Physics I', units: 4},
    'PHYS 1143': {title: "General Physics II", units: 4},
    'PHYS 3301': {title: "Statistical Mechanics I", units: 3},
    'PHYS 3305': {title: "Classical Mechanics I", units: 3},
    'PHYS 3306': {title: "Classical Mechanics II", units: 3},
    'PHYS 3314': {title: "Ocean Dynamics", units: 3},
    'PHYS 3323': {title: "Optics", units: 4},
    'PHYS 4202': {title: 'Computational Physics', units: 4},
    'PHYS 4408': {title: "Electromagnetic Fields and Waves I", units: 3},
    'PHYS 4425': {title: "Solid State Physics", units: 4},
    'PHYS/CPE 3345': {title: "Quantum Computing", units: 3},
    'STAT 1510': {title: 'Statistics I', units: 3},
    'STAT 2610': {title: 'Introduction to Probability and Simulation', units: 3},
    'STAT 3520': {title: "Statistics II", units: 3},
    'STAT 3530': {title: "Statistics III", units: 4},
    'STAT 4610': {title: "Mathematical Statistics I", units: 3},
    'STAT 4620': {title: "Mathematical Statistics II", units: 3},
    'STAT 4770': {title: "Survival Analysis Methods", units: 3},
    'STAT 4790': {title: "Applied Multivariate Statistics", units: 3}
};

const core = ['MATH 1151', 'MATH 1261', 'MATH 1262', 'MATH 2001', 'MATH 2031', 'MATH 2343',
	      'MATH 2263', 'MATH 3152', 'MATH 4201', 'MATH 4264',
	      'CSC 1001/1002', 'PHYS 1141', 'STAT 1510'];
const coreTracks = [['MATH 4202', 'MATH 4265'],
		    ['MATH 3051', 'MATH 3111', 'MATH 3301'],
		    ['CSC 2001', 'CSC 2600', 'STAT 2610', 'MATH 3681', 'PHYS 4202'],
		    ['MATH 4463', 'MATH 4464', 'MATH 4461/4462']];
const listA = ['MATH 3011', 'MATH 3051', 'MATH 3055', 'MATH 3111', 'MATH 3301', 'MATH 3351',
	       'MATH 3511', 'MATH 3622', 'MATH 3651', 'MATH 3681', 'MATH 4052', 'MATH 4202',
	       'MATH 4265', 'MATH 4342', 'MATH 4352', 'MATH 4461/4462', 'MATH 4512',
	       'MATH 4531', 'MATH 4541', 'MATH 4652', 'MATH 4653', 'MATH 4911', 'MATH 4981',
	       'MATH 4982', 'MATH 5053', 'MATH 5203', 'MATH 5204', 'MATH 5266', 'MATH 5302',
	       'MATH 5371', 'MATH 5542', 'MATH 5651', 'CSC 3449', 'CSC 3665', 'DATA 4610',
	       'DATA 4620', 'ECON 3030', 'ECON 4010', 'ECON 4012', 'ENGR 2211', 'ME 3302',
	       'ME 3318', 'ME 3341', 'PHYS 1143', 'PHYS 3301', 'PHYS 3305', 'PHYS 3306',
	       'PHYS 3314', 'PHYS 3323', 'PHYS/CPE 3345', 'PHYS 4408', 'PHYS 4425',
	       'STAT 3520', 'STAT 3530', 'STAT 4770', 'STAT 4790', 'STAT 4610', 'STAT 4620'
	      ];
const listB = ['MATH 3055', 'MATH 4342', 'MATH 4352', 'MATH 4652', 'MATH 4653', 'MATH 4911'];
const listC = ['MATH 3971', 'MATH 3511', 'MATH 4512', 'MATH 4972'];

const coreContainer = document.getElementById('core-text');
const listAContainer = document.getElementById('listA-text');
const listBContainer = document.getElementById('listB-text');
const listCContainer = document.getElementById('listC-text');
const courseCheckerContainer = document.getElementById('major-check');
let selectedCourses = {};

function renderCourse(courseCode, place, trailingHTML) {
    const title = courses[courseCode].title;
    const units = courses[courseCode].units;
    const template = `<span class="clickable-word" data-course-code="${courseCode}">
      ${courseCode} ${title} (${units})</span> ${trailingHTML}`;
    place.insertAdjacentHTML('beforeend', template);
};

function toggleCourseSelection(course) {
    const elements = document.querySelectorAll(`[data-course-code="${course}"]`);
    elements.forEach((element) => {element.classList.toggle('selected-course');});
    if (selectedCourses[course]) {
	delete selectedCourses[course];
    } else {
	selectedCourses[course] = course;
    };
};

function handleClick(event) {
    const course = event.target.dataset.courseCode;
    if (course) {
	toggleCourseSelection(course);
	checkMessage(Object.keys(selectedCourses));
    };
};

function coreRemaining(selected) {
    let count = core.filter(c => selected.includes(c)).length;
    coreTracks.forEach((track) => {if (track.some(c => selected.includes(c))) {count += 1}});
    return Math.max(17 - count, 0);
};

function courseNumber(course) {
    const c = course.split(' ');
    if (c[1] == '4461/4462') {
	return 4462;
    } else {
	return Number(c[1]);
    };
};
function coursePrefix(course) {return course.split(' ')[0]};
function above4000(selected) {return selected.filter(c => courseNumber(c) >= 4000).length;};
function mathPrefix(selected) {return selected.filter(c => coursePrefix(c) == 'MATH').length;}
function unitCount(selected) {return selected.reduce((sum, c) => sum + courses[c].units, 0)};
function remaining(n) {return Math.max(n,0)};
function pos(arr) {return arr.map(n => Math.max(n,0))};

function removeTrackCourse(A, track) {
    if (!(track.some(c => !(A.includes(c)))) && (track.some(c => A.includes(c)))) {
	const shared = track.find(c => A.includes(c));
	return A.filter(c => c !== shared);
    } else {
	return A;
    };
}

function listACourses(selected) {
    let A = selected.filter(c => listA.includes(c));
    coreTracks.forEach((track) => {
	const trackSelected = selected.filter(c => track.includes(c));
	A = removeTrackCourse(A, trackSelected);
    });
    return A;
}

function generalRemaining(selected) {
    const A = listACourses(selected);
    return pos([7 - A.length, 3 - above4000(A), 5 - mathPrefix(A)]);
};

function appliedRemaining(selected) {
    const A = listACourses(selected);
    const B = selected.filter(c => listB.includes(c));
    return pos([7 - A.length, 3 - B.length, 3 - above4000(A), 5 - mathPrefix(A)]);
};

function teachingRemaining(selected) {
    const A = listACourses(selected);
    const C = selected.filter(c => listC.includes(c));
    const CnotA = C.filter(c => !(A.includes(c)));
    return pos([5 - A.length,
		4 - C.length,
		3 - above4000(A) - above4000(CnotA),
		5 - mathPrefix(A) - mathPrefix(CnotA)]);
};

function checkMessage(selected) {
    const core = coreRemaining(selected);
    const general = generalRemaining(selected);
    const applied = appliedRemaining(selected);
    const teaching = teachingRemaining(selected);
    const units = unitCount(selected);
    const generalSuccess = Math.max(...general) == 0;
    const appliedSuccess = Math.max(...applied) == 0;
    const teachingSuccess = Math.max(...teaching) == 0;
    let message = "";

    if (units != 0) {
	if ((core == 0) && (generalSuccess || appliedSuccess || teachingSuccess)) {
	    message += `<b>The mathematics major is acheived!</b>`;
	} else {
	    message += `The mathematics major is not satisfied.`;
	};
    } else {
	message += `Select courses by clicking on them.`
    };

    if (core != 0) {
	message += `<p>The Core requires ${core} more courses.</p>`;
    } else {
	message += `<p><b>Core requirements are satisfied!</b></p>`;
    };
    message += `<table style="margin-left: 10px; border-spacing: 0px;">`

    if (generalSuccess) {
	message += `<tr><td colspan="4">&bull; &nbsp;<b>The General Track requirements are satisfied.</b></td></tr>`;
    } else {
	message += `<tr><td>&bull; &nbsp;The General Track requires</td>
<td>${general[0]} more from List A, </td>
<td>&nbsp;</td>
<td>${general[1]} at 4000+ level, </td>
<td>and ${general[2]} with a MATH prefix.</td></tr>`;
    }

    if (appliedSuccess) {
	message += `<tr><td colspan="4">&bull; &nbsp;<b>The Applied Track requirements are satisfied.</b></td></tr>`;
    } else {
	message += `<tr><td>&bull; &nbsp;The Applied Track requires</td>
<td>${applied[0]} more from List A, </td>
<td>${applied[1]} more from List B,</td>
<td>${applied[2]} at 4000+ level, </td>
<td>and ${applied[3]} with a MATH prefix.</td></tr>`;
    };


    if (teachingSuccess) {
	message += `<tr><td colspan="4">&bull; &nbsp;<b>The Teaching Track requirements are satisfied.</b></td></tr>`;
    } else {
	message += `<tr><td>&bull; &nbsp;The Teaching Track requires</td>
<td>${teaching[0]} more from List A, </td>
<td>${teaching[1]} more from List C,</td>
<td>${teaching[2]} at 4000+ level, </td>
<td>and ${teaching[3]} with a MATH prefix.</td></tr>`;
    };
    message += `</table>`;
    message += `<p>Selected courses total ${units} units.</p>`;

    courseCheckerContainer.innerHTML = '';
    courseCheckerContainer.insertAdjacentHTML('beforeend',`<div>${message}</div>`);
};

checkMessage([])

core.forEach(c => {renderCourse(c, coreContainer, '<br>');})
coreTracks.forEach(track => {
    track.slice(0,-1).forEach(c => {renderCourse(c, coreContainer, '<br>&emsp;<b>or</b> ');})
    renderCourse(track[track.length - 1], coreContainer, '<br>')
})
coreContainer.addEventListener('click', handleClick);

listA.forEach(course => {renderCourse(course, listAContainer, '<br>');})
listAContainer.addEventListener('click', handleClick);

listB.forEach(course => {renderCourse(course, listBContainer, '<br>');})
listBContainer.addEventListener('click', handleClick);

listC.forEach(course => {renderCourse(course, listCContainer, '<br>');})
listCContainer.addEventListener('click', handleClick);
