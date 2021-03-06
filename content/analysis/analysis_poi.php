<div id="datatable-poi-anly" style="margin-top: -15px;">
    <?php
    include '../../config/conn.php';
    $site_anly_id = $_POST['id_analysis'];
    $lat_array = array();
    $lon_array = array();
    $points_array = array();
    $latsql = 'SELECT * FROM analysis_points WHERE analysis_id='.$site_anly_id;
    $result = $conn->query($latsql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($lat_array, $row['lat']);
            array_push($lon_array, $row['lon']);
            array_push($points_array, $row['id']);
        }
    }
    $latitude = json_encode($lat_array);
    $longitude = json_encode($lon_array);

    $buffer_group_array = array();
    $buffer_group = 'SELECT a.id FROM analysis_points a INNER JOIN analysis b ON a.analysis_id=b.id WHERE b.id='.$site_anly_id;
    $result_buffer_group = $conn->query($buffer_group);
    if ($result_buffer_group->num_rows > 0) {
        while($row_buffer_group = $result_buffer_group->fetch_assoc()) {
            array_push($buffer_group_array, $row_buffer_group['id']);
        }
    }

    $buffersql = 'SELECT analysis_points_id, distance,unit,options
    FROM spec_buffer_analysis a INNER JOIN analysis_points b ON a.analysis_points_id=b.id WHERE analysis_points_id IN (
        SELECT id FROM analysis_points WHERE analysis_id IN (
            SELECT id FROM analysis WHERE id='.$site_anly_id.'
        )
    )';

    $distance_array = array();
    $unit_array = array();
    $options_array = array();            
    foreach($buffer_group_array as $key=>$value) {
        $result_buffer = $conn->query($buffersql);
        if ($result_buffer->num_rows > 0) {
            $distance_array_i = array();
            $unit_array_i = array();
            $options_array_i = array();
            while($row_buffer = $result_buffer->fetch_assoc()) {
                if ($row_buffer['analysis_points_id']===$value) {
                    array_push($distance_array_i, $row_buffer['distance']);
                    array_push($unit_array_i, $row_buffer['unit']);
                    array_push($options_array_i, $row_buffer['options']);
                }
            }
            array_push($distance_array, $distance_array_i);
            array_push($unit_array, $unit_array_i);
            array_push($options_array, $options_array_i);
        }
    }
    
    $distance = json_encode($distance_array);
    $unit = json_encode($unit_array);
    $options = json_encode($options_array);
    $buffer_group = json_encode($buffer_group_array);
    ?>
    <table class='table table-hover'>
        <thead>
            <tr>
                <th colspan='2' style='text-align:center;'><b><?php echo $_POST['name_analysis']; ?></b></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style='text-align:center;'>
                    <label><input type='radio' name='render-for-analysis-<?php echo $site_anly_id;?>' data-latitude='<?php echo $latitude; ?>' data-longitude='<?php echo $longitude; ?>' data-options='<?php echo $options; ?>' data-unit='<?php echo $unit; ?>' data-distance='<?php echo $distance; ?>' data-values='<?php echo $buffer_group; ?>' data-source='db' style="margin-right: 5px">Show</label>
                </td>
                <td style='text-align:center;'>
                    <button class="btn-modal-form-poi" type="button" data-toggle="modal" data-target="#modal_form_poi" disabled><i class="icon-pin-alt"></i></button>
                    <button class="btn-batas-administrasi" type="button" disabled><i class="icon-table2"></i></button>
                </td>
            </tr>
        </tbody>
    </table>

    <div id="div-detail-analysis" class='table-responsive' style="margin-bottom:25px; margin-right:5px;">
        <table id="table-pagination-lib" class="table table-bordered" style="font-size:12px;">
            <thead>
                <tr>
                    <th colspan='3' style='text-align:center;'><b>Detail Analysis</b></th>
                </tr>
                <tr>
                    <th style='text-align:center;'><b>Points</b></th>
                    <th style='text-align:center;'><b>Type</b></th>
                    <th style='text-align:center;'><b>Distance</b></th>
                </tr>
            </thead>
            <tbody>
                <?php
                for ($i=0; $i < count($lat_array); $i++) {
                    $num = $i+1;
                    $distance = $distance_array[$i];
                    $unit = $unit_array[$i];
                    $options = $options_array[$i];
                    for ($j=0; $j < count($distance); $j++) {
                        if (count($distance) === 1) {
                            $class_name = 'point-only-1';
                        }
                        else {
                            $class_name = strval($points_array[$i]);
                        }
                ?> 
                    <tr class="<?php echo $class_name; ?>">
                        <?php
                        if (count($distance) === 1) {
                            echo '<td>'.$lat_array[$i].', '.$lon_array[$i].'</td>';
                        }
                        else if(count($distance) > 1) {
                            if ($j === 0) {
                                echo '<td rowspan='.count($distance).'>'.$lat_array[$i].', '.$lon_array[$i].'</td>';
                            }
                        }
                        ?>
                        <td>
                            <?php
                            if ($options[$j] === "0") {
                                echo "Buffer";
                            }
                            else if ($options[$j] === "3") {
                                if ($unit[$j] === "kilometers" || $unit[$j] === "miles" || $unit[$j] === "meters") {
                                    echo "Driving Distance";
                                }
                                else {
                                    echo "Driving Time";
                                }
                            }
                            ?>
                        </td>
                        <td><?php echo "$distance[$j] $unit[$j]"; ?></td>
                    </tr>
                <?php
                    }
                }
                ?>
            </tbody>
        </table>
    </div>
    
