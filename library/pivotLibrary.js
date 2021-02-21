//---------------------------------------------------------
// Internal function to remove the last comma from a string
//---------------------------------------------------------
function removeLastComma(myString) {
    let ultComma = myString.lastIndexOf(",");
    if (ultComma > 0) {
        myString = myString.substring(0, ultComma);
    }
    return myString;
}


