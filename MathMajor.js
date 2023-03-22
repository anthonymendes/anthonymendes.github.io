// Javascript to check if a selection of mathematics courses satisfies the major.
// Author: Tony Mendes (aamendes@calpoly.edu)

const courses = {
    'CSC 1101': {title: 'Fundamentals of Computer Science', units: 4},
    'CSC 2202': {title: 'Data Structures', units: 4},
    'MATH 1261': {title: 'Calculus I', units: 4},
    'MATH 1262': {title: 'Calculus II', units: 4},
    'MATH 2001': {title: 'Mathematics Orientation', units: 1},
    'MATH 2031': {title: 'Introduction to Abstract Mathematics', units: 3},
    'MATH 2151': {title: 'Linear Algebra & Differential Equations', units: 4},
    'MATH 2263': {title: 'Calculus III', units: 3},
    'MATH 3011': {title: 'History of Mathematics', units: 3},
    'MATH 3051': {title: 'Combinatorics', units: 3},
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
    'MATH 4052': {title: 'Discrete Mathematics', units: 3},
    'MATH 4201': {title: 'Algebra I', units: 4},
    'MATH 4202': {title: 'Algebra II', units: 3},
    'MATH 4264': {title: 'Real Analysis I', units: 4},
    'MATH 4265': {title: 'Real Analysis II', units: 4},
    'MATH 4342': {title: 'Dynamical Systems', units: 3},
    'MATH 4352': {title: 'Partial Differential Equations', units: 3},
    'MATH 4461/4462': {title: 'Senior Project I/II', units: 3},
    'MATH 4512': {title: 'Non-Euclidean Geometry', units: 3},
    'MATH 4531': {title: 'Differential Geometry', units: 3},
    'MATH 4541': {title: 'Topology', units: 3},
    'MATH 4652': {title: 'Numerical Differential Equations', units: 3},
    'MATH 4653': {title: 'Numerical Optimization', units: 3},
    'MATH 4911': {title: 'Game Theory', units: 3},
    'MATH 4972': {title: 'Advanced Mathematics for Teaching', units : 3},
    'MATH 4981': {title: 'Advanced Topics in Mathematics', units: 3},
    'MATH 4982': {title: 'Advanced Topics in Applied Mathematics', units: 3},
    'MATH 4991': {title: 'Senior Project Seminar', units: 3},
    'MATH 4992': {title: 'Senior Project Applied Seminar', units: 3},
    'MATH 5053': {title: 'Graduate Discrete Mathematics', units: 3},
    'MATH 5203': {title: 'Graduate Algebra I', units: 3},
    'MATH 5204': {title: 'Graduate Algebra II', units: 3},
    'MATH 5266': {title: 'Graduate Real Analysis', units: 3},
    'MATH 5302': {title: 'Applied Complex Analysis', units: 3},
    'MATH 5371': {title: 'Methods of Applied Mathematics', units: 3},
    'MATH 5542': {title: 'Graduate Topology', units: 3},
    'MATH 5651': {title: 'Numerical Analysis', units: 3},
    'PHYS 1141': {title: 'General Physics I', units: 4},
    'STAT 1510': {title: 'Statistics I', units: 3},
    'STAT 2610': {title: 'Introduction to Probability and Simulation', units: 3}
};

const core = ['MATH 1261', 'MATH 1262', 'MATH 2001', 'MATH 2031', 'MATH 2263', 'MATH 2151',
	      'MATH 3152', 'MATH 4201', 'MATH 4264', 'CSC 1101', 'PHYS 1141', 'STAT 1510']
const coreTrack1 = ['MATH 4202', 'MATH 4265']
const coreTrack2 = ['MATH 3051', 'MATH 3111', 'MATH 3301']
const coreTrack3 = ['CSC 2202', 'STAT 2610', 'MATH 3681']
const coreTrack4 = ['MATH 4991', 'MATH 4992', 'MATH 4461/4462']
const listA = ['MATH 3011', 'MATH 3051', 'MATH 3055', 'MATH 3111', 'MATH 3301', 'MATH 3351',
	       'MATH 3511', 'MATH 3622', 'MATH 3651', 'MATH 3681', 'MATH 4052', 'MATH 4202',
	       'MATH 4265', 'MATH 4342', 'MATH 4352', 'MATH 4461/4462', 'MATH 4512',
	       'MATH 4531', 'MATH 4541', 'MATH 4652', 'MATH 4653', 'MATH 4911', 'MATH 4981',
	       'MATH 4982', 'MATH 5053', 'MATH 5203', 'MATH 5204', 'MATH 5266', 'MATH 5302',
	       'MATH 5371', 'MATH 5542', 'MATH 5651']
