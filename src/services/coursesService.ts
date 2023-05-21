import { Course } from "../store/coursesSlice";

export async function getCourseListAPIs():Promise<Course[]>{
    const res = await  fetch('http://localhost:3001/courses');
    return  res.json() ;
}

export async function getCourseByIdAPIs(id:number):Promise<Course>{
    const res = await  fetch(`http://localhost:3001/courses/${id}`);
    return  res.json();
}
export async function addCourseAPIs({...courseData}):Promise<Course>{
    const res = await fetch('http://localhost:3001/courses',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(courseData)
    })
    return  res.json() ;
}

export async function deleteCourseAPIs(id:number):Promise<{}>{
    const res = await fetch(`http://localhost:3001/courses/${id}`,{
        method:'DELETE',
        headers: {
            "Content-Type": "application/json",
        },

    })
    return res.json();
}
export async function updateCourseAPIs({...courseData}):Promise<Course>{
    const res = await fetch(`http://localhost:3001/courses/${courseData.id}`,{
        method:'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(courseData)
    })
    return res.json();
}