<div id="modal_form_poi" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Select POI</h5>
				<button type="button" class="close" id="reset" data-dismiss="modal">&times;</button>
			</div>

            <div class="card-body">
                <ul id="my-ul-analysis">
                    <li><span class="caret-analysis dd-nodrag">
                        <i class="icon-arrow-right32"></i>POI</span>
                        <ul class="nested-analysis">
                            <li><span class="caret-analysis dd-nodrag nested">
                                <i class="icon-arrow-right32"></i>Apotek</span>
                                <ul class="nested-analysis">
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="2" class="an_poi chkbox-analysis" poiname="Apotek Century">
                                    Century
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="3" class="an_poi chkbox-analysis" poiname="Apotek Guardian">
                                    Guardian
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="4" class="an_poi chkbox-analysis" poiname="Apotek K24">
                                    K24
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="5" class="an_poi chkbox-analysis" poiname="Apotek Kimia Farma">
                                    Kimia Farma
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="6" class="an_poi chkbox-analysis" poiname="Apotek Viva Generik">
                                    Viva Generik
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="7" class="an_poi chkbox-analysis" poiname="Apotek Watsons">
                                    Watsons
                                    </label>
                                </li>
                                </ul>
                            </li>

                            <li><span class="caret-analysis dd-nodrag nested">
                                <i class="icon-arrow-right32"></i>ATM</span>
                                <ul class="nested-analysis">
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="9" class="an_poi chkbox-analysis" poiname="ATM Bank Artha Graha">
                                    Artha Graha
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="68" class="an_poi chkbox-analysis" poiname="ATM Bersama">
                                    ATM Bersama
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="14" class="an_poi chkbox-analysis" poiname="ATM Bank Central Asia">
                                    Bank Central Asia
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="16" class="an_poi chkbox-analysis" poiname="ATM Bank DKI">
                                    Bank DKI
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="27" class="an_poi chkbox-analysis" poiname="ATM Bank Mandiri">
                                    Bank Mandiri
                                    </label>
                                </li>
                                </ul>
                            </li>

                            <li><span class="caret-analysis dd-nodrag nested">
                                <i class="icon-arrow-right32"></i>General</span>
                                <ul class="nested-analysis">
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="175" class="an_poi chkbox-analysis" poiname="{POI_NAME}" name-of-poi="Hospital">
                                    Hospital
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="176" class="an_poi chkbox-analysis" poiname="{POI_NAME}" name-of-poi="Hotel">
                                    Hotel
                                    </label>
                                </li>
                                <li>
                                    <label class="dd-nodrag nested">
                                    <input type="checkbox" value="193" class="an_poi chkbox-analysis" poiname="{POI_NAME}" name-of-poi="Police Station">
                                    Police Station
                                    </label>
                                </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li><span class="caret-analysis dd-nodrag">
                        <i class="icon-arrow-right32"></i>Colliers Property</span>
                        <ul class="nested-analysis">
                            <li>
                                <label class="dd-nodrag">
                                <input type="checkbox" value="0" class="an_property chkbox-analysis" poiname="{buildingname}" name-of-poi="Office">
                                Office
                                </label>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
		</div>
	</div>
</div>

<script>
    var toggler_analysis = document.getElementsByClassName("caret-analysis");
    var i;

    for (i = 0; i < toggler_analysis.length; i++) {
        toggler_analysis[i].addEventListener("click", function(click) {
            this.parentElement.querySelector(".nested-analysis").classList.toggle("active-analysis");
            this.parentElement.querySelector(".icon-arrow-right32").classList.toggle("icon-rotate-90");
        });
    }
</script>