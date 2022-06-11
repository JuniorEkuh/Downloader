const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");
downloadBtn.addEventlistener("click", e => {
    e.preventDefault(); //prevents the form from submitting
    downloadBtn.innerText = "downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile (url) {
    //fetching the file and returning results as blob
    fetch(url).then(res => res.blob()).then(file => {
        //url.createobjurl creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; //passing tempurl as href value of <a> tag
        //passing file last name & extension as downlaod value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag); //adding <a> inside the body
        aTag.click(); //clicking <a> so the file download
        aTag.remove(); //removing <a> tag once file download
        URL.revokeObjectURL(tempUrl); //removing tempurl from the document
        downloadBtn.innerText = "download file"
    }).catch(() => {
        // catch method will call if any error come during downloading
        downloadBtn.innerText = "download file"
        alert("failed to download file!")
    });
}