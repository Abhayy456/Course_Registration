const subject_list=fetchSubjectListFromStorage();
const map1 = new Map();

function Subject(id, name, branch, code, credits){
    this.id=id;
    this.name=name;
    this.branch=branch;
    this.code=code;
    this.credits=credits;
}

function fetchSubjectListFromStorage(){
    const subject_list_JSON=localStorage.getItem('subject_list')??'[]';
    const subject_list=JSON.parse(subject_list_JSON);
    return subject_list;
}

function saveSubjectListInStorage(){
    localStorage.setItem('subject_list', JSON.stringify(subject_list));
    let total_credits=0;
    subject_list.forEach((entry)=>{
        const id=entry.id;
        total_credits+=Number(map1.get(id).credits);
    })
    localStorage.setItem('total_credits', JSON.stringify(total_credits));
}

function fetchSubjectFromLocalStorage(){
    const Subjects=JSON.parse(localStorage.getItem('Subjects'));
    return Subjects;
}

const registerButtonHandler=(event)=>{
    const subject=event.target.parentElement;
    const subjectId=subject.id;
    let length=subject_list.length;
    let FLAG=0;
    if(length>0){
        subject_list.forEach((entry)=>{
            if(entry.id===subjectId){
                alert('Subject Already Registered!');
                FLAG=1;
                return;
            }
        })
    }
    if(FLAG==0){
        subject_list.push({
            id: subjectId,
        })
        alert('Subject Registered Successfully!');
        saveSubjectListInStorage();
    }
}
const Subjects=fetchSubjectFromLocalStorage();

Subjects.forEach((Subject)=>{
    createSubjectElement(Subject);
})

function createSubjectElement(Subject){
    const template=document.querySelector('#subject-template');
    const clone=document.importNode(template.content, true);
    const course_subject=clone.querySelector('.course');
    const course_subject_name=clone.querySelector('.course-name');
    const course_subject_code=clone.querySelector('.course-code');
    const course_subject_branch_name=clone.querySelector('.course-branch-name');
    const course_subject_credits=clone.querySelector('.course-subject-credits')
    const course_register_button=clone.querySelector('.default-btn');

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
    localStorage.myMap = JSON.stringify(Array.from(map1.entries()));

    course_register_button.addEventListener('click', registerButtonHandler);
    document.querySelector('.course_list').append(course_subject);
}
