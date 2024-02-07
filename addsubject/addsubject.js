const addSubjectForm=document.querySelector('#addSubjectForm');
const subjects=fetchSubjectsFromLocalStorage();

function fetchSubjectsFromLocalStorage(){
    const subjects=JSON.parse(localStorage.getItem('Subjects')??'[]');
    return subjects;
}

function Subject(id,name,branch,code,credits){
    this.id=id;
    this.name=name;
    this.branch=branch;
    this.code=code;
    this.credits=credits;
}

addSubjectForm.addEventListener('submit', function(event){

    event.preventDefault();

    const SubjectName=addSubjectForm.elements.subjectName.value?.trim();
    const SubjectBranch=addSubjectForm.elements.subjectBranch.value?.trim();
    const SubjectCode=addSubjectForm.elements.subjectCode.value?.trim();
    const SubjectCredits=addSubjectForm.elements.subjectCredits.value;
    const length=subjects.length;

    let FLAG=0;
    subjects.forEach(element =>{
        if(element.name===SubjectName){
            alert('Subject Already Added!');
            FLAG=1;
            return;
        }
    });
    
    if(FLAG==0){
        let MMAX=0;
        if(subjects){
            subjects.forEach((subject)=>{
                MMAX=Math.max(MMAX,+subject.id);
            })
        }
        const subject=new Subject(String(MMAX+1),SubjectName,SubjectBranch,SubjectCode,SubjectCredits);

        subjects.push(subject);
        localStorage.setItem('Subjects', JSON.stringify(subjects));
        alert('New Subject Added!');
    }
})