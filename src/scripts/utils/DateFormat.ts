export default function formatDate(unix: number) {
    //Divide by 1000 to convert milliseconds into seconds
    const dateOBJ: Date = new Date(unix / 1000);

    //Month Lookup Table, Because JS doesn't like strings
    const monthLookup: Array<string> = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    //Get The variables
    const month: string = monthLookup[dateOBJ.getMonth()];
    const date: number = dateOBJ.getDate();
    const year: number = dateOBJ.getFullYear();

    //Format the Date
    const formatedDate:string = `${month} ${date}, ${year}`;

    return formatedDate;
}