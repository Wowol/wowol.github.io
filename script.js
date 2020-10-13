var fileInput = document.getElementById("csv"),

    DELIMITER = "'"
SEPARATOR = ';'

events = []

readFile = function() {
    var reader = new FileReader();
    reader.onload = function() {
        data = $.csv.toArrays(reader.result, {
            delimiter: DELIMITER, // Sets a custom value delimiter character
            separator: SEPARATOR, // Sets a custom field separator character
        })
        // document.getElementById('out').innerHTML = reader.result;
        data[0].push('event_timestamp')
        current_event_index = 0
        if (events.length != 0) {
            for (x = 1; x < data.length; x++) {
                current_event = events[current_event_index]
                try {
                    if (parseFloat(data[x][0]) > current_event.timestamp) {
                        if (x == 1) {
                            data[1].push(current_event.name);
                        } else if (Math.abs(parseFloat(data[x][0]) - current_event.timestamp) < Math.abs(parseFloat(data[x - 1][0]) - current_event.timestamp)) {
                            data[x].push(current_event.name);
                        } else {
                            data[x - 1].push(current_event.name);
                        }
                        current_event_index++;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        // Zakladamy, ze moze byc tylko jeden event na samym koncu
        if (current_event_index != events.length) {
            data[data.length - 1].push(events[current_event_index].name)
        }
        csv = $.csv.fromArrays(data, {
            delimiter: DELIMITER,
            separator: SEPARATOR,
        })
        download(csv, `badanie-${new Date().toLocaleString('en-US')}.csv`, 'text/plain');
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
};

function download(data, filename, type) {
    var file = new Blob([data], {
        type: type
    });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}


function event_click(name) {
    timestamp = new Date().getTime()
    events.push({
        "name": name,
        "timestamp": timestamp
    })
    $("#events_list").append(`<li>${name} : ${timestamp}</li>`);
}

function end() {
    console.log(events)
}

function new_badanie() {
    fileInput.value = ""
    events = [];
    $("#events_list").html("");
}


fileInput.addEventListener('change', readFile);


console.log(Math.round(new Date().getTime() / 1000));