const listB = ['MATH 3055', 'MATH 4342', 'MATH 4352', 'MATH 4652', 'MATH 4653', 'MATH 4911']
const listC = ['MATH 3971', 'MATH 3511', 'MATH 4512', 'MATH 4972']

const coreContainer = document.getElementById('core-text');
const listAContainer = document.getElementById('listA-text');
const listBContainer = document.getElementById('listB-text');
const listCContainer = document.getElementById('listC-text');
const courseCheckerContainer = document.getElementById('major-check');
let selectedCourses = {};

function renderCourse(courseCode, course, place) {
    const template = `<span class="clickable-word" data-course-code="${courseCode}">
      ${courseCode} ${course.title} (${course.units})
    </span>`;
    place.insertAdjacentHTML('beforeend', template);
}

function toggleCourseSelection(courseCode, course) {
    const elements = document.querySelectorAll(`[data-course-code="${courseCode}"]`);
    elements.forEach((element) => {
	element.classList.toggle('selected-course');
    });
    if (selectedCourses[courseCode]) {
	delete selectedCourses[courseCode];
    } else {
	selectedCourses[courseCode] = course;
    }
}

function handleClick(event) {
    const courseCode = event.target.dataset.courseCode;
    const course = courses[courseCode];
    if (course) {
	toggleCourseSelection(courseCode, course);
	unitCount();
	coreRemaining();
	trackCheck();
	checkMessage();
    }
}

function unitCount() {
    courseCheckerContainer.innerHTML = '';
    let units = 0;
    Object.values(selectedCourses).forEach((course) => {
	units += course.units;
    })
    return units;
}

function coreRemaining() {
    const selected = Object.keys(selectedCourses);
    let count = core.filter(c => selected.includes(c)).length;
    [coreTrack1, coreTrack2, coreTrack3, coreTrack4].forEach((track) => {
	if (track.some(c => selected.includes(c))) {
	    count += 1;
	}
    });
    return count;
}

function coursePrefix(course) {
    const c = course.split(' ');
    return c[0];
}

function courseNumber(course) {
    const c = course.split(' ');
    if (c[1] == '4461/4462') {
	return 4462
    } else {
	return Number(c[1]);
    }
}

function removeTrackCourse(A, track) {
    if (!(track.some(c => !(A.includes(c)))) && (track.some(c => A.includes(c)))) {
	const shared = track.find(c => A.includes(c));
	return A.filter(c => c !== shared);
    } else {
	return A;
    }
}

function trackCheck() {
    const selected = Object.keys(selectedCourses);
    let A = selected.filter(c => listA.includes(c));
    let B = selected.filter(c => listB.includes(c));
    let C = selected.filter(c => listC.includes(c));
    [coreTrack1, coreTrack2, coreTrack3, coreTrack4].forEach((track) => {
	const trackSelected = selected.filter(c => track.includes(c));
	A = removeTrackCourse(A, trackSelected);
    });
    const CnotA = C.filter(c => !(A.includes(c)));

    const above4000 = A.filter(c => courseNumber(c) >= 4000).length
	  + CnotA.filter(c => courseNumber(c) >= 4000).length
    const mathPrefix = A.filter(c => coursePrefix(c) == 'MATH').length
	  + CnotA.filter(c => coursePrefix(c) == 'MATH').length
    return [A.length, above4000, mathPrefix, B.length, C.length]
}

