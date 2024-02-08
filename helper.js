export const helper = (array) => {
    let mmax=0;
    let length=array.length;
    if(length==0){
        return 0;
    }
    else{
        array.array.forEach(element => {
            mmax=Math.max(mmax, +element.id);
        });
        return mmax;
    }
};