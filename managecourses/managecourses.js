const subject_list=fetchSubjectListFromStorage();
const map1 = new Map(JSON.parse(localStorage.myMap));

const dropCourseHandler=(event)=>{
    const subject=event.target.parentElement;
    let index=0;
    let totalCredits=localStorage.getItem('totalCredits');

    subject_list.forEach(subjectInArray => {
        if(subjectInArray.id===subject.id){
            totalCredits-=map1.get(subjectInArray.id).credits;
            localStorage.setItem('totalCredits', JSON.stringify(totalCredits));
            return;
        }
        index++;
    });
    subject_list.splice(index,1);

    alert('Subject Dropped Successfully!');
    saveSubjectListInStorage();
    document.querySelector('.credit-box__total-credits-value').innerHTML=localStorage.getItem('totalCredits');
    document.querySelector('.credit-box__remaining-credits-value').innerHTML=Math.max(0,8-totalCredits);
    event.target.parentElement.remove();
}

displaySubjects();

function displaySubjects(){
    subject_list.forEach((subjectInArray)=>{
        const id=subjectInArray.id;
        const subject=new Subject(subjectInArray.id, map1.get(id).name, map1.get(id).branch, map1.get(id).credits);
        createSubjectElement(subject);
    })
}

function fetchSubjectListFromStorage(){
    const subject_list_JSON=localStorage.getItem('subject_list')??'[]';
    const subject_list=JSON.parse(subject_list_JSON);
    return subject_list;
}

function saveSubjectListInStorage(){
    localStorage.setItem('subject_list', JSON.stringify(subject_list));
}

function Subject(id, name, branch, credits){
    this.id=id;
    this.name=name;
    this.branch=branch;
    this.credits=credits;
}

function createSubjectElement(Subject){
    const template=document.querySelector('#registered-subject');
    const clone=document.importNode(template.content, true);
    const subject=clone.querySelector('.subjects__subject-details');
    const subject_name=clone.querySelector('.subjects__subject-name');
    const subject_branch=clone.querySelector('.subjects__subject-branch');
    const subject_credits=clone.querySelector('.subjects__credits');
    const subject_drop_btn=clone.querySelector('.subjects__course-drop-button');

    let totalCredits=JSON.parse(localStorage.getItem('totalCredits'));
    document.querySelector('.credit-box__total-credits-value').innerHTML=localStorage.getItem('totalCredits');
    document.querySelector('.credit-box__remaining-credits-value').innerHTML=`${Math.max(0,8-totalCredits)}`;
    subject.setAttribute('id', Subject.id);
    subject_name.textContent=Subject.name;
    subject_branch.textContent=Subject.branch;
    subject_credits.textContent=Subject.credits;
    subject_drop_btn.addEventListener('click', dropCourseHandler);
    document.querySelector('.subjects__registered-subject-list').append(subject);
}