function checkMessage() {
    let message = "<p>";

    const coreToGo = Math.max(16 - coreRemaining(), 0);
    const generalListA = Math.max(7 - trackCheck()[0], 0);
    const above4000 = Math.max(3 - trackCheck()[1], 0);
    const mathPrefix = Math.max(5 - trackCheck()[2], 0);
    const generalSuccess = (generalListA == 0)
	  && (above4000 == 0)
	  && (mathPrefix == 0);
    const appliedListB = Math.max(3 - trackCheck()[3], 0);
    const appliedSuccess = (generalListA == 0)
	  && (appliedListB == 0)
	  && (above4000 == 0)
	  && (mathPrefix == 0);
    const teachingListA = Math.max(5 - trackCheck()[0], 0);
    const teachingListC = Math.max(4 - trackCheck()[4], 0);
    const teachingSuccess = (teachingListA == 0)
	  && (teachingListC == 0)
	  && (above4000 == 0)
	  && (mathPrefix == 0);

    if (unitCount()) {
	if ((coreToGo == 0) && (generalSuccess || appliedSuccess || teachingSuccess)) {
	    message += `<b>The mathematics major is acheived!</b>`;
	} else {
	    message += `The mathematics major is not satisfied.`;
	}
    } else {
	message += `Select courses by clicking on them.`
    }
    message += `</p>`;

    message += `Core requirements`;
    if (coreToGo != 0) {
	message += `: ${coreToGo} Core courses needed.`;
    } else {
	message += ` are satisfied.`;
    }
    message += `<br>`

    message += `General track`;
    if (generalSuccess) {
	message += ` requirements are satisfied.`;
    } else {
	message += `: ${generalListA} from List A needed. ${above4000} at 4000+ level. ${mathPrefix} with MATH prefix.`;
    }
    message += `<br>`

    message += `Applied track`;
    if (appliedSuccess) {
	message += ` requirements are satisfied.`;
    } else {
	message += `: ${generalListA} from List A and ${appliedListB} from List B needed. ${above4000} at 4000+ level. ${mathPrefix} with MATH prefix.`;
    }
    message += `<br>`

    message += `Teaching track`;
    if (teachingSuccess) {
	message += ` requirements are satisfied.`;
    } else {
	message += `: ${teachingListA} from List A and ${teachingListC} from List C needed. ${above4000} at 4000+ level. ${mathPrefix} with MATH prefix.`;
    }
    message += `<br>`

    courseCheckerContainer.insertAdjacentHTML('beforeend',`<div>${message}</div>`);
}

checkMessage()

core.forEach(course => {
    renderCourse(course, courses[course], coreContainer);
    coreContainer.insertAdjacentHTML('beforeend', '<br>');
})

renderCourse('MATH 4202', courses['MATH 4202'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>&emsp;<b>or</b> ');
renderCourse('MATH 4265', courses['MATH 4265'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>');

renderCourse('MATH 3051', courses['MATH 3051'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>&emsp;<b>or</b> ');
renderCourse('MATH 3111', courses['MATH 3111'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>&emsp;<b>or</b> ');
renderCourse('MATH 3301', courses['MATH 3301'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>');

renderCourse('CSC 2202', courses['CSC 2202'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>&emsp;<b>or</b> ');
renderCourse('STAT 2610', courses['STAT 2610'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>&emsp;<b>or</b> ');
renderCourse('MATH 3681', courses['MATH 3681'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>');

renderCourse('MATH 4991', courses['MATH 4991'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>&emsp;<b>or</b> ');
renderCourse('MATH 4992', courses['MATH 4992'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>&emsp;<b>or</b> ');
renderCourse('MATH 4461/4462', courses['MATH 4461/4462'], coreContainer)
coreContainer.insertAdjacentHTML('beforeend', '<br>');

listA.forEach(course => {
    renderCourse(course, courses[course], listAContainer);
    listAContainer.insertAdjacentHTML('beforeend', '<br>');
})

listB.forEach(course => {
    renderCourse(course, courses[course], listBContainer);
    listBContainer.insertAdjacentHTML('beforeend', '<br>');
})

listC.forEach(course => {
    renderCourse(course, courses[course], listCContainer);
    listCContainer.insertAdjacentHTML('beforeend', '<br>');
})

coreContainer.addEventListener('click', handleClick);
listAContainer.addEventListener('click', handleClick);
listBContainer.addEventListener('click', handleClick);
listCContainer.addEventListener('click', handleClick);
