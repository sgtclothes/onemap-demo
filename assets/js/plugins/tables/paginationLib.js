getPagination('.table-pagination-lib');
//getPagination('.table-class');
//getPagination('table');

/*					PAGINATION 
- on change max rows select options fade out all rows gt option value mx = 5
- append pagination list as per numbers of rows / max rows option (20row/5= 4pages )
- each pagination li on click -> fade out all tr gt max rows * li num and (5*pagenum 2 = 10 rows)
- fade out all tr lt max rows * li num - max rows ((5*pagenum 2 = 10) - 5)
- fade in all tr between (maxRows*PageNum) and (maxRows*pageNum)- MaxRows 
*/

function getPagination (table){
    var lastPage = 1 ; 
    $('#maxRows').on('change',function(evt){
        //$('.pagination-libprev').html(''); // reset pagination 
        lastPage = 1 ; 
        $('.pagination-lib').find("li").slice(1, -1).remove();
        var trnum = 0 ; // reset tr counter 
        var maxRows = parseInt($(this).val()); // get Max Rows from select option
        if(maxRows == 5 ){
            $('.pagination-lib').hide();
        } 
        else {
            $('.pagination-lib').show();
        }
        
        var totalRows = $(table+' tbody tr').length;		// numbers of rows 
        $(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
            trnum++;									// Start Counter 
            if (trnum > maxRows ){						// if tr number gt maxRows
                $(this).hide();							// fade it out 
            }
            if (trnum <= maxRows ){
                $(this).show();
            }// else fade in Important in case if it ..
        });				
        							//  was fade out to fade it in 
        if (totalRows > maxRows){						// if tr total rows gt max rows option
            var pagenum = Math.ceil(totalRows/maxRows);	// ceil total(rows/maxrows) to get ..  
                                         //	numbers of pages 
            for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
                $('.pagination-lib #prev').before('<li data-page="'+i+'">\
                  <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
                </li>').show();
            }											
        } 		

        $('.pagination-lib [data-page="1"]').addClass('active'); // add active class to the first li 
        $('.pagination-lib li').on('click',function(evt){		// on click each page
            evt.stopImmediatePropagation();
            evt.preventDefault();
            var pageNum = $(this).attr('data-page');	// get it's number

            var maxRows = parseInt($('#maxRows').val());			// get Max Rows from select option

            if(pageNum == "prev" ){
                if(lastPage == 1 ){return;}
                pageNum  = --lastPage ; 
            }
            
            if(pageNum == "next" ){
                if(lastPage == ($('.pagination-lib li').length -2) ){return;}
                pageNum  = ++lastPage ; 
            }
            
            lastPage = pageNum ;
            var trIndex = 0 ;							// reset tr counter
            $('.pagination-lib li').removeClass('active');	// remove active class from all li 
            $('.pagination-lib [data-page="'+lastPage+'"]').addClass('active');
            
            $(table+' tr:gt(0)').each(function(){		// each tr in table not the header
                trIndex++;								// tr index counter 
                if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                    $(this).hide();		
                }
                else {
                    $(this).show();
                } 				//else fade in 
            }); 										// end of for each tr in table
        });										// end of on click pagination list

}).val(5).change();
// end of on select change 
// END OF PAGINATION 
}	

$(function(){
// Just to append id number for each row  
    $('table .table-pagination-lib tr:eq(0)').prepend('<th> ID </th>')
    var id = 0;
    $('table .table-pagination-lib tr:gt(0)').each(function(){	
        id++
        $(this).prepend('<td>'+id+'</td>');
    });
})