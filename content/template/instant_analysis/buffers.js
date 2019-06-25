function bufferRadius(GIS,map){
    $(document).ready(function(){
        $("#form-list").click(function(){
            $.each(window.counterArr, function(index, value){
                let radiusArr = []
                $(".form-buffer-"+value).find('button.btn-create-buffer').each(function(){
                    $(this).on("click", function(){
                        let radius = new GIS.Buffer.Radius(
                            map.ObjMap,
                            map.ObjMapView,
                            $(".latitude-form-"+value).val(),
                            $(".longitude-form-"+value).val()
                        );
                        let distanceStr = $(this).closest(".text-right").prev().prev().children()[1].value
                        let distance = distanceStr.split(',')
                        let unit = $(this).closest(".text-right").prev().children()[1].value
                        radius.setUnit(unit);
                        radius.setRadius(distance);
                        radius.create()
                        radiusArr.push(radius)
                    })
                })
                $(".form-buffer-"+value).find('button.remove-buffer').each(function(){
                    $(this).on("click", function(){
                        let distanceCurrent =  $(this).closest("h4").next()[0].childNodes[3].childNodes[3].value
                        let unitCurrent =  $(this).closest("h4").next()[0].childNodes[5].childNodes[3].value
                        for (let b = 0; b < radiusArr.length; b++) {
                            if (radiusArr[b].Radius.toString() == distanceCurrent && radiusArr[b].RadiusUnit == unitCurrent) {
                                for (let i = 0; i < radiusArr[b].CircleGraphic.length; i++) {
                                    map.ObjMapView.graphics.remove(radiusArr[b].CircleGraphic[i])
                                }
                                map.ObjMapView.graphics.remove(radiusArr[b].PointGraphic)
                            }
                        }
                        $(this)
                        .closest(".collapsible")
                        .remove();
                    })
                })
            })
        })
    })
}