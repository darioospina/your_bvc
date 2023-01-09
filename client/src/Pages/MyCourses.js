import React from 'react'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios'

const MyCourses = ()=>{

    const userName = window.localStorage.getItem('SET_USERNAME')
    const [student, setStudent] = useState(userName)    

    const [coursesList, setCoursesList] = useState(null);
    const [myCourses, setMyCourses] = useState(null)
    



    return (
        <>
        </>
    )
}




export default MyCourses