const subject_list=fetchSubjectListFromStorage();
const map1 = new Map(JSON.parse(localStorage.myMap));

const dropCourseHandler=(event)=>{
    const subject=event.target.parentElement;
    let INDEX=0;
    let total_credits=localStorage.getItem('total_credits');

    subject_list.forEach(element => {
        if(element.id===subject.id){
            total_credits-=map1.get(element.id).credits;
            localStorage.setItem('total_credits', JSON.stringify(total_credits));
            return;
        }
        INDEX++;
    });
    subject_list.splice(INDEX,1);

    alert('Subject Dropped Successfully!');
    saveSubjectListInStorage();
    document.querySelector('.credit-box-total-credits-value').innerHTML=localStorage.getItem('total_credits');
    document.querySelector('.credit-box-remaining-credits-value').innerHTML=Math.max(0,8-total_credits);
    event.target.parentElement.remove();
}

displaySubjects();
// hello

function displaySubjects(){
    subject_list.forEach((entry)=>{
        const id=entry.id;
        const subject=new Subject(entry.id, map1.get(id).name, map1.get(id).branch, map1.get(id).credits);
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
    const subject=clone.querySelector('.subject-details');
    const subject_name=clone.querySelector('.subject-name');
    const subject_branch=clone.querySelector('.subject-branch');
    const subject_credits=clone.querySelector('.credits');
    const subject_drop_btn=clone.querySelector('.course-drop-button');

    let total_credits=JSON.parse(localStorage.getItem('total_credits'));
    document.querySelector('.credit-box-total-credits-value').innerHTML=localStorage.getItem('total_credits');
    document.querySelector('.credit-box-remaining-credits-value').innerHTML=`${Math.max(0,8-total_credits)}`;
    subject.setAttribute('id', Subject.id);
    subject_name.textContent=Subject.name;
    subject_branch.textContent=Subject.branch;
    subject_credits.textContent=Subject.credits;
    subject_drop_btn.addEventListener('click', dropCourseHandler);
    document.querySelector('.registered-subject-list').append(subject);
}
