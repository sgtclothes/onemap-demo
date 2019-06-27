$(document).ready(function(){
    $("#form-create-analysis").submit(function(e){
        e.preventDefault();
        let nameAnalysis = $('#name_analysis').val()
        let createdBy = parseInt($('#created_by').val())
        let distance = [];
        let distanceTime  = []
        let unit = []
        let unitTime = []
        let drivingData = []
        let dataLatitude = []
        let dataLongitude = []
        
        $('.distance').each(function(){
            distance.push($(this).val());
        });
        $('.distance-time').each(function(){
            distanceTime.push($(this).val());
        });
        $('.select-unit').each(function(){
            unit.push($(this).val());
        });
        $('.select-unit-time').each(function(){
            unitTime.push($(this).val());
        });
        $('.select-driving').each(function(){
            drivingData.push($(this).val());
        });

        $.each(window.counterArr, function(index, value){
            dataLatitude.push($(".latitude-form-"+value).val())
            dataLongitude.push($(".longitude-form-"+value).val())
        })

        console.log({nameAnalysis:nameAnalysis, createdBy:createdBy, dataLatitude:dataLatitude , dataLongitude:dataLongitude, distance:distance, unit:unit, drivingData:drivingData, distanceTime:distanceTime, unitTime:unitTime})

        $.ajax({
            url: "content/save_analysis.php",
            type: "POST",
            data: {nameAnalysis:nameAnalysis, createdBy:createdBy, dataLatitude:dataLatitude , dataLongitude:dataLongitude, distance:distance, unit:unit, drivingData:drivingData, distanceTime:distanceTime, unitTime:unitTime},
            error: function (err){
                console.log(err)
            }
        });
    })
})