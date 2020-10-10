var fileInput = document.getElementById("csv"),

events = []

readFile = function () {
    var reader = new FileReader();
    reader.onload = function () {
        music = $.csv.toArrays(reader.result, {
            delimiter: "'", // Sets a custom value delimiter character
            separator: ';', // Sets a custom field separator character
        })
        console.log(music)
        document.getElementById('out').innerHTML = reader.result;
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
};

function event_click() {
    name = "pierwszy"
    timestamp = new Date().getTime()
    events.push({"name": name, "timestamp": timestamp})
    $("#events_list").append(`<li>${name} : ${timestamp}</li>`);
}

function end() {
    console.log(events)
}

function new_badanie() {
    events = [];
    $("#events_list").html("");
}


fileInput.addEventListener('change', readFile);


console.log(Math.round(new Date().getTime()/1000));