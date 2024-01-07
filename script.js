const fileSelector = document.querySelector('input')
const start = document.querySelector('button')
const img = document.querySelector('img')
const progress = document.querySelector('.progress')
const textarea = document.querySelector('textarea')

// showing preview of the image to imgURl
fileSelector.onchange = () => {
    var file = fileSelector.files[0]
    var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }))
    img.src = imgUrl
    img.onload = function () {
        document.querySelector('.preview').style.display = 'none';
    }
}

// now start text recognition
start.onclick = () => {
    textarea.innerHTML = ''                              //clearing all the previous innerHTML
    const rec = new Tesseract.TesseractWorker()          // initializing new tesseract-worker
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {                 //progress promise
            if(response.status == 'recognizing text'){
                progress.innerHTML = response.status + '   ' + response.progress
            }else{
                progress.innerHTML = response.status
            }
        })
        .then(function (data) {                        // result
            textarea.innerHTML = data.text
            progress.innerHTML = 'Done'
        })
}