</div>
<script>
$(document).ready(function() {
    document
    .getElementById("closeAnalysisPOI")
    .addEventListener("click", function() {
        document.getElementById("myAnalysisPOI").style.width = "0";
    });

    var distances = '<?php print json_encode($distance_array) ?>'
    distances = JSON.parse(distances)
    let limitArr = []
    for (let a = 0; a < distances.length; a++) {
        limitArr.push(distances[a].length)
    }
    var max =  Math.max(...limitArr);
    var limit
    if (max > 5) {
        limit = max/2+1
    }
    else {
        limit = 5
    }
    $('#table-pagination-lib').paging({limit:limit});

    var points = '<?php print json_encode($points_array) ?>'
    points = JSON.parse(points)

    $('.paging-nav a').each(function(){
        $(this).on('click',function(){
            for (let i = 0; i < points.length; i++) {
                let none = $("."+points[i]).filter(function(){
                    return $(this).css('display') === 'none';
                })   
                let block = $("."+points[i]).filter(function(){
                    return $(this).css('display') === 'table-row';
                })
                if (none.length>0 && block.length>0) {
                    if (none.length > block.length) {
                        $('.'+none[0].className).each(function(){
                            $(this).css('display','none')
                        })
                    }
                    else if (block.length > none.length || block.length === none.length) {
                        $('.'+block[0].className).each(function(){
                            $(this).css('display','table-row')
                        })
                    }
                }
            }
        })
    })

    $('#div-detail-analysis').each(function(){
        $(this).on('mouseenter mouseleave',function(){
            for (let i = 0; i < points.length; i++) {
                let none = $("."+points[i]).filter(function(){
                    return $(this).css('display') === 'none';
                })   
                let block = $("."+points[i]).filter(function(){
                    return $(this).css('display') === 'table-row';
                })
                if (none.length>0 && block.length>0) {
                    if (none.length > block.length) {
                        $('.'+none[0].className).each(function(){
                            $(this).css('display','none')
                        })
                    }
                    else if (block.length > none.length || block.length === none.length) {
                        $('.'+block[0].className).each(function(){
                            $(this).css('display','table-row')
                        })
                    }
                }
            }
        })
    })
});
</script>
<style>
.paging-nav {
  text-align: left;
  padding-top: 5px;
  padding-bottom: 5px;
}

.paging-nav a {
  margin: auto 1px;
  text-decoration: none;
  display: inline-block;
  padding: 1px 7px;
  background: #7a7c80;
  color: white;
  border-radius: 3px;
}

.paging-nav .selected-page {
  background: #4e5054;
  font-weight: bold;
}
</style>