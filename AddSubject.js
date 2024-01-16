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
    console.log(SubjectName);
    const SubjectBranch=addSubjectForm.elements.subjectBranch.value?.trim();
    console.log(SubjectBranch);
    const SubjectCode=addSubjectForm.elements.subjectCode.value?.trim();
    console.log(SubjectCode);
    const SubjectCredits=addSubjectForm.elements.subjectCredits.value;
    console.log(SubjectCredits);

    const length=subjects.length;
    let flag=0;
    console.log(SubjectName);
    console.log(subjects);
    subjects.forEach(element =>{
        if(element.name===SubjectName){
            alert('Subject Already Added!');
            flag=1;
            return;
        }
    });
    
    if(flag==0){
        let mmax=0;
        console.log(subjects);
        if(subjects){
            subjects.forEach((subject)=>{
                mmax=Math.max(mmax,+subject.id);
            })
        }
        const subject=new Subject(String(mmax+1),SubjectName,SubjectBranch,SubjectCode,SubjectCredits);
        subjects.push(subject);
        localStorage.setItem('Subjects', JSON.stringify(subjects));
        alert('New Subject Added!');
    }
})