define([
        "dojo/on",
        "dojo/dom",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "views/map/MapConfig",
        "views/map/MapModel",
        "dojo/_base/array"
    ],
    function(on, dom, Query, QueryTask, MapConfig, MapModel, arrayUtil) {

        var o = {};

        o.queryDistinct = function(url, fieldname, callback) {
            var query = new Query();
            query.returnGeometry = false;
            query.where = "1=1";
            query.outFields = [fieldname]
            query.returnDistinctValues = true;
            var task = new QueryTask(url);
            task.execute(query, callback);

        }

        o.populatecallback = function(results) {

        }

        o.init_time_selects = function() {
            var today = new Date();
            var oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            var initial = new Date(2013, 1, 1);
            var years = [];
            for (var i = initial.getFullYear(); i <= today.getFullYear(); i++) {
                years.push(i);
            }


            MapModel.vm.reportDateControl.fromYear(years);
            MapModel.vm.reportDateControl.dateVals().fYear(oneWeekAgo.getFullYear());
            MapModel.vm.reportDateControl.dateVals().fMonth(oneWeekAgo.getMonth() + 1);
            MapModel.vm.reportDateControl.dateVals().fDay(oneWeekAgo.getUTCDate());
            MapModel.vm.reportDateControl.dateVals().tYear(today.getFullYear());
            MapModel.vm.reportDateControl.dateVals().tMonth(today.getMonth() + 1);
            MapModel.vm.reportDateControl.dateVals().tDay(today.getUTCDate());


            //fromMonth: monthComputed(dateValueObject().fYear),
            MapModel.vm.noaaDateControl.fromYear(2014);
            //MapModel.vm.noaaDateControl.fromMonth();
            MapModel.vm.noaaDateControl.dateVals().fYear(2014);
            MapModel.vm.noaaDateControl.dateVals().fMonth(10);
            MapModel.vm.noaaDateControl.dateVals().fDay(12);
            MapModel.vm.noaaDateControl.dateVals().tYear(today.getFullYear());
            MapModel.vm.noaaDateControl.dateVals().tMonth(today.getMonth() + 1);
            MapModel.vm.noaaDateControl.dateVals().tDay(today.getUTCDate());

            MapModel.vm.indoDateControl.fromYear(years);
            MapModel.vm.indoDateControl.dateVals().fYear(oneWeekAgo.getFullYear() - 1);
            MapModel.vm.indoDateControl.dateVals().fMonth(oneWeekAgo.getMonth() + 1);
            MapModel.vm.indoDateControl.dateVals().fDay(oneWeekAgo.getUTCDate());
            MapModel.vm.indoDateControl.dateVals().tYear(oneWeekAgo.getFullYear());
            MapModel.vm.indoDateControl.dateVals().tMonth(oneWeekAgo.getMonth() + 1);
            MapModel.vm.indoDateControl.dateVals().tDay(oneWeekAgo.getUTCDate());

            MapModel.vm.windDateControl.fromYear(years);
            MapModel.vm.windDateControl.dateVals().fYear(today.getFullYear());
            MapModel.vm.windDateControl.dateVals().fMonth(today.getMonth() + 1);
            MapModel.vm.windDateControl.dateVals().fDay(today.getUTCDate());
            MapModel.vm.windDateControl.dateVals().tYear(today.getFullYear());
            MapModel.vm.windDateControl.dateVals().tMonth(today.getMonth() + 1);
            MapModel.vm.windDateControl.dateVals().tDay(today.getUTCDate());
        }

        o.bind_events = function() {
            var aoitype;
            on(dom.byId('report-island-radio'), 'change', function(evt, node) {
                var islands = MapModel.vm.islands();
                MapModel.vm.reportAOIs([]);
                arrayUtil.forEach(islands, function(island) {
                    MapModel.vm.reportAOIs.push(island);
                })
                MapModel.vm.selectedAOIs(['Sumatra']);

            })
            on(dom.byId('report-province-radio'), 'change', function(evt, node) {
                var provinces = MapModel.vm.provinces();
                MapModel.vm.reportAOIs([]);
                arrayUtil.forEach(provinces, function(province) {
                    MapModel.vm.reportAOIs.push(province);
                })
                MapModel.vm.selectedAOIs(['Riau']);

            });

            on(dom.byId('report-launch'), 'click', function() {
                var dates = MapModel.vm.reportDateControl.dateVals();
                console.log('dates launch', dates)


                var reportdates = {};
                for (var val in dates) {
                    if (dates.hasOwnProperty(val)) {
                        reportdates[val] = dates[val]();
                    }
                }
                if (dom.byId('report-province-radio').checked) {
                    aoitype = 'PROVINCE';
                } else if (dom.byId('report-island-radio').checked) {
                    aoitype = 'ISLAND';
                }

                var hash = o.report_data_to_hash(aoitype, dates, MapModel.vm.selectedAOIs);
                var win = window.open('./app/js/views/report/report.html' + hash, 'Report', '');
                win.report = true;
                win.reportOptions = {
                    'dates': reportdates,
                    'aois': MapModel.vm.selectedAOIs(),
                    'aoitype': aoitype
                };
            })
        }

        o.report_data_to_hash = function(aoitype, dates, aois) {
            var hash = "#",
                dateargs = [],
                datestring,
                aoistring;

            for (var val in dates) {
                if (dates.hasOwnProperty(val)) {
                    dateargs.push([val, dates[val]()].join('-'));
                }
            }
            datestring = "dates=" + dateargs.join('!');

            aoistring = "aois=" + aois().join('!');

            hash += ["aoitype=" + aoitype, datestring, aoistring].join("&");
            console.log("HASH STING", hash);
            return hash;
        }

        o.populate_select = function() {
            var self = this;
            var fires = MapConfig.firesLayer
            self.init_time_selects();
            self.bind_events();
            selaois = MapModel.vm.selectedAOIs;
            var islandresults = function(results) {
                var islands = [];
                arrayUtil.forEach(results.features, function(f) {
                    if (f.attributes.ISLAND != '') {
                        islands.push(f.attributes.ISLAND);
                    }
                })
                MapModel.vm.islands(islands.sort());
                MapModel.vm.reportAOIs(islands);
                MapModel.vm.selectedAOIs(['Sumatra']);
            }
            var provinceresults = function(results) {
                var provinces = [];
                arrayUtil.forEach(results.features, function(f) {
                    if (f.attributes.PROVINCE != '') {
                        provinces.push(f.attributes.PROVINCE);
                    }
                })
                MapModel.vm.provinces(provinces.sort());

            }
            var url = "http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/7"
            self.queryDistinct(url + "?returnDistinctValues=true",
                fires.report_fields.islands, islandresults
            );
            self.queryDistinct(url + "?returnDistinctValues=true",
                fires.report_fields.provinces, provinceresults
            );

        }

        o.query = function(props) {

            var layer = props.layer;
            var where = props.where || "1=1";
            var returnGeometry = props.returnGeometry || false;
            var outFields = props.outFields || ["*"];
            var type = props.type || "execute";

            var queryTask = new QueryTask(layer)

            var query = new Query();
            query.where = where; //"ACQ_DATE > date '" + dateString + "'";
            query.returnGeometry = returnGeometry; // false;
            query.outFields = outFields; //["peat"];
            query.getCount

            var deferred = eval("queryTask." + type + "(query)");

            return deferred;

        }
        //listen to key

        //trigger event 

        return o;

    });