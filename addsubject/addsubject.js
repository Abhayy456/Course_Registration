import {helper} from "../helper.js";
console.log(helper);
const addSubjectForm=document.querySelector('#addSubjectForm');

const fetchSubjectsFromLocalStorage = () => {
    const subjects = JSON.parse(localStorage.getItem('Subjects') ?? '[]');
    return subjects;
};


const subjects=fetchSubjectsFromLocalStorage();

function Subject(id,name,branch,code,credits){
    this.id=id;
    this.name=name;
    this.branch=branch;
    this.code=code;
    this.credits=credits;
}

function validateForm(){
    const creditInput=addSubjectForm.elements.subjectCredits.value;
    if(isNaN(creditInput)){
        alert("Credits should be numerical!");
        return 0;
    }
    return 1;

}
addSubjectForm.addEventListener('submit', function(event){
    event.preventDefault();


    const SubjectName=addSubjectForm.elements.subjectName.value?.trim();
    const SubjectBranch=addSubjectForm.elements.subjectBranch.value?.trim();
    const SubjectCode=addSubjectForm.elements.subjectCode.value?.trim();
    const SubjectCredits=addSubjectForm.elements.subjectCredits.value;
    const length=subjects.length;

    if(!validateForm()){
        addSubjectForm.reset();
        return;
    }
    let flag=0;
    subjects.forEach(subjectInArray =>{
        if(subjectInArray.name===SubjectName){
            alert('Subject Already Added!');
            flag=1;
            return;
        }
    });
    
    if(flag==0){
        let mmax=helper(subjects);

        const subject=new Subject(String(mmax+1),SubjectName,SubjectBranch,SubjectCode,SubjectCredits);

        subjects.push(subject);
        localStorage.setItem('Subjects', JSON.stringify(subjects));
        alert('New Subject Added!');
        addSubjectForm.reset();
    }
})