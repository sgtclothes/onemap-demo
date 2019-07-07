function createMarkerFromCSV(GIS,map){
    $(document).ready(function(){
        $("#add-from-csv").click(function(){
            let getData = localStorage.getItem("data");
            let fields = []
            let values = []
            let latitude = []
            let longitude = []
            getData = JSON.parse(getData)

            function isFloat(n){
                return Number(n) === n && n % 1 !== 0;
            }

            for (let i = 0; i < getData.length; i++) {
                let getKey = getData[i][0].attributes
                fields.push(Object.keys(getKey))
                let valueArr = []
                let latArr = []
                let lonArr = []
                for (let j = 0; j < getData[i].length; j++) {
                    let getValue = getData[i][j].attributes
                    let value = Object.values(getValue)
                    valueArr.push(value)
                    
                    for (let v = 0; v < value.length; v++) {
                        if (isFloat(value[v])) {
                            if(typeof value[v] === 'number' && value[v] >= -90 && value[v] <= 90 ) {
                                latArr.push(value[v])
                            }
                            else if(typeof value[v] === 'number' && value[v] >= -180 && value[v] <= 180 ) {
                                lonArr.push(value[v])
                            }   
                        }
                    }
                    
                }
                values.push(valueArr)
                latitude.push(latArr)
                longitude.push(lonArr)
            }

            $.ajax({
                url: "content/form_list_csv.php",
                type: "POST",
                data: {fields:fields, values:values, latitude:latitude, longitude:longitude},
                success: function(data) {
                    $('body').append(data)
                    $('#modal_form_csv').modal('show');
                },
                error: function (jqXHR, exception){
                    if (jqXHR.status === 0) {
                        console.log('Not connect. Verify Network.')
                    } else if (jqXHR.status == 404) {
                        console.log('Requested page not found. [404]')
                    } else if (jqXHR.status == 500) {
                        console.log('Internal Server Error [500].')
                    } else if (exception === 'parsererror') {
                        console.log('Requested JSON parse failed.')
                    } else if (exception === 'timeout') {
                        console.log('Time out error.')
                    } else if (exception === 'abort') {
                        console.log('Ajax request aborted.')
                    } else {
                        console.log('Uncaught Error.' + jqXHR.responseText)
                    }
                }
            });
            // if (getData === null) {
            //     alert('You must upload CSV first.');
            // }
            // $.each(getData, function(key, value){
            //     let getAttribute = value
            //     $.each(getAttribute, function(key, value){
            //         let latitude = value.attributes.lat
            //         let longitude = value.attributes.lon
            //         let pointing = new GIS.Buffer.Pointing(map.ObjMapView,latitude,longitude)
            //         pointing.render()
                    
            //         $.addRows()
            //         $.each(window.counterArr, function(index, value){
            //             if ($(".latitude-form-"+value).val() === '') {
            //                 $(".latitude-form-"+value).val(latitude)
            //                 $(".longitude-form-"+value).val(longitude)
            //                 $("#form-list").delegate('.selectbuffer-'+value, 'click', function() {
            //                     $.get("content/template/instant_analysis/buffer.php", function(data){ 
            //                         $(".form-buffer-"+value).append(data)
            //                     });
            //                 })
            //                 $("#form-list").delegate('.selectdrive-'+value, 'click', function() {
            //                     $.get("content/template/instant_analysis/driving.php", function(data){ 
            //                         $(".form-drive-"+value).append(data)
            //                     });
            //                 })
            //             }
            //         })
            //     })
            // })
        })
    })
}