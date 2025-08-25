window.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      section.style.opacity = 1;
    }
  });
});
const topBtn = document.createElement('button');
topBtn.textContent = '↑ Top';
topBtn.style.position = 'fixed';
topBtn.style.bottom = '30px';
topBtn.style.right = '30px';
topBtn.style.background = '#5C6AC4';
topBtn.style.color = '#fff';
topBtn.style.border = 'none';
topBtn.style.padding = '10px 16px';
topBtn.style.borderRadius = '50%';
topBtn.style.fontSize = '1.3em';
topBtn.style.cursor = 'pointer';
topBtn.style.display = 'none';
topBtn.style.zIndex = '9999';
document.body.appendChild(topBtn);

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
function showForm(form) {
  document.querySelector('#login-form form').addEventListener('submit', function(e) {
  e.preventDefault();
  window.location.href = 'dashboard.html';
});
  
  document.querySelector('#register-form form').addEventListener('submit', function(e) {
  e.preventDefault();
  window.location.href = 'dashboard.html';
});
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.transform = 'scale(1.07)';
    btn.style.boxShadow = '0 4px 12px #5C6AC4';
    btn.style.transition = 'all 0.2s';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '';
  });

document.querySelectorAll('#courses li').forEach(item => {
  item.addEventListener('mouseover', () => {
    item.style.background = '#e3e7fd';
    item.style.fontWeight = 'bold';
    item.style.cursor = 'pointer';
  });
  item.addEventListener('mouseout', () => {
    item.style.background = '';
    item.style.fontWeight = '';
  });
});
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = 0;
  section.style.transition = 'opacity 1s';
});
function getCourses() {
  return JSON.parse(localStorage.getItem('courses') || '[]');
}
function showCourses() {
  const list = document.getElementById('coursesList');
  const courses = getCourses();
  list.innerHTML = courses.map(c =>
    `<li><b>${c.name}</b>: ${c.details} <br><a href="${c.video}" target="_blank">Watch Video</a></li>`
  ).join('');
}
// Listen for clicks on edit or delete buttons
document.getElementById('coursesList').onclick = function(e) {
  if (e.target.classList.contains('edit-btn')) {
    const idx = +e.target.getAttribute('data-index');
    startEditCourse(idx);
  }
  if (e.target.classList.contains('delete-btn')) {
    const idx = +e.target.getAttribute('data-index');
    deleteCourse(idx);
  }
};
const name = this.courseName.value.trim();
const details = this.courseDetails.value.trim();
const thumb = this.courseThumb.value.trim();
const videos = this.courseVideos.value.split(',').map(v => v.trim()).filter(v => v);
const rate = this.courseRate.value.trim();
const playlistType = this.playlistType.value.trim();
const courseCode = this.courseCode.value.trim();

courses.push({ name, details, thumb, videos, rate, playlistType, courseCode });

function startEditCourse(idx) {
  const courses = getCourses();
  const course = courses[idx];
  addCourseForm.courseName.value = course.name;
  addCourseForm.courseDetails.value = course.details;
  addCourseForm.courseThumb.value = course.thumb;
  addCourseForm.courseVideos.value = course.videos.join(', ');
  addCourseForm.dataset.editing = idx;
  document.getElementById('courseMsg').textContent = "Editing course. Update and submit.";
  addCourseForm.querySelector('button[type="submit"]').textContent = "Update Course";
}

function deleteCourse(idx) {
  if (!confirm("Are you sure you want to delete this course?")) return;
  const courses = getCourses();
  courses.splice(idx, 1);
  localStorage.setItem('courses', JSON.stringify(courses));
  showCourses();
  document.getElementById('courseMsg').textContent = "Course deleted!";
  // Reset form if editing deleted course
  if (addCourseForm.dataset.editing == idx) {
    addCourseForm.reset();
    addCourseForm.querySelector('button[type="submit"]').textContent = "Upload Course";
    delete addCourseForm.dataset.editing;
  }
}
showCourses(); // Call after admin login
