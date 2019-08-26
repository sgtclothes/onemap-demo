<div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <?php
                if(isset($_POST['detail'])) {
                ?>
                <a href="admin.php?page=analysis" class="breadcrumb-item"> Analysis</a>
                <span class="breadcrumb-item active">Detail Analysis</span>
                <?php
                }
                else {
                ?>
                <span class="breadcrumb-item active">Analysis</span>
                <?php
                }
                ?>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->

<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
        <?php
        if(isset($_POST['detail'])) {
            echo "Analysis Detail";
        }
        else {
            echo "Analysis List";
        }
        ?>
        </h6>
        <?php
        if(isset($_POST['detail'])) {
        ?>
        <div class="add-element">
            <a class="btn btn-outline bg-indigo-400 text-indigo-400 border-indigo-400 btn-sm" href="admin.php?page=analysis" role="button"><i class="icon-arrow-left8 mr-2"></i> Back</a>
        </div>
        <?php
        }
        ?>
	</div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-light header-elements-inline">
                    <h6 class="card-title">
                    <?php
                        if(isset($_POST['detail'])) {
                            $site_anly_id = $_POST['id_analysis'];
                            $site_anly_name = $_POST['name_analysis'];
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
                            echo "Analysis Detail of <u>$site_anly_name</u>";
                        }
                        else {
                            echo "List of Analysis";
                            $sql = 'SELECT a.id AS id, a.name AS name, 
                            b.name AS user
                            FROM analysis a
                            INNER JOIN users b ON a.created_by=b.id';
                            $query = mysqli_query($conn,$sql);
                            $num=1;
                        }
                        ?>
                    </h6>
                    <div class="header-elements">
                        <div class="list-icons">
                            <a class="list-icons-item" data-action="collapse"></a>
                            <a class="list-icons-item" data-action="reload"></a>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <?php
                    if(isset($_POST['detail'])) {
                    ?>
                    <div id="admin-div-detail-analysis" class='table-responsive' style="margin-bottom:25px; margin-right:5px;">
                        <table id="admin-pagination-lib" class="table table-bordered" style="font-size:12px;">
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
                    <script src="assets/js/plugins/tables/paginationLib.js"></script>
                    <script>
                    $(document).ready(function() {
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
                        $('#admin-pagination-lib').paging({limit:limit});

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

                        $('#admin-div-detail-analysis').each(function(){
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
                    .pagination-lib li:hover{
                        cursor: pointer;
                    }

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
                    <?php
                    }
                    else {
                    ?>
                    <div class="table-responsive">
                    <table class="table datatable-sorting">
						<thead>
							<tr>
								<th>#</th>
                                <th>Name</th>
                                <th>Created by</th>
                                <th>Actions</th>
							</tr>
                        </thead>
						<tbody>
                            <?php
                            while ($data = mysqli_fetch_array($query)) {
                            ?>
							<tr>
                                <form action="" method="post">
                                <td>
                                    <?php echo "$num"; ?>
                                    <input type=hidden name='id_analysis' value="<?php echo $data['id']; ?>">
                                    <input type=hidden name='name_analysis' value="<?php echo $data['name']; ?>">
                                </td>
                                <td><?php echo "$data[name]"; ?></td>
                                <td><?php echo "$data[user]"; ?></td>
                                <td>
                                <button type="submit" name="detail" class="btn btn-primary ml-3" style="background-color:#7A7C80; font-size: 11px;">Detail</button>
                                <?php 
                                if ($_SESSION['role']=='System Administrator') {
                                ?>
                                    <button type=submit name=del class='btn bg-teal-400 btn-icon rounded-round' onclick="return confirm('Are you sure to delete this data?');"><i class=icon-cancel-circle2></i></button>
                                <?php
                                }
                                ?>
                                </td>
                                </form>
                            </tr>
                            <?php
                                $num +=1;
                            }
                            ?>
                        </tbody>
                    </table>
                    </div>
                    <?php
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
if (isset($_POST['del'])) {
    $id = $_POST['id_analysis'];

    $hasil = mysqli_query($conn,"delete from analysis where id='$id'");
    if($hasil){
        echo "<script>alert('Data has been deleted successfully'); location.href='';</script>";
    }
}
?>