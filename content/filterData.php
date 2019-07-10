<head>
    <style>
        select {
            text-indent: 5px;
        }
    </style>
</head>

<div id="modal_form_filter" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="card-body">
                <h2>Filter data</h2>
                <p>Insert parameters</p>
                <div class="card-filter" style="display: flex; flex-direction:column; align-items: center; justify-content: center; margin-top:10px;">
                    <table style="border:none; margin-bottom: 10px">
                        <tr style="width:70px; border:none">
                            <td style="border:none"><input class="filter-property" type="checkbox"></td>
                            <td style="border:none">Status</td>
                            <td style="border:none"><input style="margin-left:10px; width:100px" type="text" name="status" disabled></td>
                        </tr>
                        <tr style="width:70px border:none">
                            <td style="border:none"><input class="filter-property" type="checkbox"></td>
                            <td style="border:none">Building Area (m<sup>2</sup>)</td>
                            <td style="border:none"><input style="margin-left:10px; width:100px" type="text" name="building_area" disabled></td>
                            <td style="border:none">
                                <select style="margin-left:10px; height:26px; padding: 0px;" name="comboBuildingArea" id="comboBuildingArea" disabled>
                                    <option value="==">equals</option>
                                    <option value=">">larger than</option>
                                    <option value="<">smaller than</option>
                                    <option value=">=">larger than or equals</option>
                                    <option value="<=">smaller than or equals</option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width:70px border:none">
                            <td style="border:none"><input class="filter-property" type="checkbox"></td>
                            <td style="border:none">Land Area (m<sup>2</sup>)</td>
                            <td style="border:none"><input style="margin-left:10px; width:100px" type="text" name="land_area" disabled></td>
                            <td style="border:none">
                                <select style="margin-left:10px;height:26px; padding: 0px;" name="comboLandArea" id="comboLandArea" disabled>
                                    <option value="==">equals</option>
                                    <option value=">">larger than</option>
                                    <option value="<">smaller than</option>
                                    <option value=">=">larger than or equals</option>
                                    <option value="<=">smaller than or equals</option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width:70px border:none">
                            <td style="border:none"><input class="filter-property" type="checkbox"></td>
                            <td style="border:none">Location</td>
                            <td style="border:none"><input style="margin-left:10px; width:100px" type="text" name="location" disabled></td>
                        </tr>
                    </table>
                    <div style="display:flex; margin-bottom:10px;">
                        <p style="margin-top:11px; margin-right:10px;">Operator : </p>
                        <select style="height:26px; width:100px; padding:0px;" name="comboFilterData" id="operatorFilterData">
                            <option value="&&">AND</option>
                            <option value="||">OR</option>
                        </select>
                    </div>
                    <div>
                        <button id="filterData" style="margin-bottom: 10px; margin-right:10px; width:270px;" type="button" class="btn btn-primary">Find</button>
                    </div>
                </div>
                <script>

                </script>
            </div>
        </div>
    </div>
</div>