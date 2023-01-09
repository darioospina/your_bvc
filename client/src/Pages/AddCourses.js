import React, { useState, useEffect } from 'react';
import {Card, Button } from 'react-bootstrap';
import Axios from 'axios'

const AddCourses = () => {

    const userName = window.localStorage.getItem('SET_USERNAME')
    const [student, setStudent] = useState(userName)    
    
    const [coursesList, setCoursesList] = useState(null);
    
    useEffect(() => {
        Axios.get(`http://localhost:3005/api/student/${userName}`)
        .then((res) => {
            setStudent(res.data[0])
            console.log(res.data[0])
        })
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3005/api/courseslist")
        .then((res) => {
            setCoursesList(res.data)
        })
    }, [])

    const messageChild = <p>This is a random message</p>

    const handelAddCourse = (studentId, courseId)=>{
        console.log(studentId, courseId)
        Axios.post("http://localhost:3005/api/addcourse", {
            StudentId: studentId,
            CourseId: courseId
        }).then(
            alert("Course successfully added"),
            document.getElementById(`button_${courseId}`).disabled = true,
            document.getElementById(`button_${courseId}`).after("Course Added. Check My Courses.")
        ).catch((err) => {
            console.log(err)
        })
    }
    

    return (
        <div>
            {coursesList && coursesList.map((myCourseId, index) => (
                <div key={index}>
                    <Card style={{ width: "80%", margin: "20px auto" }}>
                        <Card.Header>
                            <div style={{ display: "table", width: "100%" }}>
                                <div style={{ display: "table-row" }}>
                                    <div id="myCourseId" style={{ display: "table-cell" }}><b>{myCourseId.courseName}</b></div>
                                    <div style={{ display: "table-cell", textAlign: "right" }}><b>{myCourseId.courseCode}</b></div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <div>
                                    <b>Term:</b> {myCourseId.term}
                                </div>
                                <div>
                                    <b>Tutor:</b> {myCourseId.tutor}
                                </div>
                                <div>
                                    <b>Campus:</b> {myCourseId.campus}
                                </div>
                                <div>
                                    <b>Start Date:</b> {myCourseId.startDate}
                                </div>
                                <div>
                                    <b>End Date:</b> {myCourseId.endDate}
                                </div>
                                <div>
                                    <b>Schedule:</b> {myCourseId.schedule}
                                </div>
                            </Card.Text>
                            <Button variant={student.term == myCourseId.term? "success": "secondary"} style={{ marginRight: "10px" }} onClick={() => {handelAddCourse(student.studentId, myCourseId.courseId) }} disabled={student.term == myCourseId.term? false: true} id={"button_" + myCourseId.courseId}>Add</Button>
                            <span>{student.term == myCourseId.term? "": "You can only Add courses matching your term"}</span>
                        </Card.Body>
                    </Card>
                </div>
            ))} {/* To be added a sort method so that the term of the student comes first */}
        </div>
    )
}
export default AddCourses