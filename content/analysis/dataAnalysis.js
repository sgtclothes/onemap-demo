$(document).ready(function(){
    $.fn.loadDataAnalysis = function() {
        $.ajax({
            url: "content/analysis/data_analysis.php",
            method: "GET"
          }).done(function(data_analysis) {
            $.ajax({
                url: "content/analysis/site_analysis.php",
                type: "POST",
                data: {data_analysis:data_analysis},
                success: function(data) {
                    $('#datatable-site').remove()
                    $('#tbl-analysis-div').html(data)
                }
            });
        });
    }
    $.fn.loadDataAnalysis()
    jQuery.loadDataAnalysis = function(){ $.fn.loadDataAnalysis() };
})