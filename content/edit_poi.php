<!-- Vertical form modal -->

<head>
    <style>
        body {
            font-family: Arial;
        }

        /* Style the tab */
        .tab-edit {
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
        }

        /* Style the buttons inside the tab */
        .tab-edit button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
            font-size: 17px;
        }

        /* Change background color of buttons on hover */
        .tab-edit button:hover {
            background-color: #ddd;
        }

        /* Create an active/current tablink class */
        .tab-edit button.active {
            background-color: #ccc;
        }

        /* Style the tab content */
        .tabcontent {
            display: none;
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-top: none;
        }

        #table-data {
            border: none;
        }
    </style>
</head>

<body>
    <div id="modal_form_edit_poi" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="card-body">
                    <h2>Edit data</h2>
                    <p>Select data to edit</p>
                    <div class="tab-edit">
                    </div>
                    <div class="card-edit"></div>
                    <script>
                        function openData(evt, cityName) {
                            var i, tabcontent, tablinks;
                            tabcontent = document.getElementsByClassName("tabcontent");
                            for (i = 0; i < tabcontent.length; i++) {
                                tabcontent[i].style.display = "none";
                            }
                            tablinks = document.getElementsByClassName("tablinks");
                            for (i = 0; i < tablinks.length; i++) {
                                tablinks[i].className = tablinks[i].className.replace(" active", "");
                            }
                            document.getElementById(cityName).style.display = "block";
                            evt.currentTarget.className += " active";
                        }
                    </script>
                </div>
            </div>
        </div>
    </div>
</body>
<!-- /vertical form modal -->