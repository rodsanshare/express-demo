

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]


exports.get = () => {
    return  courses;
}

exports.getOne = (courseId) => {
    const course = courses.find(c => c.id === parseInt(courseId));

    return course;
}

exports.post = (course) => {
    const newCourse = {
        id: courses.length + 1,
        name: course.name
    };

    courses.push(newCourse);
    return newCourse;
};

exports.put = (course) => {
    const currentCourse = courses.find(c => c.id === parseInt(course.id));
    
    const updatedCourse = {
        id: currentCourse.id,
        name: course.name
    };

    return updatedCourse;
};

exports.delete = (id) => {
    const course = courses.find(c => c.id === parseInt(id));

    if (!course) return undefined;

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    return course;
}