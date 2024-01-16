const subject_list=FetchSubjectListFromStorage();
// SaveSubjectInLocalStorage();
const map1 = new Map();
function Subject(id, name, branch, code, credits){
    this.id=id;
    this.name=name;
    this.branch=branch;
    this.code=code;
    // this.slot=slot;
    this.credits=credits;
}
// function SaveSubjectInLocalStorage(){
//     const subject1=new Subject('1', 'Machine Learning', 'Computer Science', 'CO-325', '4');
//     const subject2=new Subject('2', 'Machine Learning', 'Computer Science', 'CO-325', '4');
//     const Subjects= [subject1, subject2];
//     // console.dir(subject1);
//     localStorage.setItem('Subjects', JSON.stringify(Subjects));
// }


function FetchSubjectListFromStorage(){
    const subject_list_JSON=localStorage.getItem('subject_list')??'[]';
    const subject_list=JSON.parse(subject_list_JSON);
    return subject_list;
}
// console.log(subject_list);
function saveSubjectListInStorage(){
    localStorage.setItem('subject_list', JSON.stringify(subject_list));
    let total_credits=0;
    subject_list.forEach((entry)=>{
        const id=entry.id;
        total_credits+=Number(map1.get(id).credits);
    })
    console.log(total_credits);
    localStorage.setItem('total_credits', JSON.stringify(total_credits));
}
function FetchSubjectsFromLocalStorage(){
    const Subjects=JSON.parse(localStorage.getItem('Subjects'));
    return Subjects;
}
const RegisterButtonHandler=(event)=>{
    const subject=event.target.parentElement;
    const subjectId=subject.id;
    // const chk_subject=subject_list.find(())
    let length=subject_list.length;
    let flag=0;
    if(length>0){
        subject_list.forEach((entry)=>{
            if(entry.id===subjectId){
                alert('Subject Already Registered!');
                flag=1;
                return;
            }
        })
    }
    if(flag==0){
        subject_list.push({
            id: subjectId,
        })
        alert('Subject Registered Successfully!');
        // console.log(subject_list);
        saveSubjectListInStorage();
        // console.dir(subject);
    }
}
const Subjects=FetchSubjectsFromLocalStorage();
Subjects.forEach((Subject)=>{
    console.log(Subject);
    createSubjectElement(Subject);
})
function createSubjectElement(Subject){
    // console.log(Subject);
    const template=document.querySelector('#subject-template');
    // console.log(template);
    const clone=document.importNode(template.content, true);
    console.log(clone);
    // console.log(clone.querySelector('.course-name').textContent);

    // console.log(clone.querySelector('course-details'));
    const course_subject=clone.querySelector('.course');
    // console.log(clone.querySelector("course-name"));
    const course_subject_name=clone.querySelector('.course-name');
    const course_subject_code=clone.querySelector('.course-code');
    const course_subject_branch_name=clone.querySelector('.course-branch-name');
    const course_subject_credits=clone.querySelector('.course-subject-credits')
    const course_register_button=clone.querySelector('.default-btn');

    // const course_subject_li_tag=template.querySelector('course-details');
    console.log(course_subject_name.textContent);
    course_subject.setAttribute('id', Subject.id);
    course_subject_name.textContent=Subject.name;
    course_subject_code.textContent=Subject.code;
    course_subject_branch_name.textContent=Subject.branch;
    course_subject_credits.textContent=Subject.credits;
    map1.set(Subject.id,{
        name: Subject.name,
        code: Subject.code,
        branch: Subject.branch,
        credits: Subject.credits,
    })
    console.log(map1);
    localStorage.myMap = JSON.stringify(Array.from(map1.entries()));

    // // course_subject_li_tag
    course_register_button.addEventListener('click', RegisterButtonHandler);
    document.querySelector('.course_list').append(course_subject);
}
